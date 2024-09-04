import { CollateralFragment } from '~/graphql/types.generated'
import Decimal from 'decimal.js'

export function calcCommissionsEarnedSinceLastTransfer(
  sharePriceAtLastTransfer: string,
  sharesBeforeTransfer: string,
  sharePriceBeforeTransfer: string,
  sharesAfterTransfer: string,
  sharePriceAfterTransfer: string,
): string {
  const spAtLastTransfer = new Decimal(sharePriceAtLastTransfer)
  const sharesBefore = new Decimal(sharesBeforeTransfer)
  const spBeforeTransfer = new Decimal(sharePriceBeforeTransfer)
  const sharesAfter = new Decimal(sharesAfterTransfer)
  const spAfterTransfer = new Decimal(sharePriceAfterTransfer)

  const firstTerm = sharesBefore.mul(spBeforeTransfer.minus(spAtLastTransfer))
  const secondTerm = sharesAfter.mul(spAfterTransfer.minus(spBeforeTransfer))

  return firstTerm.plus(secondTerm).toString()
}

export function calcSharePrice(
  collateralFragment: Pick<CollateralFragment, 'totalAssets' | 'totalShares'>,
): bigint {
  return BigInt(collateralFragment.totalAssets) / BigInt(collateralFragment.totalShares)
}

export type CommissionsData = {
  timestamp: string
  commissionsUsd: number
}

// Function to calculate 7-day APY
export function calculate7DayAPY(currentSharePrice: number, sevenDayOldSharePrice: number): number {
  // Calculate the difference in share prices
  const priceDifference = currentSharePrice - sevenDayOldSharePrice

  // Extrapolate the difference over a year (considering 7 days as a fraction of a year)
  const yearlyDifference = priceDifference * (365 / 7)

  // Calculate the APY
  const apy = (yearlyDifference / sevenDayOldSharePrice) * 100

  return apy
}

export function convertToAssets(userShares: string, totalAssets: string, totalSupply: string) {
  const shares = BigInt(userShares)
  const assets = BigInt(totalAssets)
  const supply = BigInt(totalSupply)
  return (shares * assets) / supply
}

export function calculate7DayAvgAPY(
  currentSharePriceCollateral0: number,
  sevenDayOldSharePriceCollateral0: number,
  currentSharePriceCollateral1: number,
  sevenDayOldSharePriceCollateral1: number,
) {
  // Calculate 7-day APY (compare the share price on that day with the share price from January 1st and then extrapolate this difference over an entire year), assuming the length of collateralDayData is 7.
  // If length of collateralDayData is less, this will still calculate implied APY with at least two values.
  const sevenDayApy0 = calculate7DayAPY(
    currentSharePriceCollateral0,
    sevenDayOldSharePriceCollateral0,
  )
  const sevenDayApy1 = calculate7DayAPY(
    currentSharePriceCollateral1,
    sevenDayOldSharePriceCollateral1,
  )

  // To get a single 7-day APY for both collaterals, avg their two APYs together
  const marketSevenDayApySum = sevenDayApy0 + sevenDayApy1
  return marketSevenDayApySum / 2
}
