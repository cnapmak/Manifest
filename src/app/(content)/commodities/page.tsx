import Link from "next/link";
import { COMMODITIES, COMMODITY_ICONS, FLOWS, type CommoditySlug } from "@/data";

export const metadata = { title: "Commodities — Manifest" };

export default function CommoditiesIndex() {
  const list = (Object.keys(COMMODITIES) as CommoditySlug[]).map((slug) => {
    const c = COMMODITIES[slug];
    const flows = FLOWS.filter((f) => f.good === slug);
    const total = flows.reduce((a, f) => a + f.value, 0);
    return { slug, c, flows, total };
  }).sort((a, b) => b.total - a.total);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="text-[11px] mono uppercase tracking-[0.14em] text-[color:var(--ink-dim)] mb-2">Directory</div>
      <h1 className="text-4xl font-semibold mb-4">Commodities</h1>
      <p className="text-[color:var(--ink-dim)] mb-10 max-w-xl">
        Goods that move the world. Ranked by total tracked flow value.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {list.map(({ slug, c, flows, total }) => (
          <Link
            key={slug}
            href={`/commodities/${slug}`}
            className="flex items-start gap-4 p-5 border border-[color:var(--line)] rounded hover:border-[color:var(--accent)] hover:bg-white/5 transition-colors"
          >
            <span
              className="w-12 h-12 rounded shrink-0 flex items-center justify-center"
              style={{ background: c.color }}
              dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 24 24" width="28" height="28" style="color:#0b0c0e">${COMMODITY_ICONS[slug] || ""}</svg>` }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-[15px] font-semibold mb-1">{c.label}</div>
              <div className="text-[11px] mono uppercase tracking-[0.12em] text-[color:var(--ink-faint)]">
                {flows.length} corridors · ${total}B tracked
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
