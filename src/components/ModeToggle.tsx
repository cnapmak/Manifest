"use client";

import type { FlowMode } from "@/data";

type Props = {
  value: FlowMode;
  onChange: (v: FlowMode) => void;
};

const OPTIONS: { v: FlowMode; label: string; color?: string }[] = [
  { v: "legit", label: "Legit" },
  { v: "illicit", label: "Illicit", color: "#ff3b5c" },
  { v: "crypto", label: "Crypto", color: "#26d9d9" },
  { v: "all", label: "All" },
];

export function ModeToggle({ value, onChange }: Props) {
  return (
    <div>
      <h3 className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[color:var(--ink-dim)] mb-3">
        Trade mode
      </h3>
      <div className="grid grid-cols-4 gap-1">
        {OPTIONS.map((o) => {
          const active = o.v === value;
          const tint = o.color ?? "var(--accent)";
          return (
            <button
              key={o.v}
              type="button"
              onClick={() => onChange(o.v)}
              className="px-1.5 py-1.5 text-[10px] uppercase tracking-[0.06em] rounded cursor-pointer transition-colors"
              style={{
                background: active ? tint : "transparent",
                color: active ? "#0a0e17" : "var(--ink-dim)",
                border: `1px solid ${active ? tint : "var(--line)"}`,
                fontWeight: active ? 600 : 400,
              }}
            >
              {o.label}
            </button>
          );
        })}
      </div>
      {value === "illicit" && (
        <p className="text-[10px] text-[#ff8da0] mt-2 leading-relaxed">
          Illicit view. All values are estimates — see <a href="/methods" className="underline">methods</a>.
        </p>
      )}
      {value === "crypto" && (
        <p className="text-[10px] text-[#7cd8d8] mt-2 leading-relaxed">
          Cross-border crypto flows. Jurisdiction inferred from IP + exchange KYC — see <a href="/methods" className="underline">methods</a>.
        </p>
      )}
      {value === "all" && (
        <p className="text-[10px] text-[color:var(--ink-faint)] mt-2 leading-relaxed">
          Legitimate, illicit, and crypto flows combined.
        </p>
      )}
    </div>
  );
}
