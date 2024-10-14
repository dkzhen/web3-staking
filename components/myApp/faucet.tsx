import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { getFaucetBalance } from "./contract";
import { BigNumber, ethers } from "ethers";
import { useSimulateContract, useWriteContract } from "wagmi";
import { abiFaucetContract } from "@/app/abi";

function Faucet() {
  const contractFaucet = "0xEc5CeAAd48f848500a2C372a9cF5911e807834e2";
  const { faucetBalance, isPendingFaucetBalance } = getFaucetBalance();
  const bigIntUSDC = isPendingFaucetBalance
    ? BigNumber.from(0)
    : BigNumber.from(faucetBalance);
  const zUSDC = ethers.utils.formatEther(bigIntUSDC);

  const claimFaucet = useSimulateContract({
    abi: abiFaucetContract,
    address: contractFaucet,
    functionName: "requestTokens",
  });
  const { writeContract } = useWriteContract();

  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle>Faucet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row justify-start items-center">
          <p>zUSDC</p>
          <Button
            disabled={Number(zUSDC) <= 0}
            onClick={() => writeContract(claimFaucet.data!.request)}
            className="ml-2"
          >
            Claim
          </Button>
          <div className="ml-2 text-xs text-slate-400">
            available : {zUSDC} zUSDC{" "}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Faucet;
