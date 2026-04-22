import Link from "next/link";
import { COUNTRIES, FLOWS, topCorridors } from "@/data";

export const metadata = { title: "Corridors — Manifest" };

export default function CorridorsIndex() {
  const top = topCorridors(100);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="text-[11px] mono uppercase tracking-[0.14em] text-[color:var(--ink-dim)] mb-2">Directory</div>
      <h1 className="text-4xl font-semibold mb-4">Corridors</h1>
      <p className="text-[color:var(--ink-dim)] mb-10 max-w-xl">
        {top.length} bilateral trade corridors, ranked by total annual flow.
      </p>

      <div className="divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
        {top.map((t, idx) => {
          const a = COUNTRIES[t.from];
          const b = COUNTRIES[t.to];
          if (!a || !b) return null;
          return (
            <Link
              key={`${t.from}-${t.to}`}
              href={`/corridors/${t.from.toLowerCase()}-${t.to.toLowerCase()}`}
              className="flex items-center gap-4 py-3 px-3 hover:bg-white/5 transition-colors"
            >
              <div className="text-[10px] mono text-[color:var(--ink-faint)] w-8">#{idx + 1}</div>
              <div className="flex-1 flex items-center gap-2 text-[13px] min-w-0">
                <span>{a.flag} {a.name}</span>
                <span className="text-[color:var(--ink-faint)]">→</span>
                <span>{b.flag} {b.name}</span>
              </div>
              <div className="text-[13px] mono font-semibold">${t.value}B</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
