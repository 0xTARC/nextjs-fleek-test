import { TokenInfo } from '@uniswap/token-lists'
import { Address, getAddress } from 'viem'
// This list comes from running `yarn build` script in the Uniswap Default Token List repo: git@github.com:Uniswap/default-token-list.git
import uniswapTokenList from '~/utils/uniswap-default.tokenlist.json'
import { NATIVE_TOKENS, STABLECOINS } from './constants'

// https://raw.githubusercontent.com/Uniswap/token-lists/main/src/tokenlist.schema.json
// Types come from tokenlist jsonschema
type TagIdentifier = string

type TagDefinition = {
  name: string
  description: string
}

type Tags = {
  [key: TagIdentifier]: TagDefinition
}

type TokenList = {
  name: string
  timestamp: string
  version: {
    major: number
    minor: number
    patch: number
  }
  tags: Tags
  logoURI: string
  keywords: string[]
  tokens: TokenInfo[]
}

export type QuoteAssetTokenPair = {
  quoteToken: TokenInfo | undefined
  assetToken: TokenInfo | undefined
  isAssetToken0: boolean
}

export const getAssetQuoteToken = (token0: TokenInfo, token1: TokenInfo): QuoteAssetTokenPair => {
  // TODO: remove possibility of these being undefined and returning undefined values
  // This case can be handled when setting and getting token values from session
  if (token0 === undefined || token1 === undefined) {
    return {
      assetToken: undefined,
      quoteToken: undefined,
      isAssetToken0: false,
    }
  }

  const { assetToken, quoteToken } = defineQuoteAssetToken(token0, token1)
  const token0Sorted = sortTokenPair(quoteToken, assetToken)[0]
  const assetTokenVal = assetToken?.address === token0Sorted?.address ? 0 : 1
  const isAssetToken0 = assetTokenVal === 0
  return {
    assetToken,
    quoteToken,
    isAssetToken0,
  }
}

export const sortTokenPair = (
  tokenA: TokenInfo,
  tokenB: TokenInfo,
): [token0: TokenInfo, token1: TokenInfo] => {
  // Sorts Token objects from smallest (token0) to largest (token1)
  // Note: we should be using '-' for comparison instead of '<', it won't work on other browser other than chrome
  const sorted = sortTokenAddressPair(tokenA.address as Address, tokenB.address as Address)
  const token0 = tokenA.address === sorted[0] ? tokenA : tokenB
  const token1 = tokenB.address === sorted[1] ? tokenB : tokenA
  return [token0, token1]
}

export const sortTokenAddressPair = (
  tokenAddressA: Address,
  tokenAddressB: Address,
): [token0: Address, token1: Address] => {
  // Sorts token address pair from smallest (token0) to largest (token1)
  const [token0, token1] = [tokenAddressA, tokenAddressB].sort()
  return [token0, token1]
}

/// Takes in a pair of tokens. If one of the tokens is a known stablecoin,
/// it returns that as the quote token. If neither token is a known stablecoin, it checks
/// if either of the tokens are a native asset (e.g. ETH), and returns the native asset token as the quote token.
/// If neither token is a stablecoin OR a native asset, quote token is defaulted to token1.
export const defineQuoteAssetToken = (token0: TokenInfo, token1: TokenInfo) => {
  let assetToken = {} as TokenInfo // token we size position in terms of
  let quoteToken = {} as TokenInfo // typical stable coin or eth in non-stablecoin pair

  if (STABLECOINS.has(getAddress(token0.address)) && STABLECOINS.has(getAddress(token1.address))) {
    assetToken = token0
    quoteToken = token1
  } else if (
    !STABLECOINS.has(getAddress(token0.address)) &&
    STABLECOINS.has(getAddress(token1.address))
  ) {
    assetToken = token0
    quoteToken = token1
  } else if (
    STABLECOINS.has(getAddress(token0.address)) &&
    !STABLECOINS.has(getAddress(token1.address))
  ) {
    assetToken = token1
    quoteToken = token0
  } else if (
    NATIVE_TOKENS.has(getAddress(token0.address)) &&
    !NATIVE_TOKENS.has(getAddress(token1.address))
  ) {
    assetToken = token1
    quoteToken = token0
  } else if (
    !NATIVE_TOKENS.has(getAddress(token0.address)) &&
    NATIVE_TOKENS.has(getAddress(token1.address))
  ) {
    assetToken = token0
    quoteToken = token1
  } else if (
    !NATIVE_TOKENS.has(getAddress(token0.address)) &&
    !NATIVE_TOKENS.has(getAddress(token1.address))
  ) {
    assetToken = token0
    quoteToken = token1
  }

  return {
    assetToken,
    quoteToken,
  }
}

const panopticTokens: TokenInfo[] = [
  // Sepolia
  {
    chainId: 11155111,
    address: '0x5bB220Afc6E2e008CB2302a83536A019ED245AA2',
    decimals: 18,
    name: 'AAVE',
    symbol: 'AAVE',
    logoURI: 'https://assets.coingecko.com/coins/images/12645/thumb/AAVE.png?1601374110',
  },
  {
    chainId: 11155111,
    address: '0x29f2D40B0605204364af54EC677bD022dA425d03',
    decimals: 8,
    name: 'Wrapped Bitcoin',
    symbol: 'WBTC',
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png',
  },
  {
    chainId: 11155111,
    address: '0x8a0E31de20651fe58A369fD6f76c21A8FF7f8d42',
    decimals: 18,
    name: 'Chainlink',
    symbol: 'LINK',
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png',
  },
  {
    chainId: 11155111,
    address: '0xda9d4f9b69ac6C22e444eD9aF0CfC043b7a7f53f',
    decimals: 6,
    name: 'USD Coin',
    symbol: 'USDC',
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
  },
  // Henry's Mock USDC that sorts after WETH
  {
    chainId: 11155111,
    address: '0xFFFeD8254566B7F800f6D8CDb843ec75AE49B07A',
    decimals: 6,
    name: 'USD Coin',
    symbol: 'USDC',
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
  },
  {
    chainId: 11155111,
    address: '0x0Bd5F04B456ab34a2aB3e9d556Fe5b3A41A0BC8D',
    decimals: 6,
    name: 'Tether',
    symbol: 'USDT',
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
  },
  {
    chainId: 11155111,
    address: '0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357',
    decimals: 18,
    name: 'Dai Stablecoin',
    symbol: 'DAI',
    logoURI: 'https://ethereum-optimism.github.io/data/DAI/logo.svg',
  },
  {
    chainId: 11155111,
    address: '0x5822905ebbe01E76168fdAF604489c35CF10247d',
    decimals: 18,
    name: 'Token1',
    symbol: 'T1',
  },
  {
    chainId: 11155111,
    address: '0xB8217e5aa68238364e60a1dB1723D5eCcB09f6aa',
    decimals: 18,
    name: 'Token0',
    symbol: 'T0',
  },
]

export function findTokenInTokenList(address: Address): TokenInfo | undefined {
  const tokenList = uniswapTokenList as TokenList
  const foundToken = [...tokenList.tokens, ...panopticTokens].find(
    (t) => t.address === getAddress(address),
  )
  return foundToken
}

export const getChainSpecificTokensList = (chainId: number): TokenInfo[] => {
  const uniTokenList = uniswapTokenList as TokenList
  return [...uniTokenList.tokens, ...panopticTokens].filter(
    (token) => Number(token.chainId) === chainId,
  )
}

export const getTokensFilter = (inputValue: string) => {
  const lowerCasedInputValue = inputValue.toLowerCase()
  return function tokensFilter(token: TokenInfo) {
    return (
      !inputValue ||
      token.name.toLowerCase().includes(lowerCasedInputValue) ||
      token.symbol.toLowerCase().includes(lowerCasedInputValue)
    )
  }
}
