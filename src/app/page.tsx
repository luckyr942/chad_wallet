"use client";

import Link from "next/link";
import { Zap, ArrowRight, Smartphone, ShieldCheck, Users, TrendingUp } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";
import Hero from "@/components/Hero";
import BannerTicker from "@/components/BannerTicker";

export default function Home() {
  const { login, logout, authenticated, user } = usePrivy();

  return (
    <main className="min-h-screen bg-[#030303] text-[#f3f4f6] relative flex flex-col justify-between overflow-x-hidden font-sans">
      {/* 1. Top Rotating Banner */}
      <BannerTicker direction="left" />

      {/* 2. Floating Navigation Header */}
      <header className="sticky top-4 z-50 w-full max-w-6xl mx-auto px-4 shrink-0 mt-4 select-none">
        <div className="glass-panel px-6 py-3.5 rounded-2xl flex items-center justify-between border border-white/10 shadow-lg shadow-black/40">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-white.png"
              alt="ChadWallet Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="text-sm font-black tracking-wider text-white">
              CHAD<span className="text-primary-light">WALLET</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-gray-400">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#mobile" className="hover:text-white transition">Mobile App</a>
            <Link href="/trade" className="hover:text-white transition">Trading Board</Link>
          </nav>

          {/* Privy Authentication CTAs */}
          <div className="flex items-center gap-3">
            {!authenticated ? (
              <button
                onClick={login}
                className="bg-white/5 border border-white/10 hover:bg-white/10 text-gray-200 text-xs font-bold px-4 py-2 rounded-xl transition duration-150"
              >
                Sign In
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 font-mono hidden sm:inline">
                  {user?.email?.address 
                    ? `${user.email.address.slice(0, 4)}...${user.email.address.slice(-3)}` 
                    : user?.id.slice(0, 10) + "..."}
                </span>
                <button
                  onClick={logout}
                  className="text-gray-400 hover:text-white text-xs font-bold transition"
                >
                  Disconnect
                </button>
              </div>
            )}
            <Link
              href="/trade"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white text-xs font-bold px-4 py-2 rounded-xl transition duration-200 shadow-md shadow-primary/20 flex items-center gap-1.5"
            >
              Trade Now <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* 3. Hero Section */}
      <Hero />

      {/* 4. Showcase Walkthrough Section */}
      <section id="features" className="w-full max-w-5xl mx-auto px-6 py-20 space-y-28 border-t border-white/5 select-none">
        <div className="text-center space-y-3 mb-10 max-w-xl mx-auto">
          <span className="text-xs font-black tracking-widest text-primary-light uppercase">Platform Experience</span>
          <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight">Zero Gas. Absolute Speed.</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            The next generation of memecoin trading is mobile-first, decentralized, and social.
          </p>
        </div>

        {/* Showcase Row 1 */}
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">Buy & Sell Trending Tokens</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Stay ahead of the curve. Inspect trending token charts, monitor buy/sell volume ratios, and swap Solana assets with sub-second execution speeds.
            </p>
          </div>
          <div className="flex-1 w-full max-w-md group">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-[#09090D] border border-white/5 p-2 rounded-2xl overflow-hidden shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/mockups/trending.png" alt="Buy & Sell" className="w-full h-auto rounded-xl object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Showcase Row 2 */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">Follow KOL Traders</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Follow top-performing wallets and copy trade their conviction. Inspect win rates, total profit margins, and active holding allocations.
            </p>
          </div>
          <div className="flex-1 w-full max-w-md group">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-[#09090D] border border-white/5 p-2 rounded-2xl overflow-hidden shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/mockups/kol.png" alt="KOL Trades" className="w-full h-auto rounded-xl object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Showcase Row 3 */}
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">Launch Memecoins</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Deploy custom tokens on Solana in seconds. Configure ticker symbols, names, and early buy setups directly from ChadWallet.
            </p>
          </div>
          <div className="flex-1 w-full max-w-md group">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-[#09090D] border border-white/5 p-2 rounded-2xl overflow-hidden shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/mockups/launch.png" alt="Launch Tokens" className="w-full h-auto rounded-xl object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5. 6-Card Feature Grid Section */}
      <section className="w-full max-w-6xl mx-auto px-6 py-20 border-t border-white/5 select-none">
        <div className="space-y-3 mb-16 text-center lg:text-left">
          <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-white">
            never miss out again
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            the only social-first trading app
          </p>
        </div>

        {/* The 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Leaderboard */}
          <div className="group pt-8 pb-0 rounded-[25px] flex flex-col overflow-hidden gap-2 border border-[#1E1E30] hover:border-white/[0.12] transition-colors duration-300 bg-[#12121E] aspect-square">
            <div className="font-mono text-[#606AF7] px-8 font-bold text-xs uppercase tracking-wider">Leaderboard</div>
            <h3 className="text-[24px] leading-7 tracking-tight md:text-[28px] md:leading-8 px-8 font-bold text-white">
              become a legend, top the leaderboard
            </h3>
            <div className="min-h-0 flex-1 px-8 pb-6 flex flex-col justify-end gap-2 font-mono text-[10px]">
              {[
                { name: "change", handle: "@change", pnl: "+$1,726,513.19", seed: "ch1" },
                { name: "frank", handle: "@frankdegods", pnl: "+$1,236,362.49", seed: "ch2" },
                { name: "_logjam", handle: "@_logjam", pnl: "+$810,605.83", seed: "ch3" },
                { name: "irulan", handle: "@corrino.lv", pnl: "+$685,392.12", seed: "ch4" },
              ].map((trader, i) => (
                <div key={i} className="flex items-center justify-between bg-white/[0.02] border border-white/[0.04] px-3 py-2 rounded-xl">
                  <div className="flex items-center gap-2.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${trader.seed}`} alt="" className="w-6 h-6 rounded-full border border-white/10" />
                    <div>
                      <div className="text-gray-200 font-bold">{trader.name}</div>
                      <div className="text-gray-500 text-[8px]">{trader.handle}</div>
                    </div>
                  </div>
                  <span className="text-[#4ADE80] font-black">{trader.pnl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Feed */}
          <div className="group pt-8 pb-0 rounded-[25px] flex flex-col overflow-hidden gap-2 border border-[#1E1E30] hover:border-white/[0.12] transition-colors duration-300 bg-[#12121E] aspect-square">
            <div className="font-mono text-[#606AF7] px-8 font-bold text-xs uppercase tracking-wider">Feed</div>
            <h3 className="text-[24px] leading-7 tracking-tight md:text-[28px] md:leading-8 px-8 font-bold text-white">
              discover and follow top traders
            </h3>
            <div className="min-h-0 flex-1 px-6 pb-6 flex flex-col justify-end gap-2 text-[9px] leading-tight">
              <div className="bg-white/[0.02] border border-white/[0.04] p-3 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=remus" alt="" className="w-5 h-5 rounded-full" />
                  <span className="font-bold text-gray-300">remusofmars</span>
                  <span className="text-gray-500 text-[8px]">5m</span>
                </div>
                <p className="text-gray-400">we&apos;re so back</p>
                <div className="flex gap-2.5 mt-1.5 text-[8px] text-gray-500 font-mono">
                  <span>❤️ 293</span><span>💬 67</span>
                </div>
              </div>
              <div className="bg-white/[0.02] border border-white/[0.04] p-3 rounded-xl flex justify-between items-center">
                <div>
                  <div className="font-bold text-gray-300">collectible <span className="text-[#4ADE80] text-[9px]">Buy</span></div>
                  <div className="text-gray-500 text-[8px]">PENGU • $34.3K at $642.3M MC</div>
                </div>
                <span className="text-gray-500 text-[8px] font-mono">$242.6K</span>
              </div>
              <div className="bg-white/[0.02] border border-white/[0.04] p-3 rounded-xl flex justify-between items-center">
                <div>
                  <div className="font-bold text-gray-300">lesabre <span className="text-[#F87171] text-[9px]">Sell</span></div>
                  <div className="text-gray-500 text-[8px]">SOL • $4.5K at $41.5B MC</div>
                </div>
                <span className="text-gray-500 text-[8px] font-mono">$18.2K</span>
              </div>
            </div>
          </div>

          {/* Card 3: Alerts */}
          <div className="group pt-8 pb-0 rounded-[25px] flex flex-col overflow-hidden gap-2 border border-[#1E1E30] hover:border-white/[0.12] transition-colors duration-300 bg-[#12121E] aspect-square">
            <div className="font-mono text-[#606AF7] px-8 font-bold text-xs uppercase tracking-wider">Alerts</div>
            <h3 className="text-[24px] leading-7 tracking-tight md:text-[28px] md:leading-8 px-8 font-bold text-white">
              real time notifications for what the best are buying
            </h3>
            <div className="min-h-0 flex-1 px-6 pb-10 flex items-end justify-center">
              <div className="w-full bg-[#09090D] border border-white/5 p-4 rounded-2xl flex items-center justify-between shadow-lg shadow-black/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#606AF7]/20 border border-[#606AF7]/30 flex items-center justify-center font-black text-white text-[9px]">
                    
                  </div>
                  <div className="leading-tight">
                    <div className="text-[11px] font-bold text-gray-300">DOGE is up 5.98%</div>
                    <p className="text-[9px] text-gray-500 mt-0.5">
                      🟢 <span className="text-[#4ADE80] font-semibold">50 top traders</span> bought $88,203.12
                    </p>
                  </div>
                </div>
                <span className="text-gray-600 text-[8px] font-mono">9:41 AM</span>
              </div>
            </div>
          </div>

          {/* Card 4: Easy Onboarding */}
          <div className="group pt-8 pb-0 rounded-[25px] flex flex-col overflow-hidden gap-2 border border-[#1E1E30] hover:border-white/[0.12] transition-colors duration-300 bg-[#12121E] aspect-square">
            <div className="font-mono text-[#606AF7] px-8 font-bold text-xs uppercase tracking-wider">Easy Onboarding</div>
            <h3 className="text-[24px] leading-7 tracking-tight md:text-[28px] md:leading-8 px-8 font-bold text-white">
              create an account in an instant
            </h3>
            <div className="min-h-0 flex-1 flex flex-col items-center justify-end px-8 pb-4 relative">
              <div className="w-full space-y-2 relative z-10">
                <button
                  onClick={login}
                  className="w-full bg-white hover:bg-gray-100 text-black font-extrabold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition duration-200"
                >
                   Sign in with Apple
                </button>
                <button
                  onClick={login}
                  className="w-full bg-[#09090D] border border-white/10 hover:border-white/20 text-white font-extrabold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition duration-200"
                >
                  <span className="text-red-500 font-black">G</span> Sign in with Google
                </button>
              </div>
              {/* Pointing finger emoji decoration */}
              <span className="absolute bottom-1 right-20 text-4xl animate-bounce z-20 pointer-events-none select-none">
                👆
              </span>
            </div>
          </div>

          {/* Card 5: Zero Complexity */}
          <div className="group pt-8 pb-0 rounded-[25px] flex flex-col overflow-hidden gap-2 border border-[#1E1E30] hover:border-white/[0.12] transition-colors duration-300 bg-[#12121E] aspect-square">
            <div className="font-mono text-[#606AF7] px-8 font-bold text-xs uppercase tracking-wider">Zero Complexity</div>
            <h3 className="text-[24px] leading-7 tracking-tight md:text-[28px] md:leading-8 px-8 font-bold text-white">
              multichain &amp; gasless
            </h3>
            <div className="min-h-0 flex-1 flex items-end justify-center px-6 pb-6">
              <div className="w-full grid grid-cols-2 gap-2 text-center text-[10px] font-bold text-gray-400">
                {["SOL", "USDC", "BONK", "ETH"].map((sym) => (
                  <div key={sym} className="bg-[#09090D] border border-white/5 py-3 rounded-xl flex flex-col gap-1">
                    <span className="text-white font-black">{sym}</span>
                    <span className="text-[#4ADE80] text-[8px] font-black tracking-widest uppercase">0 Gas Fee</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 6: One Click to Buy */}
          <div className="group pt-8 pb-0 rounded-[25px] flex flex-col overflow-hidden gap-2 border border-[#1E1E30] hover:border-white/[0.12] transition-colors duration-300 bg-[#12121E] aspect-square">
            <div className="font-mono text-[#606AF7] px-8 font-bold text-xs uppercase tracking-wider">One Click to Buy</div>
            <h3 className="text-[24px] leading-7 tracking-tight md:text-[28px] md:leading-8 px-8 font-bold text-white">
              fund with apple pay
            </h3>
            <div className="min-h-0 flex-1 flex flex-col items-center justify-end px-6 pb-6">
              <div className="w-full bg-[#09090D] border border-white/5 p-4 rounded-2xl flex flex-col gap-3">
                <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold uppercase">
                  <span>Pay Amount</span>
                  <span className="text-gray-300 font-mono">$100</span>
                </div>
                {/* Quick selections */}
                <div className="grid grid-cols-4 gap-1 text-[9px] font-bold text-gray-400">
                  {["$25", "$50", "$100", "$250"].map((val) => (
                    <span key={val} className={`py-1.5 rounded-lg border text-center ${val === "$100" ? "bg-white/5 border-white/20 text-white" : "border-white/5 bg-transparent"}`}>
                      {val}
                    </span>
                  ))}
                </div>
                <button className="w-full bg-white hover:bg-gray-100 text-black font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1 transition">
                  Buy with Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Mobile App Download CTA Section */}
      <section id="mobile" className="w-full bg-[#050508] py-20 border-t border-white/5 relative flex flex-col justify-center items-center text-center overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="space-y-6 max-w-2xl px-6 relative z-10 select-none">
          <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight">
            ChadWallet on Mobile
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md mx-auto">
            Trade on the go. Self-custodial, multichain wallet with instant ramp-ups, whale tracking, and gas refunds.
          </p>

          <div className="flex gap-4 justify-center pt-4">
            <a
              href="https://apps.apple.com/us/app/chadwallet/id6757367474"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-200 text-[#030303] font-bold px-8 py-3.5 rounded-xl transition duration-200 shadow-lg text-sm flex items-center gap-2"
            >
              <Smartphone size={16} /> iOS Download
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 border border-white/10 hover:bg-white/10 text-gray-200 font-semibold px-8 py-3.5 rounded-xl transition text-sm flex items-center gap-2"
            >
              <Smartphone size={16} /> Android Download
            </a>
          </div>
        </div>
      </section>

      {/* 5.5. Bottom CTA with Orbiting Orbs */}
      <section className="relative self-stretch flex items-center justify-center py-32 overflow-hidden mt-12 bg-[#05050C] border-t border-white/5">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1040]/10 to-[#030303] pointer-events-none" />

        <div className="px-8 w-full max-w-4xl">
          <div className="flex flex-col justify-center items-center relative py-12">
            {/* Content */}
            <div className="flex flex-col gap-3 md:gap-6 items-center relative z-10 select-none">
              <h2 className="text-[40px] leading-10 md:text-[60px] md:leading-[60px] tracking-tighter text-center font-black text-white">
                a trading app<br />for the rest of us
              </h2>
              <p className="md:text-[22px] text-[#f3f4f6]/60 md:leading-7 tracking-tight text-center">
                join thousands of traders making their name on chad
              </p>
              <div className="pt-6 flex gap-3">
                <Link
                  href="/trade"
                  className="bg-[#606AF780] hover:bg-[#606AF7CC] backdrop-blur-md transition-colors duration-150 py-3 w-48 rounded-xl text-lg font-bold border border-[#1E1E30] flex items-center justify-center text-white"
                >
                  Start trading
                </Link>
                <a
                  href="https://apps.apple.com/us/app/chadwallet/id6757367474"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors duration-150 border border-[#1E1E30] rounded-xl text-lg font-bold w-48 flex items-center justify-center text-white"
                >
                  Download app
                </a>
              </div>
            </div>

            {/* Spinning orbit rings */}
            <div
              className="absolute inset-0 m-auto w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-white/[0.06] z-0"
              style={{ animation: "spin-slow-reverse 30s linear infinite" }}
            >
              {/* Orbiting avatar dots */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=orb1" alt="" className="w-6 h-6 rounded-full border border-white/20 bg-[#12121E]" />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=orb2" alt="" className="w-6 h-6 rounded-full border border-white/20 bg-[#12121E]" />
              </div>
              <div className="absolute top-1/2 -left-3 -translate-y-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=orb3" alt="" className="w-6 h-6 rounded-full border border-white/20 bg-[#12121E]" />
              </div>
            </div>
            <div
              className="absolute inset-0 m-auto w-[450px] h-[450px] md:w-[700px] md:h-[700px] rounded-full border border-white/[0.04] z-0"
              style={{ animation: "spin-slow 45s linear infinite" }}
            >
              <div className="absolute -top-3 left-1/3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=orb4" alt="" className="w-7 h-7 rounded-full border border-white/20 bg-[#12121E]" />
              </div>
              <div className="absolute -right-3 top-1/3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=orb5" alt="" className="w-7 h-7 rounded-full border border-white/20 bg-[#12121E]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="w-full bg-[#030303] border-t border-white/5 py-12 px-6 select-none z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          {/* Brand */}
          <div className="space-y-4 max-w-xs">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-white.png"
                alt="Chad Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="text-sm font-black tracking-wider text-white">
                CHAD<span className="text-primary-light">WALLET</span>
              </span>
            </div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">
              where traders become legends.
            </p>
            <p className="text-[9px] text-gray-600">
              &copy; {new Date().getFullYear()} ChadWallet Labs Inc. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-3 gap-10 md:gap-16 text-[10px] font-bold text-gray-500">
            {/* ABOUT */}
            <div className="space-y-3">
              <span className="text-[9px] text-gray-400 font-black uppercase tracking-wider">About</span>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">Affiliates</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>

            {/* SOCIAL */}
            <div className="space-y-3">
              <span className="text-[9px] text-gray-400 font-black uppercase tracking-wider">Social</span>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Discord</a></li>
                <li><a href="https://x.com/chadwallet" target="_blank" rel="noreferrer" className="hover:text-white transition">X/Twitter</a></li>
                <li><a href="#" className="hover:text-white transition">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition">Youtube</a></li>
              </ul>
            </div>

            {/* LEGAL */}
            <div className="space-y-3">
              <span className="text-[9px] text-gray-400 font-black uppercase tracking-wider">Legal</span>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* 7. Bottom Rotating Banner */}
      <BannerTicker direction="right" />
    </main>
  );
}