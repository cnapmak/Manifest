export default function HomePage() {
  return (
    <div>
      <div className="text-[11px] mono uppercase tracking-[0.14em] text-[color:var(--ink-dim)] mb-2">Atlas</div>
      <div className="text-[22px] font-semibold leading-tight mb-2">
        Global Trade, <span style={{ color: "var(--accent)" }}>Visible.</span>
      </div>
      <p className="text-[12px] text-[color:var(--ink-dim)] leading-relaxed">
        About $24 trillion of merchandise crossed borders each year over
        2022&ndash;2024 (WTO/UNCTAD). This atlas tracks those flows &mdash;
        legitimate and illicit &mdash; by value, by commodity, and by corridor.
        <br /><br />
        Toggle commodities below. Click a country or corridor to drill in.
      </p>
    </div>
  );
}
