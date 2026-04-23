export * from "./types";
export { COUNTRIES } from "./countries";
export { COMMODITIES, COMMODITY_ICONS, THEMES } from "./commodities";
export type { ThemeName } from "./commodities";
export { FLOWS } from "./flows";
export { FLOWS_ILLICIT } from "./flows-illicit";
export { FLOWS_CRYPTO } from "./flows-crypto";

import { COUNTRIES } from "./countries";
import { FLOWS } from "./flows";
import { FLOWS_ILLICIT } from "./flows-illicit";
import { FLOWS_CRYPTO } from "./flows-crypto";
import type { CommoditySlug } from "./types";

export type FlowMode = "legit" | "illicit" | "crypto" | "all";

export const ILLICIT_COMMODITIES: CommoditySlug[] = [
  "narcotics",
  "smuggled-electronics",
  "smuggled-arms",
  "illicit-oil",
  "counterfeits",
  "human-trafficking",
  "wildlife",
  "e-waste",
  "antiquities",
  "iff",
];

export const CRYPTO_COMMODITIES: CommoditySlug[] = [
  "stablecoins",
  "bitcoin",
  "crypto-defi",
];

export function isIllicitCommodity(s: CommoditySlug): boolean {
  return ILLICIT_COMMODITIES.includes(s);
}

export function isCryptoCommodity(s: CommoditySlug): boolean {
  return CRYPTO_COMMODITIES.includes(s);
}

export function flowsForMode(mode: FlowMode) {
  if (mode === "legit") return FLOWS;
  if (mode === "illicit") return FLOWS_ILLICIT;
  if (mode === "crypto") return FLOWS_CRYPTO;
  return [...FLOWS, ...FLOWS_ILLICIT, ...FLOWS_CRYPTO];
}

export function corridorId(from: string, to: string, good: string) {
  return `${from}-${to}-${good}`.toLowerCase();
}

export function parseCorridorId(id: string) {
  const [from, to, good] = id.toUpperCase().split("-");
  return { from, to, good: good?.toLowerCase() };
}

export function topCorridors(limit = 20) {
  const agg = new Map<string, { from: string; to: string; value: number }>();
  for (const f of FLOWS) {
    const k = `${f.from}-${f.to}`;
    const cur = agg.get(k) || { from: f.from, to: f.to, value: 0 };
    cur.value += f.value;
    agg.set(k, cur);
  }
  return [...agg.values()].sort((a, b) => b.value - a.value).slice(0, limit);
}

export function flowsForCountry(iso: string) {
  const outflow = FLOWS.filter((f) => f.from === iso);
  const inflow = FLOWS.filter((f) => f.to === iso);
  return { outflow, inflow };
}

export function flowsForCommodity(good: string) {
  return FLOWS.filter((f) => f.good === good);
}

export function countryExists(iso: string) {
  return Boolean(COUNTRIES[iso]);
}
