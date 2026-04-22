import type { Flow } from "./types";

// Cross-border cryptocurrency flows.
// Values in $B USD / year, based on Chainalysis Geography of Cryptocurrency 2023,
// TRM Labs 2023, BIS working papers, and on-chain transfers with jurisdictional
// tagging (IP geolocation + exchange KYC).
//
// IMPORTANT CAVEATS (surface in /methods):
//   - Crypto "flows between countries" are a proxy built on IP geolocation and
//     centralized exchange KYC. Real on-chain transfers are jurisdiction-less.
//   - Stablecoin volumes dominate by 10-20× over native BTC/ETH flows.
//   - Values listed are estimated net value-received per corridor, not gross
//     transaction volume (which would be orders of magnitude higher).
//
// Categories:
//   stablecoins   — USDT / USDC / FDUSD / DAI transfers between jurisdictions
//   bitcoin       — BTC transfers (capital migration, mining reward flows)
//   crypto-defi   — cross-region DeFi protocol usage (TVL moves, yield routing)
const RAW_CRYPTO: Flow[] = [
  // === STABLECOINS — sanctions & capital-control evasion ===
  { from: "TR", to: "RU", good: "stablecoins", value: 12, rate: 1.2, confidence: "medium", source: "Chainalysis 2023; FT investigations", note: "USDT via Turkish OTC desks → Russian sanctioned entities" },
  { from: "AE", to: "RU", good: "stablecoins", value: 10, rate: 1.1, confidence: "medium", source: "Chainalysis 2023; Elliptic 2023", note: "Dubai OTC → Russian wealth / sanctioned trade settlement" },
  { from: "RU", to: "AE", good: "stablecoins", value:  6, rate: 0.8, confidence: "medium", source: "TRM Labs 2023", note: "Russian outflow to Dubai real estate / wealth" },
  { from: "KZ", to: "RU", good: "stablecoins", value:  3, rate: 0.6, confidence: "estimate", source: "Chainalysis 2023" },

  // === STABLECOINS — capital flight & inflation hedging ===
  { from: "CN", to: "HK", good: "stablecoins", value: 18, rate: 1.4, confidence: "estimate", source: "Chainalysis 2023", note: "Grey-channel USDT OTC; primary China capital-flight rail" },
  { from: "CN", to: "SG", good: "stablecoins", value: 10, rate: 1.1, confidence: "estimate", source: "Chainalysis 2023" },
  { from: "CN", to: "US", good: "stablecoins", value:  5, rate: 0.7, confidence: "estimate", source: "Chainalysis 2023" },
  { from: "AR", to: "US", good: "stablecoins", value:  4, rate: 0.7, confidence: "medium", source: "Chainalysis LatAm 2023", note: "ARS inflation hedge → USDC" },
  { from: "VE", to: "US", good: "stablecoins", value:  3, rate: 0.6, confidence: "medium", source: "Chainalysis LatAm 2023", note: "VES hedge; exchanges on/off via US" },
  { from: "NG", to: "US", good: "stablecoins", value:  5, rate: 0.8, confidence: "medium", source: "Chainalysis SSA 2023", note: "Naira hedge; Binance P2P volumes" },
  { from: "NG", to: "GB", good: "stablecoins", value:  2, rate: 0.5, confidence: "estimate", source: "Chainalysis 2023" },
  { from: "TR", to: "US", good: "stablecoins", value:  3, rate: 0.6, confidence: "estimate", source: "Chainalysis 2023", note: "Lira hedge" },
  { from: "LB", to: "AE", good: "stablecoins", value:  1.5, rate: 0.5, confidence: "estimate", source: "Chainalysis MENA 2023", note: "Banking-collapse workaround" },
  { from: "EG", to: "AE", good: "stablecoins", value:  1.2, rate: 0.5, confidence: "estimate", source: "Chainalysis 2023" },
  { from: "IN", to: "AE", good: "stablecoins", value:  4, rate: 0.7, confidence: "estimate", source: "Chainalysis 2023", note: "INR workaround via Dubai" },

  // === STABLECOINS — remittance-replacement corridors ===
  { from: "US", to: "MX", good: "stablecoins", value:  3, rate: 0.6, confidence: "estimate", source: "Circle 2023; Felix / Bitso", note: "USDC remittance rails growing" },
  { from: "US", to: "PH", good: "stablecoins", value:  2, rate: 0.5, confidence: "estimate", source: "Circle 2023; Coins.ph" },
  { from: "US", to: "CO", good: "stablecoins", value:  1, rate: 0.4, confidence: "estimate", source: "Circle 2023" },
  { from: "SG", to: "PH", good: "stablecoins", value:  2, rate: 0.5, confidence: "estimate", source: "Chainalysis 2023" },
  { from: "KR", to: "VN", good: "stablecoins", value:  1.5, rate: 0.5, confidence: "estimate", source: "Chainalysis 2023" },
  { from: "BR", to: "US", good: "stablecoins", value:  2, rate: 0.5, confidence: "estimate", source: "Chainalysis LatAm 2023" },

  // === STABLECOINS — institutional & merchant settlement ===
  { from: "US", to: "SG", good: "stablecoins", value:  8, rate: 0.9, confidence: "estimate", source: "Kaiko 2023", note: "CEX-to-CEX settlement; institutional" },
  { from: "US", to: "HK", good: "stablecoins", value:  5, rate: 0.8, confidence: "estimate", source: "Kaiko 2023" },
  { from: "US", to: "JP", good: "stablecoins", value:  3, rate: 0.6, confidence: "estimate", source: "Kaiko 2023" },

  // === BITCOIN — jurisdiction-to-jurisdiction ===
  { from: "CN", to: "US", good: "bitcoin", value:  8, rate: 0.9, confidence: "estimate", source: "Chainalysis 2023", note: "Capital flight; post-mining-ban liquidations" },
  { from: "CN", to: "HK", good: "bitcoin", value:  5, rate: 0.7, confidence: "estimate", source: "Chainalysis 2023" },
  { from: "RU", to: "AE", good: "bitcoin", value:  5, rate: 0.7, confidence: "medium", source: "TRM Labs 2023", note: "Russian mining BTC → Dubai cash-out" },
  { from: "US", to: "SG", good: "bitcoin", value:  3, rate: 0.6, confidence: "estimate", source: "Kaiko 2023", note: "Institutional cold-storage custody migration" },
  { from: "KR", to: "JP", good: "bitcoin", value:  2, rate: 0.5, confidence: "estimate", source: "Kaiko 2023", note: "Kimchi-premium arbitrage" },
  { from: "NG", to: "GB", good: "bitcoin", value:  1.5, rate: 0.5, confidence: "estimate", source: "Chainalysis SSA 2023", note: "Diaspora + retail" },
  { from: "SV", to: "US", good: "bitcoin", value:  0.8, rate: 0.4, confidence: "estimate", source: "Chainalysis 2023", note: "Post legal-tender tourism + remittance" },
  { from: "AR", to: "US", good: "bitcoin", value:  1, rate: 0.4, confidence: "estimate", source: "Chainalysis LatAm 2023" },
  { from: "TR", to: "AE", good: "bitcoin", value:  2, rate: 0.5, confidence: "estimate", source: "Chainalysis 2023" },
  // Mining rewards (value of newly-mined BTC landing in jurisdiction treasuries)
  { from: "US", to: "US", good: "bitcoin", value: 10, rate: 1.0, confidence: "high", source: "CCAF 2024", note: "~38% of global hashrate; self-loop represents reward accumulation" },
  { from: "RU", to: "RU", good: "bitcoin", value:  2, rate: 0.5, confidence: "medium", source: "CCAF 2024", note: "Russian-domiciled mining rewards" },
  { from: "KZ", to: "CN", good: "bitcoin", value:  1, rate: 0.4, confidence: "estimate", source: "CCAF 2024", note: "Kazakhstan mining → Chinese cashout" },

  // === DEFI — cross-region protocol usage ===
  // DeFi is hardest to geolocate; these are directional TVL/volume flows
  // inferred from front-end IP and connected-wallet KYC.
  { from: "US", to: "SG", good: "crypto-defi", value:  6, rate: 0.7, confidence: "estimate", source: "Kaiko DeFi 2023", note: "US retail → Singapore-jurisdiction protocols" },
  { from: "US", to: "CH", good: "crypto-defi", value:  4, rate: 0.6, confidence: "estimate", source: "Kaiko 2023", note: "Zug-domiciled protocols (Ethereum Foundation, etc)" },
  { from: "KR", to: "SG", good: "crypto-defi", value:  3, rate: 0.6, confidence: "estimate", source: "Chainalysis APAC 2023" },
  { from: "GB", to: "SG", good: "crypto-defi", value:  2, rate: 0.5, confidence: "estimate", source: "Kaiko 2023" },
  { from: "DE", to: "CH", good: "crypto-defi", value:  1.5, rate: 0.5, confidence: "estimate", source: "Kaiko 2023" },
  { from: "VN", to: "SG", good: "crypto-defi", value:  1, rate: 0.4, confidence: "estimate", source: "Chainalysis APAC 2023", note: "Heavy Vietnamese DeFi engagement" },
  { from: "TH", to: "SG", good: "crypto-defi", value:  0.8, rate: 0.4, confidence: "estimate", source: "Chainalysis APAC 2023" },
  { from: "NG", to: "US", good: "crypto-defi", value:  0.6, rate: 0.3, confidence: "estimate", source: "Chainalysis 2023" },
];

export const FLOWS_CRYPTO: Flow[] = RAW_CRYPTO.map((f) => ({
  ...f,
  category: "crypto" as const,
}));
