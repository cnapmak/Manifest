import type { Flow } from "./types";

// Manifest trade flows — legitimate merchandise trade.
// Values: $B USD annualized, 2022-2024 multi-year average unless a single year
// is named in the source field. Reconstructed from UN Comtrade, OEC.world,
// Eurostat Comext, US Census FT-900, Statistics Canada, INEGI, China Customs
// (GACC), Korea KITA, Japan MoF, Taiwan MoF, Kpler/Vortexa for tanker-level
// energy, and the Energy Institute Statistical Review 2024.
//
// Commodity mapping (our slug → HS chapters):
//   electronics = HS 85 + HS 8471/8473 (computers)
//   machinery   = HS 84 less the computer subset
//   autos       = HS 87
//   oil         = HS 27 (mineral fuels, crude + refined + gas)
//   textiles    = HS 50-63 (textiles & apparel)
//   food        = HS 01-24 (animal, veg, prepared food, beverages)
//   minerals    = HS 25-26, 71 (part), 72-81 (base metals, ores)
//   pharma      = HS 30
//
// Source tags (inline per row):
//   "US Census 22-24"   — US bilateral goods totals, 2022-2024 average
//   "Comtrade 22-24"    — UN Comtrade HS 2-digit aggregates
//   "Eurostat 22-24"    — EU intra-/extra-EU bilateral goods (Comext)
//   "OEC 22-24"         — Observatory of Economic Complexity cleaned
//   "WTO Stats 22-24"   — WTO bilateral totals
//   "IEA 22-24" / "Kpler 22-24" — energy flows (tanker tracked when noted)
//   "GACC 22-24"        — China Customs General Administration mirror
//   "Mirror 22-24"      — partner-customs reconstruction (used for RU after
//                         March 2022, IR via Kpler/Vortexa, TM via GACC)
//
// rate = shipments/second spawn rate, scaled roughly with log(value).
// confidence: "high" = both sides report and agree; "medium" = single-source
//             or partner-share inferred; "estimate" = mirror/tanker-tracked.
const RAW: Flow[] = [

  // ==================== CHINA (origin) ====================
  // China 2022-2024 goods exports ~$3.45T. Top destinations: US, HK, JP, KR,
  // VN, DE. Aggregating $163B to US: smartphones $55B, laptops $58B, telecom
  // $22B, TVs/displays $18B, ICs $8B (US Census).
  { from: "CN", to: "US", good: "electronics", value: 163, rate: 3.5, source: "US Census 22-24 (HS85)", confidence: "high", note: "Smartphones $55B + laptops $58B + telecom $22B + TVs $18B + ICs $8B" },
  { from: "CN", to: "US", good: "machinery",   value:  95, rate: 2.4, source: "US Census 22-24 (HS84)", confidence: "high" },
  { from: "CN", to: "US", good: "textiles",    value:  60, rate: 1.8, source: "US Census 22-24 (HS50-63)", confidence: "high" },
  { from: "CN", to: "US", good: "autos",       value:  18, rate: 1.0, source: "US Census 22-24 (HS87)", confidence: "high" },
  { from: "CN", to: "US", good: "pharma",      value:  12, rate: 0.8, source: "US Census 22-24 (HS30)", confidence: "high" },
  { from: "CN", to: "US", good: "minerals",    value:  25, rate: 1.1, source: "US Census 22-24 (HS72-81)", confidence: "high" },

  // CN→HK is dominated by IC re-exports back to mainland CN — see /methods on
  // the Hong Kong entrepôt double-counting bias.
  { from: "CN", to: "HK", good: "electronics", value: 260, rate: 4.2, source: "GACC + HK CSD 22-24", confidence: "high", note: "Re-export hub: ICs $170B largely from TW/KR/JP origin" },
  { from: "CN", to: "HK", good: "machinery",   value:  30, rate: 1.2, source: "GACC + HK CSD 22-24", confidence: "high" },

  { from: "CN", to: "JP", good: "electronics", value: 130, rate: 3.0, source: "Comtrade 2023 / BOJ" },
  { from: "CN", to: "JP", good: "machinery",   value:  40, rate: 1.3, source: "Comtrade 2023" },
  { from: "CN", to: "JP", good: "textiles",    value:  18, rate: 0.9, source: "Comtrade 2023" },

  { from: "CN", to: "KR", good: "electronics", value: 100, rate: 2.5, source: "KITA 2023" },
  { from: "CN", to: "KR", good: "machinery",   value:  30, rate: 1.2, source: "KITA 2023" },

  { from: "CN", to: "DE", good: "electronics", value:  95, rate: 2.4, source: "Eurostat 2023" },
  { from: "CN", to: "DE", good: "machinery",   value:  45, rate: 1.4, source: "Eurostat 2023" },
  { from: "CN", to: "DE", good: "textiles",    value:  18, rate: 0.9, source: "Eurostat 2023" },

  { from: "CN", to: "NL", good: "electronics", value:  75, rate: 2.0, source: "Eurostat 2023", note: "Rotterdam entry port" },
  { from: "CN", to: "NL", good: "machinery",   value:  25, rate: 1.1, source: "Eurostat 2023" },

  { from: "CN", to: "GB", good: "electronics", value:  45, rate: 1.5, source: "HMRC 2023" },
  { from: "CN", to: "GB", good: "textiles",    value:  18, rate: 0.9, source: "HMRC 2023" },
  { from: "CN", to: "GB", good: "machinery",   value:  20, rate: 1.0, source: "HMRC 2023" },

  { from: "CN", to: "VN", good: "electronics", value: 135, rate: 2.9, source: "Comtrade 2023", note: "Components → Vietnam assembly" },
  { from: "CN", to: "VN", good: "machinery",   value:  30, rate: 1.2, source: "Comtrade 2023" },
  { from: "CN", to: "VN", good: "textiles",    value:  20, rate: 1.0, source: "Comtrade 2023", note: "Fabric → garment manufacturing" },

  { from: "CN", to: "IN", good: "electronics", value:  65, rate: 1.8, source: "Comtrade 2023" },
  { from: "CN", to: "IN", good: "machinery",   value:  65, rate: 1.8, source: "Comtrade 2023" },
  { from: "CN", to: "IN", good: "pharma",      value:   8, rate: 0.7, source: "Comtrade 2023", note: "APIs (active pharma ingredients)" },

  // China→Mexico surged from $65B (2020) to $90B (2024) feeding USMCA assembly
  // — one of the period's three structural shifts (China diversification).
  { from: "CN", to: "MX", good: "electronics", value:  50, rate: 1.5, source: "GACC + INEGI 22-24", confidence: "high", note: "Components into nearshoring assembly plants" },
  { from: "CN", to: "MX", good: "machinery",   value:  25, rate: 1.1, source: "GACC + INEGI 22-24", confidence: "high" },
  { from: "CN", to: "MX", good: "autos",       value:   8, rate: 0.7, source: "GACC + INEGI 22-24", confidence: "high", note: "BYD, MG, JAC vehicles" },

  // China→Russia civilian goods more than doubled post-2022 (e.g. cars from
  // $1.7B to $16B per GACC) as Russia replaced Western OEM imports.
  { from: "CN", to: "RU", good: "machinery",   value:  55, rate: 1.6, source: "GACC 22-24", confidence: "high", note: "Replacement of Western industrial machinery" },
  { from: "CN", to: "RU", good: "autos",       value:  16, rate: 0.9, source: "GACC 22-24", confidence: "high", note: "Chery/Geely/Haval — displaced VW/Renault/Toyota" },
  { from: "CN", to: "RU", good: "electronics", value:  40, rate: 1.4, source: "GACC 22-24", confidence: "high" },

  { from: "CN", to: "BR", good: "machinery",   value:  50, rate: 1.5, source: "Comtrade 2023" },
  { from: "CN", to: "BR", good: "electronics", value:  35, rate: 1.3, source: "Comtrade 2023" },

  { from: "CN", to: "AU", good: "electronics", value:  55, rate: 1.6, source: "Comtrade 2023" },
  { from: "CN", to: "AU", good: "machinery",   value:  30, rate: 1.2, source: "Comtrade 2023" },

  { from: "CN", to: "TH", good: "electronics", value:  45, rate: 1.5, source: "Comtrade 2023" },
  { from: "CN", to: "TH", good: "machinery",   value:  25, rate: 1.1, source: "Comtrade 2023" },
  { from: "CN", to: "ID", good: "machinery",   value:  40, rate: 1.4, source: "Comtrade 2023" },
  { from: "CN", to: "MY", good: "electronics", value:  50, rate: 1.5, source: "Comtrade 2023" },
  { from: "CN", to: "PH", good: "electronics", value:  25, rate: 1.0, source: "Comtrade 2023" },
  { from: "CN", to: "SG", good: "electronics", value:  60, rate: 1.7, source: "Comtrade 2023" },
  { from: "CN", to: "AE", good: "electronics", value:  40, rate: 1.4, source: "Comtrade 2023" },
  { from: "CN", to: "AE", good: "textiles",    value:  12, rate: 0.8, source: "Comtrade 2023" },
  { from: "CN", to: "TR", good: "electronics", value:  35, rate: 1.3, source: "Comtrade 2023" },
  { from: "CN", to: "SA", good: "machinery",   value:  20, rate: 1.0, source: "Comtrade 2023" },
  { from: "CN", to: "ZA", good: "machinery",   value:  22, rate: 1.0, source: "Comtrade 2023" },
  { from: "CN", to: "NG", good: "textiles",    value:  15, rate: 0.9, source: "Comtrade 2023" },
  { from: "CN", to: "EG", good: "machinery",   value:  12, rate: 0.8, source: "Comtrade 2023" },
  { from: "CN", to: "FR", good: "electronics", value:  40, rate: 1.4, source: "Eurostat 2023" },
  { from: "CN", to: "IT", good: "electronics", value:  35, rate: 1.3, source: "Eurostat 2023" },
  { from: "CN", to: "ES", good: "electronics", value:  22, rate: 1.0, source: "Eurostat 2023" },
  { from: "CN", to: "PL", good: "electronics", value:  30, rate: 1.2, source: "Eurostat 2023" },
  { from: "CN", to: "CA", good: "electronics", value:  45, rate: 1.5, source: "Stat Canada 2023" },
  { from: "CN", to: "CA", good: "textiles",    value:  14, rate: 0.8, source: "Stat Canada 2023" },
  { from: "CN", to: "AR", good: "machinery",   value:  12, rate: 0.8, source: "Comtrade 2023" },
  { from: "CN", to: "CL", good: "electronics", value:  15, rate: 0.9, source: "Comtrade 2023" },
  { from: "CN", to: "PK", good: "machinery",   value:  18, rate: 0.9, source: "Comtrade 2023" },

  // ==================== UNITED STATES (origin) ====================
  // US 2023 goods exports: $2.02T. Top: Canada, Mexico, China, Japan, UK, Germany, Korea
  { from: "US", to: "CA", good: "autos",       value:  58, rate: 1.7, source: "US Census 2023 (HS87)" },
  { from: "US", to: "CA", good: "machinery",   value:  60, rate: 1.7, source: "US Census 2023 (HS84)" },
  { from: "US", to: "CA", good: "oil",         value:  30, rate: 1.1, source: "US Census 2023 (HS27)" },
  { from: "US", to: "CA", good: "electronics", value:  40, rate: 1.4, source: "US Census 2023 (HS85)" },
  { from: "US", to: "CA", good: "pharma",      value:  18, rate: 0.9, source: "US Census 2023 (HS30)" },
  { from: "US", to: "CA", good: "food",        value:  25, rate: 1.0, source: "US Census 2023 (HS01-24)" },

  { from: "US", to: "MX", good: "machinery",   value:  42, rate: 1.4, source: "US Census 22-24 (HS84)", confidence: "high" },
  { from: "US", to: "MX", good: "electronics", value:  75, rate: 2.0, source: "US Census 22-24 (HS85)", confidence: "high" },
  { from: "US", to: "MX", good: "autos",       value:  35, rate: 1.3, source: "US Census 22-24 (HS87)", confidence: "high", note: "Auto parts into Mexican assembly (USMCA loop)" },
  { from: "US", to: "MX", good: "oil",         value:  37, rate: 1.3, source: "US Census 22-24 (HS27)", confidence: "high", note: "Refined petroleum (gasoline + diesel)" },
  { from: "US", to: "MX", good: "food",        value:  30, rate: 1.2, source: "US Census 22-24 (HS01-24)", confidence: "high" },
  { from: "US", to: "MX", good: "pharma",      value:  12, rate: 0.8, source: "US Census 22-24 (HS30)", confidence: "high" },

  { from: "US", to: "CN", good: "food",        value:  32, rate: 1.2, source: "US Census 2023 (HS01-24)", note: "Soybeans, meat, grains" },
  { from: "US", to: "CN", good: "machinery",   value:  18, rate: 0.9, source: "US Census 2023 (HS84)" },
  { from: "US", to: "CN", good: "pharma",      value:  10, rate: 0.7, source: "US Census 2023 (HS30)" },
  { from: "US", to: "CN", good: "electronics", value:  12, rate: 0.8, source: "US Census 2023 (HS85)" },
  { from: "US", to: "CN", good: "oil",         value:  25, rate: 1.1, source: "US Census 2023 (HS27)", note: "LNG + crude" },

  { from: "US", to: "JP", good: "machinery",   value:  11, rate: 0.8, source: "US Census 2023" },
  { from: "US", to: "JP", good: "food",        value:  14, rate: 0.8, source: "US Census 2023" },
  { from: "US", to: "JP", good: "pharma",      value:   7, rate: 0.7, source: "US Census 2023" },
  { from: "US", to: "JP", good: "oil",         value:   9, rate: 0.7, source: "US Census 2023" },

  { from: "US", to: "DE", good: "pharma",      value:  16, rate: 0.9, source: "US Census 2023" },
  { from: "US", to: "DE", good: "machinery",   value:  12, rate: 0.8, source: "US Census 2023" },
  { from: "US", to: "DE", good: "electronics", value:  14, rate: 0.8, source: "US Census 2023" },

  { from: "US", to: "GB", good: "pharma",      value:  10, rate: 0.7, source: "US Census 2023" },
  { from: "US", to: "GB", good: "machinery",   value:  12, rate: 0.8, source: "US Census 2023" },
  { from: "US", to: "GB", good: "oil",         value:  13, rate: 0.8, source: "US Census 2023" },

  { from: "US", to: "KR", good: "machinery",   value:  14, rate: 0.8, source: "US Census 2023" },
  { from: "US", to: "KR", good: "oil",         value:  16, rate: 0.9, source: "US Census 2023" },
  { from: "US", to: "KR", good: "electronics", value:  12, rate: 0.8, source: "US Census 2023" },

  { from: "US", to: "NL", good: "oil",         value:  28, rate: 1.1, source: "US Census 2023", note: "LNG + refined" },
  { from: "US", to: "NL", good: "electronics", value:  12, rate: 0.8, source: "US Census 2023" },

  { from: "US", to: "BR", good: "machinery",   value:  15, rate: 0.9, source: "US Census 2023" },
  { from: "US", to: "BR", good: "oil",         value:   8, rate: 0.7, source: "US Census 2023" },
  { from: "US", to: "IN", good: "machinery",   value:  10, rate: 0.8, source: "US Census 2023" },
  { from: "US", to: "IN", good: "oil",         value:  12, rate: 0.8, source: "US Census 2023" },
  { from: "US", to: "SG", good: "electronics", value:  15, rate: 0.9, source: "US Census 2023" },
  { from: "US", to: "TW", good: "machinery",   value:  10, rate: 0.7, source: "US Census 2023" },
  { from: "US", to: "AU", good: "machinery",   value:  14, rate: 0.8, source: "US Census 2023" },
  { from: "US", to: "AE", good: "machinery",   value:  10, rate: 0.7, source: "US Census 2023" },
  { from: "US", to: "SA", good: "machinery",   value:   9, rate: 0.7, source: "US Census 2023" },
  { from: "US", to: "IL", good: "electronics", value:  10, rate: 0.7, source: "US Census 2023" },
  { from: "US", to: "FR", good: "pharma",      value:   7, rate: 0.7, source: "US Census 2023" },
  { from: "US", to: "IT", good: "oil",         value:   6, rate: 0.6, source: "US Census 2023" },
  { from: "US", to: "CH", good: "pharma",      value:   6, rate: 0.6, source: "US Census 2023" },
  { from: "US", to: "CO", good: "oil",         value:   6, rate: 0.6, source: "US Census 2023" },
  { from: "US", to: "CL", good: "oil",         value:   7, rate: 0.6, source: "US Census 2023" },

  // ==================== GERMANY (origin) ====================
  // Germany 2022-2024 goods exports: $1.69T. Top: US, FR, NL, CN, PL, IT, GB.
  // To US: ~$32B premium cars + $27B pharma + $22B industrial machinery.
  { from: "DE", to: "US", good: "autos",       value:  32, rate: 1.2, source: "US Census + Destatis 22-24", confidence: "high", note: "VW, BMW, Mercedes-Benz, Porsche premium cars" },
  { from: "DE", to: "US", good: "machinery",   value:  22, rate: 1.0, source: "US Census + Destatis 22-24", confidence: "high" },
  { from: "DE", to: "US", good: "pharma",      value:  27, rate: 1.1, source: "US Census + Destatis 22-24", confidence: "high", note: "Bayer, Boehringer Ingelheim biologics" },
  { from: "DE", to: "US", good: "electronics", value:  20, rate: 1.0, source: "US Census + Destatis 22-24", confidence: "high" },

  { from: "DE", to: "FR", good: "autos",       value:  28, rate: 1.1, source: "Eurostat 2023" },
  { from: "DE", to: "FR", good: "machinery",   value:  22, rate: 1.0, source: "Eurostat 2023" },
  { from: "DE", to: "FR", good: "electronics", value:  18, rate: 0.9, source: "Eurostat 2023" },
  { from: "DE", to: "FR", good: "pharma",      value:  12, rate: 0.8, source: "Eurostat 2023" },

  { from: "DE", to: "NL", good: "machinery",   value:  35, rate: 1.3, source: "Eurostat 2023" },
  { from: "DE", to: "NL", good: "autos",       value:  20, rate: 1.0, source: "Eurostat 2023" },
  { from: "DE", to: "NL", good: "electronics", value:  20, rate: 1.0, source: "Eurostat 2023" },

  { from: "DE", to: "CN", good: "autos",       value:  34, rate: 1.2, source: "Destatis + GACC 22-24", confidence: "high", note: "$24B finished VW/BMW/MB cars + $10B auto parts" },
  { from: "DE", to: "CN", good: "machinery",   value:  18, rate: 0.9, source: "Destatis + GACC 22-24", confidence: "high" },
  { from: "DE", to: "CN", good: "pharma",      value:   8, rate: 0.7, source: "Destatis + GACC 22-24", confidence: "high" },

  { from: "DE", to: "PL", good: "machinery",   value:  25, rate: 1.1, source: "Eurostat 2023" },
  { from: "DE", to: "PL", good: "autos",       value:  20, rate: 1.0, source: "Eurostat 2023" },

  { from: "DE", to: "IT", good: "autos",       value:  20, rate: 1.0, source: "Eurostat 2023" },
  { from: "DE", to: "IT", good: "machinery",   value:  22, rate: 1.0, source: "Eurostat 2023" },

  { from: "DE", to: "GB", good: "autos",       value:  22, rate: 1.0, source: "HMRC 2023" },
  { from: "DE", to: "GB", good: "machinery",   value:  18, rate: 0.9, source: "HMRC 2023" },
  { from: "DE", to: "GB", good: "pharma",      value:  10, rate: 0.7, source: "HMRC 2023" },

  { from: "DE", to: "AT", good: "autos",       value:  15, rate: 0.9, source: "Eurostat 2023" },
  { from: "DE", to: "AT", good: "machinery",   value:  18, rate: 0.9, source: "Eurostat 2023" },
  { from: "DE", to: "BE", good: "autos",       value:  14, rate: 0.8, source: "Eurostat 2023" },
  { from: "DE", to: "BE", good: "machinery",   value:  15, rate: 0.9, source: "Eurostat 2023" },
  { from: "DE", to: "CZ", good: "machinery",   value:  16, rate: 0.9, source: "Eurostat 2023" },
  { from: "DE", to: "CZ", good: "autos",       value:  12, rate: 0.8, source: "Eurostat 2023" },
  { from: "DE", to: "ES", good: "autos",       value:  14, rate: 0.8, source: "Eurostat 2023" },
  { from: "DE", to: "CH", good: "machinery",   value:  14, rate: 0.8, source: "Eurostat 2023" },
  { from: "DE", to: "CH", good: "pharma",      value:  10, rate: 0.7, source: "Eurostat 2023" },
  { from: "DE", to: "SE", good: "autos",       value:   9, rate: 0.7, source: "Eurostat 2023" },
  { from: "DE", to: "TR", good: "machinery",   value:  10, rate: 0.7, source: "Eurostat 2023" },
  { from: "DE", to: "HU", good: "machinery",   value:  10, rate: 0.7, source: "Eurostat 2023" },
  { from: "DE", to: "DK", good: "machinery",   value:   8, rate: 0.6, source: "Eurostat 2023" },
  { from: "DE", to: "JP", good: "autos",       value:  12, rate: 0.8, source: "Destatis 2023" },
  { from: "DE", to: "KR", good: "autos",       value:  10, rate: 0.7, source: "Destatis 2023" },
  { from: "DE", to: "IN", good: "machinery",   value:   7, rate: 0.6, source: "Destatis 2023" },

  // ==================== JAPAN (origin) ====================
  // Japan 2023 goods exports: ~$717B. Top: US, China, Korea, Taiwan, Thailand, Germany, HK
  { from: "JP", to: "US", good: "autos",       value:  52, rate: 1.6, source: "US Census 2023 (HS87)" },
  { from: "JP", to: "US", good: "machinery",   value:  38, rate: 1.3, source: "US Census 2023" },
  { from: "JP", to: "US", good: "electronics", value:  25, rate: 1.1, source: "US Census 2023" },
  { from: "JP", to: "US", good: "pharma",      value:   5, rate: 0.6, source: "US Census 2023" },

  { from: "JP", to: "CN", good: "machinery",   value:  45, rate: 1.5, source: "BOJ 2023" },
  { from: "JP", to: "CN", good: "electronics", value:  35, rate: 1.3, source: "BOJ 2023" },
  { from: "JP", to: "CN", good: "autos",       value:  20, rate: 1.0, source: "BOJ 2023" },

  { from: "JP", to: "KR", good: "electronics", value:  25, rate: 1.1, source: "BOJ 2023" },
  { from: "JP", to: "KR", good: "machinery",   value:  20, rate: 1.0, source: "BOJ 2023" },

  { from: "JP", to: "TW", good: "electronics", value:  25, rate: 1.1, source: "BOJ 2023" },
  { from: "JP", to: "TW", good: "machinery",   value:  12, rate: 0.8, source: "BOJ 2023" },

  { from: "JP", to: "TH", good: "autos",       value:  20, rate: 1.0, source: "BOJ 2023" },
  { from: "JP", to: "TH", good: "machinery",   value:  15, rate: 0.9, source: "BOJ 2023" },

  { from: "JP", to: "DE", good: "autos",       value:  10, rate: 0.7, source: "Destatis 2023" },
  { from: "JP", to: "DE", good: "machinery",   value:   9, rate: 0.7, source: "Destatis 2023" },

  { from: "JP", to: "AU", good: "autos",       value:  13, rate: 0.8, source: "BOJ 2023" },
  { from: "JP", to: "VN", good: "machinery",   value:  12, rate: 0.8, source: "BOJ 2023" },
  { from: "JP", to: "SG", good: "electronics", value:   9, rate: 0.7, source: "BOJ 2023" },
  { from: "JP", to: "MX", good: "autos",       value:   8, rate: 0.6, source: "BOJ 2023", note: "Japanese OEM supplies" },
  { from: "JP", to: "IN", good: "autos",       value:   7, rate: 0.6, source: "BOJ 2023" },

  // ==================== SOUTH KOREA (origin) ====================
  // KR 2022-2024 goods exports: ~$650B. Top: CN, US, VN, JP, HK, IN, TW.
  // Memory + displays to CN total ~$73B per KITA 22-24.
  { from: "KR", to: "CN", good: "electronics", value:  73, rate: 1.9, source: "KR KITA + GACC 22-24", confidence: "high", note: "DRAM/NAND (Samsung/SK Hynix) + OLED panels (LG)" },
  { from: "KR", to: "CN", good: "machinery",   value:  25, rate: 1.1, source: "KR KITA 22-24", confidence: "high" },

  { from: "KR", to: "US", good: "autos",       value:  32, rate: 1.2, source: "US Census 2023 (HS87)", note: "Hyundai/Kia" },
  { from: "KR", to: "US", good: "electronics", value:  65, rate: 1.8, source: "US Census 2023" },
  { from: "KR", to: "US", good: "machinery",   value:  15, rate: 0.9, source: "US Census 2023" },

  { from: "KR", to: "VN", good: "electronics", value:  45, rate: 1.5, source: "KITA 2023", note: "Samsung Vietnam supply" },
  { from: "KR", to: "VN", good: "textiles",    value:  15, rate: 0.9, source: "KITA 2023" },

  { from: "KR", to: "JP", good: "electronics", value:  22, rate: 1.0, source: "KITA 2023" },
  { from: "KR", to: "JP", good: "oil",         value:  11, rate: 0.8, source: "KITA 2023" },

  { from: "KR", to: "HK", good: "electronics", value:  35, rate: 1.3, source: "KITA 2023" },
  { from: "KR", to: "TW", good: "electronics", value:  25, rate: 1.1, source: "KITA 2023" },
  { from: "KR", to: "IN", good: "machinery",   value:  12, rate: 0.8, source: "KITA 2023" },
  { from: "KR", to: "MX", good: "electronics", value:  10, rate: 0.7, source: "KITA 2023" },
  { from: "KR", to: "DE", good: "autos",       value:   9, rate: 0.7, source: "Destatis 2023" },

  // ==================== TAIWAN (origin) ====================
  // TW 2022-2024 goods exports: ~$440B. Direct TW→CN $47B per TW MoF + ~$40B
  // routed via HK entrepôt (origin double-counting noted in /methods).
  { from: "TW", to: "CN", good: "electronics", value:  47, rate: 1.5, source: "TW MoF 22-24", confidence: "high", note: "TSMC + UMC foundry — direct only; another ~$40B routes via HK" },
  { from: "TW", to: "US", good: "electronics", value:  70, rate: 1.9, source: "US Census 22-24", confidence: "high" },
  { from: "TW", to: "US", good: "machinery",   value:  15, rate: 0.9, source: "US Census 22-24", confidence: "high" },
  { from: "TW", to: "HK", good: "electronics", value:  40, rate: 1.4, source: "TW MoF + HK CSD 22-24", confidence: "high", note: "ICs re-exported to mainland CN via HK entrepôt" },
  { from: "TW", to: "JP", good: "electronics", value:  20, rate: 1.0, source: "JP MoF 22-24", confidence: "high" },
  { from: "TW", to: "SG", good: "electronics", value:  18, rate: 0.9, source: "Comtrade 22-24", confidence: "high" },
  { from: "TW", to: "KR", good: "electronics", value:  20, rate: 1.0, source: "KR KITA 22-24", confidence: "high" },
  { from: "TW", to: "MY", good: "electronics", value:  15, rate: 0.9, source: "Comtrade 22-24", confidence: "high" },
  { from: "TW", to: "VN", good: "electronics", value:  18, rate: 0.9, source: "Comtrade 22-24", confidence: "high" },
  { from: "TW", to: "DE", good: "electronics", value:  12, rate: 0.8, source: "Eurostat 22-24", confidence: "high" },

  // ==================== NETHERLANDS (origin, major transit hub) ====================
  // NL 2023 goods exports: ~$925B (includes large re-exports via Rotterdam)
  { from: "NL", to: "DE", good: "oil",         value:  55, rate: 1.6, source: "Eurostat 2023", note: "Refined products + transit" },
  { from: "NL", to: "DE", good: "machinery",   value:  35, rate: 1.3, source: "Eurostat 2023" },
  { from: "NL", to: "DE", good: "electronics", value:  30, rate: 1.2, source: "Eurostat 2023" },

  { from: "NL", to: "BE", good: "oil",         value:  40, rate: 1.4, source: "Eurostat 2023" },
  { from: "NL", to: "BE", good: "machinery",   value:  18, rate: 0.9, source: "Eurostat 2023" },
  { from: "NL", to: "FR", good: "oil",         value:  25, rate: 1.1, source: "Eurostat 2023" },
  { from: "NL", to: "FR", good: "machinery",   value:  15, rate: 0.9, source: "Eurostat 2023" },
  { from: "NL", to: "GB", good: "oil",         value:  20, rate: 1.0, source: "HMRC 2023" },
  { from: "NL", to: "GB", good: "machinery",   value:  12, rate: 0.8, source: "HMRC 2023" },
  { from: "NL", to: "IT", good: "machinery",   value:  10, rate: 0.7, source: "Eurostat 2023" },
  { from: "NL", to: "ES", good: "machinery",   value:   8, rate: 0.6, source: "Eurostat 2023" },
  { from: "NL", to: "US", good: "electronics", value:   3, rate: 0.5, source: "US Census 22-24", confidence: "high", note: "ASML lithography (€3.15B per ASML 2023 Annual Report)" },
  { from: "NL", to: "US", good: "machinery",   value:  12, rate: 0.8, source: "US Census 22-24", confidence: "high" },
  { from: "NL", to: "TW", good: "electronics", value:  18, rate: 0.9, source: "ASML AR 2023 + TW MoF 22-24", confidence: "high", note: "ASML EUV + DUV lithography to TSMC — most strategic single machinery flow" },
  { from: "NL", to: "CN", good: "electronics", value:   8, rate: 0.7, source: "GACC + ASML AR 22-24", confidence: "high", note: "ASML DUV (EUV blocked by Dutch export controls 2024)" },

  // ==================== UNITED KINGDOM (origin) ====================
  { from: "GB", to: "US", good: "machinery",   value:  16, rate: 0.9, source: "HMRC 2023" },
  { from: "GB", to: "US", good: "pharma",      value:  11, rate: 0.8, source: "HMRC 2023" },
  { from: "GB", to: "US", good: "autos",       value:   9, rate: 0.7, source: "HMRC 2023" },
  { from: "GB", to: "DE", good: "machinery",   value:  10, rate: 0.7, source: "Eurostat 2023" },
  { from: "GB", to: "DE", good: "pharma",      value:   8, rate: 0.6, source: "Eurostat 2023" },
  { from: "GB", to: "NL", good: "oil",         value:  15, rate: 0.9, source: "Eurostat 2023" },
  { from: "GB", to: "IE", good: "machinery",   value:   9, rate: 0.7, source: "Eurostat 2023" },
  { from: "GB", to: "FR", good: "autos",       value:   6, rate: 0.6, source: "Eurostat 2023" },
  { from: "GB", to: "CN", good: "autos",       value:  10, rate: 0.7, source: "HMRC 2023" },
  { from: "GB", to: "JP", good: "pharma",      value:   5, rate: 0.6, source: "HMRC 2023" },

  // ==================== FRANCE (origin) ====================
  { from: "FR", to: "DE", good: "autos",       value:  20, rate: 1.0, source: "Eurostat 2023" },
  { from: "FR", to: "DE", good: "machinery",   value:  18, rate: 0.9, source: "Eurostat 2023" },
  { from: "FR", to: "DE", good: "pharma",      value:  10, rate: 0.7, source: "Eurostat 2023" },
  { from: "FR", to: "US", good: "pharma",      value:  14, rate: 0.8, source: "US Census 2023" },
  { from: "FR", to: "US", good: "autos",       value:  10, rate: 0.7, source: "US Census 2023" },
  { from: "FR", to: "IT", good: "autos",       value:  12, rate: 0.8, source: "Eurostat 2023" },
  { from: "FR", to: "ES", good: "autos",       value:  12, rate: 0.8, source: "Eurostat 2023" },
  { from: "FR", to: "GB", good: "autos",       value:  10, rate: 0.7, source: "HMRC 2023" },
  { from: "FR", to: "BE", good: "machinery",   value:  10, rate: 0.7, source: "Eurostat 2023" },
  { from: "FR", to: "CN", good: "autos",       value:   9, rate: 0.7, source: "Comtrade 2023", note: "Airbus + luxury" },

  // ==================== ITALY (origin) ====================
  { from: "IT", to: "DE", good: "machinery",   value:  28, rate: 1.1, source: "Eurostat 2023" },
  { from: "IT", to: "DE", good: "autos",       value:  12, rate: 0.8, source: "Eurostat 2023" },
  { from: "IT", to: "FR", good: "machinery",   value:  20, rate: 1.0, source: "Eurostat 2023" },
  { from: "IT", to: "US", good: "machinery",   value:  18, rate: 0.9, source: "US Census 2023" },
  { from: "IT", to: "US", good: "pharma",      value:  15, rate: 0.9, source: "US Census 2023" },
  { from: "IT", to: "US", good: "textiles",    value:  12, rate: 0.8, source: "US Census 2023", note: "Luxury" },
  { from: "IT", to: "ES", good: "machinery",   value:  12, rate: 0.8, source: "Eurostat 2023" },
  { from: "IT", to: "GB", good: "autos",       value:  10, rate: 0.7, source: "HMRC 2023" },
  { from: "IT", to: "CH", good: "pharma",      value:   8, rate: 0.6, source: "Eurostat 2023" },

  // ==================== SPAIN (origin) ====================
  { from: "ES", to: "FR", good: "autos",       value:  22, rate: 1.0, source: "Eurostat 2023" },
  { from: "ES", to: "DE", good: "autos",       value:  18, rate: 0.9, source: "Eurostat 2023" },
  { from: "ES", to: "IT", good: "food",        value:  12, rate: 0.8, source: "Eurostat 2023" },
  { from: "ES", to: "PT", good: "autos",       value:   9, rate: 0.7, source: "Eurostat 2023" },
  { from: "ES", to: "GB", good: "autos",       value:   8, rate: 0.6, source: "HMRC 2023" },
  { from: "ES", to: "US", good: "food",        value:   6, rate: 0.6, source: "US Census 2023" },

  // ==================== OTHER EUROPE (origin) ====================
  { from: "BE", to: "DE", good: "pharma",      value:  25, rate: 1.1, source: "Eurostat 22-24", confidence: "high" },
  { from: "BE", to: "FR", good: "pharma",      value:  18, rate: 0.9, source: "Eurostat 22-24", confidence: "high" },
  { from: "BE", to: "US", good: "pharma",      value:  20, rate: 1.0, source: "US Census + Statbel 22-24", confidence: "high", note: "Janssen, UCB, Pfizer-Puurs (legacy COVID vaccines)" },
  { from: "BE", to: "NL", good: "pharma",      value:  15, rate: 0.9, source: "Eurostat 22-24", confidence: "high" },

  { from: "CH", to: "US", good: "pharma",      value:  31, rate: 1.2, source: "US Census + FOCBS 22-24", confidence: "high", note: "Roche, Novartis biologics" },
  { from: "CH", to: "DE", good: "pharma",      value:  28, rate: 1.1, source: "Eurostat 22-24", confidence: "high" },
  { from: "CH", to: "CN", good: "pharma",      value:  15, rate: 0.9, source: "GACC 22-24", confidence: "high" },
  { from: "CH", to: "JP", good: "pharma",      value:   8, rate: 0.6, source: "JP MoF 22-24", confidence: "high" },
  { from: "CH", to: "IT", good: "pharma",      value:  10, rate: 0.7, source: "Eurostat 22-24", confidence: "high" },
  { from: "CH", to: "IN", good: "minerals",    value:  13, rate: 0.8, source: "FOCBS + IN MoC 22-24", confidence: "high", note: "Refined gold (PAMP, MKS, Argor-Heraeus → MMTC)" },

  { from: "IE", to: "US", good: "pharma",      value:  40, rate: 1.4, source: "US Census + CSO Ireland 22-24", confidence: "medium", note: "Pfizer/MSD/Lilly biologics + GLP-1s; materially inflated by US-MNC transfer pricing — real value-add ~40-60%" },
  { from: "IE", to: "DE", good: "pharma",      value:  12, rate: 0.8, source: "Eurostat 22-24", confidence: "high" },
  { from: "IE", to: "GB", good: "pharma",      value:  10, rate: 0.7, source: "HMRC 22-24", confidence: "high" },

  { from: "AT", to: "DE", good: "machinery",   value:  20, rate: 1.0, source: "Eurostat 2023" },
  { from: "AT", to: "DE", good: "autos",       value:  12, rate: 0.8, source: "Eurostat 2023" },

  { from: "PL", to: "DE", good: "autos",       value:  22, rate: 1.0, source: "Eurostat 2023" },
  { from: "PL", to: "DE", good: "machinery",   value:  18, rate: 0.9, source: "Eurostat 2023" },
  { from: "PL", to: "FR", good: "autos",       value:  10, rate: 0.7, source: "Eurostat 2023" },
  { from: "PL", to: "CZ", good: "autos",       value:   7, rate: 0.6, source: "Eurostat 2023" },

  { from: "CZ", to: "DE", good: "autos",       value:  30, rate: 1.2, source: "Eurostat 2023", note: "Skoda + parts" },
  { from: "CZ", to: "DE", good: "machinery",   value:  18, rate: 0.9, source: "Eurostat 2023" },
  { from: "CZ", to: "SK", good: "autos",       value:  10, rate: 0.7, source: "Eurostat 2023" },

  { from: "SK", to: "DE", good: "autos",       value:  18, rate: 0.9, source: "Eurostat 2023" },
  { from: "HU", to: "DE", good: "autos",       value:  15, rate: 0.9, source: "Eurostat 2023" },
  { from: "HU", to: "DE", good: "electronics", value:  10, rate: 0.7, source: "Eurostat 2023" },
  { from: "RO", to: "DE", good: "autos",       value:  10, rate: 0.7, source: "Eurostat 2023" },

  { from: "SE", to: "DE", good: "machinery",   value:  12, rate: 0.8, source: "Eurostat 2023" },
  { from: "SE", to: "US", good: "autos",       value:  14, rate: 0.8, source: "US Census 2023", note: "Volvo" },
  { from: "SE", to: "NO", good: "machinery",   value:   8, rate: 0.6, source: "Eurostat 2023" },

  // Norway replaced Russia as the EU's #1 gas supplier post-2022 (~$60B
  // combined to DE/GB/FR/NL/BE) — one of the period's three structural shifts.
  { from: "NO", to: "GB", good: "oil",         value:  14, rate: 0.9, source: "HMRC + Gassco 22-24", confidence: "high", note: "North Sea pipeline gas" },
  { from: "NO", to: "DE", good: "oil",         value:  24, rate: 1.0, source: "Eurostat + Gassco 22-24", confidence: "high", note: "Pipeline gas — replaced Russian flows post-2022" },
  { from: "NO", to: "NL", good: "oil",         value:  10, rate: 0.8, source: "Eurostat 22-24", confidence: "high", note: "Pipeline gas via Emden landfall" },
  { from: "NO", to: "FR", good: "oil",         value:   7, rate: 0.7, source: "Eurostat 22-24", confidence: "high", note: "Pipeline gas via Dunkerque" },
  { from: "NO", to: "BE", good: "oil",         value:   8, rate: 0.7, source: "Eurostat 22-24", confidence: "high", note: "Pipeline gas via Zeebrugge" },

  { from: "DK", to: "DE", good: "pharma",      value:  12, rate: 0.8, source: "Eurostat 2023", note: "Novo Nordisk" },
  { from: "DK", to: "US", good: "pharma",      value:  25, rate: 1.1, source: "US Census 2023", note: "Ozempic surge" },

  { from: "FI", to: "DE", good: "machinery",   value:   8, rate: 0.6, source: "Eurostat 2023" },
  { from: "PT", to: "ES", good: "autos",       value:   8, rate: 0.6, source: "Eurostat 2023" },

  { from: "TR", to: "DE", good: "autos",       value:  12, rate: 0.8, source: "Eurostat 2023" },
  { from: "TR", to: "DE", good: "textiles",    value:   8, rate: 0.6, source: "Eurostat 2023" },
  { from: "TR", to: "GB", good: "autos",       value:   7, rate: 0.6, source: "HMRC 2023" },
  { from: "TR", to: "US", good: "textiles",    value:   8, rate: 0.6, source: "US Census 2023" },

  // ==================== RUSSIA (origin) ====================
  // Post-March-2022 customs blackout. All values are mirror-reconstructed from
  // partner GACC / Indian MoC / TurkStat / Eurostat / Kpler tanker tracking.
  // CN crude+gas $60B, IN crude $52B, TR energy+fertilizer $43B (CREA / KSE).
  { from: "RU", to: "CN", good: "oil",         value:  90, rate: 2.2, source: "Kpler + GACC mirror 22-24", confidence: "medium", note: "Crude $60B + ESPO + LNG; cap-violating share counted in illicit-oil" },
  { from: "RU", to: "IN", good: "oil",         value:  52, rate: 1.6, source: "Kpler + IN MoC mirror 22-24", confidence: "medium", note: "Urals/ESPO crude refined at Reliance Jamnagar" },
  { from: "RU", to: "TR", good: "oil",         value:  30, rate: 1.2, source: "TurkStat mirror 22-24", confidence: "medium", note: "STAR refinery + bunker fuel re-export" },
  { from: "RU", to: "CN", good: "minerals",    value:  15, rate: 0.9, source: "GACC mirror 22-24", confidence: "medium", note: "Coal, nickel, palladium" },
  { from: "RU", to: "TR", good: "food",        value:  10, rate: 0.7, source: "TurkStat mirror 22-24", confidence: "medium", note: "Wheat + fertilizer" },
  { from: "RU", to: "KZ", good: "oil",         value:   8, rate: 0.7, source: "KZ Bureau of Stats 22-24", confidence: "medium" },
  { from: "RU", to: "BY", good: "oil",         value:  12, rate: 0.8, source: "BY Belstat mirror 22-24", confidence: "medium" },
  { from: "RU", to: "HU", good: "oil",         value:   6, rate: 0.6, source: "Eurostat 22-24", confidence: "high", note: "Druzhba pipeline carve-out" },

  // ==================== SAUDI ARABIA & GULF (oil origins) ====================
  { from: "SA", to: "CN", good: "oil",         value:  52, rate: 1.6, source: "GACC + IEA 22-24", confidence: "high", note: "Largest single Middle-East energy corridor" },
  { from: "SA", to: "IN", good: "oil",         value:  32, rate: 1.2, source: "IN MoC + IEA 22-24", confidence: "high" },
  { from: "SA", to: "JP", good: "oil",         value:  35, rate: 1.3, source: "JP MoF + IEA 22-24", confidence: "high" },
  { from: "SA", to: "KR", good: "oil",         value:  32, rate: 1.2, source: "KR KITA + IEA 22-24", confidence: "high" },
  { from: "SA", to: "US", good: "oil",         value:  12, rate: 0.8, source: "US Census 22-24", confidence: "high" },
  { from: "SA", to: "AE", good: "oil",         value:   8, rate: 0.7, source: "Comtrade 22-24", confidence: "medium" },
  { from: "SA", to: "EG", good: "oil",         value:   8, rate: 0.7, source: "Comtrade 22-24", confidence: "medium" },

  { from: "AE", to: "IN", good: "oil",         value:  22, rate: 1.0, source: "IN MoC 22-24", confidence: "high" },
  { from: "AE", to: "IN", good: "minerals",    value:   9, rate: 0.7, source: "IN MoC 22-24", confidence: "high", note: "Gold (Dubai → IIBX/MMTC)" },
  { from: "AE", to: "JP", good: "oil",         value:  30, rate: 1.2, source: "JP MoF + IEA 22-24", confidence: "high" },
  { from: "AE", to: "KR", good: "oil",         value:  22, rate: 1.0, source: "KR KITA + IEA 22-24", confidence: "high" },
  { from: "AE", to: "CN", good: "oil",         value:  28, rate: 1.1, source: "GACC + IEA 22-24", confidence: "high" },
  { from: "AE", to: "TH", good: "oil",         value:   6, rate: 0.6, source: "IEA 22-24", confidence: "medium" },

  { from: "QA", to: "JP", good: "oil",         value:   8, rate: 0.7, source: "GIIGNL 22-24", confidence: "high", note: "LNG; cargo share declined as US LNG entered" },
  { from: "QA", to: "KR", good: "oil",         value:   9, rate: 0.7, source: "GIIGNL 22-24", confidence: "high", note: "LNG" },
  { from: "QA", to: "CN", good: "oil",         value:  14, rate: 0.9, source: "GIIGNL + GACC 22-24", confidence: "high", note: "LNG (long-term Sinopec contract)" },
  { from: "QA", to: "IN", good: "oil",         value:   4, rate: 0.5, source: "GIIGNL 22-24", confidence: "high", note: "LNG (Petronet)" },

  { from: "KW", to: "CN", good: "oil",         value:  20, rate: 1.0, source: "IEA + GACC 22-24", confidence: "high" },
  { from: "KW", to: "IN", good: "oil",         value:  12, rate: 0.8, source: "IN MoC 22-24", confidence: "high" },
  { from: "KW", to: "KR", good: "oil",         value:   9, rate: 0.7, source: "KR KITA 22-24", confidence: "high" },

  { from: "OM", to: "CN", good: "oil",         value:  22, rate: 1.0, source: "IEA + GACC 22-24", confidence: "high" },
  { from: "OM", to: "IN", good: "oil",         value:   8, rate: 0.7, source: "IN MoC 22-24", confidence: "high" },
  // Iran-CN flows: Chinese customs records as "Malaysia" origin per UANI/Kpler
  // tanker-tracking; treat as estimate. ~1.1-1.5M b/d at avg $80/bbl.
  { from: "IR", to: "CN", good: "oil",         value:  35, rate: 1.3, source: "Kpler/Vortexa tanker 22-24", confidence: "estimate", note: "Re-flagged via MY/RU; mirror-tracked. Some sanctioned share also in illicit-oil" },

  { from: "IQ", to: "IN", good: "oil",         value:  28, rate: 1.1, source: "IN MoC + IEA 22-24", confidence: "high" },
  { from: "IQ", to: "CN", good: "oil",         value:  36, rate: 1.3, source: "GACC + IEA 22-24", confidence: "high", note: "Basrah Heavy/Light to Sinopec/CNPC" },
  { from: "IQ", to: "US", good: "oil",         value:   5, rate: 0.6, source: "US Census 22-24", confidence: "high" },

  // ==================== CANADA (origin) ====================
  // Canada→US ~$440B total. Crude $110B is the single largest cross-border
  // energy flow on earth (Alberta WCS via Enbridge Mainline + TMX).
  { from: "CA", to: "US", good: "oil",         value: 110, rate: 2.5, source: "US Census 22-24 (HS27)", confidence: "high", note: "Alberta WCS crude — single largest energy corridor" },
  { from: "CA", to: "US", good: "autos",       value:  72, rate: 1.9, source: "US Census 22-24 (HS87)", confidence: "high", note: "$42B vehicles + $30B parts (Ontario/Michigan loop)" },
  { from: "CA", to: "US", good: "minerals",    value:  40, rate: 1.4, source: "US Census 22-24", confidence: "high" },
  { from: "CA", to: "US", good: "machinery",   value:  22, rate: 1.0, source: "US Census 22-24", confidence: "high" },
  { from: "CA", to: "US", good: "food",        value:  28, rate: 1.1, source: "US Census 22-24", confidence: "high" },
  { from: "CA", to: "US", good: "textiles",    value:  13, rate: 0.8, source: "US Census 22-24", confidence: "high", note: "Lumber/pulp/paper" },
  { from: "CA", to: "CN", good: "minerals",    value:  10, rate: 0.7, source: "Stat Canada 22-24", confidence: "high" },
  { from: "CA", to: "JP", good: "minerals",    value:   8, rate: 0.6, source: "Stat Canada 22-24", confidence: "high" },

  // ==================== MEXICO (origin) ====================
  // Mexico→US ~$478B (2023) — passed China as #1 US import source.
  { from: "MX", to: "US", good: "autos",       value: 125, rate: 2.6, source: "US Census 22-24 (HS87)", confidence: "high", note: "$55B cars + $42B parts + $28B trucks (USMCA)" },
  { from: "MX", to: "US", good: "electronics", value: 110, rate: 2.5, source: "US Census 22-24", confidence: "high", note: "$28B computers + $18B TVs + $35B electrical machinery" },
  { from: "MX", to: "US", good: "machinery",   value:  60, rate: 1.7, source: "US Census 22-24", confidence: "high" },
  { from: "MX", to: "US", good: "food",        value:  40, rate: 1.4, source: "US Census 22-24", confidence: "high", note: "Avocados, beer, tequila, fresh produce" },
  { from: "MX", to: "US", good: "oil",         value:  18, rate: 0.9, source: "US Census 22-24", confidence: "high", note: "Maya crude via Pemex" },
  { from: "MX", to: "US", good: "pharma",      value:   8, rate: 0.7, source: "US Census 22-24", confidence: "high" },
  { from: "MX", to: "CA", good: "autos",       value:  14, rate: 0.8, source: "Stat Canada 22-24", confidence: "high" },
  { from: "MX", to: "DE", good: "autos",       value:   8, rate: 0.6, source: "Eurostat 22-24", confidence: "high" },

  // ==================== BRAZIL (origin) ====================
  // China is BR's #1 partner: $35B soybeans + $20B iron ore + $19B crude + $6B beef.
  { from: "BR", to: "CN", good: "food",        value:  41, rate: 1.4, source: "SECEX + GACC 22-24", confidence: "high", note: "Soybeans $35B + beef $6B (Mato Grosso → Qingdao)" },
  { from: "BR", to: "CN", good: "minerals",    value:  20, rate: 1.0, source: "SECEX + GACC 22-24", confidence: "high", note: "Iron ore (Vale Carajás)" },
  { from: "BR", to: "CN", good: "oil",         value:  19, rate: 1.0, source: "SECEX + Kpler 22-24", confidence: "high", note: "Pre-salt crude (Petrobras → Sinopec)" },
  { from: "BR", to: "US", good: "food",        value:  18, rate: 0.9, source: "US Census 22-24", confidence: "high" },
  { from: "BR", to: "US", good: "minerals",    value:  12, rate: 0.8, source: "US Census 22-24", confidence: "high" },
  { from: "BR", to: "US", good: "oil",         value:   9, rate: 0.7, source: "US Census 22-24", confidence: "high" },
  { from: "BR", to: "AR", good: "autos",       value:   9, rate: 0.7, source: "Comtrade 22-24", confidence: "high" },
  { from: "BR", to: "DE", good: "food",        value:   6, rate: 0.6, source: "Eurostat 22-24", confidence: "high" },

  // ==================== AUSTRALIA (origin) ====================
  // Iron ore from the Pilbara to mainland China is the single largest
  // commodity bilateral flow on earth, ~$75B/year (BHP, Rio Tinto, FMG).
  { from: "AU", to: "CN", good: "minerals",    value: 105, rate: 2.5, source: "ABS + GACC 22-24", confidence: "high", note: "Iron ore $75B (largest single-commodity bilateral) + LNG + coking coal" },
  { from: "AU", to: "JP", good: "minerals",    value:  50, rate: 1.5, source: "ABS + JP MoF 22-24", confidence: "high", note: "Iron ore + thermal/coking coal" },
  { from: "AU", to: "JP", good: "oil",         value:  30, rate: 1.2, source: "GIIGNL 22-24", confidence: "high", note: "LNG (NWS, Gorgon, Ichthys)" },
  { from: "AU", to: "KR", good: "minerals",    value:  28, rate: 1.1, source: "ABS + KITA 22-24", confidence: "high" },
  { from: "AU", to: "KR", good: "oil",         value:  15, rate: 0.9, source: "GIIGNL 22-24", confidence: "high", note: "LNG" },
  { from: "AU", to: "CN", good: "food",        value:  14, rate: 0.8, source: "ABS 22-24", confidence: "high", note: "Beef, barley, wine (re-opened post-2023)" },
  { from: "AU", to: "IN", good: "minerals",    value:  18, rate: 0.9, source: "ABS 22-24", confidence: "high", note: "Coking coal for Indian steel mills" },
  { from: "AU", to: "TW", good: "minerals",    value:  11, rate: 0.8, source: "ABS 22-24", confidence: "high" },

  // ==================== INDIA (origin) ====================
  // India 2023 exports: ~$431B. Top: US, UAE, China, Netherlands, Singapore
  { from: "IN", to: "US", good: "pharma",      value:  28, rate: 1.1, source: "US Census 2023 (HS30)", note: "Generic drugs" },
  { from: "IN", to: "US", good: "textiles",    value:  12, rate: 0.8, source: "US Census 2023" },
  { from: "IN", to: "US", good: "electronics", value:  10, rate: 0.7, source: "US Census 2023" },
  { from: "IN", to: "US", good: "machinery",   value:   8, rate: 0.7, source: "US Census 2023" },
  { from: "IN", to: "AE", good: "pharma",      value:  10, rate: 0.7, source: "Comtrade 2023" },
  { from: "IN", to: "AE", good: "minerals",    value:   8, rate: 0.7, source: "Comtrade 2023" },
  { from: "IN", to: "CN", good: "minerals",    value:  11, rate: 0.8, source: "Comtrade 2023" },
  { from: "IN", to: "NL", good: "oil",         value:  15, rate: 0.9, source: "Comtrade 2023", note: "Refined from Russian crude" },
  { from: "IN", to: "SG", good: "machinery",   value:   8, rate: 0.6, source: "Comtrade 2023" },
  { from: "IN", to: "DE", good: "pharma",      value:   6, rate: 0.6, source: "Eurostat 2023" },
  { from: "IN", to: "BD", good: "textiles",    value:   8, rate: 0.6, source: "Comtrade 2023" },

  // ==================== VIETNAM (origin) ====================
  { from: "VN", to: "US", good: "electronics", value:  35, rate: 1.3, source: "US Census 2023" },
  { from: "VN", to: "US", good: "textiles",    value:  18, rate: 0.9, source: "US Census 2023" },
  { from: "VN", to: "US", good: "machinery",   value:  12, rate: 0.8, source: "US Census 2023" },
  { from: "VN", to: "CN", good: "electronics", value:  40, rate: 1.4, source: "Comtrade 2023" },
  { from: "VN", to: "JP", good: "electronics", value:  20, rate: 1.0, source: "BOJ 2023" },
  { from: "VN", to: "KR", good: "electronics", value:  24, rate: 1.1, source: "KITA 2023" },
  { from: "VN", to: "DE", good: "textiles",    value:  12, rate: 0.8, source: "Eurostat 2023" },
  { from: "VN", to: "NL", good: "electronics", value:   9, rate: 0.7, source: "Eurostat 2023" },

  // ==================== MALAYSIA / SINGAPORE / THAILAND / INDONESIA ====================
  { from: "MY", to: "SG", good: "electronics", value:  30, rate: 1.2, source: "Comtrade 2023" },
  { from: "MY", to: "US", good: "electronics", value:  40, rate: 1.4, source: "US Census 2023" },
  { from: "MY", to: "CN", good: "electronics", value:  30, rate: 1.2, source: "Comtrade 2023" },
  { from: "MY", to: "JP", good: "electronics", value:  15, rate: 0.9, source: "BOJ 2023" },
  { from: "MY", to: "IN", good: "oil",         value:  10, rate: 0.7, source: "Comtrade 2023" },

  { from: "SG", to: "CN", good: "electronics", value:  35, rate: 1.3, source: "Comtrade 2023" },
  { from: "SG", to: "US", good: "electronics", value:  30, rate: 1.2, source: "US Census 2023" },
  { from: "SG", to: "MY", good: "electronics", value:  20, rate: 1.0, source: "Comtrade 2023" },
  { from: "SG", to: "HK", good: "electronics", value:  22, rate: 1.0, source: "Comtrade 2023" },

  { from: "TH", to: "US", good: "electronics", value:  30, rate: 1.2, source: "US Census 2023" },
  { from: "TH", to: "US", good: "machinery",   value:  15, rate: 0.9, source: "US Census 2023" },
  { from: "TH", to: "JP", good: "autos",       value:  18, rate: 0.9, source: "BOJ 2023" },
  { from: "TH", to: "CN", good: "food",        value:  12, rate: 0.8, source: "Comtrade 2023" },
  { from: "TH", to: "AU", good: "autos",       value:   7, rate: 0.6, source: "ABS 2023" },

  { from: "ID", to: "CN", good: "minerals",    value:  35, rate: 1.3, source: "Comtrade 2023", note: "Nickel + coal" },
  { from: "ID", to: "JP", good: "minerals",    value:  18, rate: 0.9, source: "Comtrade 2023" },
  { from: "ID", to: "CN", good: "oil",         value:   8, rate: 0.7, source: "Comtrade 2023", note: "Coal" },
  { from: "ID", to: "IN", good: "oil",         value:   8, rate: 0.7, source: "Comtrade 2023" },

  { from: "PH", to: "US", good: "electronics", value:  22, rate: 1.0, source: "US Census 2023" },
  { from: "PH", to: "JP", good: "electronics", value:  12, rate: 0.8, source: "BOJ 2023" },
  { from: "PH", to: "CN", good: "electronics", value:   9, rate: 0.7, source: "Comtrade 2023" },

  { from: "HK", to: "CN", good: "electronics", value:  80, rate: 2.0, source: "Comtrade 2023" },
  { from: "HK", to: "US", good: "electronics", value:  14, rate: 0.8, source: "US Census 2023" },

  // ==================== AFRICA (origin) ====================
  { from: "NG", to: "IN", good: "oil",         value:   6.5, rate: 0.6, source: "IN MoC 22-24", confidence: "high", note: "Bonny Light crude (NNPC → IOC/RIL)" },
  { from: "NG", to: "ES", good: "oil",         value:   5.9, rate: 0.6, source: "Eurostat 22-24", confidence: "high" },
  { from: "NG", to: "NL", good: "oil",         value:   5.3, rate: 0.6, source: "Eurostat 22-24", confidence: "high", note: "Crude into Rotterdam refining" },
  { from: "NG", to: "FR", good: "oil",         value:   4.7, rate: 0.5, source: "Eurostat 22-24", confidence: "high" },
  { from: "NG", to: "US", good: "oil",         value:   4.5, rate: 0.5, source: "US Census 22-24", confidence: "high" },

  { from: "AO", to: "CN", good: "oil",         value:  18, rate: 0.9, source: "GACC + Kpler 22-24", confidence: "high", note: "Africa's largest single corridor — Sonangol crude to Sinopec/Unipec" },
  { from: "AO", to: "IN", good: "oil",         value:   6, rate: 0.6, source: "IN MoC 22-24", confidence: "high" },

  { from: "DZ", to: "IT", good: "oil",         value:  16, rate: 0.9, source: "Eurostat 22-24", confidence: "high", note: "Gas via TransMed pipeline — largest African gas corridor" },
  { from: "DZ", to: "ES", good: "oil",         value:   8, rate: 0.7, source: "Eurostat 22-24", confidence: "high", note: "Gas via Medgaz" },
  { from: "DZ", to: "FR", good: "oil",         value:   6, rate: 0.6, source: "Eurostat 22-24", confidence: "high" },

  { from: "LY", to: "IT", good: "oil",         value:  14, rate: 0.8, source: "Eurostat 2023" },
  { from: "EG", to: "IT", good: "oil",         value:   8, rate: 0.7, source: "Eurostat 2023" },

  { from: "ZA", to: "CN", good: "minerals",    value:  10, rate: 0.7, source: "GACC + StatsSA 22-24", confidence: "high", note: "Iron ore $6B + manganese/chrome $3.5B" },
  { from: "ZA", to: "DE", good: "autos",       value:  12, rate: 0.8, source: "Eurostat 22-24", confidence: "high", note: "BMW Rosslyn, Mercedes East London plants" },
  { from: "ZA", to: "US", good: "minerals",    value:   9, rate: 0.7, source: "US Census 22-24", confidence: "high", note: "PGMs (Pt/Pd) + chrome" },

  { from: "MA", to: "ES", good: "autos",       value:  12, rate: 0.8, source: "Eurostat 2023", note: "Renault, Stellantis plants" },
  { from: "MA", to: "FR", good: "food",        value:  10, rate: 0.7, source: "Eurostat 2023" },

  { from: "CI", to: "NL", good: "food",        value:   2, rate: 0.5, source: "Eurostat 22-24", confidence: "high", note: "Cocoa beans → Barry Callebaut/Cargill (world's #1 cocoa exporter)" },
  { from: "CI", to: "US", good: "food",        value:   1.5, rate: 0.4, source: "US Census 22-24", confidence: "high", note: "Cocoa" },
  { from: "GH", to: "CH", good: "minerals",    value:   4.2, rate: 0.6, source: "FOCBS + Ghana SS 22-24", confidence: "high", note: "Gold dorés to PAMP/MKS refiners" },
  { from: "GH", to: "IN", good: "minerals",    value:   1.6, rate: 0.4, source: "IN MoC 22-24", confidence: "medium", note: "Gold dorés" },
  { from: "GH", to: "NL", good: "food",        value:   3, rate: 0.5, source: "Eurostat 22-24", confidence: "high", note: "Cocoa" },

  { from: "KE", to: "NL", good: "food",        value:   2, rate: 0.5, source: "Eurostat 2023" },
  { from: "KE", to: "GB", good: "food",        value:   2, rate: 0.5, source: "HMRC 2023" },
  { from: "ET", to: "US", good: "food",        value:   0.15, rate: 0.3, source: "US Census 22-24", confidence: "high", note: "Coffee — collapsed after 2022 AGOA suspension" },
  { from: "ET", to: "DE", good: "food",        value:   0.25, rate: 0.3, source: "Eurostat 22-24", confidence: "high", note: "Arabica coffee" },
  { from: "ET", to: "SA", good: "food",        value:   0.24, rate: 0.3, source: "Comtrade 22-24", confidence: "medium", note: "Coffee + livestock" },
  { from: "ZM", to: "CN", good: "minerals",    value:   5, rate: 0.6, source: "Comtrade 2023", note: "Copper" },
  { from: "CD", to: "CN", good: "minerals",    value:  17.5, rate: 0.9, source: "GACC + Bank of Zambia 22-24", confidence: "high", note: "Refined copper $14B + cobalt hydroxide $3.5B (Glencore/CMOC)" },
  { from: "GA", to: "CN", good: "oil",         value:   3, rate: 0.5, source: "Comtrade 2023" },
  { from: "MZ", to: "IN", good: "minerals",    value:   4, rate: 0.5, source: "Comtrade 2023" },
  { from: "BW", to: "BE", good: "minerals",    value:   3, rate: 0.5, source: "Eurostat 2023", note: "Diamonds" },
  { from: "GN", to: "CN", good: "minerals",    value:   7, rate: 0.6, source: "Comtrade 2023", note: "Bauxite" },

  // ==================== LATIN AMERICA (origin) ====================
  { from: "CO", to: "US", good: "oil",         value:  14, rate: 0.9, source: "US Census 2023" },
  { from: "CO", to: "US", good: "food",        value:   9, rate: 0.7, source: "US Census 2023", note: "Coffee + flowers" },

  { from: "PE", to: "CN", good: "minerals",    value:  22, rate: 1.0, source: "Comtrade 2023", note: "Copper + zinc" },
  { from: "PE", to: "US", good: "minerals",    value:   8, rate: 0.7, source: "US Census 2023" },

  { from: "CL", to: "CN", good: "minerals",    value:  24, rate: 1.1, source: "Cochilco + GACC 22-24", confidence: "high", note: "Copper concentrate + cathodes (Codelco, BHP Escondida)" },
  { from: "CL", to: "CN", good: "food",        value:   4, rate: 0.5, source: "GACC 22-24", confidence: "high", note: "Cherries, salmon, wine" },
  { from: "CL", to: "US", good: "minerals",    value:   8, rate: 0.7, source: "US Census 22-24", confidence: "high" },
  { from: "CL", to: "JP", good: "minerals",    value:   6, rate: 0.6, source: "JP MoF 22-24", confidence: "high" },

  { from: "AR", to: "CN", good: "food",        value:   3.8, rate: 0.5, source: "INDEC + GACC 22-24", confidence: "high", note: "Oilseeds (whole soybeans)" },
  { from: "AR", to: "IN", good: "food",        value:   3.2, rate: 0.5, source: "INDEC + IN MoC 22-24", confidence: "high", note: "Soy oil — IN's #1 edible-oil supplier" },
  { from: "AR", to: "VN", good: "food",        value:   2.5, rate: 0.5, source: "INDEC 22-24", confidence: "high", note: "Soybean meal (livestock feed)" },
  { from: "AR", to: "BR", good: "autos",       value:   7, rate: 0.6, source: "INDEC + SECEX 22-24", confidence: "high" },

  { from: "EC", to: "US", good: "oil",         value:   9, rate: 0.7, source: "US Census 2023" },
  { from: "EC", to: "CN", good: "food",        value:   6, rate: 0.6, source: "Comtrade 2023", note: "Shrimp + bananas" },

  { from: "VE", to: "CN", good: "oil",         value:   5, rate: 0.6, source: "Kpler 2023", note: "Most sanctioned flows in illicit-oil" },

  { from: "GY", to: "US", good: "oil",         value:   7, rate: 0.6, source: "US Census 2023", note: "Offshore discoveries ramping" },
  { from: "GY", to: "NL", good: "oil",         value:   4, rate: 0.5, source: "Eurostat 2023" },

  { from: "CR", to: "US", good: "electronics", value:   2, rate: 0.5, source: "US Census 22-24", confidence: "high", note: "Intel packaging" },
  { from: "CR", to: "US", good: "pharma",      value:   5.5, rate: 0.6, source: "US Census 22-24", confidence: "high", note: "Medical devices (Boston Scientific, Edwards) — 42% of CR exports" },
  { from: "DO", to: "US", good: "textiles",    value:   6, rate: 0.6, source: "US Census 2023" },
  { from: "GT", to: "US", good: "food",        value:   6, rate: 0.6, source: "US Census 2023" },
  { from: "HN", to: "US", good: "textiles",    value:   5, rate: 0.6, source: "US Census 2023" },
  { from: "SV", to: "US", good: "textiles",    value:   3, rate: 0.5, source: "US Census 2023" },
  { from: "PA", to: "US", good: "food",        value:   2, rate: 0.4, source: "US Census 2023" },
  { from: "TT", to: "US", good: "oil",         value:   3, rate: 0.5, source: "US Census 2023", note: "LNG" },

  // ==================== REST OF ASIA (origin) ====================
  { from: "BD", to: "US", good: "textiles",    value:   9, rate: 0.7, source: "US Census 2023" },
  { from: "BD", to: "DE", good: "textiles",    value:   7, rate: 0.6, source: "Eurostat 2023" },
  { from: "BD", to: "GB", good: "textiles",    value:   4, rate: 0.5, source: "HMRC 2023" },
  { from: "BD", to: "ES", good: "textiles",    value:   3, rate: 0.5, source: "Eurostat 2023" },

  { from: "PK", to: "US", good: "textiles",    value:   5, rate: 0.6, source: "US Census 2023" },
  { from: "PK", to: "CN", good: "textiles",    value:   3, rate: 0.5, source: "Comtrade 2023" },
  { from: "PK", to: "DE", good: "textiles",    value:   2, rate: 0.5, source: "Eurostat 2023" },

  { from: "LK", to: "US", good: "textiles",    value:   3, rate: 0.5, source: "US Census 2023" },
  { from: "KH", to: "US", good: "textiles",    value:   8, rate: 0.7, source: "US Census 2023" },
  { from: "KH", to: "DE", good: "textiles",    value:   3, rate: 0.5, source: "Eurostat 2023" },
  { from: "KZ", to: "CN", good: "oil",         value:  12, rate: 0.8, source: "Comtrade 2023" },
  { from: "KZ", to: "IT", good: "oil",         value:  10, rate: 0.7, source: "Eurostat 2023" },
  { from: "MN", to: "CN", good: "minerals",    value:   8, rate: 0.7, source: "Comtrade 2023", note: "Coal + copper" },
  { from: "TM", to: "CN", good: "oil",         value:   9, rate: 0.7, source: "Comtrade 2023", note: "Natural gas" },
  { from: "AZ", to: "IT", good: "oil",         value:   8, rate: 0.7, source: "Eurostat 2023", note: "BTC pipeline" },
  { from: "AZ", to: "TR", good: "oil",         value:   6, rate: 0.6, source: "Comtrade 2023" },
  { from: "IL", to: "US", good: "electronics", value:  12, rate: 0.8, source: "US Census 2023", note: "Semiconductor R&D" },
  { from: "IL", to: "US", good: "pharma",      value:   7, rate: 0.7, source: "US Census 2023" },
  { from: "IL", to: "CN", good: "electronics", value:   4, rate: 0.5, source: "Comtrade 2023" },
  { from: "JO", to: "US", good: "textiles",    value:   2, rate: 0.4, source: "US Census 2023" },

  // ==================== NEW ZEALAND / OCEANIA ====================
  { from: "NZ", to: "CN", good: "food",        value:  13, rate: 0.8, source: "Stats NZ 2023", note: "Dairy" },
  { from: "NZ", to: "AU", good: "food",        value:   7, rate: 0.6, source: "Stats NZ 2023" },
  { from: "NZ", to: "US", good: "food",        value:   5, rate: 0.6, source: "US Census 2023" },
  { from: "PG", to: "AU", good: "minerals",    value:   5, rate: 0.6, source: "ABS 2023" },
  { from: "PG", to: "CN", good: "minerals",    value:   4, rate: 0.5, source: "Comtrade 2023" },
];

export const FLOWS: Flow[] = RAW.map((f) => ({ ...f, category: "legitimate" as const }));
