export const metadata = { title: "About — Manifest" };

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-[11px] mono uppercase tracking-[0.14em] text-[color:var(--ink-dim)] mb-2">Working title</div>
      <h1 className="text-4xl font-semibold mb-8">Manifest</h1>

      <div className="space-y-6 text-[color:var(--ink-dim)] leading-relaxed text-[15px]">
        <p>
          Manifest is a data-journalism atlas of global trade. It follows the flow of
          goods and money — both legitimate and illicit — in a way that you can see,
          not just read about.
        </p>
        <p>
          A shipping manifest is the document that lists what is inside a container.
          To make something <em>manifest</em> is to make it visible. This site is both:
          a ledger of what crosses borders, and a project that brings the normally
          invisible into view.
        </p>
        <p>
          The name is a working title. Once the structure and content are in place,
          we will revisit.
        </p>
        <p>
          See <a href="/methods" className="text-[color:var(--accent)]">methods</a> for sources and caveats.
        </p>
      </div>
    </div>
  );
}
