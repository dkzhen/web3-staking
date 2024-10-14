import { createThirdwebClient } from 'thirdweb';
import { http, createConfig } from 'wagmi'
import {  unichainSepolia } from 'wagmi/chains'
import { injected, metaMask, safe } from 'wagmi/connectors'

export const config = createConfig({
  chains: [unichainSepolia],
  connectors: [
    injected(),
    metaMask(),
    safe()
    
  ],
  transports: {
    [unichainSepolia.id]: http(),
    
  },
})

export const client  = createThirdwebClient({
    clientId: "ce26193ddbc064f102334a81d782ab71",
    secretKey:"eb4edLjzEJ8PhGSdjnPFrsVzbtXw0toleLeP2UDSP1XRb8lT-_HyHLpuq_LoflIKGDcBVPcOvOcuL48XBS-JbA"
   });