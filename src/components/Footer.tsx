import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[color:var(--line)] px-6 py-10 text-[11px] text-[color:var(--ink-faint)] mono">
      <div className="flex flex-wrap items-center justify-between gap-6 max-w-7xl mx-auto">
        <div className="uppercase tracking-[0.14em]">
          Manifest · Working title · 2025
        </div>
        <div className="flex gap-5">
          <Link href="/methods" className="hover:text-[color:var(--accent)]">Methods</Link>
          <Link href="/about" className="hover:text-[color:var(--accent)]">About</Link>
        </div>
      </div>
    </footer>
  );
}
