"use client";
import * as React from "react";
import { Connector, useConnect } from "wagmi";
import { Button } from "../ui/button";

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return (
    <Button
      className="mt-3"
      onClick={() => connect({ connector: connectors[0] })}
    >
      Connect Wallet
    </Button>
  );
}
