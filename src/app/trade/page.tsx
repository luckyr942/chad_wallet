"use client";

import Link from "next/link";
import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Wallet, ArrowLeft, Loader2, Check } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";
import { TRENDING_TOKENS, TokenDetails } from "@/services/mockData";
import { searchSolanaTokens, getSolanaTokenDetails, SearchedToken } from "@/services/dexscreener";
import TradingLeftPanel from "@/components/TradingLeftPanel";
import TradingMiddlePanel from "@/components/TradingMiddlePanel";
import TradingRightPanel, { Position } from "@/components/TradingRightPanel";

function TradeTerminalCore() {
  const searchParams = useSearchParams();
  const { login, logout, authenticated, user } = usePrivy();
  
  const [selectedToken, setSelectedToken] = useState<TokenDetails>(TRENDING_TOKENS[0]);
  const [searchVal, setSearchVal] = useState("");
  const [searchResults, setSearchResults] = useState<SearchedToken[]>([]);
  const [recentSearches, setRecentSearches] = useState<TokenDetails[]>([
    TRENDING_TOKENS[3], // POPCAT
    TRENDING_TOKENS[2]  // WIF
  ]);
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [cashBalance, setCashBalance] = useState(5000.00);
  const [positions, setPositions] = useState<Position[]>([
    {
      symbol: "SOL",
      balance: 1.45,
      avgBuyPrice: 178.5,
      currentPrice: 184.2,
    },
  ]);

  // Read query parameter e.g., ?token=BONK
  useEffect(() => {
    const tokenQuery = searchParams.get("token");
    if (tokenQuery) {
      const match = TRENDING_TOKENS.find(
        (t) => t.symbol.toUpperCase() === tokenQuery.toUpperCase()
      );
      if (match) {
        setSelectedToken(match);
      }
    }
  }, [searchParams]);

  // Debounced search query handler
  useEffect(() => {
    if (!searchVal || searchVal.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setSearchLoading(true);
      const results = await searchSolanaTokens(searchVal);
      setSearchResults(results);
      setSearchLoading(false);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchVal]);

  // Periodic price polling (every 10 seconds) to update selected token details
  useEffect(() => {
    if (!selectedToken?.address) return;
    
    const interval = setInterval(async () => {
      const freshDetails = await getSolanaTokenDetails(selectedToken.address);
      if (freshDetails) {
        setSelectedToken((prev) => ({
          ...prev,
          ...freshDetails,
          // Retain manual descriptions if dexscreener returns template info
          description: prev.description.includes("is currently trading")
            ? freshDetails.description
            : prev.description
        }));
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [selectedToken?.address]);

  // Close search dropdown on clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update selected token and load live stats
  const selectNewToken = async (token: TokenDetails | SearchedToken) => {
    setShowDropdown(false);
    setSearchVal("");

    if ("description" in token) {
      // If it's already a full TokenDetails object
      setSelectedToken(token as TokenDetails);
      addRecentSearch(token as TokenDetails);
    } else {
      // If it's a SearchedToken, load full statistics first
      setSearchLoading(true);
      const fullDetails = await getSolanaTokenDetails(token.address);
      setSearchLoading(false);
      
      if (fullDetails) {
        setSelectedToken(fullDetails);
        addRecentSearch(fullDetails);
      } else {
        // Fallback mapping if fetch fails
        const fallbackDetails: TokenDetails = {
          address: token.address,
          symbol: token.symbol,
          name: token.name,
          decimals: 9,
          logoURI: token.logoURI || "/logo-white.png",
          price: token.price,
          change24h: token.change24h,
          volume24h: token.volume24h,
          marketCap: token.marketCap,
          liquidity: token.liquidity,
          holdersCount: "14K",
          description: `${token.name} ($${token.symbol}) is loaded in ChadWallet.`,
          pairAddress: token.pairAddress,
          performance: { "5m": 0, "1h": 0, "4h": 0, "1d": token.change24h },
          buysCount: 1000, sellsCount: 800,
          buyVolumeUSD: 50000, sellVolumeUSD: 40000,
          buyersCount: 500, sellersCount: 400
        };
        setSelectedToken(fallbackDetails);
        addRecentSearch(fallbackDetails);
      }
    }
  };

  const addRecentSearch = (token: TokenDetails) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter((t) => t.address !== token.address);
      return [token, ...filtered].slice(0, 5);
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const totalPositionsValue = positions.reduce((sum, p) => sum + (p.balance * p.currentPrice), 0);
  const portfolioValue = cashBalance + totalPositionsValue;
  const costBasis = positions.reduce((sum, p) => sum + (p.balance * p.avgBuyPrice), 0);
  const pnlUSD = totalPositionsValue - costBasis;
  const pnlPercent = costBasis > 0 ? (pnlUSD / costBasis) * 100 : 0;

  return (
    <div className="h-screen w-screen bg-[#030305] text-[#F3F4F6] flex flex-col overflow-hidden font-sans">
      {/* 1. Fomo-style Top Header Bar */}
      <header className="h-14 border-b border-white/5 bg-[#09090D] flex items-center justify-between px-4 shrink-0 z-20 select-none">
        
        {/* Left Logo / Back */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-300 transition flex items-center gap-1 text-xs font-bold"
          >
            <ArrowLeft size={14} /> Back
          </Link>
          <span className="h-4 w-px bg-white/10" />
          <Link href="/trade" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-white.png"
              alt="Chad Logo"
              className="w-6 h-6 object-contain"
            />
            <span className="text-lg font-black tracking-tight text-white lowercase">
              chad
            </span>
          </Link>
        </div>

        {/* Center: Live Autocomplete Search Bar */}
        <div ref={dropdownRef} className="hidden md:flex items-center relative w-[450px]">
          <Search className="absolute left-3 top-2.5 text-gray-500" size={14} />
          <input
            type="text"
            placeholder="Search for tokens or traders..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            className="w-full bg-[#0E0E14] border border-white/5 hover:border-white/10 focus:border-primary/50 text-xs text-gray-300 pl-9 pr-14 py-2 rounded-xl outline-none transition"
          />
          <span className="absolute right-3 top-2.5 bg-white/5 border border-white/10 text-[8px] font-bold text-gray-500 px-1.5 py-0.5 rounded cursor-default">
            Paste /
          </span>

          {/* Autocomplete Dropdown Panel */}
          {showDropdown && (
            <div className="absolute top-[42px] left-0 w-full bg-[#09090D] border border-white/10 rounded-2xl shadow-2xl p-4 z-50 flex flex-col gap-3 max-h-[380px] overflow-y-auto">
              
              {/* Recents header */}
              {searchResults.length === 0 && (
                <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 shrink-0">
                  <span>Recents</span>
                  {recentSearches.length > 0 && (
                    <button 
                      onClick={clearRecentSearches}
                      className="text-primary-light hover:text-white transition uppercase text-[8px]"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              )}

              {/* Loader */}
              {searchLoading && (
                <div className="flex items-center justify-center py-6 text-gray-500 gap-1.5 text-xs font-bold">
                  <Loader2 size={14} className="animate-spin text-primary" />
                  Searching DEXScreener...
                </div>
              )}

              {/* Live Search Results */}
              {!searchLoading && searchResults.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-gray-500 block">Search Results</span>
                  {searchResults.map((item) => (
                    <button
                      key={item.address}
                      onClick={() => selectNewToken(item)}
                      className="w-full text-left bg-white/[0.01] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 p-2.5 rounded-xl flex items-center justify-between transition"
                    >
                      {/* Left: icon + symbols */}
                      <div className="flex items-center gap-2.5 min-w-0">
                        {item.logoURI ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.logoURI}
                            alt={item.symbol}
                            className="w-8 h-8 rounded-full border border-white/10 bg-[#0E0E12]"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-[10px] text-primary-light font-black uppercase">
                            {item.symbol.slice(0, 2)}
                          </div>
                        )}
                        <div className="min-w-0 leading-tight">
                          <span className="text-xs font-extrabold text-white flex items-center gap-1">
                            {item.symbol} <span className="text-[8px] bg-accent-green/10 text-accent-green px-1 py-0.2 rounded font-black uppercase">sol</span>
                          </span>
                          <span className="text-[9px] text-gray-500 font-medium block truncate max-w-[130px]">
                            {item.name} <span className="font-mono text-[8px] opacity-75">{item.address.slice(0, 6)}...</span>
                          </span>
                        </div>
                      </div>

                      {/* Right: pricing and statistics */}
                      <div className="text-right flex items-center gap-4 shrink-0 font-mono text-[9px] font-bold text-gray-400">
                        <div>
                          <span className="text-gray-500 block text-[8px]">MC</span>
                          <span className="text-gray-300 font-extrabold">${item.marketCap}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block text-[8px]">Price</span>
                          <span className="text-gray-300 font-extrabold">${item.price < 0.01 ? item.price.toFixed(6) : item.price.toFixed(2)}</span>
                        </div>
                        <span className={item.change24h >= 0 ? "text-accent-green" : "text-accent"}>
                          {item.change24h >= 0 ? "+" : ""}{item.change24h.toFixed(2)}%
                        </span>
                        <div>
                          <span className="text-gray-500 block text-[8px]">Vol</span>
                          <span className="text-gray-300 font-extrabold">${item.volume24h}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Recent Searches (when query empty) */}
              {!searchLoading && searchResults.length === 0 && (
                <div className="flex flex-col gap-2">
                  {recentSearches.length === 0 ? (
                    <span className="text-[10px] text-gray-600 text-center py-4">No recent searches</span>
                  ) : (
                    recentSearches.map((item) => (
                      <button
                        key={item.address}
                        onClick={() => selectNewToken(item)}
                        className="w-full text-left bg-white/[0.01] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 p-2.5 rounded-xl flex items-center justify-between transition"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.logoURI}
                            alt={item.symbol}
                            className="w-8 h-8 rounded-full border border-white/10 bg-[#0E0E12] shrink-0"
                            onError={(e) => {
                              e.currentTarget.src = "/logo-white.png";
                            }}
                          />
                          <div className="min-w-0 leading-tight">
                            <span className="text-xs font-extrabold text-white flex items-center gap-1">
                              {item.symbol} <span className="text-[8px] bg-accent-green/10 text-accent-green px-1 py-0.2 rounded font-black uppercase">sol</span>
                            </span>
                            <span className="text-[9px] text-gray-500 font-medium block truncate max-w-[130px]">
                              {item.name} <span className="font-mono text-[8px] opacity-75">{item.address.slice(0, 6)}...</span>
                            </span>
                          </div>
                        </div>

                        <div className="text-right flex items-center gap-4 shrink-0 font-mono text-[9px] font-bold text-gray-400">
                          <div>
                            <span className="text-gray-500 block text-[8px]">MC</span>
                            <span className="text-gray-300 font-extrabold">${item.marketCap}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block text-[8px]">Price</span>
                            <span className="text-gray-300 font-extrabold">
                              ${item.price ? (item.price < 0.01 ? item.price.toFixed(6) : item.price.toFixed(2)) : "0.00"}
                            </span>
                          </div>
                          <span className={(item.change24h ?? 0) >= 0 ? "text-accent-green" : "text-accent"}>
                            {(item.change24h ?? 0) >= 0 ? "+" : ""}{item.change24h?.toFixed(2)}%
                          </span>
                          <div>
                            <span className="text-gray-500 block text-[8px]">Vol</span>
                            <span className="text-gray-300 font-extrabold">${item.volume24h}</span>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Cash Balances & Auth Status */}
        <div className="flex items-center gap-4">
          {/* Simulated Cash display */}
          <div className="flex flex-col text-right text-[10px] leading-tight select-none">
            <span className="text-gray-400 font-bold">
              ${cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-primary-light font-black uppercase text-[8px]">cash</span>
            </span>
            <button
              onClick={() => setCashBalance((prev) => prev + 1000)}
              className="text-primary-light hover:underline font-bold text-[8px] mt-0.5 text-left"
            >
              Deposit more
            </button>
          </div>

          <div className="text-[10px] text-right leading-tight hidden sm:block">
            <span className="text-gray-300 font-bold">
              ${portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <p className={`text-[8px] font-bold ${pnlUSD >= 0 ? "text-accent-green" : "text-accent"}`}>
              {pnlUSD >= 0 ? "+" : ""}${pnlUSD.toFixed(2)} ({pnlUSD >= 0 ? "+" : ""}{pnlPercent.toFixed(2)}%)
            </p>
          </div>

          <span className="h-4 w-px bg-white/10" />

          {/* Privy Wallet Trigger */}
          {!authenticated ? (
            <button
              onClick={login}
              className="bg-primary hover:bg-primary-dark text-white text-xs font-bold px-4 py-2 rounded-xl transition duration-150 flex items-center gap-1.5 shadow-md shadow-primary/10"
            >
              <Wallet size={14} /> Connect
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 font-mono hidden md:inline">
                {user?.email?.address || user?.id.slice(0, 10) + "..."}
              </span>
              <button
                onClick={logout}
                className="bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-300 text-xs font-bold px-3 py-1.5 rounded-xl transition duration-150"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </header>

      {/* 2. Responsive Dashboard Core */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left Panel: Alerts, Tokens, Leaderboards */}
        <TradingLeftPanel
          tokens={TRENDING_TOKENS}
          selectedToken={selectedToken}
          onSelectToken={selectNewToken}
        />

        {/* Middle Panel: Charts, Trades, Holders copy ledger */}
        <TradingMiddlePanel token={selectedToken} />

        {/* Right Panel: Swap widget, About, Positions list */}
        <TradingRightPanel
          token={selectedToken}
          cashBalance={cashBalance}
          setCashBalance={setCashBalance}
          positions={positions}
          setPositions={setPositions}
        />
      </div>

      {/* 3. Fomo-style Footer Ticker & Status Bar */}
      <footer className="h-8 border-t border-white/5 bg-[#09090D] flex items-center justify-between px-4 text-[10px] text-gray-500 shrink-0 z-20 select-none">
        <div className="flex items-center gap-4 overflow-hidden">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
            <span className="font-bold text-gray-400">Stable</span>
          </div>
          <span className="h-3 w-px bg-white/10" />
          <div className="flex gap-4 font-mono text-[9px]">
            <span>SOL: <span className="text-accent-green font-bold">$184.20 (+3.42%)</span></span>
            <span>BONK: <span className="text-accent-green font-bold">$0.00002130 (+12.8%)</span></span>
            <span>WIF: <span className="text-accent font-bold">$2.15 (-4.50%)</span></span>
          </div>
        </div>

        <div className="flex gap-4 font-bold">
          <a href="#" className="hover:text-gray-300">Privacy</a>
          <a href="#" className="hover:text-gray-300">Terms</a>
          <a href="#" className="hover:text-gray-300">Help</a>
        </div>
      </footer>
    </div>
  );
}

export default function TradePage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen bg-[#030305] flex flex-col items-center justify-center gap-3 text-gray-400 font-sans">
          <Loader2 className="w-6 h-6 animate-spin text-primary-light" />
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Loading Trading Board...
          </span>
        </div>
      }
    >
      <TradeTerminalCore />
    </Suspense>
  );
}
