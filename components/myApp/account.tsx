"use client";
import { useAccount, useBalance, useDisconnect, useSwitchChain } from "wagmi";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

import { BigNumber, ethers } from "ethers";
import { formatNumber } from "@/lib/utils";
import { GetUSDCContract, GetZHNContract } from "./contract";
import StakingCard from "./staking-card";
import RewardCard from "./reward";
import Faucet from "./faucet";

export function Account() {
  const { address, chain } = useAccount();
  const accountAddress = address || "";
  const { disconnect } = useDisconnect();
  const balance = useBalance({
    address: address,
  });
  const stringBalance = balance.data?.formatted || 0;
  const { USDCData, isPendingUSDC } = GetUSDCContract(accountAddress);
  const { ZHNData, isPendingZHN } = GetZHNContract(accountAddress);

  const bigIntUSDC = isPendingUSDC
    ? BigNumber.from(0)
    : BigNumber.from(USDCData);
  const zUSDC = ethers.utils.formatEther(bigIntUSDC);
  const bigIntZHN = isPendingZHN ? BigNumber.from(0) : BigNumber.from(ZHNData);
  const ZHN = ethers.utils.formatEther(bigIntZHN);

  const chainId = chain?.id || 0;
  const { switchChain } = useSwitchChain();

  return (
    <div>
      <Card className="mt-5 ">
        <CardHeader className="flex justify-center items-center">
          <CardTitle>
            {chainId !== 1301 ? "Unsuppoted Network" : "Connected Account"}
          </CardTitle>
        </CardHeader>
        {chainId === 1301 && (
          <CardContent className="p-3">
            <p>Address : {address}</p>
            <p>
              ETH : {Number(stringBalance).toFixed(2)} {balance.data?.symbol}
            </p>
            <p>zUSDC : {formatNumber(Number(zUSDC)) || 0}</p>
            <p>ZHN : {formatNumber(Number(ZHN)) || 0}</p>
          </CardContent>
        )}
        <CardFooter className="flex justify-center items-center">
          <Button
            onClick={() => disconnect()}
            className="bg-red-500 text-white"
          >
            Disconnect
          </Button>
          {chainId !== 1301 && (
            <Button
              onClick={() => switchChain({ chainId: 1301 })}
              className="bg-green-500 ml-2 text-white"
            >
              Change to Unichain Sepolia
            </Button>
          )}
        </CardFooter>
      </Card>
      {chainId === 1301 && <Faucet />}
      {chainId === 1301 && <StakingCard />}
      {chainId === 1301 && <RewardCard />}
    </div>
  );
}
