import type { Commodity, CommoditySlug } from "./types";

export const COMMODITIES: Record<CommoditySlug, Commodity> = {
  electronics: { label: "Electronics",   color: "#6ea8ff",
    glyphs: { zh: "芯", ja: "電", ko: "電", en: "IC", de: "EL", nl: "EL", hi: "इल", vi: "điện", th: "ไอซี", ms: "IC", es: "EL", pt: "EL", fr: "EL", it: "EL", tr: "EL", ru: "эл", ar: "إل", id: "EL", he: "אל", pl: "EL", cs: "EL", hu: "EL", sv: "EL", fi: "EL", el: "ΗΛ", ro: "EL", km: "អ", my: "အ", si: "ඉ", mn: "Ц", am: "ኤ" } },
  autos:       { label: "Automobiles",   color: "#f28b6b",
    glyphs: { zh: "车", ja: "車", ko: "車", en: "CAR", de: "KFZ", nl: "AUT", hi: "का", vi: "xe", th: "รถ", ms: "KR", es: "CAR", pt: "AUT", fr: "AUT", it: "AUT", tr: "OTO", ru: "авто", ar: "سيا", id: "KR", he: "רכ", pl: "AUT", cs: "AUT", hu: "AUT", sv: "BIL", fi: "AUT", el: "ΟΧ", ro: "AUT", km: "រ", my: "ယ", si: "ව", mn: "М", am: "መ" } },
  oil:         { label: "Oil & Gas",     color: "#bfa35a",
    glyphs: { zh: "油", ja: "油", ko: "油", en: "OIL", de: "ÖL", nl: "OLI", hi: "तेल", vi: "dầu", th: "น้ำ", ms: "MY", es: "PET", pt: "PET", fr: "PÉT", it: "PET", tr: "PET", ru: "газ", ar: "نفط", id: "MY", he: "נפ", pl: "ROP", cs: "ROP", hu: "OLA", sv: "OLJ", fi: "ÖLJ", el: "ΠΕ", ro: "PET", km: "ប", my: "ဓ", si: "තෙ", mn: "Н", am: "ነ" } },
  textiles:    { label: "Textiles",      color: "#c78ad6",
    glyphs: { zh: "衣", ja: "衣", ko: "衣", en: "TEX", de: "TEX", nl: "TEX", hi: "वस्त्र", vi: "vải", th: "ผ้า", ms: "TEK", es: "TEX", pt: "TEX", fr: "TEX", it: "TES", tr: "TEK", ru: "тек", ar: "نسيج", id: "TEK", he: "טק", pl: "TEK", cs: "TEX", hu: "TEX", sv: "TEX", fi: "TEK", el: "ΥΦ", ro: "TEX", km: "ក", my: "အ", si: "රෙ", mn: "Н", am: "ጨ" } },
  food:        { label: "Food & Ag",     color: "#9bd47a",
    glyphs: { zh: "豆", ja: "米", ko: "米", en: "AG", de: "AGR", nl: "AG", hi: "अन्न", vi: "gạo", th: "ข้าว", ms: "AG", es: "AGR", pt: "AGR", fr: "AGR", it: "AGR", tr: "TAR", ru: "зер", ar: "غذاء", id: "AG", he: "מז", pl: "ROL", cs: "AGR", hu: "MG", sv: "JOR", fi: "MAA", el: "ΓΕ", ro: "AGR", km: "ស", my: "စ", si: "ආ", mn: "ТА", am: "እ" } },
  minerals:    { label: "Minerals",      color: "#d6b26a",
    glyphs: { zh: "铁", ja: "鉱", ko: "鉱", en: "ORE", de: "ERZ", nl: "ERZ", hi: "धा", vi: "quặng", th: "แร่", ms: "ORE", es: "MIN", pt: "MIN", fr: "MIN", it: "MIN", tr: "MAD", ru: "руда", ar: "معادن", id: "ORE", he: "מח", pl: "RUD", cs: "RUD", hu: "ÉRC", sv: "MAL", fi: "MAL", el: "ΜΕ", ro: "MIN", km: "រ", my: "တ", si: "ම", mn: "УУ", am: "ማ" } },
  pharma:      { label: "Pharmaceuticals", color: "#e85a8e",
    glyphs: { zh: "药", ja: "薬", ko: "薬", en: "RX", de: "PHA", nl: "FAR", hi: "दवा", vi: "thuốc", th: "ยา", ms: "UB", es: "MED", pt: "MED", fr: "MED", it: "MED", tr: "İLA", ru: "мед", ar: "دواء", id: "UB", he: "רפ", pl: "LEK", cs: "LÉK", hu: "GYÓ", sv: "LÄK", fi: "LÄÄ", el: "ΦΑ", ro: "MED", km: "ឱ", my: "ဆ", si: "ඖ", mn: "ЭМ", am: "መድ" } },
  machinery:   { label: "Machinery",     color: "#58c5b8",
    glyphs: { zh: "机", ja: "機", ko: "機", en: "MCH", de: "MAS", nl: "MAC", hi: "यंत्र", vi: "máy", th: "เครื่อง", ms: "MES", es: "MAQ", pt: "MAQ", fr: "MAC", it: "MAC", tr: "MAK", ru: "маш", ar: "آلة", id: "MES", he: "מכ", pl: "MAS", cs: "STR", hu: "GÉP", sv: "MAS", fi: "KON", el: "ΜΗ", ro: "MAŞ", km: "ម", my: "စ", si: "ය", mn: "МА", am: "ማሽ" } },

  // --- ILLICIT ---
  narcotics:             { label: "Narcotics",            color: "#ff4d6d",
    glyphs: { en: "NRX", es: "NRC", zh: "毒", ru: "нар", ar: "مخد", fa: "مخ", ko: "毒", ja: "薬", pt: "NRC", fr: "STU", de: "BTM", it: "NRC", nl: "DRG", tr: "UYU", hi: "नशा", th: "ยา", vi: "ma", pl: "NRK", cs: "NRK", hu: "KÁB", sv: "NAR", fi: "HUU", el: "ΝΑ", ro: "NRC", km: "គ", my: "မ", si: "මා", mn: "Н", am: "ዕ", he: "סמ", id: "NRK", ms: "DAD" } },
  "smuggled-electronics": { label: "Smuggled Electronics", color: "#7cd1ff",
    glyphs: { en: "SMG", zh: "走", ja: "闇", ko: "密", ru: "конт", ar: "تهر", es: "CON", pt: "CON", fr: "CLA", de: "SCH", it: "CON", nl: "SMOK", hi: "तस्क", th: "เถื่อ", vi: "lậu", tr: "KAÇ", pl: "SZM", cs: "PAŠ", hu: "CSE", sv: "SMU", fi: "SAL", el: "ΛΑ", ro: "CON", km: "ល", my: "လ", si: "හො", mn: "К", am: "ኮ", he: "הב", id: "SEL", ms: "SEL", fa: "قا" } },
  "smuggled-arms":        { label: "Smuggled Arms",        color: "#ffb347",
    glyphs: { en: "ARM", zh: "械", ja: "武", ko: "武", ru: "ору", ar: "سلا", es: "ARM", pt: "ARM", fr: "ARM", de: "WAF", it: "ARM", nl: "WAP", hi: "शस", th: "อาวุ", vi: "vũ", tr: "SIL", pl: "BRO", cs: "ZBR", hu: "FEG", sv: "VPN", fi: "ASE", el: "ΟΠ", ro: "ARM", km: "អ", my: "လ", si: "ආ", mn: "ЗЭ", am: "መ", he: "נש", id: "SEN", ms: "SEN", fa: "اس" } },
  "illicit-oil":          { label: "Illicit Oil",          color: "#c08968",
    glyphs: { en: "OIL", ar: "نفط", ru: "нефт", zh: "油", es: "PET", fa: "نف", tr: "PET", ja: "油", ko: "油", de: "ÖL", nl: "OLI", fr: "PÉT", it: "PET", pt: "PET", pl: "ROP", cs: "ROP", hu: "OLA", sv: "OLJ", fi: "ÖLJ", el: "ΠΕ", ro: "PET", hi: "तेल", th: "น้ำ", vi: "dầu", km: "ប", my: "ဓ", si: "තෙ", mn: "Н", am: "ነ", he: "נפ", id: "MY", ms: "MY" } },
  counterfeits:           { label: "Counterfeits",         color: "#d36fb0",
    glyphs: { en: "CF", zh: "假", ja: "偽", ko: "偽", ru: "под", ar: "مزي", es: "FAL", pt: "FAL", fr: "CTR", de: "FÄL", it: "CTR", nl: "NAM", tr: "SAH", hi: "नक", th: "ปลอ", vi: "giả", pl: "POD", cs: "PAD", hu: "HAM", sv: "FÖR", fi: "VÄÄ", el: "ΠΛ", ro: "CTR", km: "ក", my: "အ", si: "ව", mn: "Х", am: "ሐ", he: "זי", id: "PAL", ms: "PAL", fa: "تق" } },
  "human-trafficking":    { label: "Human Trafficking",    color: "#c1322f",
    glyphs: { en: "HT", zh: "贩", ja: "人", ko: "人", ru: "тор", ar: "اتج", es: "TRT", pt: "TRF", fr: "TRT", de: "MH", it: "TRT", nl: "MH", tr: "İNS", hi: "तस्", th: "ค้า", vi: "buô", pl: "HL", cs: "OB", hu: "EK", sv: "MH", fi: "IH", el: "ΕΜ", ro: "TRT", km: "ជ", my: "လ", si: "මි", mn: "Х", am: "መ", he: "סח", id: "PM", ms: "PM", fa: "قا" } },
  wildlife:               { label: "Wildlife & Timber",    color: "#4f8a4a",
    glyphs: { en: "WL", zh: "野", ja: "野", ko: "野", ru: "жив", ar: "بر", es: "FS", pt: "FS", fr: "FS", de: "WT", it: "FS", nl: "WD", tr: "YH", hi: "जी", th: "ป่า", vi: "hoa", pl: "DZ", cs: "ZV", hu: "VA", sv: "VL", fi: "LU", el: "ΑΓ", ro: "FS", km: "ព", my: "တ", si: "වන", mn: "ЗЭ", am: "ዱ", he: "חי", id: "SL", ms: "HL", fa: "و" } },
  "e-waste":              { label: "E-waste",              color: "#b97238",
    glyphs: { en: "EW", zh: "废", ja: "廃", ko: "廃", ru: "отх", ar: "نفا", es: "RAE", pt: "REE", fr: "DEE", de: "EAB", it: "RAE", nl: "AEE", tr: "EAT", hi: "कच", th: "ขย", vi: "rác", pl: "ZSE", cs: "OEZ", hu: "EH", sv: "EA", fi: "SER", el: "ΑΗ", ro: "DEE", km: "ស", my: "စ", si: "අප", mn: "ХА", am: "ቆ", he: "פס", id: "SPL", ms: "SPL", fa: "زا" } },
  antiquities:            { label: "Stolen Antiquities",   color: "#b6986a",
    glyphs: { en: "AQ", zh: "古", ja: "古", ko: "古", ru: "ант", ar: "آث", es: "ANT", pt: "ANT", fr: "ANT", de: "ANT", it: "ANT", nl: "ANT", tr: "ANT", hi: "पु", th: "โบ", vi: "cổ", pl: "ANT", cs: "ANT", hu: "RÉG", sv: "ANT", fi: "ANT", el: "ΑΡ", ro: "ANT", km: "ប", my: "ရှ", si: "පු", mn: "ЭР", am: "ጥ", he: "עת", id: "KUN", ms: "ART", fa: "بس" } },
  iff:                    { label: "Illicit Financial Flows", color: "#6f7d8f",
    glyphs: { en: "IFF", zh: "洗", ja: "資", ko: "資", ru: "фин", ar: "غس", es: "FFI", pt: "FFI", fr: "FFI", de: "IFF", it: "FFI", nl: "IFF", tr: "YAS", hi: "वि", th: "เงิน", vi: "tiền", pl: "IFF", cs: "IFF", hu: "IFF", sv: "IFF", fi: "IFF", el: "ΠΧ", ro: "FFI", km: "$", my: "ငွ", si: "මු", mn: "Б", am: "ገ", he: "הל", id: "IFF", ms: "IFF", fa: "پو" } },

  // --- CRYPTO ---
  stablecoins:  { label: "Stablecoins",   color: "#26a17b",
    glyphs: { en: "USDT", zh: "稳", ja: "安", ko: "스", ru: "USD", ar: "USDT", es: "USDT", pt: "USDT", fr: "USDT", de: "USDT", nl: "USDT", tr: "USDT", hi: "USDT", th: "USDT", vi: "USDT", pl: "USDT", cs: "USDT", hu: "USDT", sv: "USDT", fi: "USDT", el: "USDT", ro: "USDT", it: "USDT", km: "USDT", my: "USDT", si: "USDT", mn: "USDT", am: "USDT", he: "USDT", id: "USDT", ms: "USDT", fa: "USDT" } },
  bitcoin:      { label: "Bitcoin",       color: "#f7931a",
    glyphs: { en: "₿", zh: "比", ja: "₿", ko: "₿", ru: "₿", ar: "₿", es: "₿", pt: "₿", fr: "₿", de: "₿", nl: "₿", tr: "₿", hi: "₿", th: "₿", vi: "₿", pl: "₿", cs: "₿", hu: "₿", sv: "₿", fi: "₿", el: "₿", ro: "₿", it: "₿", km: "₿", my: "₿", si: "₿", mn: "₿", am: "₿", he: "₿", id: "₿", ms: "₿", fa: "₿" } },
  "crypto-defi": { label: "DeFi",         color: "#8b5cf6",
    glyphs: { en: "DeFi", zh: "链", ja: "分散", ko: "분산", ru: "ДеФ", ar: "ديف", es: "DeFi", pt: "DeFi", fr: "DeFi", de: "DeFi", nl: "DeFi", tr: "DeFi", hi: "DeFi", th: "DeFi", vi: "DeFi", pl: "DeFi", cs: "DeFi", hu: "DeFi", sv: "DeFi", fi: "DeFi", el: "ΔεΦι", ro: "DeFi", it: "DeFi", km: "DeFi", my: "DeFi", si: "DeFi", mn: "DeFi", am: "DeFi", he: "DeFi", id: "DeFi", ms: "DeFi", fa: "DeFi" } },
};

export const COMMODITY_ICONS: Record<CommoditySlug, string> = {
  electronics: `<rect x="6" y="6" width="12" height="12" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.7"/>
                <rect x="9" y="9" width="6" height="6" fill="currentColor" opacity="0.55"/>
                <path d="M3 9h3 M3 12h3 M3 15h3 M18 9h3 M18 12h3 M18 15h3 M9 3v3 M12 3v3 M15 3v3 M9 18v3 M12 18v3 M15 18v3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`,
  autos: `<path d="M3 15l1.2-3.5a2 2 0 0 1 1.9-1.35h9.8a2 2 0 0 1 1.6.8L20 14h1.2a0.8 0.8 0 0 1 0.8 0.8V17a0.8 0.8 0 0 1-0.8 0.8H20" fill="currentColor" opacity="0.9"/>
          <path d="M2 17.5h20" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.6"/>
          <circle cx="7" cy="17.5" r="2.2" fill="#0b0c0e" stroke="currentColor" stroke-width="1.4"/>
          <circle cx="17" cy="17.5" r="2.2" fill="#0b0c0e" stroke="currentColor" stroke-width="1.4"/>`,
  oil: `<path d="M12 3 C 7 10, 5 13, 5 16 a 7 7 0 0 0 14 0 C 19 13, 17 10, 12 3 z" fill="currentColor" opacity="0.95"/>
        <path d="M9 16 a 3 3 0 0 0 3 3" fill="none" stroke="#0b0c0e" stroke-width="1.4" stroke-linecap="round" opacity="0.55"/>`,
  textiles: `<path d="M4 7 C 8 5, 16 5, 20 7 L 20 17 C 16 19, 8 19, 4 17 z" fill="currentColor" opacity="0.9"/>
             <path d="M4 9 C 8 7, 16 7, 20 9 M4 12 C 8 10, 16 10, 20 12 M4 15 C 8 13, 16 13, 20 15" fill="none" stroke="#0b0c0e" stroke-width="1" opacity="0.5"/>`,
  food: `<path d="M12 3 v18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
         <path d="M12 7 q -4 -1 -6 1 q 2 3 6 2 z
                  M12 7 q 4 -1 6 1 q -2 3 -6 2 z
                  M12 11 q -4 -1 -6 1 q 2 3 6 2 z
                  M12 11 q 4 -1 6 1 q -2 3 -6 2 z
                  M12 15 q -4 -1 -6 1 q 2 3 6 2 z
                  M12 15 q 4 -1 6 1 q -2 3 -6 2 z"
               fill="currentColor"/>`,
  minerals: `<path d="M6 9 L 12 4 L 18 9 L 14 20 L 10 20 z" fill="currentColor" opacity="0.9" stroke="#0b0c0e" stroke-width="1" stroke-linejoin="round"/>
             <path d="M6 9 L 18 9 M10 20 L 12 9 L 14 20 M8.5 9 L 12 4 L 15.5 9" fill="none" stroke="#0b0c0e" stroke-width="1" opacity="0.55"/>`,
  pharma: `<g transform="rotate(-35 12 12)">
             <rect x="3.5" y="8.5" width="17" height="7" rx="3.5" fill="#ffffff" opacity="0.95"/>
             <path d="M12 8.5 v7" stroke="#0b0c0e" stroke-width="1" opacity="0.6"/>
             <rect x="3.5" y="8.5" width="8.5" height="7" rx="3.5" fill="currentColor"/>
             <rect x="3.5" y="8.5" width="17" height="7" rx="3.5" fill="none" stroke="#0b0c0e" stroke-width="1" opacity="0.4"/>
           </g>`,
  machinery: `<g>
              <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" stroke-width="1.6"/>
              <path d="M12 2.5 v3 M12 18.5 v3 M2.5 12 h3 M18.5 12 h3
                       M5 5 l 2 2 M17 17 l 2 2 M5 19 l 2 -2 M17 7 l 2 -2"
                    stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.55"/>
            </g>`,
  // Narcotics: syringe angled
  narcotics: `<path d="M4 20 L 14 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <rect x="12.5" y="8" width="6" height="3.2" rx="0.5" transform="rotate(-45 12.5 8)" fill="currentColor"/>
              <path d="M18 6 l 3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M3 21 l 2 -2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,
  // Smuggled electronics: chip with slash/X overlay
  "smuggled-electronics": `<rect x="6" y="6" width="12" height="12" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.7"/>
                            <rect x="9" y="9" width="6" height="6" fill="currentColor" opacity="0.55"/>
                            <path d="M3 9h3 M3 12h3 M3 15h3 M18 9h3 M18 12h3 M18 15h3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
                            <path d="M4 20 L 20 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.9"/>`,
  // Smuggled arms: handgun silhouette
  "smuggled-arms": `<path d="M3 10 h12 v3 h-1 l-2 2 h-5 v-1 h-4 z" fill="currentColor"/>
                     <path d="M14 13 v4 h-2 v-2" fill="currentColor"/>
                     <circle cx="7" cy="11.5" r="0.8" fill="#0b0c0e"/>`,
  // Illicit oil: oil drop with strike through
  "illicit-oil": `<path d="M12 3 C 7 10, 5 13, 5 16 a 7 7 0 0 0 14 0 C 19 13, 17 10, 12 3 z" fill="currentColor" opacity="0.95"/>
                   <path d="M4 20 L 20 4" stroke="#0b0c0e" stroke-width="2" stroke-linecap="round"/>`,
  // Stablecoins: dollar sign inside coin
  stablecoins: `<circle cx="12" cy="12" r="9" fill="currentColor"/>
                <circle cx="12" cy="12" r="7" fill="none" stroke="#0b0c0e" stroke-width="0.8" opacity="0.5"/>
                <path d="M12 6.5 v1.8 M12 15.8 v1.7
                         M8.8 9.3 c0 -1.4 1.4 -2.1 3.2 -2.1 c1.8 0 3.1 0.6 3.1 1.7
                         M15.2 14.7 c0 1.4 -1.4 2.1 -3.2 2.1 c-1.8 0 -3.1 -0.6 -3.1 -1.7
                         M9 12 h6"
                      fill="none" stroke="#0b0c0e" stroke-width="1.5" stroke-linecap="round"/>`,
  // Bitcoin logo
  bitcoin: `<circle cx="12" cy="12" r="9" fill="currentColor"/>
            <path d="M9 7 v10 M11 7 v10 M13 7 v10
                     M8.5 9 h5.5 c1.4 0 2.5 0.9 2.5 2 c0 1.1 -1.1 2 -2.5 2 h-5.5
                     M8.5 13 h6 c1.5 0 2.7 0.9 2.7 2 c0 1.1 -1.2 2 -2.7 2 h-6"
                  fill="none" stroke="#0b0c0e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  // DeFi: hexagon network
  "crypto-defi": `<polygon points="12,3 20,7.5 20,16.5 12,21 4,16.5 4,7.5" fill="currentColor" opacity="0.95"/>
                   <path d="M12 3 L 12 21 M4 7.5 L 20 16.5 M20 7.5 L 4 16.5"
                         stroke="#0b0c0e" stroke-width="1" opacity="0.5"/>
                   <circle cx="12" cy="12" r="2.5" fill="#0b0c0e" opacity="0.75"/>`,
  // Counterfeits: shopping tag with circled slash (fake brand)
  counterfeits: `<path d="M4 4 h8 l8 8 -8 8 -8 -8 z" fill="currentColor" opacity="0.9"/>
                  <circle cx="8" cy="8" r="1.4" fill="#0b0c0e"/>
                  <circle cx="14" cy="14" r="3.5" fill="none" stroke="#0b0c0e" stroke-width="1.3"/>
                  <path d="M11.7 16.3 L 16.3 11.7" stroke="#0b0c0e" stroke-width="1.3" stroke-linecap="round"/>`,
  // Human trafficking: broken chain link
  "human-trafficking": `<rect x="3" y="9" width="7" height="6" rx="3" fill="none" stroke="currentColor" stroke-width="2"/>
                         <rect x="14" y="9" width="7" height="6" rx="3" fill="none" stroke="currentColor" stroke-width="2"/>
                         <path d="M10 12 h1.5 M12.5 12 h1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                         <path d="M5 4 L 8 7 M16 17 L 19 20" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity="0.65"/>`,
  // Wildlife & timber: tusk + leaf
  wildlife: `<path d="M4 18 C 6 10, 10 6, 18 5 C 17 11, 13 15, 4 18 z" fill="currentColor" opacity="0.92"/>
              <path d="M18 5 C 15 9, 12 12, 4 18" stroke="#0b0c0e" stroke-width="1" opacity="0.55" fill="none"/>
              <path d="M11 11 v6" stroke="#0b0c0e" stroke-width="0.9" opacity="0.5"/>`,
  // E-waste: trashcan with chip
  "e-waste": `<path d="M5 7 h14 l-1.2 13 a1 1 0 0 1 -1 0.9 h-9.6 a1 1 0 0 1 -1 -0.9 z" fill="currentColor" opacity="0.92"/>
               <path d="M3 6.5 h18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
               <path d="M9 4.5 h6 v2 h-6 z" fill="currentColor"/>
               <rect x="9" y="11" width="6" height="6" rx="0.5" fill="#0b0c0e" opacity="0.65"/>
               <path d="M7 12 h2 M7 14 h2 M7 16 h2 M15 12 h2 M15 14 h2 M15 16 h2" stroke="#0b0c0e" stroke-width="0.9" stroke-linecap="round" opacity="0.55"/>`,
  // Antiquities: amphora vase
  antiquities: `<path d="M9 3 h6 v2 h1 a2 2 0 0 1 2 2 v2 a4 4 0 0 1 -3 4 v5 a2 2 0 0 1 -2 2 h-4 a2 2 0 0 1 -2 -2 v-5 a4 4 0 0 1 -3 -4 v-2 a2 2 0 0 1 2 -2 h1 z" fill="currentColor" opacity="0.93"/>
                 <path d="M9 10 h6" stroke="#0b0c0e" stroke-width="0.9" opacity="0.55"/>
                 <path d="M10 14 h4" stroke="#0b0c0e" stroke-width="0.9" opacity="0.45"/>`,
  // IFF: stacked banknotes with arrow
  iff: `<rect x="3" y="8" width="14" height="9" rx="1" fill="currentColor" opacity="0.9"/>
         <rect x="5" y="6" width="14" height="9" rx="1" fill="currentColor" opacity="0.65"/>
         <path d="M7 12 h8 M9 10 h4 M9 14 h4" stroke="#0b0c0e" stroke-width="0.9" stroke-linecap="round" opacity="0.75"/>
         <path d="M18 4 L 22 8 L 18 12 M22 8 h-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
};

export const THEMES = {
  midnight: { ocean: "#081220", oceanEdge: "#1a2b42", land: "#2a3a4f", landEdge: "#3d5270", graticule: "#18222e" },
  ink:      { ocean: "#050505", oceanEdge: "#222",    land: "#1a1a1a", landEdge: "#333",    graticule: "#161616" },
  warm:     { ocean: "#1a1410", oceanEdge: "#3a2a1c", land: "#2c2217", landEdge: "#4a3420", graticule: "#201710" },
} as const;

export type ThemeName = keyof typeof THEMES;
