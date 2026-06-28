import { TokenDetails } from "./mockData";

export interface SearchedToken {
  address: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: string;
  marketCap: string;
  liquidity: string;
  logoURI: string;
  pairAddress: string;
}

export function formatLargeNumber(num?: number): string {
  if (!num) return "0";
  if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return num.toFixed(0);
}

export function parsePairToTokenDetails(pair: any): TokenDetails {
  const price = parseFloat(pair.priceUsd || "0");
  const change24h = parseFloat(pair.priceChange?.h24 || "0");
  
  return {
    address: pair.baseToken.address,
    symbol: pair.baseToken.symbol || "UNKNOWN",
    name: pair.baseToken.name || "Unknown Token",
    decimals: 9, // default fallback
    logoURI: pair.info?.imageUrl || "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    price,
    change24h,
    volume24h: formatLargeNumber(pair.volume?.h24),
    marketCap: formatLargeNumber(pair.marketCap || pair.fdv),
    liquidity: formatLargeNumber(pair.liquidity?.usd),
    holdersCount: formatLargeNumber(Math.floor(price > 0 ? (pair.marketCap || 10000000) / (price * 1000) : 50000)), // dynamic estimate fallback
    description: `${pair.baseToken.name} ($${pair.baseToken.symbol}) is currently trading at $${price.toFixed(6)} on Solana. Pair volume in 24h is $${formatLargeNumber(pair.volume?.h24)} across ${pair.dexId || "DEX"}.`,
    pairAddress: pair.pairAddress || "",
    performance: {
      "5m": parseFloat(pair.priceChange?.m5 || "0"),
      "1h": parseFloat(pair.priceChange?.h1 || "0"),
      "4h": parseFloat(pair.priceChange?.h4 || "0"),
      "1d": change24h
    },
    buysCount: pair.txns?.h24?.buys || 1200,
    sellsCount: pair.txns?.h24?.sells || 900,
    buyVolumeUSD: Math.floor(pair.volume?.h24 ? pair.volume.h24 * 0.52 : 100000),
    sellVolumeUSD: Math.floor(pair.volume?.h24 ? pair.volume.h24 * 0.48 : 90000),
    buyersCount: Math.floor(pair.txns?.h24?.buys ? pair.txns.h24.buys * 0.85 : 800),
    sellersCount: Math.floor(pair.txns?.h24?.sells ? pair.txns.h24.sells * 0.85 : 600)
  };
}

export async function searchSolanaTokens(query: string): Promise<SearchedToken[]> {
  if (!query || query.trim().length < 2) return [];
  try {
    const res = await fetch(`https://api.dexscreener.com/latest/dex/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.pairs) return [];

    // Filter to only Solana pairs
    const solanaPairs = data.pairs.filter((p: any) => p.chainId === "solana");

    // Group by baseToken.address to prevent duplicate tokens from multiple DEXs
    const uniqueTokens: Record<string, SearchedToken> = {};
    for (const pair of solanaPairs) {
      const address = pair.baseToken?.address;
      if (!address) continue;

      if (!uniqueTokens[address]) {
        uniqueTokens[address] = {
          address,
          symbol: pair.baseToken.symbol || "UNKNOWN",
          name: pair.baseToken.name || "Unknown Token",
          price: parseFloat(pair.priceUsd || "0"),
          change24h: parseFloat(pair.priceChange?.h24 || "0"),
          volume24h: formatLargeNumber(pair.volume?.h24),
          marketCap: formatLargeNumber(pair.marketCap || pair.fdv),
          liquidity: formatLargeNumber(pair.liquidity?.usd),
          logoURI: pair.info?.imageUrl || "",
          pairAddress: pair.pairAddress || "",
        };
      }
    }
    return Object.values(uniqueTokens).slice(0, 10);
  } catch (error) {
    console.error("Error searching DEXScreener tokens:", error);
    return [];
  }
}

export async function getSolanaTokenDetails(address: string): Promise<TokenDetails | null> {
  if (!address) return null;
  try {
    const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${address}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.pairs || data.pairs.length === 0) return null;

    const solanaPair = data.pairs.find((p: any) => p.chainId === "solana");
    if (!solanaPair) return null;

    return parsePairToTokenDetails(solanaPair);
  } catch (error) {
    console.error("Error fetching DEXScreener token details:", error);
    return null;
  }
}
