import Link from "next/link";
import { notFound } from "next/navigation";
import { COMMODITIES, COMMODITY_ICONS, COUNTRIES, flowsForCommodity, type CommoditySlug } from "@/data";

export async function generateStaticParams() {
  return Object.keys(COMMODITIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = COMMODITIES[slug as CommoditySlug];
  if (!c) return { title: "Commodity not found — Manifest" };
  return { title: `${c.label} — Manifest`, description: `Global trade flows for ${c.label}.` };
}

export default async function CommodityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: raw } = await params;
  const slug = raw as CommoditySlug;
  const c = COMMODITIES[slug];
  if (!c) notFound();

  const flows = flowsForCommodity(slug).sort((a, b) => b.value - a.value);
  const total = flows.reduce((a, f) => a + f.value, 0);
  const topCorridors = flows.slice(0, 12);

  return (
    <div className="space-y-4">
      <div>
        <div className="text-[11px] mono uppercase tracking-[0.14em] text-[color:var(--ink-dim)] mb-2">Commodity</div>
        <div className="flex items-center gap-3 text-[22px] font-semibold leading-tight">
          <span
            className="w-10 h-10 rounded flex items-center justify-center shrink-0"
            style={{ background: c.color }}
            dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 24 24" width="22" height="22" style="color:#0b0c0e">${COMMODITY_ICONS[slug] || ""}</svg>` }}
          />
          <span>{c.label}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mono text-[11px]">
        <Stat label="Corridors" value={String(flows.length)} />
        <Stat label="Total / year" value={`$${total}B`} />
      </div>

      <div>
        <div className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--ink-dim)] mb-2">Top corridors</div>
        <div className="space-y-1">
          {topCorridors.map((f) => {
            const a = COUNTRIES[f.from];
            const b = COUNTRIES[f.to];
            return (
              <Link
                key={`${f.from}-${f.to}`}
                href={`/corridors/${f.from.toLowerCase()}-${f.to.toLowerCase()}`}
                className="flex items-center justify-between gap-2 text-[11px] hover:text-[color:var(--accent)]"
              >
                <span className="truncate">
                  {a?.flag} {a?.name} <span className="text-[color:var(--ink-faint)]">→</span> {b?.flag} {b?.name}
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
