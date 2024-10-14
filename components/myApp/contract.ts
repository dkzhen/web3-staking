import { client } from "@/app/config";
import { defineChain, getContract } from "thirdweb";
import { useReadContract } from "thirdweb/react";

export function GetUSDCContract(accountAddress: string) {
    const contract = getContract({
        client: client,
        chain: defineChain(1301),
        address: "0xE7fe2a38614Bb79e1EdD7f4e7620f9764F37B0C9",
      });
    
      const { data, isPending } = useReadContract({
        contract,
        method: "function balanceOf(address account) view returns (uint256)",
        params: [accountAddress.toString()],
      });

      return { USDCData : data, isPendingUSDC : isPending };
}
export function GetZHNContract(accountAddress: string) {
    const contract = getContract({
        client: client,
        chain: defineChain(1301),
        address: "0x348f42189CB7719A4ae0fD00F277D874562A3752",
      });
    
      const { data, isPending } = useReadContract({
        contract,
        method: "function balanceOf(address account) view returns (uint256)",
        params: [accountAddress.toString()],
      });

      return { ZHNData : data, isPendingZHN : isPending };
}
export const GetAllowanceSpender= (owner: string, spender: string) => {
    const contract = getContract({
        client: client,
        chain: defineChain(1301),
        address: "0xE7fe2a38614Bb79e1EdD7f4e7620f9764F37B0C9",
      });
    
      const { data, isPending } = useReadContract({
        contract,
        method: "function allowance(address owner, address spender) view returns (uint256)",
        params: [owner, spender]
      });

      return { allowanceData : data, isPendingAllowance : isPending };
} 
export const GetStakerInfo= (address:string) => {
    const contract = getContract({
        client: client,
        chain: defineChain(1301),
        address: "0xd8995f43f2152Ea7F73f3630a98710F1fD520859",
      });
    
      const { data, isPending } = useReadContract({
        contract,
        method: "function getStakeInfo(address _staker) view returns (uint256 _tokensStaked, uint256 _rewards)",
    params: [address]
      });

      return { stakerInfo : data, isPendingStakerInfo : isPending };
} 
export const GetFaucetBalance= () => {
    const contract = getContract({
        client: client,
        chain: defineChain(1301),
        address: "0xEc5CeAAd48f848500a2C372a9cF5911e807834e2",
      });
    
      const { data, isPending } = useReadContract({
        contract,
        method: "function faucetBalance() view returns (uint256)"
      });

      return { faucetBalance : data, isPendingFaucetBalance : isPending };
} 
export const GetAllRewardBalance= () => {
    const contract = getContract({
        client: client,
        chain: defineChain(1301),
        address: "0xd8995f43f2152Ea7F73f3630a98710F1fD520859",
      });
    
      const { data, isPending } = useReadContract({
        contract,
        method: "function getRewardTokenBalance() view returns (uint256)",
        params: []
      });

      return { rewardsBalance : data, isPendingRewardsBalance : isPending };
} 

 

