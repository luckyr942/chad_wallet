import { TokenDetails } from "./mockData";
import { formatLargeNumber } from "./dexscreener";

const BIRDEYE_BASE_URL = "https://public-api.birdeye.so";

// Get BirdEye API headers
function getHeaders(): HeadersInit {
  const apiKey = process.env.NEXT_PUBLIC_BIRDEYE_API_KEY || "";
  return {
    "X-API-KEY": apiKey,
    "x-chain": "solana",
    "Accept": "application/json",
  };
}

export interface BirdEyePriceResponse {
  success: boolean;
  data: {
    value: number;
    updateUnixTime: number;
  };
}

export interface BirdEyeOverviewResponse {
  success: boolean;
  data: {
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    price: number;
    priceChange24hPercent: number;
    v24hUSD?: number;
    v24h?: number;
    marketCap?: number;
    fdv?: number;
    liquidity?: number;
    logoURI?: string;
    holder?: number;
    trade24h?: number;
    buy24h?: number;
    sell24h?: number;
    buyVolume24h?: number;
    sellVolume24h?: number;
    trade24hUniqueWallet?: number;
  };
}

/**
 * Fetch token price from BirdEye
 */
export async function getBirdEyePrice(address: string): Promise<number | null> {
  try {
    const res = await fetch(`${BIRDEYE_BASE_URL}/defi/price?address=${address}`, {
      headers: getHeaders(),
    });
    if (!res.ok) return null;
    const data: BirdEyePriceResponse = await res.json();
    return data.success ? data.data.value : null;
  } catch (error) {
    console.error("Error fetching BirdEye token price:", error);
    return null;
  }
}

/**
 * Fetch detailed token overview statistics from BirdEye and map to TokenDetails
 */
export async function getBirdEyeTokenDetails(address: string): Promise<TokenDetails | null> {
  try {
    const res = await fetch(`${BIRDEYE_BASE_URL}/defi/token_overview?address=${address}`, {
      headers: getHeaders(),
    });
    if (!res.ok) return null;
    const data: BirdEyeOverviewResponse = await res.json();
    if (!data.success || !data.data) return null;

    const ov = data.data;
    const price = ov.price || 0;

    return {
      address: ov.address,
      symbol: ov.symbol || "UNKNOWN",
      name: ov.name || "Unknown Token",
      decimals: ov.decimals || 9,
      logoURI: ov.logoURI || "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
      price: price,
      change24h: ov.priceChange24hPercent || 0,
      volume24h: formatLargeNumber(ov.v24hUSD || ov.v24h || 0),
      marketCap: formatLargeNumber(ov.marketCap || ov.fdv || 0),
      liquidity: formatLargeNumber(ov.liquidity || 0),
      holdersCount: formatLargeNumber(ov.holder || 0),
      description: `${ov.name} ($${ov.symbol}) is trading at $${price.toFixed(6)} on Solana.`,
      pairAddress: "",
      performance: {
        "5m": 0,
        "1h": 0,
        "4h": 0,
        "1d": ov.priceChange24hPercent || 0,
      },
      buysCount: ov.buy24h || 100,
      sellsCount: ov.sell24h || 80,
      buyVolumeUSD: Math.floor(ov.buyVolume24h || 0),
      sellVolumeUSD: Math.floor(ov.sellVolume24h || 0),
      buyersCount: Math.floor((ov.trade24hUniqueWallet || 100) * 0.55),
      sellersCount: Math.floor((ov.trade24hUniqueWallet || 100) * 0.45),
    };
  } catch (error) {
    console.error("Error fetching BirdEye token details:", error);
    return null;
  }
}
