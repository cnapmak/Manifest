"use client";

import { useMemo, useState } from "react";
import Globe from "./Globe";
import { LegendPanel, TopCorridorsPanel } from "./FlowsPanel";
import { ModeToggle } from "./ModeToggle";
import { TweaksPanel, TweaksToggle, DEFAULT_TWEAKS, type Tweaks } from "./TweaksPanel";
import { flowsForMode, type CommoditySlug, type Flow, type FlowMode } from "@/data";

// Slider display → actual effect. Keeps the visible panel numbers intact
// while the motion is gentler.
const TWEAK_SCALE = 3;

type Props = {
  focusIso?: string | null;
  filterCommodity?: CommoditySlug | null;
  filterFromIso?: string | null;
  filterToIso?: string | null;
  children?: React.ReactNode;
};

export default function GlobeStage({
  focusIso = null,
  filterCommodity = null,
  filterFromIso = null,
  filterToIso = null,
  children,
}: Props) {
  const [disabled, setDisabled] = useState<Set<CommoditySlug>>(new Set());
  const [stats, setStats] = useState({ shipmentsLive: 0, usdPerSec: 0 });
  const [tweaks, setTweaks] = useState<Tweaks>(DEFAULT_TWEAKS);
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [mode, setMode] = useState<FlowMode>("legit");

  const flows: Flow[] = useMemo(() => {
    let out = flowsForMode(mode);
    if (filterCommodity) out = out.filter((f) => f.good === filterCommodity);
    if (filterFromIso) out = out.filter((f) => f.from === filterFromIso);
    if (filterToIso) out = out.filter((f) => f.to === filterToIso);
    return out;
  }, [mode, filterCommodity, filterFromIso, filterToIso]);

  const borderStyle: "default" | "red" | "cyan" =
    mode === "illicit" ? "red" : mode === "crypto" ? "cyan" : "default";

  const toggle = (slug: CommoditySlug) => {
    setDisabled((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug); else next.add(slug);
      return next;
    });
  };

  return (
    <div
      className="relative grid flex-1"
      style={{ gridTemplateColumns: "300px 1fr", minHeight: "calc(100vh - 56px)" }}
    >
      <aside
        className="border-r border-[color:var(--line)] p-6 overflow-y-auto space-y-7"
        style={{ background: "linear-gradient(to right, rgba(10,14,23,0.6), transparent)" }}
      >
        {children}
        <ModeToggle value={mode} onChange={setMode} />
        <LegendPanel disabled={disabled as Set<string>} onToggle={toggle} mode={mode} />
        <TopCorridorsPanel mode={mode} />
        <div className="pt-4 border-t border-[color:var(--line)] space-y-1 text-[11px] text-[color:var(--ink-dim)] mono">
          <div className="flex justify-between">
            <span className="uppercase tracking-[0.12em] text-[10px]">Live shipments</span>
            <span className="text-[color:var(--ink)]">{String(stats.shipmentsLive).padStart(3, "0")}</span>
          </div>
          <div className="flex justify-between">
            <span className="uppercase tracking-[0.12em] text-[10px]">USD / sec</span>
            <span className="text-[color:var(--ink)]">${formatShort(stats.usdPerSec)}</span>
          </div>
        </div>
      </aside>
      <div className="relative flex items-center justify-center overflow-hidden">
        <Globe
          focusIso={focusIso}
          disabledCommodities={Array.from(disabled)}
          flows={flows}
          arcStyle={tweaks.arcStyle}
          theme={tweaks.theme}
          rotationSpeed={tweaks.rotationSpeed / TWEAK_SCALE}
          flowSpeedMul={tweaks.flowSpeed / TWEAK_SCALE}
          density={tweaks.density / TWEAK_SCALE}
          borderStyle={borderStyle}
          className="absolute inset-0"
          onStats={setStats}
        />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] mono uppercase tracking-[0.16em] text-[color:var(--ink-faint)] pointer-events-none">
          drag to rotate · scroll to zoom · click a country
        </div>
      </div>

      {!tweaksOpen && <TweaksToggle onClick={() => setTweaksOpen(true)} />}
      <TweaksPanel value={tweaks} onChange={setTweaks} open={tweaksOpen} onClose={() => setTweaksOpen(false)} />
    </div>
  );
}

function formatShort(n: number) {
  if (n > 1e9) return (n / 1e9).toFixed(1) + "B";
  if (n > 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n > 1e3) return (n / 1e3).toFixed(1) + "K";
  return Math.round(n).toString();
}
