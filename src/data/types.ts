export type ISO2 = string;
export type CommoditySlug =
  // Legitimate
  | "electronics"
  | "autos"
  | "oil"
  | "textiles"
  | "food"
  | "minerals"
  | "pharma"
  | "machinery"
  // Illicit
  | "narcotics"
  | "smuggled-electronics"
  | "smuggled-arms"
  | "illicit-oil"
  | "counterfeits"
  | "human-trafficking"
  | "wildlife"
  | "e-waste"
  | "antiquities"
  | "iff"
  // Crypto
  | "stablecoins"
  | "bitcoin"
  | "crypto-defi";

export type FlowCategory = "legitimate" | "illicit" | "crypto";
export type Confidence = "high" | "medium" | "estimate";

export type Country = {
  name: string;
  coord: [number, number];
  script: string;
  flag: string;
  exports: number;
};

export type Commodity = {
  label: string;
  color: string;
  glyphs: Record<string, string>;
};

export type Flow = {
  from: ISO2;
  to: ISO2;
  good: CommoditySlug;
  value: number;
  rate: number;
  category?: FlowCategory;
  confidence?: Confidence;
  source?: string;
  note?: string;
};

export type Theme = {
  ocean: string;
  oceanEdge: string;
  land: string;
  landEdge: string;
  graticule: string;
};
