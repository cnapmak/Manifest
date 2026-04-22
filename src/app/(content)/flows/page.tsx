import Link from "next/link";
import { COMMODITIES, COUNTRIES, FLOWS, type CommoditySlug } from "@/data";

export const metadata = { title: "Flows — Manifest" };

export default async function FlowsIndex({
  searchParams,
}: {
  searchParams: Promise<{ good?: string; from?: string; to?: string }>;
}) {
  const q = await searchParams;
  const good = q.good as CommoditySlug | undefined;
  const from = q.from?.toUpperCase();
  const to = q.to?.toUpperCase();

  let rows = FLOWS;
  if (good && COMMODITIES[good]) rows = rows.filter((f) => f.good === good);
  if (from) rows = rows.filter((f) => f.from === from);
  if (to) rows = rows.filter((f) => f.to === to);
  rows = [...rows].sort((a, b) => b.value - a.value);

  const total = rows.reduce((a, f) => a + f.value, 0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-[11px] mono uppercase tracking-[0.14em] text-[color:var(--ink-dim)] mb-2">All flows</div>
      <h1 className="text-4xl font-semibold mb-4">Flows</h1>
      <p className="text-[color:var(--ink-dim)] mb-8 max-w-xl">
        Every tracked trade flow in the dataset. Filter by commodity, origin, or destination.
      </p>

      <div className="flex flex-wrap gap-2 mb-4 text-[11px] mono uppercase tracking-[0.12em]">
        <FilterChip active={!good} href="/flows">All commodities</FilterChip>
        {(Object.keys(COMMODITIES) as CommoditySlug[]).map((k) => (
          <FilterChip key={k} active={good === k} href={`/flows?good=${k}`} color={COMMODITIES[k].color}>
            {COMMODITIES[k].label}
          </FilterChip>
        ))}
      </div>

      <div className="text-[11px] mono text-[color:var(--ink-dim)] mb-4">
        {rows.length} flows · ${total}B/year
      </div>

      <div className="divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
        {rows.map((f) => {
          const a = COUNTRIES[f.from];
          const b = COUNTRIES[f.to];
          const c = COMMODITIES[f.good];
          if (!a || !b) return null;
          return (
            <div key={`${f.from}-${f.to}-${f.good}`} className="grid grid-cols-[1fr_auto] gap-4 items-center py-2.5 px-3 hover:bg-white/5">
              <div className="flex items-center gap-3 min-w-0 text-[13px]">
                <span className="w-1.5 h-6 rounded-sm shrink-0" style={{ background: c.color }} />
                <Link href={`/countries/${f.from.toLowerCase()}`} className="truncate hover:text-[color:var(--accent)]">{a.flag} {a.name}</Link>
                <span className="text-[color:var(--ink-faint)]">→</span>
                <Link href={`/countries/${f.to.toLowerCase()}`} className="truncate hover:text-[color:var(--accent)]">{b.flag} {b.name}</Link>
                <Link href={`/commodities/${f.good}`} className="ml-3 text-[10px] uppercase tracking-[0.12em] text-[color:var(--ink-dim)] hover:text-[color:var(--accent)]">
                  · {c.label}
                </Link>
              </div>
              <div className="text-[13px] mono font-semibold">${f.value}B</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FilterChip({ active, href, children, color }: { active: boolean; href: string; children: React.ReactNode; color?: string }) {
  return (
    <Link
      href={href}
      className="px-3 py-1.5 rounded-full border transition-colors"
      style={{
        borderColor: active ? (color ?? "var(--accent)") : "var(--line)",
        color: active ? (color ?? "var(--accent)") : "var(--ink-dim)",
        background: active ? "rgba(255,255,255,0.03)" : "transparent",
      }}
    >
      {children}
    </Link>
  );
}
