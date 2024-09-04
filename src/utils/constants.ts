import { Address } from 'viem'
import { arbitrum, avalanche, base, mainnet, optimism, polygon, sepolia } from 'wagmi/chains'
import { Alchemy, Network } from 'alchemy-sdk'

// pulled from tokenlist
export const STABLECOINS = new Set<Address>([
  '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  '0xaD6D458402F60fD3Bd25163575031ACDce07538D',
  '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735',
  '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
  '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa',
  '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
  '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
  '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
  '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
  '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
  '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA',
  '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
  '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
  '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
  '0x55d398326f99059fF775485246999027B3197955',
  '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
])

// Each EVM-compatible chain typically has one native asset. There is also typically a "wrapped" version of that native asset, which is an ERC20 whose total supply is 1-1 with the ERC20 contract's balance of the native token. This mapping is to quickly lookup each EVM chain's cannonical wrapped native asset token's address.
export const wrappedNativeTokenAddressesPerChain: Record<number, Address> = {
  [mainnet.id]: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
  [polygon.id]: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', // WMATIC
  [arbitrum.id]: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', // WETH
  [avalanche.id]: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', // WAVAX
  [base.id]: '0x4200000000000000000000000000000000000006', // WETH
  [optimism.id]: '0x4200000000000000000000000000000000000006', // WETH
  [sepolia.id]: '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14', // WETH
} as const

export const NATIVE_TOKENS = new Set<Address>(Object.values(wrappedNativeTokenAddressesPerChain))
export const SQER_PRICE_NIGHTY_SIX_443636 = BigInt('340275971719517849884101479065584693834')

export const getAlchemyInstance = (chainId: number) => {
  const alchemyNetworkChainId: Record<number, Network> = {
    [mainnet.id]: Network.ETH_MAINNET,
    [polygon.id]: Network.MATIC_MAINNET,
    [arbitrum.id]: Network.ARB_MAINNET,
    [base.id]: Network.BASE_MAINNET,
    [optimism.id]: Network.OPT_MAINNET,
    [sepolia.id]: Network.ETH_SEPOLIA,
  }

  const config = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: alchemyNetworkChainId[chainId],
  }

  return new Alchemy(config)
}

export const contracts: Record<number, Record<string, Address>> = {
  // sepolia
  11155111: {
    SemiFungiblePositionManager: '0x77dcbA7729358D9F43AE4C3EA4206AA01c3d0056',
    PanopticFactory: '0x17b393d0c5a27136dec50ac94715ccca1d8a0b0e',
    UniswapV3Factory: '0x0227628f3F023bb0B980b67D528571c95c6DaC1c',
    NonFungiblePositionManager: '0x1238536071E1c677A632429e3655c799b22cDA52',
    PanopticHelper: '0x4acc8a06e7567f3a40a53d3254ad5888b22f902e',
    UniswapMigrator: '0xb5cf92427ff8b388bb333c074ed4bf961683b282',
  },
}

export const getChainNameFromChainId = (chainId: number) => {
  const chains: Record<number, string> = {
    [mainnet.id]: 'mainnet',
    [polygon.id]: 'polygon',
    [arbitrum.id]: 'arbitrum',
    [base.id]: 'base',
    [optimism.id]: 'optimism',
    [sepolia.id]: 'sepolia',
  }
  return chains[chainId]
}
