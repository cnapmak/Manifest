export const metadata = { title: "Stories — Manifest" };

export default function StoriesPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-[11px] mono uppercase tracking-[0.14em] text-[color:var(--ink-dim)] mb-2">Long-form investigations</div>
      <h1 className="text-4xl font-semibold mb-6">Stories</h1>
      <p className="text-[color:var(--ink-dim)] mb-10 max-w-xl">
        Coming soon. Long-form pieces that pin the globe to a view and walk through
        what you are looking at — who wins, who pays, who carries the boxes, who does
        not want the boxes counted.
      </p>

      <div className="border border-dashed border-[color:var(--line)] rounded-lg p-8 text-center text-[color:var(--ink-faint)] text-[13px]">
        No stories published yet.
      </div>
    </div>
  );
}
