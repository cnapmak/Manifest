import type { Flow } from "./types";

// Illicit trade corridors.
// Values in billion USD / year. ALL ILLICIT FIGURES ARE ESTIMATES.
// Every row carries a confidence tier and a source. See /methods.
//
// Primary sources:
// - UNODC World Drug Report 2023/2024
// - Small Arms Survey + C4ADS trafficking atlases
// - OECD/EUIPO counterfeit trade reports
// - OFAC + Global Witness on sanctioned oil flows
// - GI-TOC (Global Initiative Against Transnational Organized Crime)
//
// These are seed values. Phase D will pull cited ranges and refine.
const RAW_ILLICIT: Flow[] = [
  // === NARCOTICS ===
  // Cocaine — Andean producers → consumer markets
  { from: "CO", to: "US", good: "narcotics", value: 35, rate: 1.8, confidence: "estimate", source: "UNODC 2024; US DEA", note: "Cocaine wholesale-to-US-border value" },
  { from: "CO", to: "MX", good: "narcotics", value: 12, rate: 1.2, confidence: "estimate", source: "UNODC 2024", note: "Transit via Mexican cartels" },
  { from: "PE", to: "BR", good: "narcotics", value:  6, rate: 0.8, confidence: "estimate", source: "UNODC 2024" },
  { from: "PE", to: "US", good: "narcotics", value:  4, rate: 0.6, confidence: "estimate", source: "UNODC 2024" },
  { from: "BO", to: "BR", good: "narcotics", value:  3, rate: 0.6, confidence: "estimate", source: "UNODC 2024" },
  { from: "EC", to: "NL", good: "narcotics", value:  5, rate: 0.7, confidence: "estimate", source: "Europol 2024", note: "Guayaquil → Rotterdam, banana-box concealment" },
  { from: "CO", to: "ES", good: "narcotics", value:  4, rate: 0.6, confidence: "estimate", source: "Europol 2024" },
  { from: "BR", to: "PT", good: "narcotics", value:  3, rate: 0.5, confidence: "estimate", source: "Europol 2024", note: "Cocaine re-export to Iberian Peninsula" },
  // Heroin / opiates
  { from: "AF", to: "IR", good: "narcotics", value:  6, rate: 0.7, confidence: "estimate", source: "UNODC Afghan Opium Survey 2024" },
  { from: "AF", to: "PK", good: "narcotics", value:  4, rate: 0.6, confidence: "estimate", source: "UNODC 2024" },
  { from: "MM", to: "CN", good: "narcotics", value:  3, rate: 0.5, confidence: "estimate", source: "UNODC SE Asia 2024", note: "Golden Triangle methamphetamine" },
  { from: "MM", to: "TH", good: "narcotics", value:  2, rate: 0.5, confidence: "estimate", source: "UNODC 2024" },
  // Synthetics
  { from: "MX", to: "US", good: "narcotics", value: 20, rate: 1.5, confidence: "estimate", source: "US DEA 2024", note: "Fentanyl + methamphetamine" },
  { from: "CN", to: "MX", good: "narcotics", value:  4, rate: 0.6, confidence: "estimate", source: "US DEA 2024", note: "Fentanyl precursors" },
  { from: "IN", to: "MX", good: "narcotics", value:  2, rate: 0.5, confidence: "estimate", source: "US DEA 2024", note: "Alternate precursor source" },
  // Cannabis (legal grey zones ignored; commercial illicit only)
  { from: "MA", to: "ES", good: "narcotics", value:  3, rate: 0.6, confidence: "estimate", source: "Europol 2024", note: "Hashish" },

  // === SMUGGLED ELECTRONICS ===
  // Mostly undervaluation, transshipment through hubs, sanctions evasion on dual-use chips
  { from: "CN", to: "RU", good: "smuggled-electronics", value: 12, rate: 1.0, confidence: "estimate", source: "KSE + RUSI 2024", note: "Post-2022 dual-use components" },
  { from: "HK", to: "RU", good: "smuggled-electronics", value:  8, rate: 0.8, confidence: "estimate", source: "C4ADS 2024" },
  { from: "AE", to: "RU", good: "smuggled-electronics", value:  6, rate: 0.7, confidence: "estimate", source: "Yale SOM 2024", note: "Dubai transshipment" },
  { from: "TR", to: "RU", good: "smuggled-electronics", value:  4, rate: 0.6, confidence: "estimate", source: "RUSI 2024" },
  { from: "KZ", to: "RU", good: "smuggled-electronics", value:  5, rate: 0.6, confidence: "estimate", source: "FT/RUSI 2024", note: "Parallel imports" },
  { from: "AM", to: "RU", good: "smuggled-electronics", value:  2, rate: 0.5, confidence: "estimate", source: "KSE 2024" },
  { from: "CN", to: "IR", good: "smuggled-electronics", value:  4, rate: 0.6, confidence: "estimate", source: "C4ADS 2024" },
  { from: "HK", to: "IR", good: "smuggled-electronics", value:  2, rate: 0.5, confidence: "estimate", source: "C4ADS 2024" },
  // Counterfeit consumer electronics
  { from: "CN", to: "US", good: "smuggled-electronics", value:  6, rate: 0.7, confidence: "estimate", source: "OECD/EUIPO 2023", note: "Counterfeit-seized equivalent" },
  { from: "CN", to: "DE", good: "smuggled-electronics", value:  4, rate: 0.6, confidence: "estimate", source: "OECD/EUIPO 2023" },

  // === SMUGGLED ARMS ===
  // Small arms and light weapons (SALW)
  { from: "US", to: "MX", good: "smuggled-arms", value:  1.2, rate: 0.5, confidence: "estimate", source: "ATF + GAO 2023", note: "~200k firearms/yr southbound" },
  { from: "RU", to: "UA", good: "smuggled-arms", value:  0.5, rate: 0.4, confidence: "estimate", source: "Small Arms Survey 2024", note: "Cross-line smuggling both ways" },
  { from: "KP", to: "RU", good: "smuggled-arms", value:  3.0, rate: 0.5, confidence: "estimate", source: "US + ROK intel 2024", note: "DPRK→RU munitions" },
  { from: "IR", to: "RU", good: "smuggled-arms", value:  2.0, rate: 0.5, confidence: "estimate", source: "US Treasury 2024", note: "UAVs and components" },
  { from: "TR", to: "LY", good: "smuggled-arms", value:  0.3, rate: 0.3, confidence: "estimate", source: "UN Panel of Experts" },
  { from: "RS", to: "LY", good: "smuggled-arms", value:  0.2, rate: 0.3, confidence: "estimate", source: "SIPRI 2023" },
  { from: "US", to: "HT", good: "smuggled-arms", value:  0.1, rate: 0.3, confidence: "estimate", source: "BINUH/UNODC 2024" },
  { from: "BA", to: "BE", good: "smuggled-arms", value:  0.1, rate: 0.3, confidence: "estimate", source: "Flemish Peace Inst. 2023", note: "Balkan gun trail" },
  { from: "LY", to: "ML", good: "smuggled-arms", value:  0.2, rate: 0.3, confidence: "estimate", source: "UN Sahel 2023" },

  // === ILLICIT OIL ===
  // Sanctioned exports, shadow fleet, theft-siphoning
  { from: "RU", to: "IN", good: "illicit-oil", value: 30, rate: 1.4, confidence: "medium", source: "KSE Price Cap Tracker 2024", note: "Cap-violating shipments component" },
  { from: "RU", to: "CN", good: "illicit-oil", value: 45, rate: 1.6, confidence: "medium", source: "KSE 2024", note: "Shadow-fleet & cap-violating share" },
  { from: "RU", to: "TR", good: "illicit-oil", value: 10, rate: 0.9, confidence: "estimate", source: "KSE 2024" },
  { from: "IR", to: "CN", good: "illicit-oil", value: 35, rate: 1.5, confidence: "medium", source: "Kpler + UANI 2024", note: "Sanctioned Iranian crude → 'teapot' refiners" },
  { from: "IR", to: "SY", good: "illicit-oil", value:  2, rate: 0.4, confidence: "estimate", source: "UANI 2024" },
  { from: "VE", to: "CN", good: "illicit-oil", value:  8, rate: 0.8, confidence: "medium", source: "Reuters/OFAC 2024" },
  { from: "VE", to: "IN", good: "illicit-oil", value:  3, rate: 0.5, confidence: "estimate", source: "Kpler 2024" },
  { from: "LY", to: "MT", good: "illicit-oil", value:  1, rate: 0.4, confidence: "estimate", source: "GI-TOC 2023", note: "Eastern Libya fuel smuggling ring" },
  { from: "NG", to: "CI", good: "illicit-oil", value:  2, rate: 0.4, confidence: "estimate", source: "NEITI 2023", note: "Crude theft / bunkering" },
];

export const FLOWS_ILLICIT: Flow[] = RAW_ILLICIT.map((f) => ({
  ...f,
  category: "illicit" as const,
}));
