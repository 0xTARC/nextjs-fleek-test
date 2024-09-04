import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'viem';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Panoptic Earn',
  projectId: '4b8e600fea0445270bf5952419a7a08b', // For WalletConnect 2.0
  chains: [
    // mainnet,
    // polygon,
    // optimism,
    // arbitrum,
    // base,
    sepolia,
  ],
  transports: {
    [sepolia.id]: http(
      `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
    ),
  },
  ssr: process.env.NODE_ENV === 'development', // If your dApp uses server side rendering (SSR)
});
