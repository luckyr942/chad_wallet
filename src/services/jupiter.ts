export interface TokenInfo {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
  price?: number;
  change24h?: number;
}

// Fetch live USD prices for a list of token mint addresses from Jupiter Price API V2
export async function fetchTokenPrices(mints: string[]): Promise<Record<string, number>> {
  if (!mints.length) return {};
  try {
    const res = await fetch(`https://api.jup.ag/price/v2?ids=${mints.join(",")}`);
    const data = await res.json();
    const prices: Record<string, number> = {};
    for (const mint of mints) {
      prices[mint] = parseFloat(data.data[mint]?.price || "0");
    }
    return prices;
  } catch (error) {
    console.error("Error fetching Jupiter prices:", error);
    return {};
  }
}

// Fetch swap quotes from Jupiter Routing API V6
export async function getSwapQuote(
  inputMint: string,
  outputMint: string,
  amountInSmallestUnits: number,
  slippageBps: number = 50
) {
  try {
    const url = `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amountInSmallestUnits}&slippageBps=${slippageBps}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Jupiter Quote API returned status ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error getting Jupiter Swap Quote:", error);
    return null;
  }
}

// Public RPC standard tokens configuration
export const PRESETS = {
  SOL: "So11111111111111111111111111111111111111112",
  USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  BONK: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
  WIF: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
  POPCAT: "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr",
  CHAD: "63V11111111111111111111111111111111111111111" // Simulated / Custom mint for ChadWallet
};
