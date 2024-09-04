import { OptionMint } from '~/graphql/types.generated'
import { asTicks } from './tick'
import { SQER_PRICE_NIGHTY_SIX_443636 } from './constants'
import { mulDiv128, mulDiv192, mulDiv64 } from './math'
import { TickMath } from '@uniswap/v3-sdk'
import { formatUnits } from 'viem'
import { tokenValueInUSD } from './price'

export const calculateWeeklyVolume = (
  events: OptionMint[],
  ethPriceUSD: number,
  poolTickSpacing: bigint,
  isAssetToken0: boolean,
) => {
  if (!events.length) return 0
  let token0Vol = 0
  let token1Vol = 0

  const token0Decimal = Number(events[0].tokenId.pool.token0.decimals)
  const token0DerivedEth = Number(events[0].tokenId.pool.token0.derivedETH)
  const token1Decimal = Number(events[0].tokenId.pool.token1.decimals)
  const token1DerivedEth = Number(events[0].tokenId.pool.token1.derivedETH)

  for (const event of events) {
    for (const leg of event.tokenId.legs) {
      const ticks = asTicks(BigInt(leg.strike), BigInt(leg.width), poolTickSpacing)
      const amountMoved = getAmountsMoved(
        isAssetToken0,
        BigInt(event.positionSize),
        ticks.legLowerTick,
        ticks.legUpperTick,
        BigInt(leg.optionRatio),
      )

      if (leg.tokenType === '0') {
        token0Vol += Number(formatUnits(amountMoved[0], token0Decimal))
      } else {
        token1Vol += Number(formatUnits(amountMoved[1], token1Decimal))
      }
    }
  }

  return (
    tokenValueInUSD(token0Vol, token0DerivedEth, ethPriceUSD) +
    tokenValueInUSD(token1Vol, token1DerivedEth, ethPriceUSD)
  )
}

export const getAmountsMoved = (
  isAssetToken0: boolean,
  positionSize: bigint,
  tickLower: bigint,
  tickUpper: bigint,
  optionRatio: bigint,
): bigint[] => {
  let amount0
  let amount1
  if (isAssetToken0) {
    amount0 = positionSize * optionRatio
    amount1 = convertNotional(amount0, tickLower, tickUpper, isAssetToken0)
  } else {
    amount1 = positionSize * optionRatio
    amount0 = convertNotional(amount1, tickLower, tickUpper, isAssetToken0)
  }

  return [amount0, amount1]
}

export const convertNotional = (
  contractSize: bigint,
  tickLower: bigint,
  tickUpper: bigint,
  isAssetToken0: boolean,
): bigint => {
  const sqrtRatioAtMedianTick = BigInt(
    TickMath.getSqrtRatioAtTick(Number((tickUpper + tickLower) / BigInt(2))).toString(),
  )
  const notional = isAssetToken0
    ? convert0to1(contractSize, sqrtRatioAtMedianTick)
    : convert1to0(contractSize, sqrtRatioAtMedianTick)
  return notional
}

export const convert0to1 = (amount: bigint, sqrtPriceX96: bigint): bigint => {
  // the tick 443636 is the maximum price where (price) * 2**192 fits into a uint256 (< 2**256-1)
  // above that tick, we are forced to reduce the amount of decimals in the final price by 2**64 to 2**128
  if (sqrtPriceX96 < SQER_PRICE_NIGHTY_SIX_443636) {
    return mulDiv192(amount, sqrtPriceX96 ** BigInt(2))
  } else {
    return mulDiv128(amount, mulDiv64(sqrtPriceX96, sqrtPriceX96))
  }
}

export const convert1to0 = (amount: bigint, sqrtPriceX96: bigint): bigint => {
  // the tick 443636 is the maximum price where (price) * 2**192 fits into a uint256 (< 2**256-1)
  // above that tick, we are forced to reduce the amount of decimals in the final price by 2**64 to 2**128
  if (sqrtPriceX96 < SQER_PRICE_NIGHTY_SIX_443636) {
    return (amount * BigInt(2) ** BigInt(192)) / sqrtPriceX96 ** BigInt(2)
  } else {
    return (amount * BigInt(2) ** BigInt(128)) / mulDiv64(sqrtPriceX96, sqrtPriceX96)
  }
}
