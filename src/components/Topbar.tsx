import Link from "next/link";

const LINKS = [
  { href: "/flows", label: "Flows" },
  { href: "/commodities", label: "Commodities" },
  { href: "/countries", label: "Countries" },
  { href: "/corridors", label: "Corridors" },
  { href: "/stories", label: "Stories" },
  { href: "/methods", label: "Methods" },
];

export function Topbar() {
  return (
    <header
      className="sticky top-0 z-20 border-b border-[color:var(--line)]"
      style={{
        background: "linear-gradient(to bottom, rgba(5,7,13,0.95), rgba(5,7,13,0.7))",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="flex items-center justify-between px-6 h-14">
        <Link href="/" className="flex items-center gap-3 group">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "var(--accent)", boxShadow: "0 0 14px var(--accent)" }}
          />
          <div>
            <div className="text-[13px] font-semibold tracking-[0.08em] uppercase text-[color:var(--ink)] group-hover:text-[color:var(--accent)] transition-colors">
              Manifest
            </div>
            <div className="text-[10px] mono text-[color:var(--ink-faint)] tracking-[0.12em] uppercase">
              Global Trade, Visible
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-6 text-[11px] tracking-[0.1em] uppercase text-[color:var(--ink-dim)]">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[color:var(--accent)] transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-[11px] text-[color:var(--ink-dim)] mono">
          <span className="live text-[10px] tracking-[0.14em] uppercase" style={{ color: "#9be88c" }}>
            Streaming
          </span>
        </div>
      </div>
    </header>
  );
}
