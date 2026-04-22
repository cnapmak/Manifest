export const metadata = { title: "Methods — Manifest" };

export default function MethodsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 prose prose-invert">
      <div className="text-[11px] mono uppercase tracking-[0.14em] text-[color:var(--ink-dim)] mb-2">Sourcing & methodology</div>
      <h1 className="text-4xl font-semibold mb-8">Methods</h1>

      <Section title="Seed data (current)">
        <p className="text-[color:var(--ink-dim)] leading-relaxed">
          The live atlas currently uses a hand-curated seed dataset of roughly 180 major
          trade corridors, calibrated against 2023–2025 figures. Arc width on the globe
          scales logarithmically with annual USD value so a $300B corridor is visible
          next to a $2B one without one swamping the other.
        </p>
      </Section>

      <Section title="Planned sources — legitimate trade">
        <ul className="text-[color:var(--ink-dim)] leading-relaxed space-y-2">
          <li><strong className="text-[color:var(--ink)]">UN Comtrade</strong> — the definitive bilateral trade database, free for research use</li>
          <li><strong className="text-[color:var(--ink)]">OEC (Observatory of Economic Complexity)</strong> — cleaned, harmonized trade data</li>
          <li><strong className="text-[color:var(--ink)]">WTO Stats</strong> — annualized totals and services trade</li>
          <li><strong className="text-[color:var(--ink)]">IMF Direction of Trade Statistics</strong> — monthly bilateral goods</li>
          <li><strong className="text-[color:var(--ink)]">World Bank WITS</strong> — tariff and non-tariff overlays</li>
        </ul>
      </Section>

      <Section title="Sources — illicit flows">
        <p className="text-[color:var(--ink-dim)] leading-relaxed mb-3">
          Illicit figures are inherently estimates. Every illicit flow carries a
          confidence tier and a citation. We show estimate ranges, not false precision.
        </p>
        <ul className="text-[color:var(--ink-dim)] leading-relaxed space-y-2">
          <li><strong className="text-[color:var(--ink)]">UNODC World Drug Report</strong> — narcotics</li>
          <li><strong className="text-[color:var(--ink)]">Small Arms Survey + C4ADS</strong> — weapons</li>
          <li><strong className="text-[color:var(--ink)]">TRAFFIC + CITES</strong> — wildlife</li>
          <li><strong className="text-[color:var(--ink)]">OECD / EUIPO</strong> — counterfeits</li>
          <li><strong className="text-[color:var(--ink)]">OFAC + C4ADS + OCCRP</strong> — sanctions evasion</li>
          <li><strong className="text-[color:var(--ink)]">Global Financial Integrity + FATF</strong> — illicit financial flows</li>
          <li><strong className="text-[color:var(--ink)]">KSE Price Cap Tracker + UANI + Kpler</strong> — shadow-fleet and sanctioned oil</li>
        </ul>
      </Section>

      <Section title="Sources — cryptocurrency flows">
        <p className="text-[color:var(--ink-dim)] leading-relaxed mb-3">
          Cryptocurrency is jurisdiction-less at the protocol level; country-to-country
          attribution is inferred from IP geolocation on exchange front-ends, KYC, and
          on-chain heuristics. We report net value-received per corridor, not gross
          transaction volume.
        </p>
        <ul className="text-[color:var(--ink-dim)] leading-relaxed space-y-2">
          <li><strong className="text-[color:var(--ink)]">Chainalysis Geography of Cryptocurrency</strong> — annual, by country + corridor</li>
          <li><strong className="text-[color:var(--ink)]">TRM Labs</strong> — sanctions + illicit crypto</li>
          <li><strong className="text-[color:var(--ink)]">Elliptic</strong> — crypto AML + typologies</li>
          <li><strong className="text-[color:var(--ink)]">Kaiko</strong> — exchange flow & DeFi</li>
          <li><strong className="text-[color:var(--ink)]">CCAF (Cambridge)</strong> — mining hashrate maps</li>
          <li><strong className="text-[color:var(--ink)]">BIS working papers</strong> — stablecoin remittance corridors</li>
        </ul>
      </Section>

      <Section title="Arc scaling">
        <p className="text-[color:var(--ink-dim)] leading-relaxed">
          Every arc stroke width is <code>max(0.5, log(value_usd_billion) / 6)</code>.
          Spawn rate for animated shipments is proportional to corridor size. That means
          a visual glance at the globe is a rough read on where the most money moves.
        </p>
      </Section>

      <Section title="What this site is not">
        <p className="text-[color:var(--ink-dim)] leading-relaxed">
          It is not a real-time satellite feed of actual cargo ships. It is an editorial
          atlas: annualized figures, best-available data, updated by hand on a schedule.
          Our goal is legible, not live.
        </p>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--accent)] mb-3">{title}</h2>
      {children}
    </section>
  );
}
