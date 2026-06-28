# ⚡ ChadWallet Web Platform

ChadWallet is a premium, social-first crypto trading web application and high-converting landing page built with **Next.js 14 (App Router)**, **TailwindCSS**, and **TypeScript**.

Developed for the founding engineer application, this repository includes:
1. **A professional, high-converting landing page** featuring a floating header, interactive mobile device swap simulator, alternating walkthrough mockups, a 6-card feature grid, and an animated concentric orbits CTA section.
2. **An advanced trading terminal** powered by real Solana token data, TradingView candlestick charts, dynamic sandbox wallet balances (simulated deposits/swaps), and Privy authentication triggers.

---

## ✨ Features

### 🌟 Landing Page
*   **Interactive Mobile Swap Simulator**: Users can type USD values to calculate simulated token exchanges (e.g. SOL to UNC) and view live sparkline animations with a pulsing green indicator.
*   **6-Card Feature Grid**: Showcase key value propositions including Leaderboards, Live Feeds, Push Alerts, Easy Onboarding (Google/Apple login buttons), Zero Complexity (Gasless token configs), and One-Click Buy (Apple Pay input panel).
*   **Animated Orbit Rings**: Concentric counter-rotating orbits displaying custom pixel-art trader profiles spinning around the main CTA block.

### 📈 Trading Terminal (`/trade`)
*   **Real Token Data Integration**: Fetches real Solana token lists and search autocompletes using DEXScreener and Jupiter APIs.
*   **Live Charts**: Embedded **TradingView Candlestick Charts** configured with custom symbol mappers mapping token tickers (SOL, BONK, WIF, POPCAT) to direct CEX trading pairs.
*   **Sandbox Wallet Balances**:
    *   Starts with a simulated balance of **$5,000.00 cash** and **1.45 SOL**.
    *   Tapping **"Deposit More"** dynamically adds **+$1,000.00 cash** to the header and swap widget.
    *   Simulated swaps deduct cash on Buy orders and add cash on Sell/Close positions.
    *   Live portfolio value and PnL updates in the header.

---

## 🛠️ Tech Stack

*   **Framework**: Next.js 14 (App Router)
*   **Styling**: TailwindCSS & Vanilla CSS
*   **Icons**: Lucide React
*   **Authentication**: Privy Auth Provider (`@privy-io/react-auth`)
*   **Live Charts**: TradingView Embedded Chart Widget
*   **Market Data API**: DEXScreener API V1

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory and add your Privy App ID:
```env
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
```
*(If left empty, the application will fallback to a sandbox Privy App ID for ease of local testing).*

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the platform.
