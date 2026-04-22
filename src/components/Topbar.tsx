"use client";

import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { href: "/flows", label: "Flows" },
  { href: "/commodities", label: "Commodities" },
  { href: "/countries", label: "Countries" },
  { href: "/corridors", label: "Corridors" },
  { href: "/stories", label: "Stories" },
  { href: "/methods", label: "Methods" },
];

export function Topbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-20 border-b border-[color:var(--line)]"
      style={{
        background: "linear-gradient(to bottom, rgba(5,7,13,0.95), rgba(5,7,13,0.7))",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="flex items-center justify-between px-4 md:px-6 h-14">
        <Link href="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
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

        <nav className="hidden md:flex items-center gap-6 text-[11px] tracking-[0.1em] uppercase text-[color:var(--ink-dim)]">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[color:var(--accent)] transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4 text-[11px] text-[color:var(--ink-dim)] mono">
          <span className="live text-[10px] tracking-[0.14em] uppercase" style={{ color: "#9be88c" }}>
            Streaming
          </span>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded border border-[color:var(--line)] text-[color:var(--ink)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown panel */}
      {open && (
        <div
          className="md:hidden border-t border-[color:var(--line)]"
          style={{ background: "rgba(5,7,13,0.98)", backdropFilter: "blur(10px)" }}
        >
          <nav className="flex flex-col px-4 py-2">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[13px] tracking-[0.08em] uppercase text-[color:var(--ink-dim)] hover:text-[color:var(--accent)] transition-colors border-b border-[color:var(--line)] last:border-b-0"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
