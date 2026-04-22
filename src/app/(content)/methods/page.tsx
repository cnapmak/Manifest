export const metadata = { title: "Methods — Manifest" };

export default function MethodsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 prose prose-invert">
      <div className="text-[11px] mono uppercase tracking-[0.14em] text-[color:var(--ink-dim)] mb-2">Sourcing & methodology</div>
      <h1 className="text-4xl font-semibold mb-8">Methods</h1>

      <Section title="What this dataset is">
        <p className="text-[color:var(--ink-dim)] leading-relaxed">
          The atlas covers ~150 country export profiles and ~450 bilateral
          corridor rows for the 2022&ndash;2024 multi-year average, capturing
          roughly 85&ndash;90% of legitimate goods flows by value. World goods
          trade ran ~$25.0T in 2022, $23.8T in 2023, and $24.4T in 2024 per WTO
          / UNCTAD. The single largest commodity bilateral is Australia&rarr;China
          iron ore (~$75B); the single largest total bilateral is Canada&rarr;US
          (~$440B), driven by $110B of crude oil and $72B of vehicles+parts.
        </p>
      </Section>

      <Section title="Sources — legitimate trade">
        <ul className="text-[color:var(--ink-dim)] leading-relaxed space-y-2">
          <li><strong className="text-[color:var(--ink)]">UN Comtrade</strong> — bilateral HS-92 customs records</li>
          <li><strong className="text-[color:var(--ink)]">OEC.world</strong> — cleaned, harmonized Comtrade derivative</li>
          <li><strong className="text-[color:var(--ink)]">Eurostat Comext</strong> — intra- and extra-EU bilateral goods</li>
          <li><strong className="text-[color:var(--ink)]">US Census Bureau FT-900</strong> + <strong className="text-[color:var(--ink)]">USITC DataWeb</strong> — US bilateral goods, HS-10 detail</li>
          <li><strong className="text-[color:var(--ink)]">Statistics Canada</strong>, <strong className="text-[color:var(--ink)]">INEGI Mexico</strong>, <strong className="text-[color:var(--ink)]">SECEX Brazil</strong>, <strong className="text-[color:var(--ink)]">INDEC Argentina</strong> — Americas customs</li>
          <li><strong className="text-[color:var(--ink)]">China Customs (GACC)</strong>, <strong className="text-[color:var(--ink)]">KITA Korea</strong>, <strong className="text-[color:var(--ink)]">Japan MoF</strong>, <strong className="text-[color:var(--ink)]">Taiwan MoF</strong>, <strong className="text-[color:var(--ink)]">HK Census &amp; Statistics</strong> — East Asia customs</li>
          <li><strong className="text-[color:var(--ink)]">EIA Country Analysis Briefs</strong>, <strong className="text-[color:var(--ink)]">Energy Institute Statistical Review 2024</strong>, <strong className="text-[color:var(--ink)]">GIIGNL</strong>, <strong className="text-[color:var(--ink)]">IEA</strong> — energy flows</li>
          <li><strong className="text-[color:var(--ink)]">Kpler</strong> + <strong className="text-[color:var(--ink)]">Vortexa</strong> — tanker tracking for crude/LNG/refined</li>
          <li><strong className="text-[color:var(--ink)]">USDA FAS</strong>, <strong className="text-[color:var(--ink)]">ICCO</strong>, <strong className="text-[color:var(--ink)]">ICO</strong> — agricultural flows</li>
          <li><strong className="text-[color:var(--ink)]">USGS Mineral Commodity Summaries</strong>, <strong className="text-[color:var(--ink)]">Cochilco</strong> (Chile copper), <strong className="text-[color:var(--ink)]">Kimberley Process</strong> — minerals</li>
          <li><strong className="text-[color:var(--ink)]">World Bank Open Data</strong>, <strong className="text-[color:var(--ink)]">IMF DOTS</strong>, <strong className="text-[color:var(--ink)]">WTO Stats</strong> — totals and reconciliation</li>
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
          <li><strong className="text-[color:var(--ink)]">CREA + KSE Price Cap Tracker + UANI + Kpler</strong> — shadow-fleet and sanctioned oil</li>
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
          <li><strong className="text-[color:var(--ink)]">Kaiko</strong> — exchange flow &amp; DeFi</li>
          <li><strong className="text-[color:var(--ink)]">CCAF (Cambridge)</strong> — mining hashrate maps</li>
          <li><strong className="text-[color:var(--ink)]">BIS working papers</strong> — stablecoin remittance corridors</li>
        </ul>
      </Section>

      <Section title="Mirror-trade reconciliation">
        <p className="text-[color:var(--ink-dim)] leading-relaxed">
          Russia stopped publishing detailed customs data in March 2022. For
          Russian flows we substitute partner-country imports: GACC for the
          China leg, India MoC, TurkStat, Eurostat, JP MoF and KR KITA. For
          Turkmenistan (opaque reporting) we use Chinese mirror data. For
          Iran&rsquo;s reflagged crude to China, Kpler/Vortexa/Bloomberg
          tanker-tracking estimates serve as proxy &mdash; Chinese customs
          records the cargoes as &ldquo;Malaysia&rdquo; origin. Venezuela uses PDVSA
          self-reports cross-checked against Vortexa, with only OFAC-licensed
          cargoes (Chevron, Repsol, Eni, Reliance) counted as legitimate.
        </p>
      </Section>

      <Section title="Confidence tags">
        <p className="text-[color:var(--ink-dim)] leading-relaxed">
          Roughly <strong className="text-[color:var(--ink)]">78%</strong> of corridor rows are customs-reported with direct
          exporter/importer match (<code>high</code>). About 18% are
          single-source or require partner-share inference (<code>medium</code>).
          About 4% are mirror-only or tanker-derived (<code>estimate</code>) &mdash;
          predominantly Russia, Iran, Turkmenistan, Venezuela, Yemen, Myanmar,
          and DPRK-adjacent flows. When authoritative sources disagreed, the
          midpoint was used.
        </p>
      </Section>

      <Section title="Known biases — entrepôt and transfer-pricing">
        <p className="text-[color:var(--ink-dim)] leading-relaxed mb-3">
          Six systematic distortions in the source data:
        </p>
        <ol className="text-[color:var(--ink-dim)] leading-relaxed space-y-2 list-decimal pl-5">
          <li>
            <strong className="text-[color:var(--ink)]">Hong Kong re-exports.</strong>{" "}
            ~99% of HK exports are re-exports, mostly TW/KR/JP/CN-origin.
            Aggregating HK&rarr;CN into &ldquo;East Asia&rarr;China&rdquo;
            overstates true origin&ndash;destination trade by ~$170B.
          </li>
          <li>
            <strong className="text-[color:var(--ink)]">Rotterdam transit (NL).</strong>{" "}
            Refined petroleum and chemicals from NL to DE/BE/FR/GB are
            substantially transit flows; estimated 25&ndash;30% inflation.
          </li>
          <li>
            <strong className="text-[color:var(--ink)]">Antwerp (BE).</strong> Same
            effect for petroleum, diamonds, and chemicals.
          </li>
          <li>
            <strong className="text-[color:var(--ink)]">Ireland pharma.</strong> The
            ~$40B IE&rarr;US biologics flow is materially driven by US-MNC
            transfer pricing and IP onshoring; real value-added is ~40&ndash;60%
            of the booked figure.
          </li>
          <li>
            <strong className="text-[color:var(--ink)]">Singapore entrepôt.</strong>{" "}
            45&ndash;50% of SG exports are re-exports.
          </li>
          <li>
            <strong className="text-[color:var(--ink)]">Swiss commodity-trading
            booking.</strong> ~40% of Zambian copper and substantial
            Peruvian/Chilean copper books to CH because Glencore/Trafigura are
            domiciled there; the physical metal goes to Asia.
          </li>
        </ol>
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
