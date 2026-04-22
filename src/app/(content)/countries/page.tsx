import Link from "next/link";
import { COUNTRIES } from "@/data";

export const metadata = { title: "Countries — Manifest" };

export default function CountriesIndex() {
  const countries = Object.entries(COUNTRIES)
    .sort(([, a], [, b]) => b.exports - a.exports);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="text-[11px] mono uppercase tracking-[0.14em] text-[color:var(--ink-dim)] mb-2">Directory</div>
      <h1 className="text-4xl font-semibold mb-4">Countries</h1>
      <p className="text-[color:var(--ink-dim)] mb-10 max-w-xl">
        {countries.length} countries tracked. Ranked by annual export value (2025 USD, billions).
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {countries.map(([iso, c]) => (
          <Link
            key={iso}
            href={`/countries/${iso.toLowerCase()}`}
            className="flex items-center justify-between gap-3 py-3 px-4 border border-[color:var(--line)] rounded hover:border-[color:var(--accent)] hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xl">{c.flag}</span>
              <div className="min-w-0">
                <div className="text-[13px] truncate">{c.name}</div>
                <div className="text-[10px] mono uppercase tracking-[0.12em] text-[color:var(--ink-faint)]">{iso}</div>
              </div>
            </div>
            <div className="text-[12px] mono font-semibold text-[color:var(--ink)]">${c.exports}B</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
