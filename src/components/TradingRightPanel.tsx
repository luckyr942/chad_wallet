"use client";

import { useEffect, useState } from "react";
import { Settings, Wallet, AlertCircle } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";
import { TokenDetails } from "@/services/mockData";

export interface Position {
  symbol: string;
  balance: number;
  avgBuyPrice: number;
  currentPrice: number;
}

interface RightPanelProps {
  token: TokenDetails;
  cashBalance: number;
  setCashBalance: React.Dispatch<React.SetStateAction<number>>;
  positions: Position[];
  setPositions: React.Dispatch<React.SetStateAction<Position[]>>;
}

export default function TradingRightPanel({
  token,
  cashBalance = 5000.00,
  setCashBalance = () => {},
  positions = [],
  setPositions = () => {},
}: RightPanelProps) {
  const { login, authenticated, user } = usePrivy();
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [usdAmount, setUsdAmount] = useState("");
  const [slippage, setSlippage] = useState("0.5");
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [positionsTab, setPositionsTab] = useState<"open" | "closed">("open");

  const handleSwap = () => {
    if (!usdAmount || isNaN(parseFloat(usdAmount))) return;
    const amountUSD = parseFloat(usdAmount);

    if (tradeType === "buy" && amountUSD > cashBalance) {
      alert("Insufficient Cash Balance!");
      return;
    }
    
    if (tradeType === "sell") {
      const currentPos = positions?.find((p) => p.symbol === token.symbol);
      const maxUSD = currentPos ? (currentPos.balance * currentPos.currentPrice) : 0;
      if (amountUSD > maxUSD) {
        alert("Insufficient Token Balance!");
        return;
      }
    }

    setLoading(true);

    setTimeout(() => {
      const buyPrice = token.price || 1.0;
      const amountTokens = amountUSD / buyPrice;

      if (tradeType === "buy") {
        setCashBalance((prev) => prev - amountUSD);
        setPositions((prev) => {
          const existing = prev?.find((p) => p.symbol === token.symbol);
          if (existing) {
            const newBalance = existing.balance + amountTokens;
            const newAvg = (existing.balance * existing.avgBuyPrice + amountUSD) / newBalance;
            return prev.map((p) =>
              p.symbol === token.symbol
                ? { ...p, balance: newBalance, avgBuyPrice: newAvg }
                : p
            );
          } else {
            return [
              ...(prev || []),
              {
                symbol: token.symbol,
                balance: amountTokens,
                avgBuyPrice: buyPrice,
                currentPrice: buyPrice,
              },
            ];
          }
        });
      } else {
        setCashBalance((prev) => prev + amountUSD);
        setPositions((prev) =>
          (prev || [])
            .map((p) => {
              if (p.symbol === token.symbol) {
                const soldRatio = amountUSD / (p.balance * p.currentPrice);
                const remaining = p.balance * Math.max(0, 1 - soldRatio);
                return { ...p, balance: remaining };
              }
              return p;
            })
            .filter((p) => p.balance > 0.0001 || p.symbol === "SOL")
        );
      }
      setUsdAmount("");
      setLoading(false);
    }, 1200);
  };

  // Close custom percentage of position
  const handleClosePercentage = (posSymbol: string, percentage: number) => {
    setPositions((prev) => {
      const targetPos = prev?.find((p) => p.symbol === posSymbol);
      if (targetPos) {
        const closedTokens = targetPos.balance * (percentage / 100);
        const closedUSD = closedTokens * targetPos.currentPrice;
        setCashBalance((prevCash) => prevCash + closedUSD);
      }
      return (prev || [])
        .map((p) => {
          if (p.symbol === posSymbol) {
            const remaining = p.balance * (1 - percentage / 100);
            return { ...p, balance: remaining };
          }
          return p;
        })
        .filter((p) => p.balance > 0.0001 || p.symbol === "SOL");
    });
  };

  // Simulate active position price ticks
  useEffect(() => {
    const interval = setInterval(() => {
      setPositions((prev) =>
        (prev || []).map((p) => {
          if (p.symbol === "SOL") return p; // keep SOL static for stability
          const fluctuation = 1 + (Math.random() * 0.03 - 0.015);
          return {
            ...p,
            currentPrice: parseFloat((p.currentPrice * fluctuation).toFixed(6)),
          };
        })
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentPosition = positions?.find((p) => p.symbol === token.symbol);
  
  // Calculate output token display
  const receivedAmount =
    usdAmount && token.price
      ? tradeType === "buy"
        ? (parseFloat(usdAmount) / token.price).toFixed(2)
        : (parseFloat(usdAmount) * token.price).toFixed(2)
      : "0";

  // Calculate ratio metrics for displays
  const buysPercent = (token.buysCount / (token.buysCount + token.sellsCount)) * 100;
  const volPercent = (token.buyVolumeUSD / (token.buyVolumeUSD + token.sellVolumeUSD)) * 100;
  const buyersPercent = (token.buyersCount / (token.buyersCount + token.sellersCount)) * 100;

  return (
    <div className="w-full lg:w-80 shrink-0 border-l border-white/5 bg-[#07070A] p-4 flex flex-col gap-4.5 h-full overflow-y-auto select-none">
      {/* 1. Buy & Sell Tabs */}
      <div className="flex bg-[#0E0E12] rounded-xl p-1 border border-white/5 shrink-0">
        <button
          onClick={() => {
            setTradeType("buy");
            setUsdAmount("");
          }}
          className={`flex-1 py-2 text-xs font-black uppercase rounded-lg transition duration-200 ${
            tradeType === "buy"
              ? "bg-[#10B981] text-white shadow-md shadow-accent-green/20"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => {
            setTradeType("sell");
            setUsdAmount("");
          }}
          className={`flex-1 py-2 text-xs font-black uppercase rounded-lg transition duration-200 ${
            tradeType === "sell"
              ? "bg-accent text-white shadow-md shadow-accent/20"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          Sell
        </button>
      </div>

      {/* 2. Order Widget Panel */}
      <div className="space-y-4 shrink-0 bg-[#09090D] border border-white/5 p-4 rounded-2xl">
        <div className="space-y-1">
          <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold uppercase">
            <span>Amount (USD)</span>
            <span className="font-mono">
              Available: {tradeType === "buy" ? `$${cashBalance.toFixed(2)}` : `${(currentPosition?.balance || 0).toFixed(4)} ${token.symbol}`}
            </span>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-2 text-lg font-black text-gray-500">$</span>
            <input
              type="number"
              placeholder="0"
              value={usdAmount}
              onChange={(e) => setUsdAmount(e.target.value)}
              className="w-full bg-[#0E0E12] border border-white/5 hover:border-white/10 focus:border-primary/50 text-xl font-black text-gray-200 pl-8 pr-12 py-2 rounded-xl outline-none font-mono"
            />
            <button 
              onClick={() => setShowSettings(!showSettings)} 
              className="absolute right-4 top-3 text-gray-500 hover:text-gray-300 transition"
            >
              <Settings size={13} />
            </button>
          </div>
        </div>

        {/* Quick select buttons */}
        <div className="grid grid-cols-4 gap-1.5 text-[10px] font-bold text-gray-400">
          {["10", "100", "500", "1000"].map((val) => (
            <button
              key={val}
              onClick={() => setUsdAmount(val)}
              className="bg-[#0E0E12] border border-white/5 hover:border-white/10 hover:text-white py-1.5 rounded-lg transition"
            >
              ${val}
            </button>
          ))}
        </div>

        {/* Slippage overlay */}
        {showSettings && (
          <div className="bg-[#0E0E12] border border-white/5 p-2 rounded-lg flex justify-between gap-1">
            {["0.1", "0.5", "1.0", "Auto"].map((val) => (
              <button
                key={val}
                onClick={() => setSlippage(val)}
                className={`flex-1 py-1 rounded text-[9px] font-bold border transition ${
                  slippage === val
                    ? "bg-primary/10 border-primary/50 text-primary-light"
                    : "border-white/5 text-gray-500"
                }`}
              >
                {val === "Auto" ? "Auto" : `${val}%`}
              </button>
            ))}
          </div>
        )}

        {/* Swap CTA */}
        {!authenticated ? (
          <button
            onClick={login}
            className="w-full bg-primary hover:bg-primary-dark text-white font-extrabold py-3 rounded-xl transition duration-200 flex items-center justify-center gap-1.5 text-xs shadow-md shadow-primary/20"
          >
            <Wallet size={14} /> Sign In to Swap
          </button>
        ) : (
          <button
            onClick={handleSwap}
            disabled={loading || !usdAmount}
            className={`w-full font-black py-3 rounded-xl transition duration-200 text-xs text-white ${
              tradeType === "buy"
                ? "bg-accent-green hover:bg-accent-green/80"
                : "bg-accent hover:bg-accent/80"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? "Simulating transaction..." : `${tradeType === "buy" ? "Buy" : "Sell"} ${token.symbol}`}
          </button>
        )}
      </div>

      {/* 3. About Token & Activity Ratios */}
      <div className="bg-[#09090D] border border-white/5 p-4 rounded-2xl space-y-4 shrink-0">
        <div>
          <h4 className="text-xs font-black text-gray-200">About {token.symbol}</h4>
          <p className="text-[10px] text-gray-500 leading-normal mt-1.5">
            {token.description}
          </p>
        </div>

        {/* Time Performance Grids */}
        <div className="grid grid-cols-4 gap-1 text-[9px] font-black font-mono">
          {[
            { label: "5M", val: token.performance["5m"] },
            { label: "1H", val: token.performance["1h"] },
            { label: "4H", val: token.performance["4h"] },
            { label: "1D", val: token.performance["1d"] },
          ].map((perf) => {
            const isPos = perf.val >= 0;
            return (
              <div key={perf.label} className="bg-[#0E0E12] border border-white/5 p-1.5 rounded-lg text-center">
                <span className="text-gray-500 block">{perf.label}</span>
                <span className={isPos ? "text-accent-green" : "text-accent"}>
                  {isPos ? "+" : ""}{perf.val.toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>

        {/* Ratio Progress Bars */}
        <div className="space-y-3 pt-1 text-[9px] font-bold text-gray-400">
          {/* Buys vs Sells */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-accent-green">{token.buysCount} buys</span>
              <span className="text-accent">{token.sellsCount} sells</span>
            </div>
            <div className="w-full h-1.5 bg-accent rounded-full overflow-hidden flex">
              <div className="h-full bg-accent-green" style={{ width: `${buysPercent}%` }} />
            </div>
          </div>

          {/* Volume ratio */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-accent-green">${(token.buyVolumeUSD / 1000).toFixed(0)}K vol.</span>
              <span className="text-accent">${(token.sellVolumeUSD / 1000).toFixed(0)}K vol.</span>
            </div>
            <div className="w-full h-1.5 bg-accent rounded-full overflow-hidden flex">
              <div className="h-full bg-accent-green" style={{ width: `${volPercent}%` }} />
            </div>
          </div>

          {/* Buyers vs Sellers */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-accent-green">{token.buyersCount} buyers</span>
              <span className="text-accent">{token.sellersCount} sellers</span>
            </div>
            <div className="w-full h-1.5 bg-accent rounded-full overflow-hidden flex">
              <div className="h-full bg-accent-green" style={{ width: `${buyersPercent}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Active Positions Tracker */}
      <div className="flex-1 flex flex-col gap-2.5 bg-[#09090D] border border-white/5 p-4 rounded-2xl overflow-hidden min-h-[200px]">
        <div className="flex items-center justify-between shrink-0">
          <h4 className="text-xs font-black text-gray-200">Your Positions</h4>
          <div className="flex bg-[#0E0E12] border border-white/5 p-0.5 rounded-lg text-[9px] font-bold text-gray-500">
            <button
              onClick={() => setPositionsTab("open")}
              className={`px-2 py-0.5 rounded-md transition ${
                positionsTab === "open" ? "bg-white/5 text-gray-200" : ""
              }`}
            >
              Open
            </button>
            <button
              onClick={() => setPositionsTab("closed")}
              className={`px-2 py-0.5 rounded-md transition ${
                positionsTab === "closed" ? "bg-white/5 text-gray-200" : ""
              }`}
            >
              Closed
            </button>
          </div>
        </div>

        <div className="space-y-2.5 flex-1 overflow-y-auto pr-1">
          {positionsTab === "closed" ? (
            <p className="text-[10px] text-gray-600 text-center py-6 font-medium">No closed positions</p>
          ) : positions.length === 0 ? (
            <p className="text-[10px] text-gray-600 text-center py-6 font-medium font-bold">No open positions</p>
          ) : (
            positions.map((pos) => {
              const totalCost = pos.balance * pos.avgBuyPrice;
              const currentValue = pos.balance * pos.currentPrice;
              const pnlAbs = currentValue - totalCost;
              const pnlPct = (pnlAbs / (totalCost || 1)) * 100;
              const isPos = pnlAbs >= 0;

              return (
                <div key={pos.symbol} className="bg-[#0E0E12] border border-white/5 p-3 rounded-xl space-y-2 font-mono">
                  <div className="flex justify-between items-center text-[10px]">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-gray-200">{pos.symbol}</span>
                      <span className="text-[8px] text-gray-500">{pos.balance.toFixed(4)} tokens</span>
                    </div>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        isPos ? "bg-accent-green/10 text-accent-green" : "bg-accent/10 text-accent"
                      }`}
                    >
                      {isPos ? "+" : ""}
                      {pnlPct.toFixed(2)}%
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[9px] text-gray-500 font-bold">
                    <span>Avg Buy: ${pos.avgBuyPrice.toFixed(2)}</span>
                    <span className="font-black text-gray-300">${currentValue.toFixed(2)}</span>
                  </div>

                  {pos.symbol !== "SOL" && (
                    <div className="grid grid-cols-3 gap-1 pt-1 text-[8px] font-bold">
                      <button
                        onClick={() => handleClosePercentage(pos.symbol, 20)}
                        className="bg-white/5 hover:bg-white/10 text-gray-300 py-1 rounded transition uppercase"
                      >
                        20%
                      </button>
                      <button
                        onClick={() => handleClosePercentage(pos.symbol, 50)}
                        className="bg-white/5 hover:bg-white/10 text-gray-300 py-1 rounded transition uppercase"
                      >
                        50%
                      </button>
                      <button
                        onClick={() => handleClosePercentage(pos.symbol, 100)}
                        className="bg-accent/15 hover:bg-accent/25 text-accent py-1 rounded transition uppercase"
                      >
                        All
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
