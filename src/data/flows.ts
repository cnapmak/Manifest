import type { Flow } from "./types";

// Manifest trade flows — legitimate merchandise trade.
// Values: $B USD annualized, 2023 unless noted.
// All values are best-effort mappings from bilateral goods totals and HS-chapter
// composition. Phase E will tighten these further via direct Comtrade/OEC pulls.
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
// Sources (inline per row):
//   "US Census 2023"       — US bilateral goods totals (dec 2023 YTD)
//   "Comtrade 2023"        — UN Comtrade HS 2-digit aggregates
//   "Eurostat 2023"        — EU bilateral goods
//   "OEC 2023"             — Observatory of Economic Complexity cleaned
//   "WTO Stats 2023"       — WTO bilateral totals
//   "IEA 2023" / "Kpler 2023" — energy flows
//
// rate = shipments/second spawn rate, scaled roughly with log(value).
const RAW: Flow[] = [

  // ==================== CHINA (origin) ====================
  // China's 2023 goods exports ~ $3.38T. Top: ASEAN, EU, US, HK, Japan, Korea.
  { from: "CN", to: "US", good: "electronics", value: 175, rate: 3.6, source: "US Census 2023 (HS85)" },
  { from: "CN", to: "US", good: "machinery",   value:  95, rate: 2.4, source: "US Census 2023 (HS84)" },
  { from: "CN", to: "US", good: "textiles",    value:  60, rate: 1.8, source: "US Census 2023 (HS50-63)" },
  { from: "CN", to: "US", good: "autos",       value:  18, rate: 1.0, source: "US Census 2023 (HS87)" },
  { from: "CN", to: "US", good: "pharma",      value:  12, rate: 0.8, source: "US Census 2023 (HS30)" },
  { from: "CN", to: "US", good: "minerals",    value:  25, rate: 1.1, source: "US Census 2023 (HS72-81)" },

  { from: "CN", to: "HK", good: "electronics", value: 260, rate: 4.2, source: "Comtrade 2023", note: "Transit hub; much re-exported" },
  { from: "CN", to: "HK", good: "machinery",   value:  30, rate: 1.2, source: "Comtrade 2023" },

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

  { from: "CN", to: "MX", good: "electronics", value:  75, rate: 2.0, source: "Comtrade 2023", note: "Nearshoring assembly inputs" },
  { from: "CN", to: "MX", good: "machinery",   value:  35, rate: 1.3, source: "Comtrade 2023" },

  { from: "CN", to: "RU", good: "machinery",   value:  55, rate: 1.6, source: "Comtrade 2023", note: "Post-2022 replacement of Western imports" },
  { from: "CN", to: "RU", good: "autos",       value:  35, rate: 1.3, source: "Comtrade 2023", note: "CN brands displaced Western OEMs" },
  { from: "CN", to: "RU", good: "electronics", value:  40, rate: 1.4, source: "Comtrade 2023" },

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

  { from: "US", to: "MX", good: "machinery",   value:  45, rate: 1.5, source: "US Census 2023 (HS84)" },
  { from: "US", to: "MX", good: "electronics", value:  75, rate: 2.0, source: "US Census 2023 (HS85)" },
  { from: "US", to: "MX", good: "autos",       value:  35, rate: 1.3, source: "US Census 2023 (HS87)", note: "Auto parts into Mexican assembly" },
  { from: "US", to: "MX", good: "oil",         value:  55, rate: 1.6, source: "US Census 2023 (HS27)" },
  { from: "US", to: "MX", good: "food",        value:  30, rate: 1.2, source: "US Census 2023 (HS01-24)" },
  { from: "US", to: "MX", good: "pharma",      value:  12, rate: 0.8, source: "US Census 2023 (HS30)" },

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
  // Germany 2023 goods exports: $1.71T. Top: US, France, Netherlands, China, Poland, Italy, UK
  { from: "DE", to: "US", good: "autos",       value:  42, rate: 1.4, source: "US Census 2023 / Destatis" },
  { from: "DE", to: "US", good: "machinery",   value:  38, rate: 1.3, source: "US Census 2023" },
  { from: "DE", to: "US", good: "pharma",      value:  22, rate: 1.0, source: "US Census 2023" },
  { from: "DE", to: "US", good: "electronics", value:  20, rate: 1.0, source: "US Census 2023" },

  { from: "DE", to: "FR", good: "autos",       value:  28, rate: 1.1, source: "Eurostat 2023" },
  { from: "DE", to: "FR", good: "machinery",   value:  22, rate: 1.0, source: "Eurostat 2023" },
  { from: "DE", to: "FR", good: "electronics", value:  18, rate: 0.9, source: "Eurostat 2023" },
  { from: "DE", to: "FR", good: "pharma",      value:  12, rate: 0.8, source: "Eurostat 2023" },

  { from: "DE", to: "NL", good: "machinery",   value:  35, rate: 1.3, source: "Eurostat 2023" },
  { from: "DE", to: "NL", good: "autos",       value:  20, rate: 1.0, source: "Eurostat 2023" },
  { from: "DE", to: "NL", good: "electronics", value:  20, rate: 1.0, source: "Eurostat 2023" },

  { from: "DE", to: "CN", good: "autos",       value:  22, rate: 1.0, source: "Destatis 2023" },
  { from: "DE", to: "CN", good: "machinery",   value:  22, rate: 1.0, source: "Destatis 2023" },
  { from: "DE", to: "CN", good: "pharma",      value:   8, rate: 0.7, source: "Destatis 2023" },

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
  // KR 2023 goods exports: ~$632B. Top: China, US, Vietnam, Japan, HK, India, Taiwan
  { from: "KR", to: "CN", good: "electronics", value: 115, rate: 2.6, source: "KITA 2023" },
  { from: "KR", to: "CN", good: "machinery",   value:  25, rate: 1.1, source: "KITA 2023" },

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
  // TW 2023 goods exports: ~$432B. Top: China+HK, US, ASEAN, Japan, EU
  { from: "TW", to: "CN", good: "electronics", value: 140, rate: 2.9, source: "Comtrade 2023", note: "Semiconductors dominate" },
  { from: "TW", to: "US", good: "electronics", value:  70, rate: 1.9, source: "US Census 2023" },
  { from: "TW", to: "US", good: "machinery",   value:  15, rate: 0.9, source: "US Census 2023" },
  { from: "TW", to: "HK", good: "electronics", value:  35, rate: 1.3, source: "Comtrade 2023" },
  { from: "TW", to: "JP", good: "electronics", value:  20, rate: 1.0, source: "BOJ 2023" },
  { from: "TW", to: "SG", good: "electronics", value:  18, rate: 0.9, source: "Comtrade 2023" },
  { from: "TW", to: "KR", good: "electronics", value:  20, rate: 1.0, source: "KITA 2023" },
  { from: "TW", to: "MY", good: "electronics", value:  15, rate: 0.9, source: "Comtrade 2023" },
  { from: "TW", to: "VN", good: "electronics", value:  18, rate: 0.9, source: "Comtrade 2023" },
  { from: "TW", to: "DE", good: "electronics", value:  12, rate: 0.8, source: "Eurostat 2023" },

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
  { from: "NL", to: "US", good: "electronics", value:  18, rate: 0.9, source: "US Census 2023", note: "ASML lithography" },
  { from: "NL", to: "US", good: "machinery",   value:  12, rate: 0.8, source: "US Census 2023" },
  { from: "NL", to: "CN", good: "electronics", value:  18, rate: 0.9, source: "Comtrade 2023", note: "ASML tools" },

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
  { from: "BE", to: "DE", good: "pharma",      value:  25, rate: 1.1, source: "Eurostat 2023" },
  { from: "BE", to: "FR", good: "pharma",      value:  18, rate: 0.9, source: "Eurostat 2023" },
  { from: "BE", to: "US", good: "pharma",      value:  25, rate: 1.1, source: "US Census 2023", note: "Janssen / vaccines" },
  { from: "BE", to: "NL", good: "pharma",      value:  15, rate: 0.9, source: "Eurostat 2023" },

  { from: "CH", to: "US", good: "pharma",      value:  48, rate: 1.5, source: "US Census 2023", note: "Roche, Novartis" },
  { from: "CH", to: "DE", good: "pharma",      value:  28, rate: 1.1, source: "Eurostat 2023" },
  { from: "CH", to: "CN", good: "pharma",      value:  15, rate: 0.9, source: "Comtrade 2023" },
  { from: "CH", to: "JP", good: "pharma",      value:   8, rate: 0.6, source: "BOJ 2023" },
  { from: "CH", to: "IT", good: "pharma",      value:  10, rate: 0.7, source: "Eurostat 2023" },

  { from: "IE", to: "US", good: "pharma",      value:  55, rate: 1.6, source: "US Census 2023", note: "IE-based Pfizer/MSD plants" },
  { from: "IE", to: "DE", good: "pharma",      value:  12, rate: 0.8, source: "Eurostat 2023" },
  { from: "IE", to: "GB", good: "pharma",      value:  10, rate: 0.7, source: "HMRC 2023" },

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

  { from: "NO", to: "GB", good: "oil",         value:  35, rate: 1.3, source: "HMRC 2023", note: "North Sea gas" },
  { from: "NO", to: "DE", good: "oil",         value:  30, rate: 1.2, source: "Eurostat 2023" },
  { from: "NO", to: "NL", good: "oil",         value:  18, rate: 0.9, source: "Eurostat 2023" },
  { from: "NO", to: "FR", good: "oil",         value:  12, rate: 0.8, source: "Eurostat 2023" },

  { from: "DK", to: "DE", good: "pharma",      value:  12, rate: 0.8, source: "Eurostat 2023", note: "Novo Nordisk" },
  { from: "DK", to: "US", good: "pharma",      value:  25, rate: 1.1, source: "US Census 2023", note: "Ozempic surge" },

  { from: "FI", to: "DE", good: "machinery",   value:   8, rate: 0.6, source: "Eurostat 2023" },
  { from: "PT", to: "ES", good: "autos",       value:   8, rate: 0.6, source: "Eurostat 2023" },

  { from: "TR", to: "DE", good: "autos",       value:  12, rate: 0.8, source: "Eurostat 2023" },
  { from: "TR", to: "DE", good: "textiles",    value:   8, rate: 0.6, source: "Eurostat 2023" },
  { from: "TR", to: "GB", good: "autos",       value:   7, rate: 0.6, source: "HMRC 2023" },
  { from: "TR", to: "US", good: "textiles",    value:   8, rate: 0.6, source: "US Census 2023" },

  // ==================== RUSSIA (origin) ====================
  // Post-2022 sanctions: pivot to China/India/Turkey. Much oil & gas.
  { from: "RU", to: "CN", good: "oil",         value: 110, rate: 2.4, source: "Kpler 2023", note: "Crude + LNG, cap-violating share see illicit" },
  { from: "RU", to: "IN", good: "oil",         value:  55, rate: 1.6, source: "Kpler 2023" },
  { from: "RU", to: "TR", good: "oil",         value:  25, rate: 1.1, source: "Kpler 2023" },
  { from: "RU", to: "CN", good: "minerals",    value:  15, rate: 0.9, source: "Comtrade 2023" },
  { from: "RU", to: "KZ", good: "oil",         value:   8, rate: 0.7, source: "Comtrade 2023" },
  { from: "RU", to: "BY", good: "oil",         value:  12, rate: 0.8, source: "Comtrade 2023" },
  { from: "RU", to: "HU", good: "oil",         value:   6, rate: 0.6, source: "Eurostat 2023" },

  // ==================== SAUDI ARABIA & GULF (oil origins) ====================
  { from: "SA", to: "CN", good: "oil",         value:  58, rate: 1.7, source: "IEA 2023" },
  { from: "SA", to: "IN", good: "oil",         value:  32, rate: 1.2, source: "IEA 2023" },
  { from: "SA", to: "JP", good: "oil",         value:  35, rate: 1.3, source: "IEA 2023" },
  { from: "SA", to: "KR", good: "oil",         value:  32, rate: 1.2, source: "IEA 2023" },
  { from: "SA", to: "US", good: "oil",         value:  12, rate: 0.8, source: "US Census 2023" },
  { from: "SA", to: "EG", good: "oil",         value:   8, rate: 0.7, source: "Comtrade 2023" },

  { from: "AE", to: "IN", good: "oil",         value:  25, rate: 1.1, source: "IEA 2023" },
  { from: "AE", to: "JP", good: "oil",         value:  30, rate: 1.2, source: "IEA 2023" },
  { from: "AE", to: "KR", good: "oil",         value:  22, rate: 1.0, source: "IEA 2023" },
  { from: "AE", to: "CN", good: "oil",         value:  28, rate: 1.1, source: "IEA 2023" },
  { from: "AE", to: "TH", good: "oil",         value:   6, rate: 0.6, source: "IEA 2023" },

  { from: "QA", to: "JP", good: "oil",         value:  28, rate: 1.1, source: "IEA 2023", note: "LNG" },
  { from: "QA", to: "KR", good: "oil",         value:  20, rate: 1.0, source: "IEA 2023", note: "LNG" },
  { from: "QA", to: "CN", good: "oil",         value:  20, rate: 1.0, source: "IEA 2023", note: "LNG" },
  { from: "QA", to: "IN", good: "oil",         value:  12, rate: 0.8, source: "IEA 2023" },

  { from: "KW", to: "CN", good: "oil",         value:  20, rate: 1.0, source: "IEA 2023" },
  { from: "KW", to: "IN", good: "oil",         value:  12, rate: 0.8, source: "IEA 2023" },
  { from: "KW", to: "KR", good: "oil",         value:   9, rate: 0.7, source: "IEA 2023" },

  { from: "OM", to: "CN", good: "oil",         value:  22, rate: 1.0, source: "IEA 2023" },
  { from: "OM", to: "IN", good: "oil",         value:   8, rate: 0.7, source: "IEA 2023" },
  { from: "IR", to: "CN", good: "oil",         value:   8, rate: 0.7, source: "Kpler 2023", note: "Official only; illicit in illicit-oil" },

  { from: "IQ", to: "IN", good: "oil",         value:  22, rate: 1.0, source: "IEA 2023" },
  { from: "IQ", to: "CN", good: "oil",         value:  30, rate: 1.2, source: "IEA 2023" },
  { from: "IQ", to: "US", good: "oil",         value:   5, rate: 0.6, source: "US Census 2023" },

  // ==================== CANADA (origin) ====================
  { from: "CA", to: "US", good: "oil",         value: 138, rate: 2.8, source: "US Census 2023 (HS27)", note: "Alberta crude via pipeline" },
  { from: "CA", to: "US", good: "autos",       value:  45, rate: 1.5, source: "US Census 2023" },
  { from: "CA", to: "US", good: "minerals",    value:  40, rate: 1.4, source: "US Census 2023" },
  { from: "CA", to: "US", good: "machinery",   value:  22, rate: 1.0, source: "US Census 2023" },
  { from: "CA", to: "US", good: "food",        value:  28, rate: 1.1, source: "US Census 2023" },
  { from: "CA", to: "CN", good: "minerals",    value:  10, rate: 0.7, source: "Stat Canada 2023" },
  { from: "CA", to: "JP", good: "minerals",    value:   8, rate: 0.6, source: "Stat Canada 2023" },

  // ==================== MEXICO (origin) ====================
  { from: "MX", to: "US", good: "autos",       value: 195, rate: 3.1, source: "US Census 2023 (HS87)", note: "Largest single bilateral auto flow" },
  { from: "MX", to: "US", good: "electronics", value: 110, rate: 2.5, source: "US Census 2023" },
  { from: "MX", to: "US", good: "machinery",   value:  60, rate: 1.7, source: "US Census 2023" },
  { from: "MX", to: "US", good: "food",        value:  40, rate: 1.4, source: "US Census 2023" },
  { from: "MX", to: "US", good: "pharma",      value:   8, rate: 0.7, source: "US Census 2023" },
  { from: "MX", to: "CA", good: "autos",       value:  14, rate: 0.8, source: "Stat Canada 2023" },
  { from: "MX", to: "DE", good: "autos",       value:   8, rate: 0.6, source: "Eurostat 2023" },

  // ==================== BRAZIL (origin) ====================
  { from: "BR", to: "CN", good: "food",        value:  62, rate: 1.7, source: "Comtrade 2023", note: "Soybeans, beef" },
  { from: "BR", to: "CN", good: "minerals",    value:  40, rate: 1.4, source: "Comtrade 2023", note: "Iron ore" },
  { from: "BR", to: "US", good: "food",        value:  18, rate: 0.9, source: "US Census 2023" },
  { from: "BR", to: "US", good: "minerals",    value:  12, rate: 0.8, source: "US Census 2023" },
  { from: "BR", to: "US", good: "oil",         value:   9, rate: 0.7, source: "US Census 2023" },
  { from: "BR", to: "AR", good: "autos",       value:   9, rate: 0.7, source: "Comtrade 2023" },
  { from: "BR", to: "DE", good: "food",        value:   6, rate: 0.6, source: "Eurostat 2023" },

  // ==================== AUSTRALIA (origin) ====================
  { from: "AU", to: "CN", good: "minerals",    value: 135, rate: 2.7, source: "ABS 2023", note: "Iron ore dominates" },
  { from: "AU", to: "JP", good: "minerals",    value:  50, rate: 1.5, source: "ABS 2023", note: "Iron ore + coal + LNG" },
  { from: "AU", to: "JP", good: "oil",         value:  30, rate: 1.2, source: "IEA 2023", note: "LNG" },
  { from: "AU", to: "KR", good: "minerals",    value:  28, rate: 1.1, source: "ABS 2023" },
  { from: "AU", to: "KR", good: "oil",         value:  15, rate: 0.9, source: "IEA 2023" },
  { from: "AU", to: "CN", good: "food",        value:  14, rate: 0.8, source: "ABS 2023" },
  { from: "AU", to: "IN", good: "minerals",    value:  18, rate: 0.9, source: "ABS 2023", note: "Coking coal" },
  { from: "AU", to: "TW", good: "minerals",    value:  11, rate: 0.8, source: "ABS 2023" },

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
  { from: "NG", to: "IN", good: "oil",         value:   8, rate: 0.7, source: "Comtrade 2023" },
  { from: "NG", to: "ES", good: "oil",         value:  10, rate: 0.7, source: "Eurostat 2023" },
  { from: "NG", to: "FR", good: "oil",         value:   6, rate: 0.6, source: "Eurostat 2023" },
  { from: "NG", to: "US", good: "oil",         value:   4, rate: 0.5, source: "US Census 2023" },

  { from: "AO", to: "CN", good: "oil",         value:  20, rate: 1.0, source: "Comtrade 2023" },
  { from: "AO", to: "IN", good: "oil",         value:   6, rate: 0.6, source: "Comtrade 2023" },

  { from: "DZ", to: "IT", good: "oil",         value:  12, rate: 0.8, source: "Eurostat 2023", note: "Gas pipeline" },
  { from: "DZ", to: "ES", good: "oil",         value:   8, rate: 0.7, source: "Eurostat 2023" },
  { from: "DZ", to: "FR", good: "oil",         value:   6, rate: 0.6, source: "Eurostat 2023" },

  { from: "LY", to: "IT", good: "oil",         value:  14, rate: 0.8, source: "Eurostat 2023" },
  { from: "EG", to: "IT", good: "oil",         value:   8, rate: 0.7, source: "Eurostat 2023" },

  { from: "ZA", to: "CN", good: "minerals",    value:  28, rate: 1.1, source: "Comtrade 2023", note: "Iron ore + PGMs" },
  { from: "ZA", to: "DE", good: "autos",       value:  12, rate: 0.8, source: "Eurostat 2023", note: "BMW, Mercedes plants" },
  { from: "ZA", to: "US", good: "minerals",    value:   9, rate: 0.7, source: "US Census 2023" },

  { from: "MA", to: "ES", good: "autos",       value:  12, rate: 0.8, source: "Eurostat 2023", note: "Renault, Stellantis plants" },
  { from: "MA", to: "FR", good: "food",        value:  10, rate: 0.7, source: "Eurostat 2023" },

  { from: "CI", to: "NL", good: "food",        value:   6, rate: 0.6, source: "Eurostat 2023", note: "Cocoa" },
  { from: "CI", to: "US", good: "food",        value:   4, rate: 0.5, source: "US Census 2023" },
  { from: "GH", to: "CH", good: "minerals",    value:   8, rate: 0.7, source: "Eurostat 2023", note: "Gold to refiners" },
  { from: "GH", to: "NL", good: "food",        value:   3, rate: 0.5, source: "Eurostat 2023" },

  { from: "KE", to: "NL", good: "food",        value:   2, rate: 0.5, source: "Eurostat 2023" },
  { from: "KE", to: "GB", good: "food",        value:   2, rate: 0.5, source: "HMRC 2023" },
  { from: "ET", to: "US", good: "food",        value:   0.8, rate: 0.4, source: "US Census 2023" },
  { from: "ZM", to: "CN", good: "minerals",    value:   5, rate: 0.6, source: "Comtrade 2023", note: "Copper" },
  { from: "CD", to: "CN", good: "minerals",    value:  18, rate: 0.9, source: "Comtrade 2023", note: "Cobalt + copper" },
  { from: "GA", to: "CN", good: "oil",         value:   3, rate: 0.5, source: "Comtrade 2023" },
  { from: "MZ", to: "IN", good: "minerals",    value:   4, rate: 0.5, source: "Comtrade 2023" },
  { from: "BW", to: "BE", good: "minerals",    value:   3, rate: 0.5, source: "Eurostat 2023", note: "Diamonds" },
  { from: "GN", to: "CN", good: "minerals",    value:   7, rate: 0.6, source: "Comtrade 2023", note: "Bauxite" },

  // ==================== LATIN AMERICA (origin) ====================
  { from: "CO", to: "US", good: "oil",         value:  14, rate: 0.9, source: "US Census 2023" },
  { from: "CO", to: "US", good: "food",        value:   9, rate: 0.7, source: "US Census 2023", note: "Coffee + flowers" },

  { from: "PE", to: "CN", good: "minerals",    value:  22, rate: 1.0, source: "Comtrade 2023", note: "Copper + zinc" },
  { from: "PE", to: "US", good: "minerals",    value:   8, rate: 0.7, source: "US Census 2023" },

  { from: "CL", to: "CN", good: "minerals",    value:  30, rate: 1.2, source: "Comtrade 2023", note: "Copper" },
  { from: "CL", to: "US", good: "minerals",    value:   8, rate: 0.7, source: "US Census 2023" },
  { from: "CL", to: "JP", good: "minerals",    value:   6, rate: 0.6, source: "BOJ 2023" },

  { from: "AR", to: "CN", good: "food",        value:   8, rate: 0.7, source: "Comtrade 2023" },
  { from: "AR", to: "BR", good: "autos",       value:   7, rate: 0.6, source: "Comtrade 2023" },

  { from: "EC", to: "US", good: "oil",         value:   9, rate: 0.7, source: "US Census 2023" },
  { from: "EC", to: "CN", good: "food",        value:   6, rate: 0.6, source: "Comtrade 2023", note: "Shrimp + bananas" },

  { from: "VE", to: "CN", good: "oil",         value:   5, rate: 0.6, source: "Kpler 2023", note: "Most sanctioned flows in illicit-oil" },

  { from: "GY", to: "US", good: "oil",         value:   7, rate: 0.6, source: "US Census 2023", note: "Offshore discoveries ramping" },
  { from: "GY", to: "NL", good: "oil",         value:   4, rate: 0.5, source: "Eurostat 2023" },

  { from: "CR", to: "US", good: "electronics", value:   6, rate: 0.6, source: "US Census 2023", note: "Intel packaging" },
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
