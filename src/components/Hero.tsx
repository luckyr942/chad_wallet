"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ShieldCheck, Zap, TrendingUp, Smartphone, Wifi, Battery, Signal, Check, Loader2 } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";

export default function Hero() {
  const { login, authenticated, user } = usePrivy();
  
  // Interactive simulator states
  const [payAmount, setPayAmount] = useState("0.5");
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapSuccess, setSwapSuccess] = useState(false);
  
  // Calculate simulated UNC output
  const tokenPrice = 0.007801;
  const receiveAmount = payAmount && !isNaN(parseFloat(payAmount))
    ? (parseFloat(payAmount) * 184.20 / tokenPrice).toFixed(0) // SOL is ~$184.20
    : "0";

  const handleSimulateSwap = () => {
    if (isSwapping || swapSuccess) return;
    setIsSwapping(true);
    setTimeout(() => {
      setIsSwapping(false);
      setSwapSuccess(true);
      setTimeout(() => {
        setSwapSuccess(false);
        setPayAmount("0.5");
      }, 2500);
    }, 1500);
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 pt-4 pb-16 lg:pt-6 lg:pb-24 flex flex-col lg:flex-row items-center gap-16 overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] -z-10" />

      {/* Hero Left Content */}
      <div className="flex-1 text-center lg:text-left space-y-8 max-w-2xl">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/25 px-4 py-1.5 rounded-full text-primary-light text-sm font-semibold animate-pulse-glow">
          <Smartphone size={16} /> No. 1 Free Crypto Trading App
        </div>

        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
          Trade Memecoins <br />
          <span className="text-gradient">With Zero Gas</span> <br />
          & Real Social Alpha.
        </h1>

        <p className="text-gray-400 text-lg lg:text-xl font-normal leading-relaxed">
          ChadWallet is the social-first trading app designed for the next generation of degens. 
          Connect in seconds via Google/Apple, swap Solana tokens with zero friction, and follow top traders in real-time.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
          <Link
            href="/trade"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-bold px-8 py-4 rounded-xl transition duration-200 shadow-lg shadow-primary/20 group"
          >
            Launch Web App <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          {!authenticated ? (
            <button
              onClick={login}
              className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-200 font-semibold px-8 py-4 rounded-xl transition duration-200"
            >
              Sign In via Privy
            </button>
          ) : (
            <Link
              href="/trade"
              className="flex items-center justify-center gap-2 bg-accent-green/15 border border-accent-green/35 text-accent-green hover:bg-accent-green/20 font-semibold px-8 py-4 rounded-xl transition duration-200"
            >
              Connected Wallet
            </Link>
          )}
        </div>

        {/* Mobile Download Badges */}
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-6 text-sm text-gray-400">
          <span className="font-semibold uppercase tracking-wider text-xs text-gray-500">Available on:</span>
          <div className="flex gap-4">
            <a
              href="https://apps.apple.com/us/app/chadwallet/id6757367474"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#09090D] border border-white/5 hover:border-white/20 px-4 py-2 rounded-lg flex items-center gap-2 transition"
            >
              <Smartphone size={16} /> iOS App
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#09090D] border border-white/5 hover:border-white/20 px-4 py-2 rounded-lg flex items-center gap-2 transition"
            >
              <Smartphone size={16} /> Android App
            </a>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/5">
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <Zap size={18} className="text-secondary" />
            <div className="text-left">
              <p className="text-xs text-gray-500">Execution</p>
              <p className="text-sm font-bold text-gray-300">Sub-second</p>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <ShieldCheck size={18} className="text-primary-light" />
            <div className="text-left">
              <p className="text-xs text-gray-500">Security</p>
              <p className="text-sm font-bold text-gray-300">Self-Custodial</p>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <TrendingUp size={18} className="text-accent-green" />
            <div className="text-left">
              <p className="text-xs text-gray-500">Gas Fees</p>
              <p className="text-sm font-bold text-gray-300">Zero Network Fees</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Right: Interactive Phone Mockup */}
      <div className="flex-1 flex justify-center items-center relative w-full max-w-sm lg:max-w-none">
        {/* Decorative backdrop glow */}
        <div className="absolute w-[350px] h-[350px] bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-full filter blur-[60px] animate-pulse -z-10" />

        {/* 3D Glassmorphic Phone Border */}
        <div className="w-[300px] h-[610px] rounded-[45px] p-[10px] bg-gradient-to-b from-white/20 to-white/5 border border-white/25 shadow-2xl relative flex flex-col overflow-hidden">
          {/* Speaker ear piece and camera notch */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-20 flex items-center justify-between px-4">
            <div className="w-2.5 h-2.5 bg-gray-800 rounded-full" />
            <div className="w-12 h-1 bg-gray-900 rounded-full" />
            <div className="w-2 h-2 bg-gray-800 rounded-full" />
          </div>

          {/* Screen Content Wrapper */}
          <div className="w-full h-full rounded-[36px] overflow-hidden bg-black relative border border-black/40 flex flex-col bg-[#050508] p-4 pt-10">
            {/* Status Bar */}
            <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 px-2 mb-4 shrink-0 select-none">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <Signal size={10} />
                <Wifi size={10} />
                <Battery size={12} className="rotate-90 origin-center animate-pulse" />
              </div>
            </div>

            {/* Simulated App Header */}
            <div className="flex justify-between items-center mb-4 shrink-0">
              <div className="flex items-center gap-1.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-white.png"
                  alt="ChadWallet Logo"
                  className="w-6 h-6 object-contain"
                />
                <span className="text-xs font-black tracking-wider text-white">
                  CHAD<span className="text-primary-light">WALLET</span>
                </span>
              </div>
              
              {/* Wallet connection display */}
              {authenticated ? (
                <div className="text-[9px] bg-primary/10 border border-primary/25 text-primary-light px-2 py-0.5 rounded-full font-mono">
                  {user?.email?.address 
                    ? `${user.email.address.slice(0, 4)}...${user.email.address.slice(-3)}`
                    : user?.id 
                      ? `${user.id.slice(0, 5)}...` 
                      : "Connected"}
                </div>
              ) : (
                <button
                  onClick={login}
                  className="text-[9px] bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 px-2 py-0.5 rounded-full font-bold transition"
                >
                  Connect
                </button>
              )}
            </div>

            {/* Simulator Screen Content */}
            <div className="flex-1 flex flex-col gap-3.5 overflow-hidden">
              {/* Token Info & Live Chart */}
              <div className="glass-panel p-3 rounded-xl border border-white/5 flex flex-col gap-1.5 relative overflow-hidden shrink-0">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 bg-[#0E0E12] border border-white/10 rounded-full flex items-center justify-center text-[9px] font-black text-white">
                      U
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black text-gray-200">unc</h4>
                      <p className="text-[8px] text-gray-500 leading-none">Uncle Chad</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-bold text-gray-300">${tokenPrice.toFixed(6)}</p>
                    <p className="text-[8px] font-bold text-accent-green flex items-center justify-end gap-0.5">
                      <TrendingUp size={8} /> +22.90%
                    </p>
                  </div>
                </div>

                {/* Animated SVG Sparkline Chart */}
                <div className="h-16 w-full mt-2 relative">
                  <svg className="w-full h-full" viewBox="0 0 100 40">
                    <defs>
                      <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Shadow Area under Chart */}
                    <path
                      d="M 5 32 C 25 32, 35 12, 55 12 C 70 12, 80 25, 95 15 L 95 40 L 5 40 Z"
                      fill="url(#chartGlow)"
                    />
                    {/* Main Line */}
                    <path
                      d="M 5 32 C 25 32, 35 12, 55 12 C 70 12, 80 25, 95 15"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    {/* Pulsing End Point */}
                    <circle cx="95" cy="15" r="2.5" fill="#10B981" className="animate-ping" />
                    <circle cx="95" cy="15" r="1.5" fill="#10B981" />
                  </svg>
                </div>
              </div>

              {/* Swap Form */}
              <div className="glass-panel p-3.5 rounded-xl border border-white/5 flex flex-col gap-3">
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider block">
                  Quick Swap
                </span>

                {/* Input Pay */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[8px] text-gray-500 font-bold uppercase">
                    <span>Pay</span>
                    <span>Bal: 1.45 SOL</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={payAmount}
                      onChange={(e) => setPayAmount(e.target.value)}
                      placeholder="0"
                      className="w-full bg-[#0E0E12] border border-white/5 hover:border-white/10 focus:border-primary/50 text-[11px] font-bold text-gray-200 pl-3 pr-10 py-2 rounded-lg outline-none"
                    />
                    <span className="absolute right-3 top-2 text-[9px] font-extrabold text-gray-400">
                      SOL
                    </span>
                  </div>
                </div>

                {/* Input Receive */}
                <div className="space-y-1">
                  <div className="flex text-[8px] text-gray-500 font-bold uppercase">
                    <span>Receive</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      value={parseFloat(receiveAmount).toLocaleString()}
                      className="w-full bg-[#0E0E12]/50 border border-white/5 text-[11px] font-bold text-gray-400 pl-3 pr-10 py-2 rounded-lg outline-none cursor-default"
                    />
                    <span className="absolute right-3 top-2 text-[9px] font-extrabold text-gray-500">
                      UNC
                    </span>
                  </div>
                </div>

                {/* Swap Simulator Button */}
                <button
                  onClick={handleSimulateSwap}
                  disabled={isSwapping || swapSuccess || !payAmount}
                  className={`w-full text-xs font-bold py-2 rounded-lg transition duration-200 flex items-center justify-center gap-1.5 ${
                    swapSuccess
                      ? "bg-accent-green text-white"
                      : "bg-primary hover:bg-primary-dark text-white shadow-md shadow-primary/10"
                  } disabled:opacity-80`}
                >
                  {isSwapping ? (
                    <>
                      <Loader2 size={12} className="animate-spin" /> Swapping...
                    </>
                  ) : swapSuccess ? (
                    <>
                      <Check size={12} /> Swap Successful!
                    </>
                  ) : (
                    "Swap SOL"
                  )}
                </button>
              </div>

              {/* Feed Preview */}
              <div className="glass-panel p-3 rounded-xl border border-white/5 flex flex-col gap-1.5 flex-1 min-h-0 overflow-hidden">
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider block">
                  Degen Intel
                </span>
                <div className="flex gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[9px] text-primary-light font-bold shrink-0">
                    C
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold text-gray-300">ChadDegen_69</span>
                      <span className="text-[8px] text-gray-500">2m ago</span>
                    </div>
                    <p className="text-[9px] text-gray-400 leading-snug truncate mt-0.5">
                      Just loaded 50 SOL into unc. The chart is screaming breakout...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
