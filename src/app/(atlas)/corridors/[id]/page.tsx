import Link from "next/link";
import { notFound } from "next/navigation";
import { COUNTRIES, COMMODITIES, FLOWS } from "@/data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [from, to] = id.toUpperCase().split("-");
  const a = COUNTRIES[from];
  const b = COUNTRIES[to];
  if (!a || !b) return { title: "Corridor not found — Manifest" };
  return { title: `${a.name} → ${b.name} — Manifest` };
}

export default async function CorridorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [from, to] = id.toUpperCase().split("-");
  const a = COUNTRIES[from];
  const b = COUNTRIES[to];
  if (!a || !b) notFound();

  const flows = FLOWS.filter((f) => f.from === from && f.to === to).sort((x, y) => y.value - x.value);
  const total = flows.reduce((s, f) => s + f.value, 0);

  return (
    <div className="space-y-4">
      <div>
        <div className="text-[11px] mono uppercase tracking-[0.14em] text-[color:var(--ink-dim)] mb-2">Corridor</div>
        <div className="text-[20px] font-semibold leading-tight">
          {a.flag} {a.name}
          <div className="text-[color:var(--ink-faint)] text-base my-1">↓</div>
          {b.flag} {b.name}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mono text-[11px]">
        <Stat label="Goods" value={String(flows.length)} />
        <Stat label="Total / year" value={`$${total}B`} />
      </div>

      <div>
        <div className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--ink-dim)] mb-2">On this corridor</div>
        <div className="space-y-1">
          {flows.map((f) => {
            const c = COMMODITIES[f.good];
            return (
              <Link
                key={`${f.from}-${f.to}-${f.good}`}
                href={`/commodities/${f.good}`}
                className="flex items-center justify-between gap-2 text-[11px] hover:text-[color:var(--accent)]"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: c.color }} />
                  {c.label}
                </span>
                <span className="mono shrink-0">${f.value}B</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="pt-2 flex gap-4 text-[11px]">
        <Link href={`/countries/${from.toLowerCase()}`} className="hover:text-[color:var(--accent)] underline decoration-[color:var(--line)]">
          More from {a.name}
        </Link>
        <Link href={`/countries/${to.toLowerCase()}`} className="hover:text-[color:var(--accent)] underline decoration-[color:var(--line)]">
          More to {b.name}
        </Link>
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
