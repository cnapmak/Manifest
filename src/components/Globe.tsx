"use client";

import * as d3 from "d3";
import * as topojson from "topojson-client";
import { useEffect, useRef } from "react";
import type { Feature, GeoJsonProperties, Geometry, MultiLineString } from "geojson";
import {
  COUNTRIES,
  COMMODITIES,
  COMMODITY_ICONS,
  THEMES,
  FLOWS,
  type CommoditySlug,
  type Country,
  type Flow,
  type ThemeName,
} from "@/data";

type ArcStyle = "glyph" | "icon" | "dots" | "both";

export type BorderStyle = "default" | "red" | "cyan";

export type GlobeProps = {
  focusIso?: string | null;
  disabledCommodities?: CommoditySlug[];
  theme?: ThemeName;
  arcStyle?: ArcStyle;
  rotationSpeed?: number;
  flowSpeedMul?: number;
  density?: number;
  flows?: Flow[];
  /**
   * Country border styling.
   *  "red"  — illicit mode, closed borders
   *  "cyan" — crypto mode, digital infrastructure
   *  "default" — white, neutral
   */
  borderStyle?: BorderStyle;
  className?: string;
  onCountryClick?: (iso: string) => void;
  onStats?: (s: { shipmentsLive: number; usdPerSec: number }) => void;
};

type Shipment = {
  id: number;
  flow: Flow;
  comm: typeof COMMODITIES[CommoditySlug];
  origin: Country;
  dest: Country;
  glyph: string;
  t: number;
  duration: number;
  start: number;
};

type ArcDatum = { flow: Flow; comm: typeof COMMODITIES[CommoditySlug]; ships: Shipment[] };

export default function Globe(props: GlobeProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const propsRef = useRef(props);
  propsRef.current = props;

  useEffect(() => {
    const wrap = wrapRef.current;
    const svgEl = svgRef.current;
    if (!wrap || !svgEl) return;

    const svg = d3.select(svgEl);
    const theme = THEMES[propsRef.current.theme ?? "ink"];

    const state = {
      rot: [0, -15, 0] as [number, number, number],
      autoSpin: propsRef.current.rotationSpeed ?? 0.04,
      flowSpeedMul: propsRef.current.flowSpeedMul ?? 0.2,
      density: propsRef.current.density ?? 0.9,
      arcStyle: (propsRef.current.arcStyle ?? "icon") as ArcStyle,
      themeName: (propsRef.current.theme ?? "ink") as ThemeName,
      disabled: new Set<string>(propsRef.current.disabledCommodities ?? []),
      shipments: [] as Shipment[],
      flowsSource: (propsRef.current.flows ?? FLOWS) as Flow[],
      borderStyle: (propsRef.current.borderStyle ?? "default") as BorderStyle,
      panY: 0,
    };

    let width = 0, height = 0, radius = 0;
    let projection: d3.GeoProjection;
    let pathGen: d3.GeoPath;
    let rafId = 0;

    function sizeStage() {
      width = wrap!.clientWidth;
      height = wrap!.clientHeight;
      radius = Math.min(width, height) * 0.42;
      svg.attr("width", width).attr("height", height).attr("viewBox", `0 0 ${width} ${height}`);

      projection = d3.geoOrthographic()
        .scale(radius)
        .translate([width / 2, height / 2 + state.panY])
        .rotate(state.rot)
        .clipAngle(90);

      pathGen = d3.geoPath(projection);
    }
    sizeStage();

    // Keep the halo + atmosphere ring centered on the current projection center
    // and sized from the current radius. Called on resize, zoom, and pan.
    function updateSpatial() {
      const [cx, cy] = projection.translate();
      gHalo.select("circle.halo")
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("r", radius * 1.6);
      gSphere.select("circle.atm")
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("r", radius * 1.05);
    }

    // Layer groups (bottom-up; halo is behind everything)
    svg.selectAll("g").remove();
    const gHalo = svg.append("g");
    const gSphere = svg.append("g");
    const gGraticule = svg.append("g");
    const gLand = svg.append("g");
    const gArcs = svg.append("g");
    const gShipments = svg.append("g");
    const gCountries = svg.append("g");

    function renderStatic() {
      const t = THEMES[state.themeName];
      gHalo.selectAll("*").remove();
      gSphere.selectAll("*").remove();
      gGraticule.selectAll("*").remove();

      svg.select("defs").remove();
      const defs = svg.append("defs");

      // Halo color follows the current border style. Blue neutral, red for
      // illicit, cyan for crypto.
      const haloColor =
        state.borderStyle === "red" ? "255,59,92" :
        state.borderStyle === "cyan" ? "38,217,217" :
        "120,170,255";
      const halo = defs.append("radialGradient").attr("id", "halo").attr("cx", "50%").attr("cy", "50%").attr("r", "50%");
      halo.append("stop").attr("offset", "0%").attr("stop-color", `rgb(${haloColor})`).attr("stop-opacity", 0.10);
      halo.append("stop").attr("offset", "40%").attr("stop-color", `rgb(${haloColor})`).attr("stop-opacity", 0.05);
      halo.append("stop").attr("offset", "70%").attr("stop-color", `rgb(${haloColor})`).attr("stop-opacity", 0);

      const atm = defs.append("radialGradient").attr("id", "atm").attr("cx", "50%").attr("cy", "50%").attr("r", "50%");
      atm.append("stop").attr("offset", "85%").attr("stop-color", "#6ea8ff").attr("stop-opacity", 0);
      atm.append("stop").attr("offset", "97%").attr("stop-color", "#6ea8ff").attr("stop-opacity", 0.25);
      atm.append("stop").attr("offset", "100%").attr("stop-color", "#6ea8ff").attr("stop-opacity", 0);

      const oceanGrad = defs.append("radialGradient").attr("id", "ocean").attr("cx", "42%").attr("cy", "38%").attr("r", "62%");
      oceanGrad.append("stop").attr("offset", "0%").attr("stop-color", d3.color(t.ocean)!.brighter(0.6).formatHex());
      oceanGrad.append("stop").attr("offset", "80%").attr("stop-color", t.ocean);
      oceanGrad.append("stop").attr("offset", "100%").attr("stop-color", d3.color(t.ocean)!.darker(1).formatHex());

      const landGrad = defs.append("radialGradient").attr("id", "land").attr("cx", "42%").attr("cy", "38%").attr("r", "65%");
      landGrad.append("stop").attr("offset", "0%").attr("stop-color", d3.color(t.land)!.brighter(0.4).formatHex());
      landGrad.append("stop").attr("offset", "100%").attr("stop-color", t.land);

      gHalo.append("circle")
        .attr("class", "halo")
        .attr("cx", width / 2).attr("cy", height / 2 + state.panY)
        .attr("r", radius * 1.6)
        .attr("fill", "url(#halo)");

      gSphere.append("circle")
        .attr("class", "atm")
        .attr("cx", width / 2).attr("cy", height / 2 + state.panY)
        .attr("r", radius * 1.05)
        .attr("fill", "url(#atm)");

      gSphere.append("path")
        .datum({ type: "Sphere" })
        .attr("d", pathGen as unknown as string)
        .attr("fill", "url(#ocean)")
        .attr("stroke", t.oceanEdge)
        .attr("stroke-width", 1);

      const graticule = d3.geoGraticule().step([15, 15]);
      gGraticule.append("path")
        .datum(graticule())
        .attr("d", pathGen)
        .attr("fill", "none")
        .attr("stroke", t.graticule)
        .attr("stroke-width", 0.5);
    }
    renderStatic();

    let worldLand: Feature<Geometry, GeoJsonProperties> | null = null;
    let worldBorders: MultiLineString | null = null;
    let worldCoast: MultiLineString | null = null;

    async function loadWorld() {
      try {
        const topoLand = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/land-110m.json").then((r) => r.json());
        worldLand = topojson.feature(topoLand, topoLand.objects.land) as Feature<Geometry, GeoJsonProperties>;

        const topoCountries = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json").then((r) => r.json());
        worldBorders = topojson.mesh(topoCountries, topoCountries.objects.countries, (a, b) => a !== b) as MultiLineString;
        worldCoast = topojson.mesh(topoCountries, topoCountries.objects.countries, (a, b) => a === b) as MultiLineString;

        updateGlobe();
      } catch (e) {
        console.warn("Globe: failed to load world topology", e);
      }
    }

    function isFrontFacing(lonlat: [number, number]) {
      const [lambda, phi] = state.rot;
      const toRad = Math.PI / 180;
      const cLon = -lambda * toRad, cLat = -phi * toRad;
      const tLon = lonlat[0] * toRad, tLat = lonlat[1] * toRad;
      const cos = Math.sin(cLat) * Math.sin(tLat) + Math.cos(cLat) * Math.cos(tLat) * Math.cos(tLon - cLon);
      return cos > 0.05;
    }

    function updateGlobe() {
      if (worldLand) {
        const l = gLand.selectAll<SVGPathElement, Feature>("path.land").data([worldLand]);
        l.enter().append("path").attr("class", "land")
          .merge(l)
          .attr("d", pathGen)
          .attr("fill", "url(#land)")
          .attr("stroke", "none");
      }
      if (worldBorders) {
        const b = gLand.selectAll<SVGPathElement, MultiLineString>("path.borders").data([worldBorders]);
        const bs = state.borderStyle;
        const stroke = bs === "red" ? "#ff3b5c" : bs === "cyan" ? "#26d9d9" : "#ffffff";
        const opacity = bs === "red" ? 0.95 : bs === "cyan" ? 0.85 : 0.55;
        const width = bs === "default" ? 0.5 : 0.9;
        b.enter().append("path").attr("class", "borders")
          .merge(b)
          .attr("d", pathGen)
          .attr("fill", "none")
          .attr("stroke", stroke)
          .attr("stroke-opacity", opacity)
          .attr("stroke-width", width)
          .attr("stroke-linejoin", "round");
      }
      if (worldCoast) {
        const c = gLand.selectAll<SVGPathElement, MultiLineString>("path.coast").data([worldCoast]);
        c.enter().append("path").attr("class", "coast")
          .merge(c)
          .attr("d", pathGen)
          .attr("fill", "none")
          .attr("stroke", "#ffffff")
          .attr("stroke-opacity", 0.7)
          .attr("stroke-width", 0.6)
          .attr("stroke-linejoin", "round");
      }

      const entries = Object.entries(COUNTRIES);
      const dots = gCountries.selectAll<SVGGElement, [string, Country]>("g.cdot")
        .data(entries, (d) => (d as [string, Country])[0]);
      const dotsEnter = dots.enter().append("g").attr("class", "cdot").attr("cursor", "pointer");
      const haloR = Math.max(4, radius / 42);
      const coreR = Math.max(1, radius / 170);
      dotsEnter.append("circle").attr("class", "cdot-halo").attr("r", haloR).attr("fill", "rgba(232,201,122,0.08)");
      dotsEnter.append("circle").attr("class", "cdot-core").attr("r", coreR).attr("fill", "#e8c97a");
      gCountries.selectAll<SVGCircleElement, unknown>("circle.cdot-halo").attr("r", haloR);
      gCountries.selectAll<SVGCircleElement, unknown>("circle.cdot-core").attr("r", coreR);

      dotsEnter
        .on("click", (_e, d) => {
          const cb = propsRef.current.onCountryClick;
          if (cb) cb(d[0]);
          else focusCountry(d[0]);
        })
        .on("mouseenter", (e, d) => showTooltip(e, d))
        .on("mousemove", (e) => moveTooltip(e))
        .on("mouseleave", () => hideTooltip());

      gCountries.selectAll<SVGGElement, [string, Country]>("g.cdot").each(function (d) {
        const [, c] = d;
        const p = projection(c.coord);
        const visible = isFrontFacing(c.coord);
        d3.select(this)
          .attr("transform", p ? `translate(${p[0]},${p[1]})` : null)
          .attr("display", visible ? null : "none");
      });
    }

    loadWorld();

    // Tooltip element (owned by component)
    const tooltipEl = document.createElement("div");
    tooltipEl.className = "mf-tooltip";
    Object.assign(tooltipEl.style, {
      position: "fixed", pointerEvents: "none", zIndex: "25",
      background: "rgba(5,7,13,0.96)",
      border: "1px solid #1a2230",
      padding: "10px 12px", borderRadius: "6px", fontSize: "11px",
      minWidth: "180px", opacity: "0", transition: "opacity .12s",
      backdropFilter: "blur(8px)", color: "#e8ecf3",
      fontFamily: "inherit",
    } as CSSStyleDeclaration);
    document.body.appendChild(tooltipEl);

    function showTooltip(e: MouseEvent, d: [string, Country]) {
      const [code, c] = d;
      const outflows = state.flowsSource.filter((f) => f.from === code);
      const inflows = state.flowsSource.filter((f) => f.to === code);
      const totalOut = outflows.reduce((a, f) => a + f.value, 0);
      const totalIn = inflows.reduce((a, f) => a + f.value, 0);
      tooltipEl.innerHTML = `
        <div style="font-weight:600;font-size:13px;margin-bottom:4px;">${c.flag} ${c.name}</div>
        <div style="display:flex;justify-content:space-between;color:#8b96a8;padding:2px 0;gap:16px;"><span>Exports (2025)</span><span style="color:#e8ecf3;font-family:ui-monospace,Menlo,monospace;">${c.exports}B</span></div>
        <div style="display:flex;justify-content:space-between;color:#8b96a8;padding:2px 0;gap:16px;"><span>Outflow</span><span style="color:#e8ecf3;font-family:ui-monospace,Menlo,monospace;">${totalOut}B</span></div>
        <div style="display:flex;justify-content:space-between;color:#8b96a8;padding:2px 0;gap:16px;"><span>Inflow</span><span style="color:#e8ecf3;font-family:ui-monospace,Menlo,monospace;">${totalIn}B</span></div>
      `;
      tooltipEl.style.opacity = "1";
      moveTooltip(e);
    }
    function moveTooltip(e: MouseEvent) {
      tooltipEl.style.left = e.clientX + 14 + "px";
      tooltipEl.style.top = e.clientY + 14 + "px";
    }
    function hideTooltip() {
      tooltipEl.style.opacity = "0";
    }

    // Great-circle + shipments
    function interpolateGC(from: [number, number], to: [number, number], t: number): [number, number] {
      const toRad = Math.PI / 180, toDeg = 180 / Math.PI;
      const lat1 = from[1] * toRad, lon1 = from[0] * toRad;
      const lat2 = to[1] * toRad, lon2 = to[0] * toRad;
      const d = 2 * Math.asin(Math.sqrt(
        Math.sin((lat2 - lat1) / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin((lon2 - lon1) / 2) ** 2,
      ));
      if (d === 0) return from;
      const A = Math.sin((1 - t) * d) / Math.sin(d);
      const B = Math.sin(t * d) / Math.sin(d);
      const x = A * Math.cos(lat1) * Math.cos(lon1) + B * Math.cos(lat2) * Math.cos(lon2);
      const y = A * Math.cos(lat1) * Math.sin(lon1) + B * Math.cos(lat2) * Math.sin(lon2);
      const z = A * Math.sin(lat1) + B * Math.sin(lat2);
      return [Math.atan2(y, x) * toDeg, Math.atan2(z, Math.sqrt(x * x + y * y)) * toDeg];
    }

    let shipmentId = 0;
    const spawnAccum: Record<string, number> = {};

    function spawnShipment(flow: Flow) {
      const comm = COMMODITIES[flow.good];
      const origin = COUNTRIES[flow.from];
      const dest = COUNTRIES[flow.to];
      if (!comm || !origin || !dest) return;
      const glyph = comm.glyphs[origin.script] || comm.glyphs.en || "·";
      state.shipments.push({
        id: ++shipmentId,
        flow, comm, origin, dest, glyph,
        t: 0,
        duration: 3500 + Math.random() * 2500,
        start: performance.now(),
      });
    }

    function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

    function buildArcPath(flow: Flow) {
      const from = COUNTRIES[flow.from].coord;
      const to = COUNTRIES[flow.to].coord;
      const pts: (ReturnType<typeof projection> | null)[] = [];
      const N = 40;
      for (let i = 0; i <= N; i++) {
        const tt = i / N;
        const g = interpolateGC(from, to, tt);
        if (isFrontFacing(g)) pts.push(projection(g));
        else pts.push(null);
      }
      let d = "";
      let started = false;
      for (const p of pts) {
        if (p) {
          d += (started ? " L " : "M ") + p[0] + " " + p[1];
          started = true;
        } else {
          started = false;
        }
      }
      return d || "M0 0";
    }

    function pointAt(flow: Flow, tt: number) {
      const lonlat = interpolateGC(COUNTRIES[flow.from].coord, COUNTRIES[flow.to].coord, tt);
      return { xy: projection(lonlat), lonlat };
    }

    function contrastColor(hex: string) {
      const c = d3.color(hex)?.rgb();
      if (!c) return "#fff";
      const lum = 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
      return lum > 150 ? "#0a0e17" : "#fff";
    }

    function renderShipments() {
      const arcMap = new Map<string, ArcDatum>();
      for (const s of state.shipments) {
        const key = s.flow.from + "-" + s.flow.to + "-" + s.flow.good;
        if (!arcMap.has(key)) arcMap.set(key, { flow: s.flow, comm: s.comm, ships: [] });
        arcMap.get(key)!.ships.push(s);
      }

      const arcs = gArcs.selectAll<SVGPathElement, ArcDatum>("path.arc")
        .data([...arcMap.values()], (d) => d.flow.from + d.flow.to + d.flow.good);
      arcs.enter().append("path").attr("class", "arc")
        .attr("fill", "none")
        .attr("stroke-linecap", "round")
        .merge(arcs)
        .attr("d", (d) => buildArcPath(d.flow))
        .attr("stroke", (d) => d.comm.color)
        .attr("stroke-opacity", 0.22)
        .attr("stroke-width", (d) => Math.max(0.5, Math.log(d.flow.value) / 6));
      arcs.exit().remove();

      const flat = state.shipments.map((s) => ({ s, pt: pointAt(s.flow, easeInOut(s.t)) }))
        .filter((d) => d.pt.xy && isFrontFacing(d.pt.lonlat));

      const style = state.arcStyle;
      const showMarkers = style === "glyph" || style === "icon" || style === "both";
      // Marker size scales with globe radius. At radius ~336 (desktop) → ~6px,
      // at radius ~168 (mobile) → ~3px.
      const markerR = Math.max(2.5, radius / 56);
      const iconScale = markerR / 18;
      const iconTranslate = -12 * iconScale;
      const markers = gShipments.selectAll<SVGGElement, { s: Shipment; pt: { xy: [number, number] | null; lonlat: [number, number] } }>("g.ship")
        .data(showMarkers ? flat : [], (d) => String(d.s.id));
      const mEnter = markers.enter().append("g").attr("class", "ship");
      mEnter.append("circle").attr("fill-opacity", 0.95);
      mEnter.append("text").attr("text-anchor", "middle").attr("dominant-baseline", "central")
        .attr("font-weight", 600);
      mEnter.append("g").attr("class", "icon");

      markers.merge(mEnter)
        .attr("transform", (d) => `translate(${d.pt.xy![0]},${d.pt.xy![1]})`)
        .each(function (d) {
          const g = d3.select(this);
          const op = 0.3 + Math.sin(d.s.t * Math.PI) * 0.7;
          const useIcon = state.arcStyle === "icon";
          g.select("circle")
            .attr("fill", d.s.comm.color)
            .attr("opacity", op)
            .attr("r", useIcon ? markerR : markerR * 0.9);
          g.select("text").attr("font-size", Math.max(6, markerR * 0.9));
          g.select("g.icon").attr("transform", `translate(${iconTranslate},${iconTranslate}) scale(${iconScale})`);
          if (useIcon) {
            g.select("text").text("").attr("opacity", 0);
            const iconG = g.select("g.icon");
            if (iconG.attr("data-cm") !== d.s.flow.good) {
              iconG.html(COMMODITY_ICONS[d.s.flow.good] || "");
              iconG.attr("data-cm", d.s.flow.good);
            }
            iconG.attr("color", contrastColor(d.s.comm.color)).attr("opacity", op);
          } else {
            g.select("g.icon").attr("opacity", 0);
            g.select("text")
              .text(d.s.glyph)
              .attr("fill", contrastColor(d.s.comm.color))
              .attr("opacity", op);
          }
        });
      markers.exit().remove();

      const dotR = Math.max(1.2, radius / 140);
      const dots = gShipments.selectAll<SVGCircleElement, { s: Shipment; pt: { xy: [number, number] | null; lonlat: [number, number] } }>("circle.pdot")
        .data(style === "glyph" || style === "icon" ? [] : flat, (d) => String(d.s.id));
      dots.enter().append("circle").attr("class", "pdot")
        .merge(dots)
        .attr("cx", (d) => d.pt.xy![0]).attr("cy", (d) => d.pt.xy![1])
        .attr("r", dotR)
        .attr("fill", (d) => d.s.comm.color)
        .attr("opacity", (d) => 0.4 + Math.sin(d.s.t * Math.PI) * 0.6);
      dots.exit().remove();
    }

    // Animation loop
    let lastTime = performance.now();
    function tick(now: number) {
      const dt = Math.min(60, now - lastTime);
      lastTime = now;

      state.rot[0] += state.autoSpin * dt / 16;
      projection.rotate(state.rot);

      gSphere.select("path").attr("d", pathGen as unknown as string);
      gGraticule.select("path").attr("d", pathGen as unknown as string);
      if (worldLand) gLand.select("path.land").attr("d", pathGen as unknown as string);
      if (worldBorders) gLand.select("path.borders").attr("d", pathGen as unknown as string);
      if (worldCoast) gLand.select("path.coast").attr("d", pathGen as unknown as string);

      gCountries.selectAll<SVGGElement, [string, Country]>("g.cdot").each(function (d) {
        const [, c] = d;
        const p = projection(c.coord);
        const visible = isFrontFacing(c.coord);
        d3.select(this)
          .attr("transform", p ? `translate(${p[0]},${p[1]})` : null)
          .attr("display", visible ? null : "none");
      });

      for (const flow of state.flowsSource) {
        if (state.disabled.has(flow.good)) continue;
        const key = flow.from + flow.to + flow.good;
        const rate = flow.rate * state.density * state.flowSpeedMul * 0.55;
        spawnAccum[key] = (spawnAccum[key] || 0) + rate * dt / 1000;
        while (spawnAccum[key] >= 1) {
          spawnShipment(flow);
          spawnAccum[key] -= 1;
        }
      }

      const alive: Shipment[] = [];
      for (const s of state.shipments) {
        s.t = (now - s.start) / (s.duration / state.flowSpeedMul);
        if (s.t < 1) alive.push(s);
      }
      state.shipments = alive;

      renderShipments();

      if (propsRef.current.onStats) {
        const totalRate = state.flowsSource.reduce((a, f) => state.disabled.has(f.good) ? a : a + f.value, 0);
        propsRef.current.onStats({
          shipmentsLive: alive.length,
          usdPerSec: totalRate * 1e9 / 365 / 86400,
        });
      }

      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    // Pointer events — works for mouse, touch, and pen in one path.
    // Left-button / single-finger drag = rotate. Middle-button drag = vertical pan.
    // Scroll / pinch-equivalent = zoom via wheel.
    // activePointerId claims the gesture so additional touches don't steal it.
    let drag: { x: number; y: number; rot: [number, number, number]; spin: number } | null = null;
    let pan: { y: number; panY: number } | null = null;
    let activePointerId: number | null = null;
    // For pinch-to-zoom: track secondary pointer for 2-finger gestures.
    const activePointers = new Map<number, { x: number; y: number }>();
    let pinchStartDist = 0;
    let pinchStartRadius = 0;

    function cancelDrag() {
      if (drag) { state.autoSpin = drag.spin; drag = null; }
    }
    function cancelPan() { pan = null; }
    function releaseActive() {
      activePointerId = null;
      cancelDrag();
      cancelPan();
    }

    function onPointerDown(e: PointerEvent) {
      activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      // Two fingers now down → start pinch zoom, cancel any active drag.
      if (activePointers.size === 2) {
        const pts = Array.from(activePointers.values());
        pinchStartDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        pinchStartRadius = radius;
        cancelDrag();
        cancelPan();
        activePointerId = null;
        return;
      }

      if (activePointerId !== null) return;

      if (e.button === 1) {
        // Middle-click (mouse only): vertical pan.
        e.preventDefault();
        pan = { y: e.clientY, panY: state.panY };
        activePointerId = e.pointerId;
        return;
      }
      if (e.button !== 0) return;
      drag = { x: e.clientX, y: e.clientY, rot: [...state.rot], spin: state.autoSpin };
      state.autoSpin = 0;
      activePointerId = e.pointerId;
      try { svgEl!.setPointerCapture(e.pointerId); } catch {}
    }

    function onPointerMove(e: PointerEvent) {
      if (activePointers.has(e.pointerId)) {
        activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      }

      // Pinch zoom — two simultaneous pointers
      if (activePointers.size === 2) {
        const pts = Array.from(activePointers.values());
        const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        if (pinchStartDist > 0) {
          const ratio = dist / pinchStartDist;
          radius = Math.max(180, Math.min(800, pinchStartRadius * ratio));
          projection.scale(radius);
          updateSpatial();
        }
        return;
      }

      if (e.pointerId !== activePointerId) return;

      if (pan) {
        state.panY = pan.panY + (e.clientY - pan.y);
        projection.translate([width / 2, height / 2 + state.panY]);
        updateSpatial();
        return;
      }
      if (!drag) return;
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      state.rot[0] = drag.rot[0] + dx * 0.4;
      state.rot[1] = Math.max(-85, Math.min(85, drag.rot[1] - dy * 0.3));
      projection.rotate(state.rot);
    }

    function onPointerUp(e: PointerEvent) {
      activePointers.delete(e.pointerId);
      if (activePointers.size < 2) {
        pinchStartDist = 0;
      }
      if (e.pointerId !== activePointerId) return;
      activePointerId = null;
      if (e.button === 1) { cancelPan(); return; }
      if (pan) { cancelPan(); return; }
      cancelDrag();
    }

    function onContextMenu() { releaseActive(); }
    function onBlur() { activePointers.clear(); pinchStartDist = 0; releaseActive(); }
    function onWheel(e: WheelEvent) {
      e.preventDefault();
      radius = Math.max(180, Math.min(800, radius + (e.deltaY < 0 ? 25 : -25)));
      projection.scale(radius);
      updateSpatial();
    }

    svgEl.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    svgEl.addEventListener("contextmenu", onContextMenu);
    window.addEventListener("blur", onBlur);
    svgEl.addEventListener("wheel", onWheel, { passive: false });
    svgEl.addEventListener("auxclick", (e) => { if ((e as MouseEvent).button === 1) (e as MouseEvent).preventDefault(); });

    // Focus animation
    function focusCountry(code: string) {
      const c = COUNTRIES[code];
      if (!c) return;
      const start: [number, number, number] = [...state.rot];
      const target: [number, number, number] = [-c.coord[0], state.rot[1], state.rot[2]];
      const t0 = performance.now();
      const dur = 900;
      state.autoSpin = 0;
      (function anim() {
        const p = Math.min(1, (performance.now() - t0) / dur);
        const e = easeInOut(p);
        state.rot[0] = start[0] + (target[0] - start[0]) * e;
        state.rot[1] = start[1] + (target[1] - start[1]) * e;
        projection.rotate(state.rot);
        if (p < 1) requestAnimationFrame(anim);
        else setTimeout(() => { state.autoSpin = (propsRef.current.rotationSpeed ?? 0.04) * 0.5; }, 1200);
      })();
    }

    // React to prop changes via a MutationObserver-like effect
    // We poll propsRef each frame in the tick; but for focus we set a derived signal:
    let lastFocus = propsRef.current.focusIso ?? null;
    let lastDisabledKey = JSON.stringify(Array.from(state.disabled).sort());
    let lastThemeName = state.themeName;
    let lastBorderStyle = state.borderStyle;
    const propsPoll = setInterval(() => {
      const p = propsRef.current;
      if ((p.focusIso ?? null) !== lastFocus) {
        lastFocus = p.focusIso ?? null;
        if (lastFocus) focusCountry(lastFocus);
      }
      const nextDisabled = Array.from(p.disabledCommodities ?? []).sort();
      const key = JSON.stringify(nextDisabled);
      if (key !== lastDisabledKey) {
        lastDisabledKey = key;
        state.disabled = new Set(nextDisabled);
      }
      if ((p.theme ?? "ink") !== lastThemeName) {
        lastThemeName = (p.theme ?? "ink") as ThemeName;
        state.themeName = lastThemeName;
        renderStatic();
        updateGlobe();
      }
      const nextBorderStyle = (p.borderStyle ?? "default") as BorderStyle;
      if (nextBorderStyle !== lastBorderStyle) {
        lastBorderStyle = nextBorderStyle;
        state.borderStyle = nextBorderStyle;
        updateGlobe();
      }
      state.arcStyle = (p.arcStyle ?? state.arcStyle) as ArcStyle;
      if (typeof p.rotationSpeed === "number") state.autoSpin = p.rotationSpeed;
      state.flowSpeedMul = p.flowSpeedMul ?? state.flowSpeedMul;
      state.density = p.density ?? state.density;
      if (p.flows && p.flows !== state.flowsSource) state.flowsSource = p.flows;
    }, 120) as unknown as { [k: string]: unknown } & number;

    // Resize observer
    const ro = new ResizeObserver(() => {
      sizeStage();
      renderStatic();
      updateSpatial();
      updateGlobe();
    });
    ro.observe(wrap);

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(propsPoll as unknown as number);
      ro.disconnect();
      svgEl.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      svgEl.removeEventListener("contextmenu", onContextMenu);
      window.removeEventListener("blur", onBlur);
      svgEl.removeEventListener("wheel", onWheel);
      tooltipEl.remove();
      svg.selectAll("*").remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrapRef} className={props.className ?? "relative w-full h-full"}>
      <svg
        ref={svgRef}
        style={{ cursor: "grab", display: "block", touchAction: "none", userSelect: "none", WebkitUserSelect: "none" }}
        onMouseDown={(e) => { (e.currentTarget.style.cursor = "grabbing"); }}
        onMouseUp={(e) => { (e.currentTarget.style.cursor = "grab"); }}
      />
    </div>
  );
}
