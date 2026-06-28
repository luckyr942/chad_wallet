import { PRESETS, TokenInfo } from "./jupiter";

export interface LiveTrade {
  id: string;
  type: "buy" | "sell";
  amountToken: number;
  amountUSD: number;
  wallet: string;
  time: string;
  txHash: string;
}

export interface HolderInfo {
  rank: number;
  wallet: string;
  balance: number;
  valueUSD: number;
  percentage: number;
  pnlUSD: number;
  pnlPct: number;
  avgEntryMC: string;
  thesis?: string;
  avatar: string;
}

export interface FomoPost {
  id: string;
  username: string;
  badge: "whales" | "degen" | "caller" | "founder";
  avatar: string;
  time: string;
  text: string;
  likes: number;
  comments: number;
  tokenTarget?: string;
  type: "bullish" | "bearish" | "neutral";
}

export interface TradingAlert {
  id: string;
  tokenSymbol: string;
  tradersCount: number;
  type: "buy" | "sell";
  amountUSD: string;
  marketCap: string;
  time: string;
}

// Token extended details type
export interface TokenDetails extends TokenInfo {
  volume24h: string;
  marketCap: string;
  liquidity: string;
  holdersCount: string;
  description: string;
  pairAddress: string;
  performance: {
    "5m": number;
    "1h": number;
    "4h": number;
    "1d": number;
  };
  buysCount: number;
  sellsCount: number;
  buyVolumeUSD: number;
  sellVolumeUSD: number;
  buyersCount: number;
  sellersCount: number;
}

// 1. Core Token List with Extended fomo-style metrics and real pair addresses
export const TRENDING_TOKENS: TokenDetails[] = [
  {
    address: PRESETS.SOL,
    symbol: "SOL",
    name: "Solana",
    decimals: 9,
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    price: 184.20,
    change24h: 3.42,
    volume24h: "4.2B",
    marketCap: "82.4B",
    liquidity: "128.5M",
    holdersCount: "4.8M",
    description: "Solana native asset. The layer-1 blockchain powering the fastest meme and DeFi transactions on earth.",
    pairAddress: "58oQChx4yWJZqQ5yzA2ywtmMigwpCgJZGsug22gpg7v5",
    performance: {
      "5m": 0.12,
      "1h": -0.45,
      "4h": 1.25,
      "1d": 3.42
    },
    buysCount: 14520,
    sellsCount: 13910,
    buyVolumeUSD: 2450000,
    sellVolumeUSD: 2120000,
    buyersCount: 8900,
    sellersCount: 8400
  },
  {
    address: PRESETS.BONK,
    symbol: "BONK",
    name: "Bonk",
    decimals: 5,
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DezXAZ8z7PnrnRJjz3wJaR6WczXXNgQR23dyHm8PPxX7/logo.png",
    price: 0.00002130,
    change24h: 12.80,
    volume24h: "28.5M",
    marketCap: "1.4B",
    liquidity: "12.4M",
    holdersCount: "740K",
    description: "BONK is the social utility token of Solana, distributed to developers, creators, and NFT holders.",
    pairAddress: "6oFWm7KPLfxnwMb3z5xwBoXNSPP3JJyirAPqPSiVcnsp",
    performance: {
      "5m": -0.85,
      "1h": 1.95,
      "4h": 5.40,
      "1d": 12.80
    },
    buysCount: 4890,
    sellsCount: 4210,
    buyVolumeUSD: 450000,
    sellVolumeUSD: 390000,
    buyersCount: 2900,
    sellersCount: 2400
  },
  {
    address: PRESETS.WIF,
    symbol: "WIF",
    name: "dogwifhat",
    decimals: 6,
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EKpQGSJtjMFqKZ9KQwSqss1Yt9Gsw3EBEn99kwXSpapF/logo.png",
    price: 2.15,
    change24h: -4.50,
    volume24h: "18.2M",
    marketCap: "2.1B",
    liquidity: "9.8M",
    holdersCount: "185K",
    description: "Literally just a dog wif a hat. The legendary meme token that defined the Solana bull market.",
    pairAddress: "D6NdKrKNQPmRZCCnG1GqXtF7MMoHB7qR6GU5TkG59Qz1",
    performance: {
      "5m": -0.20,
      "1h": -1.10,
      "4h": -2.35,
      "1d": -4.50
    },
    buysCount: 3120,
    sellsCount: 3560,
    buyVolumeUSD: 210000,
    sellVolumeUSD: 245000,
    buyersCount: 1750,
    sellersCount: 1980
  },
  {
    address: PRESETS.POPCAT,
    symbol: "POPCAT",
    name: "Popcat",
    decimals: 6,
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7GCih62J8Z7F7H2zvtabdJF8GSVphgtc34whc5CgpQeg/logo.png",
    price: 1.34,
    change24h: 18.25,
    volume24h: "9.4M",
    marketCap: "1.3B",
    liquidity: "5.2M",
    holdersCount: "92K",
    description: "Popcat is the viral internet clicker cat meme coin ruling the cat coin charts on Solana.",
    pairAddress: "FRhB8L7Y9Qq41qZXYLtC2nw8An1RJfLLxRF2x9RwLLMo",
    performance: {
      "5m": 1.45,
      "1h": 3.10,
      "4h": 8.90,
      "1d": 18.25
    },
    buysCount: 2450,
    sellsCount: 1980,
    buyVolumeUSD: 185000,
    sellVolumeUSD: 142000,
    buyersCount: 1420,
    sellersCount: 1150
  },
  {
    address: PRESETS.CHAD,
    symbol: "CHAD",
    name: "ChadWallet Token",
    decimals: 9,
    logoURI: "/logo-white.png", // uses local logo asset
    price: 0.88,
    change24h: 24.50,
    volume24h: "1.2M",
    marketCap: "8.5M",
    liquidity: "450K",
    holdersCount: "14K",
    description: "The native meme asset powering ChadWallet. Zero fees, copy-trading rewards, and gas refunds.",
    pairAddress: "58oQChx4yWJZqQ5yzA2ywtmMigwpCgJZGsug22gpg7v5",
    performance: {
      "5m": -0.15,
      "1h": 2.45,
      "4h": 9.20,
      "1d": 24.50
    },
    buysCount: 1240,
    sellsCount: 890,
    buyVolumeUSD: 85000,
    sellVolumeUSD: 52000,
    buyersCount: 890,
    sellersCount: 610
  }
];

// Helper to obfuscate address
export function formatAddress(addr: string) {
  return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
}

// 2. Generate live trades list
export function generateLiveTrades(tokenSymbol: string): LiveTrade[] {
  const actions = ["buy", "sell"] as const;
  const trades: LiveTrade[] = [];
  
  for (let i = 0; i < 15; i++) {
    const type = actions[Math.floor(Math.random() * actions.length)];
    const amountToken = Math.floor(Math.random() * 50000) + 100;
    const amountUSD = amountToken * (tokenSymbol === "SOL" ? 0.05 : 0.0001);
    
    trades.push({
      id: Math.random().toString(36).substring(7),
      type,
      amountToken: parseFloat(amountToken.toFixed(2)),
      amountUSD: parseFloat((amountUSD + 5).toFixed(2)),
      wallet: generateRandomAddress(),
      time: `${i + 1}s ago`,
      txHash: generateRandomHash()
    });
  }
  return trades;
}

// 3. Generate Holder distribution list with fomo-style parameters
const THESES = [
  "higher ceilings this is abt to go mental",
  "buying dips every single time, conviction high",
  "solid copy trading target, absolute whale accumulation",
  "founder wallets confirmed locked, check contract",
  "next popcat candidate, absolute sender",
  "sleeping giant, wait for breakout",
  "descending wedge broken on 15m chart, sending now",
  "liquidity pool is growing, bullish"
];

const USERNAMES = [
  "PoorGoat_", "RuneCrypto_", "SolanaBull", "DegenKing", 
  "AnsemDisciple", "GigaChad0x", "WhaleWatcher", "MemeLord"
];

export function generateHolders(tokenSymbol: string): HolderInfo[] {
  const holders: HolderInfo[] = [];
  let totalPct = 100;
  
  for (let i = 1; i <= 10; i++) {
    const pct = parseFloat((totalPct * (0.3 - (i * 0.02))).toFixed(2));
    const balance = Math.floor(5000000 / i);
    const valueUSD = balance * (tokenSymbol === "SOL" ? 0.05 : 0.0001);
    const pnlAbs = valueUSD * (Math.random() * 5 - 1.5);
    const pnlPct = (pnlAbs / valueUSD) * 100;
    
    holders.push({
      rank: i,
      wallet: USERNAMES[i - 1] || generateRandomAddress().slice(0, 8) + "_",
      balance,
      valueUSD: parseFloat(valueUSD.toFixed(2)),
      percentage: pct,
      pnlUSD: parseFloat(pnlAbs.toFixed(2)),
      pnlPct: parseFloat(pnlPct.toFixed(2)),
      avgEntryMC: `${(Math.floor(Math.random() * 20) + 1).toFixed(1)}M MC`,
      thesis: Math.random() > 0.3 ? THESES[Math.floor(Math.random() * THESES.length)] : undefined,
      avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${i * 5}`
    });
  }
  return holders;
}

// 4. Social Posts (Fomo Feed)
export const FOMO_POSTS: FomoPost[] = [
  {
    id: "1",
    username: "ChadDegen_69",
    badge: "degen",
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=chad",
    time: "2m ago",
    text: "Just loaded 50 SOL into WIF. The chart is screaming breakout. Descending wedge pattern cleared. LFG 🚀",
    likes: 42,
    comments: 8,
    tokenTarget: "WIF",
    type: "bullish"
  },
  {
    id: "2",
    username: "SolanaWhale",
    badge: "whales",
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=whale",
    time: "15m ago",
    text: "ChadWallet is easily the cleanest trading interface. No gas headaches, simple Privy onboarding. Solana UX is finally matching retail expectations.",
    likes: 128,
    comments: 24,
    type: "bullish"
  },
  {
    id: "3",
    username: "TokenCaller_X",
    badge: "caller",
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=call",
    time: "40m ago",
    text: "Watch out for $POPCAT here. Volume is dying down on this local high, might see a retracement back to $1.20 support before next leg up.",
    likes: 19,
    comments: 11,
    tokenTarget: "POPCAT",
    type: "bearish"
  },
  {
    id: "4",
    username: "ChadWallet_CEO",
    badge: "founder",
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=ceo",
    time: "1h ago",
    text: "Welcome to the future of trading. Free memecoin swaps, zero slippage surprises, fully cross-chain. Tell your friends. ChadWallet is here.",
    likes: 312,
    comments: 52,
    tokenTarget: "CHAD",
    type: "bullish"
  }
];

// 5. Live Alerts Feed for Left Panel
export const MOCK_ALERTS: TradingAlert[] = [
  {
    id: "a1",
    tokenSymbol: "CHAD",
    tradersCount: 20,
    type: "buy",
    amountUSD: "37.5K",
    marketCap: "8.5M",
    time: "1h"
  },
  {
    id: "a2",
    tokenSymbol: "SOL",
    tradersCount: 15,
    type: "sell",
    amountUSD: "205.3K",
    marketCap: "82.4B",
    time: "3h"
  },
  {
    id: "a3",
    tokenSymbol: "WIF",
    tradersCount: 42,
    type: "buy",
    amountUSD: "159.4K",
    marketCap: "2.1B",
    time: "7h"
  },
  {
    id: "a4",
    tokenSymbol: "BONK",
    tradersCount: 8,
    type: "sell",
    amountUSD: "94K",
    marketCap: "1.4B",
    time: "9h"
  },
  {
    id: "a5",
    tokenSymbol: "POPCAT",
    tradersCount: 28,
    type: "buy",
    amountUSD: "73.9K",
    marketCap: "1.3B",
    time: "11h"
  },
  {
    id: "a6",
    tokenSymbol: "CHAD",
    tradersCount: 19,
    type: "buy",
    amountUSD: "82.9K",
    marketCap: "8.5M",
    time: "23h"
  },
  {
    id: "a7",
    tokenSymbol: "SOL",
    tradersCount: 35,
    type: "buy",
    amountUSD: "149.7K",
    marketCap: "82.4B",
    time: "2d"
  }
];

function generateRandomAddress(): string {
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let address = "";
  for (let i = 0; i < 44; i++) {
    address += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return address;
}

function generateRandomHash(): string {
  const chars = "123456789abcdefghijklmnopqrstuvwxyz";
  let hash = "";
  for (let i = 0; i < 84; i++) {
    hash += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return hash;
}
