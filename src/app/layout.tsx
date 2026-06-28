import type { Metadata } from "next";
import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChadWallet | No. 1 Free Crypto Trading App",
  description: "The ultimate social-first, cross-chain memecoin trading app. Trade Solana tokens instantly with zero bridging and social insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-gray-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
