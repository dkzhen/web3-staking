import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { abiStakingContract } from "@/app/abi";
import { useAccount, useSimulateContract, useWriteContract } from "wagmi";
import { GetAllRewardBalance, GetStakerInfo } from "./contract";
import { BigNumber, ethers } from "ethers";
import { formatNumber } from "@/lib/utils";
import { Button } from "../ui/button";

function RewardCard() {
  const { writeContract } = useWriteContract();
  const { address } = useAccount();
  const accountAddress = address || "";
  const { stakerInfo, isPendingStakerInfo } = GetStakerInfo(accountAddress);
  const { rewardsBalance, isPendingRewardsBalance } = GetAllRewardBalance();
  // checking balance
  const bigIntStakerInfo = isPendingStakerInfo
    ? [BigNumber.from(0), BigNumber.from(0)] // Jika pending, kembalikan array dengan dua elemen
    : stakerInfo && Array.isArray(stakerInfo)
    ? [BigNumber.from(stakerInfo[0]), BigNumber.from(stakerInfo[1])] // Jika stakerInfo adalah array
    : [BigNumber.from(0), BigNumber.from(0)]; // Default ke array dengan dua elemen

  const stakerBalance = [
    ethers.utils.formatEther(bigIntStakerInfo[0]),
    ethers.utils.formatEther(bigIntStakerInfo[1]),
  ];

  const bigIntRewardsbalance = isPendingRewardsBalance
    ? BigNumber.from(0)
    : BigNumber.from(rewardsBalance);
  const ZHNRewardBalance = ethers.utils.formatEther(bigIntRewardsbalance);

  // claim
  const claimRewards = useSimulateContract({
    abi: abiStakingContract,
    address: "0xd8995f43f2152Ea7F73f3630a98710F1fD520859",
    functionName: "claimRewards",
  });

  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle>Claim Rewards</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Rewards Remaining : {formatNumber(Number(ZHNRewardBalance))} ZHN</p>
        <p>Total Staked : {formatNumber(Number(stakerBalance[0]))} zUSDC</p>
        <p>Unclaimed Token : {Number(stakerBalance[1]).toFixed(4)} ZHN</p>
      </CardContent>
      <CardFooter>
        <Button
          disabled={Number(stakerBalance[1]) <= 0}
          onClick={() => writeContract(claimRewards.data!.request)}
        >
          Claim Rewards
        </Button>
      </CardFooter>
    </Card>
  );
}

export default RewardCard;
