"use client";

import { useState } from "react";
import { Search, Flame, TrendingDown, TrendingUp, Bell, Trophy, ArrowRightLeft } from "lucide-react";
import { TokenDetails, MOCK_ALERTS, formatAddress } from "@/services/mockData";

interface LeftPanelProps {
  tokens: TokenDetails[];
  selectedToken: TokenDetails;
  onSelectToken: (token: TokenDetails) => void;
}

interface LeaderboardUser {
  rank: number;
  wallet: string;
  pnlUSD: string;
  pnlPct: string;
  winRate: string;
}

const MOCK_LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, wallet: "Ansem_X", pnlUSD: "+$1.2M", pnlPct: "+893.5%", winRate: "78%" },
  { rank: 2, wallet: "PoorGoat_", pnlUSD: "+$293K", pnlPct: "+263.4%", winRate: "68%" },
  { rank: 3, wallet: "RuneCrypto_", pnlUSD: "+$268K", pnlPct: "+237.8%", winRate: "71%" },
  { rank: 4, wallet: "DegenKing", pnlUSD: "+$185K", pnlPct: "+192.4%", winRate: "64%" },
  { rank: 5, wallet: "SolanaBull", pnlUSD: "+$142K", pnlPct: "+128.5%", winRate: "59%" }
];

export default function TradingLeftPanel({
  tokens,
  selectedToken,
  onSelectToken,
}: LeftPanelProps) {
  const [activeTab, setActiveTab] = useState<"alerts" | "tokens" | "leaderboard">("alerts");
  const [search, setSearch] = useState("");

  const filteredTokens = tokens.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const handleAlertClick = (symbol: string) => {
    const matchedToken = tokens.find((t) => t.symbol === symbol);
    if (matchedToken) {
      onSelectToken(matchedToken);
    }
  };

  return (
    <div className="w-full lg:w-80 shrink-0 border-r border-white/5 bg-[#07070A] flex flex-col h-full overflow-hidden">
      {/* 1. Alerts, Tokens, Leaderboard Tab Navigation */}
      <div className="flex border-b border-white/5 bg-[#09090D] px-2 shrink-0">
        {[
          { id: "alerts", label: "Alerts", icon: Bell },
          { id: "tokens", label: "Tokens", icon: Flame },
          { id: "leaderboard", label: "Leaderboard", icon: Trophy },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3.5 text-[10px] font-black uppercase tracking-wider transition border-b-2 ${
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

      {/* 2. Search Box for Tokens */}
      {activeTab === "tokens" && (
        <div className="p-3 border-b border-white/5 shrink-0 relative">
          <Search className="absolute left-6 top-5.5 text-gray-500" size={13} />
          <input
            type="text"
            placeholder="Search name or mint..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0E0E12] border border-white/5 hover:border-white/10 focus:border-primary/50 text-[11px] text-gray-200 pl-8 pr-4 py-2 rounded-lg outline-none transition"
          />
        </div>
      )}

      {/* 3. Panel Body Feed */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {/* Alerts Feed */}
        {activeTab === "alerts" && (
          <div className="space-y-1.5">
            {MOCK_ALERTS.map((alert) => {
              const isBuy = alert.type === "buy";
              return (
                <button
                  key={alert.id}
                  onClick={() => handleAlertClick(alert.tokenSymbol)}
                  className="w-full text-left bg-[#09090D] border border-white/5 hover:border-white/10 p-3 rounded-xl flex items-start gap-3 transition"
                >
                  {/* Alert Icon Indicator */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                      isBuy
                        ? "bg-accent-green/10 text-accent-green border border-accent-green/20"
                        : "bg-accent/10 text-accent border border-accent/20"
                    }`}
                  >
                    {isBuy ? "B" : "S"}
                  </div>

                  <div className="flex-1 min-w-0 leading-tight">
                    <div className="flex justify-between items-center text-[10px] text-gray-400">
                      <span className="font-extrabold text-gray-300">
                        {alert.tradersCount} traders{" "}
                        <span className={isBuy ? "text-accent-green" : "text-accent"}>
                          {alert.type.toUpperCase()}
                        </span>{" "}
                        ${alert.amountUSD}
                      </span>
                      <span className="text-[9px] text-gray-500 font-mono">{alert.time} ago</span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-bold mt-1">
                      {alert.tokenSymbol} at <span className="text-gray-400">${alert.marketCap} MC</span>
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Tokens List Feed */}
        {activeTab === "tokens" && (
          <div className="space-y-1.5">
            {filteredTokens.length === 0 ? (
              <p className="text-xs text-gray-500 text-center py-8">No tokens found</p>
            ) : (
              filteredTokens.map((token) => {
                const isSelected = token.symbol === selectedToken.symbol;
                const isPositive = (token.change24h ?? 0) >= 0;
                return (
                  <button
                    key={token.address}
                    onClick={() => onSelectToken(token)}
                    className={`w-full text-left flex items-center justify-between p-3 rounded-xl border transition duration-150 ${
                      isSelected
                        ? "bg-primary/10 border-primary/45"
                        : "bg-[#09090D] border-white/5 hover:bg-[#0D0D12] hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={token.logoURI}
                        alt={token.symbol}
                        className="w-7 h-7 rounded-full border border-white/10 bg-[#0E0E12] shrink-0"
                        onError={(e) => {
                          e.currentTarget.src = "/logo-white.png";
                        }}
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-black text-gray-200 leading-tight">
                          {token.symbol}
                        </h4>
                        <p className="text-[9px] text-gray-500 truncate w-24">
                          {token.name}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-xs font-extrabold text-gray-300">
                        $
                        {token.price
                          ? token.price < 0.01
                            ? token.price.toFixed(6)
                            : token.price.toFixed(2)
                          : "0.00"}
                      </p>
                      <p
                        className={`text-[9px] font-bold flex items-center justify-end gap-0.5 mt-0.5 ${
                          isPositive ? "text-accent-green" : "text-accent"
                        }`}
                      >
                        {isPositive ? (
                          <TrendingUp size={8} />
                        ) : (
                          <TrendingDown size={8} />
                        )}
                        {token.change24h?.toFixed(2)}%
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        )}

        {/* Leaderboards Feed */}
        {activeTab === "leaderboard" && (
          <div className="space-y-1.5">
            {MOCK_LEADERBOARD.map((user) => (
              <div
                key={user.rank}
                className="bg-[#09090D] border border-white/5 p-3 rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-500 font-extrabold">#{user.rank}</span>
                  <div>
                    <h5 className="text-[10px] font-black text-gray-300">{user.wallet}</h5>
                    <p className="text-[8px] text-gray-500 font-bold">Win Rate: {user.winRate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-accent-green">{user.pnlUSD}</span>
                  <p className="text-[8px] text-primary-light font-bold font-mono">{user.pnlPct}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Split options at bottom */}
      <div className="p-3 border-t border-white/5 bg-[#09090D] grid grid-cols-2 gap-2 shrink-0">
        <button className="bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 text-gray-400 hover:text-white font-bold text-[9px] py-1.5 rounded-lg transition uppercase tracking-wider text-center">
          Split Bottom
        </button>
        <button className="bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 text-gray-400 hover:text-white font-bold text-[9px] py-1.5 rounded-lg transition uppercase tracking-wider text-center">
          Split Right
        </button>
      </div>
    </div>
  );
}
