"use client";

import { useEffect, useRef, useState } from "react";
import {
  Copy,
  Check,
  TrendingUp,
  MessageSquare,
  History,
  Users as UsersIcon,
  Twitter,
  Globe,
  Star,
  Heart,
  Send
} from "lucide-react";
import { TokenDetails, generateHolders, generateLiveTrades, FOMO_POSTS, formatAddress, HolderInfo, LiveTrade, FomoPost } from "@/services/mockData";

interface MiddlePanelProps {
  token: TokenDetails;
}

function getTradingViewSymbol(symbol: string): string {
  const sym = symbol.toUpperCase();
  if (sym === "SOL") return "BINANCE:SOLUSDT";
  if (sym === "BONK") return "BINANCE:BONKUSDT";
  if (sym === "WIF") return "BINANCE:WIFUSDT";
  if (sym === "POPCAT") return "GATEIO:POPCATUSDT";
  if (sym === "CHAD") return "BINANCE:SOLUSDT";
  return `BINANCE:${sym}USDT`;
}

export default function TradingMiddlePanel({ token }: MiddlePanelProps) {
  const [activeTab, setActiveTab] = useState<"chart" | "feed" | "trades" | "holders">("chart");
  const [copied, setCopied] = useState(false);
  const [holders, setHolders] = useState<HolderInfo[]>([]);
  const [liveTrades, setLiveTrades] = useState<LiveTrade[]>([]);
  const [posts, setPosts] = useState<FomoPost[]>(FOMO_POSTS);
  const [newPostText, setNewPostText] = useState("");
  const [starActive, setStarActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Copy token mint address helper
  const copyAddress = () => {
    navigator.clipboard.writeText(token.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    // Regenerate data when token changes
    setHolders(generateHolders(token.symbol));
    setLiveTrades(generateLiveTrades(token.symbol));
  }, [token]);

  // Handle posting a new thesis
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: FomoPost = {
      id: Math.random().toString(36).substring(7),
      username: "You (AnonChad)",
      badge: "degen",
      avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=anon",
      time: "Just now",
      text: newPostText,
      likes: 0,
      comments: 0,
      tokenTarget: token.symbol,
      type: "bullish",
    };

    setPosts([newPost, ...posts]);
    setNewPostText("");
  };

  const isPositive = (token.change24h ?? 0) >= 0;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#08080C] overflow-hidden">
      {/* 1. Header Detailed Information Bar */}
      <div className="p-4 border-b border-white/5 bg-[#09090D] flex flex-wrap items-center justify-between gap-4 shrink-0 select-none">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={token.logoURI}
            alt={token.symbol}
            className="w-10 h-10 rounded-full border border-white/10"
            onError={(e) => {
              e.currentTarget.src = "/logo-white.png";
            }}
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-white">{token.name}</h2>
              <span className="text-[10px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-gray-400 font-bold font-mono">
                {token.symbol}
              </span>
            </div>
            
            {/* Social Icons & Address Link */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] text-gray-500 font-mono">
                {formatAddress(token.address)}
              </span>
              <button
                onClick={copyAddress}
                className="text-gray-500 hover:text-gray-300 transition"
              >
                {copied ? <Check size={10} className="text-accent-green" /> : <Copy size={10} />}
              </button>
              <span className="h-3 w-px bg-white/5" />
              <button className="text-gray-500 hover:text-gray-300 transition">
                <Twitter size={10} />
              </button>
              <button className="text-gray-500 hover:text-gray-300 transition">
                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.87 1.4-8.168L.132 9.21l8.2-1.192L12 .587z" />
                </svg>
              </button>
              <button className="text-gray-500 hover:text-gray-300 transition">
                <Globe size={10} />
              </button>
              <button 
                onClick={() => setStarActive(!starActive)} 
                className={`transition ${starActive ? "text-yellow-500" : "text-gray-500 hover:text-gray-300"}`}
              >
                <Star size={10} fill={starActive ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="flex gap-4 sm:gap-6 flex-wrap font-mono">
          <div>
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Market Cap</p>
            <p className="text-xs font-black text-gray-300">${token.marketCap}</p>
          </div>
          <div>
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Price</p>
            <p className="text-xs font-black text-gray-300">
              $
              {token.price
                ? token.price < 0.01
                  ? token.price.toFixed(6)
                  : token.price.toFixed(2)
                : "0.00"}
            </p>
          </div>
          <div>
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">24H change</p>
            <p className={`text-xs font-black ${isPositive ? "text-accent-green" : "text-accent"}`}>
              {isPositive ? "▲" : "▼"} {Math.abs(token.change24h ?? 0).toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">24H Vol.</p>
            <p className="text-xs font-black text-gray-300">${token.volume24h}</p>
          </div>
          <div>
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Liquidity</p>
            <p className="text-xs font-black text-gray-300">${token.liquidity}</p>
          </div>
          <div>
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Holders</p>
            <p className="text-xs font-black text-gray-300">{token.holdersCount}</p>
          </div>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="border-b border-white/5 bg-[#09090D] flex px-4 shrink-0">
        {[
          { id: "chart", label: "Chart", icon: TrendingUp },
          { id: "feed", label: "Fomo Feed", icon: MessageSquare },
          { id: "trades", label: "Live Trades", icon: History },
          { id: "holders", label: "Holders / Copy Trading", icon: UsersIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-[10px] font-black uppercase tracking-wider transition border-b-2 ${
                isActive
                  ? "border-primary text-primary-light"
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              <Icon size={12} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 3. Tab Contents */}
      <div className="flex-1 overflow-hidden" ref={containerRef}>
        {/* TradingView Candlestick Chart Embed */}
        {activeTab === "chart" && (
          <div className="w-full h-full flex flex-col relative bg-black">
            <div className="flex-1 min-h-0 relative">
              <iframe
                src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_chart&symbol=${getTradingViewSymbol(
                  token.symbol
                )}&interval=15&hidesidetoolbar=1&symboledit=0&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=exchange&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en`}
                className="w-full h-full border-none"
                title="TradingView Chart"
              />
            </div>
            
            {/* Toggles bar underneath chart */}
            <div className="h-10 border-t border-white/5 bg-[#09090D] flex items-center justify-between px-4 text-[10px] text-gray-500 shrink-0 select-none">
              <div className="flex gap-4 font-bold">
                <button className="hover:text-gray-300">1D</button>
                <button className="hover:text-gray-300">1W</button>
                <button className="hover:text-gray-300">1M</button>
                <button className="hover:text-gray-300">3M</button>
                <button className="hover:text-gray-300">1Y</button>
              </div>
              <div className="flex gap-4 items-center">
                <span>Chart overlays</span>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-primary" /> My swaps
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-primary" /> Thesis
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input type="checkbox" className="accent-primary" /> Friends only
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Fomo Social Feed */}
        {activeTab === "feed" && (
          <div className="h-full flex flex-col p-4 overflow-hidden">
            {/* Create Post Form */}
            <form onSubmit={handlePostSubmit} className="flex gap-2 mb-4 shrink-0">
              <input
                type="text"
                placeholder={`What is your thesis on $${token.symbol}?`}
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                className="flex-1 bg-[#0E0E14] border border-white/5 hover:border-white/10 focus:border-primary/50 text-xs text-gray-200 px-4 py-2 rounded-xl outline-none"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl flex items-center justify-center transition shrink-0 font-bold text-xs"
              >
                Post Thesis
              </button>
            </form>

            {/* Social Posts List */}
            <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
              {posts.map((post) => (
                <div key={post.id} className="glass-panel p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.avatar}
                        alt={post.username}
                        className="w-6 h-6 rounded-full border border-white/10"
                      />
                      <span className="text-xs font-bold text-gray-200">{post.username}</span>
                      <span
                        className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                          post.badge === "founder"
                            ? "bg-primary/20 text-primary-light"
                            : post.badge === "whales"
                            ? "bg-secondary/20 text-secondary-light"
                            : "bg-white/10 text-gray-400"
                        }`}
                      >
                        {post.badge}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-500">{post.time}</span>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">{post.text}</p>

                  <div className="flex items-center gap-4 text-[10px] text-gray-500 pt-1">
                    <button className="hover:text-gray-300">❤️ {post.likes}</button>
                    <button className="hover:text-gray-300">💬 {post.comments}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Live Trades Tab */}
        {activeTab === "trades" && (
          <div className="h-full overflow-y-auto p-4">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="text-gray-500 border-b border-white/5 font-bold uppercase tracking-wider text-[9px]">
                  <th className="pb-2">Time</th>
                  <th className="pb-2">Action</th>
                  <th className="pb-2 text-right">Amount ({token.symbol})</th>
                  <th className="pb-2 text-right">Total (USD)</th>
                  <th className="pb-2 text-right">Trader Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02]">
                {liveTrades.map((trade) => (
                  <tr key={trade.id} className="hover:bg-white/[0.01]">
                    <td className="py-2.5 text-gray-500 font-mono">{trade.time}</td>
                    <td
                      className={`py-2.5 font-bold ${
                        trade.type === "buy" ? "text-accent-green" : "text-accent"
                      }`}
                    >
                      {trade.type.toUpperCase()}
                    </td>
                    <td className="py-2.5 text-right font-mono text-gray-300">
                      {trade.amountToken.toLocaleString()}
                    </td>
                    <td className="py-2.5 text-right font-mono text-gray-300">
                      ${trade.amountUSD.toLocaleString()}
                    </td>
                    <td className="py-2.5 text-right text-gray-500 font-mono">
                      {formatAddress(trade.wallet)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Copy Trading Holders Ledger */}
        {activeTab === "holders" && (
          <div className="h-full overflow-y-auto p-4">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="text-gray-500 border-b border-white/5 font-bold uppercase tracking-wider text-[9px]">
                  <th className="pb-2">Trader</th>
                  <th className="pb-2 text-right">Position</th>
                  <th className="pb-2 text-right">PnL</th>
                  <th className="pb-2 text-right font-mono">Avg. Entry</th>
                  <th className="pb-2 pl-6">Thesis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02] font-medium">
                {holders.map((holder) => {
                  const hasThesis = !!holder.thesis;
                  const isPnlPositive = holder.pnlUSD >= 0;
                  return (
                    <tr key={holder.rank} className="hover:bg-white/[0.01]">
                      {/* Trader Info */}
                      <td className="py-3 flex items-center gap-2.5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={holder.avatar}
                          alt={holder.wallet}
                          className="w-6 h-6 rounded-full border border-white/10 bg-[#0E0E12]"
                        />
                        <div>
                          <span className="font-bold text-gray-200 block text-[11px]">
                            {holder.wallet}
                          </span>
                          <span className="text-[8px] text-gray-500 font-bold uppercase">
                            Rank #{holder.rank}
                          </span>
                        </div>
                      </td>

                      {/* Position Value */}
                      <td className="py-3 text-right font-mono">
                        <span className="font-black text-gray-300 block text-[11px]">
                          ${holder.valueUSD.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                        <span className="text-[9px] text-gray-500">
                          {holder.balance.toLocaleString()} {token.symbol}
                        </span>
                      </td>

                      {/* PnL Indicator */}
                      <td className="py-3 text-right font-mono">
                        <span
                          className={`font-black block text-[11px] ${
                            isPnlPositive ? "text-accent-green" : "text-accent"
                          }`}
                        >
                          {isPnlPositive ? "+" : ""}
                          ${holder.pnlUSD.toLocaleString()}
                        </span>
                        <span
                          className={`text-[9px] font-bold ${
                            isPnlPositive ? "text-accent-green" : "text-accent"
                          }`}
                        >
                          {isPnlPositive ? "+" : ""}
                          {holder.pnlPct.toFixed(1)}%
                        </span>
                      </td>

                      {/* Average Entry */}
                      <td className="py-3 text-right text-gray-400 font-mono text-[11px]">
                        {holder.avgEntryMC}
                      </td>

                      {/* Thesis Statement */}
                      <td className="py-3 pl-6 max-w-xs">
                        {hasThesis ? (
                          <div className="flex items-center gap-2 text-gray-400 group">
                            <span className="text-[10px] leading-tight truncate">
                              {holder.thesis}
                            </span>
                            <button className="text-gray-500 hover:text-red-400 transition ml-auto flex items-center gap-0.5 text-[9px] shrink-0 font-bold">
                              <Heart size={9} />
                              {Math.floor(Math.random() * 80) + 10}
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-600 italic text-[10px]">No thesis posted</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
