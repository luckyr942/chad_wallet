"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Read Privy App ID safely from environment variables (no hardcoded keys in repo)
  const appId = (process.env.NEXT_PUBLIC_PRIVY_APP_ID || "") as string;

  return (
    <PrivyProvider
      appId={appId}
      config={{
        loginMethods: ["google", "apple", "email"],
        appearance: {
          theme: "dark",
          accentColor: "#8B5CF6",
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
          showWalletLoginFirst: false
        },
        solanaClusters: [
          {
            name: "mainnet-beta",
            rpcUrl: "https://api.mainnet-beta.solana.com",
          },
        ],
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
