"use client";
import dynamic from "next/dynamic";
import { config } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { ThirdwebProvider } from "thirdweb/react";

export default function Home() {
  const ConnectWallet = dynamic(
    () => import("../components/myApp/connect-wallet"),
    {
      ssr: false,
    }
  );

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <ThirdwebProvider>
        <QueryClientProvider client={queryClient}>
          <main className="flex min-h-screen flex-col items-center p-24">
            <h1 className="md:text-4xl  text-2xl font-bold">
              Cryptoporia Staking
            </h1>
            <ConnectWallet />
          </main>
        </QueryClientProvider>
      </ThirdwebProvider>
    </WagmiProvider>
  );
}
