export const Q96 = BigInt('79228162514264337593543950336')
export const TICK_BASE = 1.0001
export const MIN_TICK = -887272
export const MAX_TICK = 887272

export function getLowerAndUpperFullRangeTicks(tickSpacing: number) {
  return [
    Math.trunc((MIN_TICK / tickSpacing) * tickSpacing), // truncate to replicate solidity behavior when attempting division
    Math.trunc((MAX_TICK / tickSpacing) * tickSpacing),
  ]
}

export function getAmountsForLiquidity(
  priceX96: bigint,
  liquidity: bigint,
  sqrtRatioAX96: bigint,
  sqrtRatioBX96: bigint,
): [bigint, bigint] {
  if (priceX96 <= sqrtRatioAX96) {
    return [getAmount0ForLiquidity(sqrtRatioAX96, sqrtRatioBX96, liquidity), BigInt(0)]
  } else if (priceX96 >= sqrtRatioBX96) {
    return [BigInt(0), getAmount1ForLiquidity(sqrtRatioAX96, sqrtRatioBX96, liquidity)]
  } else {
    return [
      getAmount0ForLiquidity(priceX96, sqrtRatioBX96, liquidity),
      getAmount1ForLiquidity(sqrtRatioAX96, priceX96, liquidity),
    ]
  }
}

export function getAmount0ForLiquidity(
  sqrtRatioAX96: bigint,
  sqrtRatioBX96: bigint,
  liquidity: bigint,
): bigint {
  if (sqrtRatioAX96 > sqrtRatioBX96) {
    const temp = sqrtRatioAX96
    sqrtRatioAX96 = sqrtRatioBX96
    sqrtRatioBX96 = temp
  }

  return (
    ((liquidity << BigInt(96)) * (sqrtRatioBX96 - sqrtRatioAX96)) / sqrtRatioBX96 / sqrtRatioAX96
  )
}

export function getAmount1ForLiquidity(
  sqrtRatioAX96: bigint,
  sqrtRatioBX96: bigint,
  liquidity: bigint,
): bigint {
  if (sqrtRatioAX96 > sqrtRatioBX96) {
    const temp = sqrtRatioAX96
    sqrtRatioAX96 = sqrtRatioBX96
    sqrtRatioBX96 = temp
  }

  return (liquidity * (sqrtRatioBX96 - sqrtRatioAX96)) / Q96
}
