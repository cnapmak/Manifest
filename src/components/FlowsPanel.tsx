"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  COMMODITIES,
  COMMODITY_ICONS,
  COUNTRIES,
  CRYPTO_COMMODITIES,
  ILLICIT_COMMODITIES,
  flowsForMode,
  isCryptoCommodity,
  isIllicitCommodity,
  type CommoditySlug,
  type FlowMode,
} from "@/data";

type Props = {
  disabled: Set<string>;
  onToggle: (slug: CommoditySlug) => void;
  mode: FlowMode;
};

export function LegendPanel({ disabled, onToggle, mode }: Props) {
  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const f of flowsForMode(mode)) c[f.good] = (c[f.good] || 0) + 1;
    return c;
  }, [mode]);

  const legitKeys = (Object.keys(COMMODITIES) as CommoditySlug[]).filter(
    (k) => !isIllicitCommodity(k) && !isCryptoCommodity(k),
  );
  const illicitKeys = ILLICIT_COMMODITIES;
  const cryptoKeys = CRYPTO_COMMODITIES;

  const showLegit = mode === "legit" || mode === "all";
  const showIllicit = mode === "illicit" || mode === "all";
  const showCrypto = mode === "crypto" || mode === "all";

  return (
    <div>
      <h3 className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[color:var(--ink-dim)] mb-3">
        Commodities
      </h3>
      {showLegit && legitKeys.map((k) => renderRow(k, counts[k] || 0, disabled, onToggle))}

      {showIllicit && (
        <>
          {showLegit && <div className="h-3" />}
          <div className="text-[9px] font-semibold tracking-[0.16em] uppercase text-[#ff8da0] mb-2">
            Illicit
          </div>
          {illicitKeys.map((k) => renderRow(k, counts[k] || 0, disabled, onToggle))}
        </>
      )}

      {showCrypto && (
        <>
          {(showLegit || showIllicit) && <div className="h-3" />}
          <div className="text-[9px] font-semibold tracking-[0.16em] uppercase text-[#7cd8d8] mb-2">
            Crypto
          </div>
          {cryptoKeys.map((k) => renderRow(k, counts[k] || 0, disabled, onToggle))}
        </>
      )}
    </div>
  );
}

function renderRow(
  k: CommoditySlug,
  count: number,
  disabled: Set<string>,
  onToggle: (s: CommoditySlug) => void,
) {
  const c = COMMODITIES[k];
  const off = disabled.has(k);
  return (
    <button
      key={k}
      onClick={() => onToggle(k)}
      className={`w-full flex items-center gap-2.5 py-1.5 text-left transition-opacity ${off ? "opacity-25" : "hover:opacity-70"}`}
    >
      <span
        className="w-[22px] h-[22px] rounded flex items-center justify-center shrink-0"
        style={{ background: c.color }}
        dangerouslySetInnerHTML={{
          __html: `<svg viewBox="0 0 24 24" width="14" height="14" style="color:${contrastColor(c.color)}">${COMMODITY_ICONS[k] || ""}</svg>`,
        }}
      />
      <span className="text-[12px] text-[color:var(--ink)]">{c.label}</span>
      <span className="ml-auto text-[10px] mono text-[color:var(--ink-faint)]">{count}</span>
    </button>
  );
}

export function TopCorridorsPanel({ mode }: { mode: FlowMode }) {
  const top = useMemo(() => {
    const agg = new Map<string, { from: string; to: string; value: number }>();
    for (const f of flowsForMode(mode)) {
      const k = `${f.from}-${f.to}`;
      const cur = agg.get(k) || { from: f.from, to: f.to, value: 0 };
      cur.value += f.value;
      agg.set(k, cur);
    }
    return [...agg.values()].sort((a, b) => b.value - a.value).slice(0, 8);
  }, [mode]);

  const label = mode === "illicit" ? " · Illicit" : mode === "crypto" ? " · Crypto" : mode === "all" ? " · All" : " · Legit";

  return (
    <div>
      <h3 className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[color:var(--ink-dim)] mb-3">
        Top Corridors{label}
      </h3>
      <div>
        {top.map((t) => {
          const a = COUNTRIES[t.from];
          const b = COUNTRIES[t.to];
          if (!a || !b) return null;
          return (
            <Link
              key={`${t.from}-${t.to}`}
              href={`/corridors/${t.from.toLowerCase()}-${t.to.toLowerCase()}`}
              className="grid grid-cols-[auto_1fr_auto] gap-2.5 items-center py-2.5 border-b border-[color:var(--line)] hover:bg-white/5 px-1 -mx-1 transition-colors"
            >
              <div
                className="w-[30px] h-[30px] rounded flex items-center justify-center mono font-semibold text-[11px]"
                style={{ background: "rgba(232,201,122,0.08)", color: "var(--accent)" }}
              >
                {t.from}
              </div>
              <div className="flex flex-col gap-0.5 overflow-hidden">
                <div className="text-[11px] text-[color:var(--ink)] whitespace-nowrap overflow-hidden text-ellipsis">
                  {a.flag} {a.name} <span className="text-[color:var(--ink-faint)]">→</span> {b.flag} {b.name}
                </div>
                <div className="text-[10px] mono uppercase tracking-[0.08em] text-[color:var(--ink-dim)]">
                  ${t.value}B · annualized
                </div>
              </div>
              <div className="text-[11px] mono font-semibold">${t.value}B</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function contrastColor(hex: string) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 150 ? "#0a0e17" : "#fff";
}
