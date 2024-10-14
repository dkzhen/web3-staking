import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { BigNumber, ethers } from "ethers";
import { Button } from "../ui/button";

import { abiStakingContract, abiUSDC } from "@/app/abi";
import { useAccount, useSimulateContract, useWriteContract } from "wagmi";
import { GetAllowanceSpender } from "./contract";

function StakingCard() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const accountAddress = address || "";
  const [amount, setAmount] = React.useState(0);
  const weiValue = ethers.utils.parseUnits(amount.toString(), 18);
  const stakingContract = "0xd8995f43f2152Ea7F73f3630a98710F1fD520859";

  //   check allowance
  const { allowanceData, isPendingAllowance } = GetAllowanceSpender(
    accountAddress,
    "0xd8995f43f2152Ea7F73f3630a98710F1fD520859"
  );
  const bigIntUSDCAllowance = isPendingAllowance
    ? BigNumber.from(0)
    : BigNumber.from(allowanceData);
  const zUSDCAllowance = ethers.utils.formatEther(bigIntUSDCAllowance);

  const zUSDCApproveContract = useSimulateContract({
    abi: abiUSDC,
    address: "0xE7fe2a38614Bb79e1EdD7f4e7620f9764F37B0C9",
    functionName: "approve",
    args: [stakingContract, weiValue.toString()],
  });
  //   end allowance

  // stake
  const stakeContract = useSimulateContract({
    abi: abiStakingContract,
    address: "0xd8995f43f2152Ea7F73f3630a98710F1fD520859",
    functionName: "stake",
    args: [weiValue.toString()],
  });

  console.log(zUSDCApproveContract.data);
  //end stake

  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle>Stake zUSDC</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="amount zUSDC"
          type="number"
          min={0}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </CardContent>
      <CardFooter>
        {Number(amount) > Number(zUSDCAllowance) ? (
          <Button
            onClick={() => writeContract(zUSDCApproveContract.data!.request)}
          >
            Approve
          </Button>
        ) : (
          <Button
            disabled={
              !Boolean(stakeContract.data?.request) || Number(amount) <= 0
            }
            onClick={() => writeContract(stakeContract.data!.request)}
          >
            Stake
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default StakingCard;
