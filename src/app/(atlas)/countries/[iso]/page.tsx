import Link from "next/link";
import { notFound } from "next/navigation";
import { COUNTRIES, COMMODITIES, flowsForCountry } from "@/data";

export async function generateStaticParams() {
  return Object.keys(COUNTRIES).map((iso) => ({ iso: iso.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ iso: string }> }) {
  const { iso } = await params;
  const country = COUNTRIES[iso.toUpperCase()];
  if (!country) return { title: "Country not found — Manifest" };
  return { title: `${country.name} — Manifest`, description: `Trade flows in and out of ${country.name}.` };
}

export default async function CountryPage({ params }: { params: Promise<{ iso: string }> }) {
  const { iso: raw } = await params;
  const iso = raw.toUpperCase();
  const country = COUNTRIES[iso];
  if (!country) notFound();

  const { outflow, inflow } = flowsForCountry(iso);
  const totalOut = outflow.reduce((a, f) => a + f.value, 0);
  const totalIn = inflow.reduce((a, f) => a + f.value, 0);

  const topOut = [...outflow].sort((a, b) => b.value - a.value).slice(0, 8);
  const topIn = [...inflow].sort((a, b) => b.value - a.value).slice(0, 8);

  return (
    <div className="space-y-4">
      <div>
        <div className="text-[11px] mono uppercase tracking-[0.14em] text-[color:var(--ink-dim)] mb-2">Country</div>
        <div className="flex items-center gap-3 text-[22px] font-semibold leading-tight">
          <span className="text-3xl">{country.flag}</span>
          <span>{country.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mono text-[11px]">
        <Stat label="Exports" value={`$${country.exports}B`} />
        <Stat label="Out" value={`$${totalOut}B`} />
        <Stat label="In" value={`$${totalIn}B`} />
      </div>

      <div>
        <div className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--ink-dim)] mb-2">Top outflows</div>
        <div className="space-y-1">
          {topOut.map((f) => {
            const dest = COUNTRIES[f.to];
            const comm = COMMODITIES[f.good];
            return (
              <Link
                key={`${f.from}-${f.to}-${f.good}`}
                href={`/corridors/${f.from.toLowerCase()}-${f.to.toLowerCase()}`}
                className="flex items-center justify-between gap-2 text-[11px] hover:text-[color:var(--accent)]"
              >
                <span className="truncate">
                  → {dest?.flag} {dest?.name} <span style={{ color: comm.color }}>· {comm.label}</span>
                </span>
                <span className="mono shrink-0">${f.value}B</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div>
        <div className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--ink-dim)] mb-2">Top inflows</div>
        <div className="space-y-1">
          {topIn.map((f) => {
            const src = COUNTRIES[f.from];
            const comm = COMMODITIES[f.good];
            return (
              <Link
                key={`${f.from}-${f.to}-${f.good}`}
                href={`/corridors/${f.from.toLowerCase()}-${f.to.toLowerCase()}`}
                className="flex items-center justify-between gap-2 text-[11px] hover:text-[color:var(--accent)]"
              >
                <span className="truncate">
                  ← {src?.flag} {src?.name} <span style={{ color: comm.color }}>· {comm.label}</span>
                </span>
                <span className="mono shrink-0">${f.value}B</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[color:var(--line)] rounded px-2 py-1.5">
      <div className="text-[9px] uppercase tracking-[0.14em] text-[color:var(--ink-dim)]">{label}</div>
      <div className="text-[12px] font-semibold text-[color:var(--ink)]">{value}</div>
    </div>
  );
}
