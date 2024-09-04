import { TokenInfo } from '@uniswap/token-lists'
import { TICK_BASE } from '~/utils/uniswap'

export const feeTierToTickSpacing = (feeTier: number): number => {
  switch (feeTier) {
    case 10000:
      return 200
    case 3000:
      return 60
    case 500:
      return 10
    case 100:
      return 1
    default:
      throw Error(`Tick spacing for fee tier ${feeTier} undefined.`)
  }
}

export const tickToPrice = (tick: number) => {
  return Math.pow(TICK_BASE, tick)
}

export const tickToQuoteTokenPrice = (isAssetToken0: boolean, tick: number) => {
  const price = tickToPrice(tick)
  return isAssetToken0 ? price : 1 / price
}

export const tickToQuoteTokenPriceDecimalScaled = (
  isAssetToken0: boolean,
  tick: number,
  assetToken: Pick<TokenInfo, 'decimals'>,
  quoteToken: Pick<TokenInfo, 'decimals'>,
) => tickToQuoteTokenPrice(isAssetToken0, tick) / getTokenDecimalFactor(assetToken, quoteToken)

export const getTokenDecimalFactor = (
  assetToken: Pick<TokenInfo, 'decimals'>,
  quoteToken: Pick<TokenInfo, 'decimals'>,
) => {
  return getDecimalFactor(assetToken.decimals, quoteToken.decimals)
}

export const getDecimalFactor = (assetTokenDecimals: number, quoteTokenDecimals: number) =>
  10 ** (quoteTokenDecimals - assetTokenDecimals)
