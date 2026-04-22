"use client";

import { useEffect, useState } from "react";
import type { ThemeName } from "@/data";

type ArcStyle = "glyph" | "icon" | "dots" | "both";

export type Tweaks = {
  rotationSpeed: number;
  flowSpeed: number;
  density: number;
  arcStyle: ArcStyle;
  theme: ThemeName;
};

export const DEFAULT_TWEAKS: Tweaks = {
  rotationSpeed: 0.12,
  flowSpeed: 1.0,
  density: 1.0,
  arcStyle: "glyph",
  theme: "midnight",
};

type Props = {
  value: Tweaks;
  onChange: (next: Tweaks) => void;
  open: boolean;
  onClose: () => void;
};

export function TweaksPanel({ value, onChange, open, onClose }: Props) {
  // Make panel draggable from the title bar
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [drag, setDrag] = useState<{ ox: number; oy: number; px: number; py: number } | null>(null);

  useEffect(() => {
    if (!drag) return;
    const move = (e: MouseEvent) => {
      setPos({ x: drag.px + (e.clientX - drag.ox), y: drag.py + (e.clientY - drag.oy) });
    };
    const up = () => setDrag(null);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [drag]);

  if (!open) return null;

  const style: React.CSSProperties = pos
    ? { left: pos.x, top: pos.y, right: "auto", bottom: "auto" }
    : { right: 20, bottom: 20 };

  return (
    <div
      className="fixed z-30 w-[280px] rounded-lg p-4 text-[color:var(--ink)]"
      style={{
        ...style,
        background: "rgba(10,14,23,0.95)",
        border: "1px solid var(--line)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      }}
    >
      <div
        onMouseDown={(e) => {
          setDrag({ ox: e.clientX, oy: e.clientY, px: pos?.x ?? window.innerWidth - 300, py: pos?.y ?? window.innerHeight - 100 });
        }}
        className="flex items-center justify-between mb-3 cursor-move select-none text-[10px] tracking-[0.16em] uppercase text-[color:var(--ink-dim)]"
      >
        <span>Tweaks</span>
        <button
          type="button"
          onClick={onClose}
          className="text-[color:var(--ink-faint)] hover:text-[color:var(--ink)] cursor-pointer text-base leading-none"
          aria-label="Close tweaks panel"
        >
          ×
        </button>
      </div>

      <Range
        label="Rotation"
        valueLabel={`${value.rotationSpeed.toFixed(2)}°`}
        min={0}
        max={0.6}
        step={0.02}
        value={value.rotationSpeed}
        onChange={(v) => onChange({ ...value, rotationSpeed: v })}
      />
      <Range
        label="Flow speed"
        valueLabel={`${value.flowSpeed.toFixed(1)}×`}
        min={0.2}
        max={3}
        step={0.1}
        value={value.flowSpeed}
        onChange={(v) => onChange({ ...value, flowSpeed: v })}
      />
      <Range
        label="Flow density"
        valueLabel={`${value.density.toFixed(1)}×`}
        min={0.3}
        max={2.5}
        step={0.1}
        value={value.density}
        onChange={(v) => onChange({ ...value, density: v })}
      />

      <Segmented
        label="Arc style"
        options={[
          { v: "glyph", label: "Glyphs" },
          { v: "icon", label: "Icons" },
          { v: "dots", label: "Dots" },
          { v: "both", label: "Both" },
        ]}
        value={value.arcStyle}
        onChange={(v) => onChange({ ...value, arcStyle: v as ArcStyle })}
      />

      <Segmented
        label="Theme"
        options={[
          { v: "midnight", label: "Midnight" },
          { v: "ink", label: "Ink" },
          { v: "warm", label: "Warm" },
        ]}
        value={value.theme}
        onChange={(v) => onChange({ ...value, theme: v as ThemeName })}
      />
    </div>
  );
}

function Range({
  label, valueLabel, min, max, step, value, onChange,
}: {
  label: string; valueLabel: string; min: number; max: number; step: number; value: number; onChange: (v: number) => void;
}) {
  return (
    <div className="mb-3.5">
      <label className="flex justify-between text-[11px] text-[color:var(--ink-dim)] mb-1.5">
        <span>{label}</span>
        <span className="mono">{valueLabel}</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
        style={{ accentColor: "var(--accent)" }}
      />
    </div>
  );
}

function Segmented<T extends string>({
  label, options, value, onChange,
}: {
  label: string; options: { v: T; label: string }[]; value: T; onChange: (v: T) => void;
}) {
  return (
    <div className="mb-3.5">
      <label className="block text-[11px] text-[color:var(--ink-dim)] mb-1.5">{label}</label>
      <div className="grid grid-flow-col gap-1" style={{ gridAutoColumns: "1fr" }}>
        {options.map((o) => {
          const active = o.v === value;
          return (
            <button
              key={o.v}
              type="button"
              onClick={() => onChange(o.v)}
              className="px-2 py-1.5 text-[10px] uppercase tracking-[0.08em] rounded cursor-pointer transition-colors"
              style={{
                background: active ? "var(--accent)" : "transparent",
                color: active ? "#0a0e17" : "var(--ink-dim)",
                border: `1px solid ${active ? "var(--accent)" : "var(--line)"}`,
                fontWeight: active ? 600 : 400,
              }}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function TweaksToggle({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 px-3 py-2 rounded-full cursor-pointer transition-colors"
      style={{
        background: "rgba(12,14,20,0.72)",
        backdropFilter: "blur(8px)",
        border: "1px solid var(--line)",
        color: "var(--ink)",
        fontSize: 11,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--accent)";
        e.currentTarget.style.color = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--line)";
        e.currentTarget.style.color = "var(--ink)";
      }}
    >
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v3 M12 18v3 M3 12h3 M18 12h3 M5.6 5.6l2.1 2.1 M16.3 16.3l2.1 2.1 M5.6 18.4l2.1-2.1 M16.3 7.7l2.1-2.1" />
      </svg>
      <span>Tweaks</span>
    </button>
  );
}
