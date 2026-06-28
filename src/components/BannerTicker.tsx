"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TRENDING_TOKENS } from "@/services/mockData";
import { fetchTokenPrices } from "@/services/jupiter";

interface TickerProps {
  direction?: "left" | "right";
}

export default function BannerTicker({ direction = "left" }: TickerProps) {
  const [tokens, setTokens] = useState(TRENDING_TOKENS);

  useEffect(() => {
    async function updatePrices() {
      const mints = TRENDING_TOKENS.map((t) => t.address);
      const prices = await fetchTokenPrices(mints);
      setTokens((prev) =>
        prev.map((t) => ({
          ...t,
          price: prices[t.address] || t.price,
        }))
      );
    }
    updatePrices();
    const interval = setInterval(updatePrices, 15000);
    return () => clearInterval(interval);
  }, []);

  // Duplicate list to create a seamless infinite scrolling marquee effect
  const marqueeItems = [...tokens, ...tokens, ...tokens, ...tokens];

  return (
    <div className="w-full bg-[#09090D] border-y border-white/5 py-2.5 overflow-hidden relative select-none">
      <div
        className={`flex whitespace-nowrap gap-8 w-max ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {marqueeItems.map((token, idx) => {
          const isPositive = (token.change24h ?? 0) >= 0;
          return (
            <Link
              key={`${token.symbol}-${idx}`}
              href={`/trade?token=${token.symbol}`}
              className="flex items-center gap-3 bg-white/[0.02] border border-white/5 px-4 py-1.5 rounded-full hover:border-primary/50 transition duration-200 cursor-pointer"
            >
              <span className="font-bold text-sm text-gray-200">{token.symbol}</span>
              <span className="text-sm font-medium text-gray-400">
                ${token.price ? (token.price < 0.01 ? token.price.toFixed(6) : token.price.toFixed(2)) : "0.00"}
              </span>
              <span
                className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                  isPositive ? "text-accent-green bg-accent-green/10" : "text-accent bg-accent/10"
                }`}
              >
                {isPositive ? "+" : ""}
                {token.change24h?.toFixed(2)}%
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
