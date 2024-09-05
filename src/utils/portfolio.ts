import { PanopticPoolAccount } from '~/graphql/types.generated'
import { calculate7DayAvgAPY, convertToAssets } from './collateral'
import { tokenValueInUSD } from './price'
import { findTokenInTokenList } from './tokens'
import { Address, formatUnits, getAddress } from 'viem'

export const formatPpaAccountsForPortfolioInfo = (
  panopticPoolAccounts: PanopticPoolAccount[],
  ethToUSD: number,
) => {
  return panopticPoolAccounts.map((ppa) => {
    const token0Symbol = ppa.panopticPool.underlyingPool.token0.symbol
    const token1Symbol = ppa.panopticPool.underlyingPool.token1.symbol

    const marketAvgSevenDayApy =
      ppa.panopticPool.collateral0.collateralDayData.length &&
      ppa.panopticPool.collateral1.collateralDayData.length
        ? calculate7DayAvgAPY(
            Number(
              ppa.panopticPool.collateral0.collateralDayData[
                ppa.panopticPool.collateral0.collateralDayData.length - 1
              ].sharePrice,
            ),
            Number(ppa.panopticPool.collateral0.collateralDayData[0].sharePrice),
            Number(
              ppa.panopticPool.collateral1.collateralDayData[
                ppa.panopticPool.collateral1.collateralDayData.length - 1
              ].sharePrice,
            ),
            Number(ppa.panopticPool.collateral1.collateralDayData[0].sharePrice),
          )
        : 0

    const collateral0TotalAssets = ppa.panopticPool.collateral0.totalAssets
    const collateral1TotalAssets = ppa.panopticPool.collateral1.totalAssets

    const collateral0Assets = convertToAssets(
      ppa.collateral0Shares,
      collateral0TotalAssets,
      ppa.panopticPool.collateral0.totalShares,
    )

    const token0USD = tokenValueInUSD(
      Number(
        formatUnits(collateral0Assets, Number(ppa.panopticPool.underlyingPool.token0.decimals)),
      ),
      Number(ppa.panopticPool.underlyingPool.token0.derivedETH),
      ethToUSD,
    )

    const collateral1Assets = convertToAssets(
      ppa.collateral1Shares,
      collateral1TotalAssets.toString(),
      ppa.panopticPool.collateral1.totalShares,
    )

    const token1USD = tokenValueInUSD(
      Number(
        formatUnits(collateral1Assets, Number(ppa.panopticPool.underlyingPool.token1.decimals)),
      ),
      Number(ppa.panopticPool.underlyingPool.token1.derivedETH),
      ethToUSD,
    )

    return {
      market: `${token0Symbol} / ${token1Symbol}`,
      fee: Number(ppa.panopticPool.underlyingPool.feeTier) / 100,
      apy: marketAvgSevenDayApy.toFixed(2),
      amountUSD: token0USD + token1USD,
      token0WithLogoUri: {
        ...ppa.panopticPool.underlyingPool.token0,
        logoURI: findTokenInTokenList(getAddress(ppa.panopticPool.underlyingPool.token0.id))
          ?.logoURI,
      },
      token1WithLogoUri: {
        ...ppa.panopticPool.underlyingPool.token1,
        logoURI: findTokenInTokenList(getAddress(ppa.panopticPool.underlyingPool.token1.id))
          ?.logoURI,
      },
      poolId: ppa.panopticPool.id,
      collateral0Shares: Number(ppa.collateral0Shares),
      collateral1Shares: Number(ppa.collateral1Shares),
      token0USD,
      token1USD,
      collateral0Assets,
      collateral1Assets,
      token0: {
        ...ppa.panopticPool.underlyingPool.token0,
      },
      token1: {
        ...ppa.panopticPool.underlyingPool.token1,
      },
      collateral0Address: ppa.panopticPool.collateral0.id as Address,
      collateral1Address: ppa.panopticPool.collateral1.id as Address,
      maxWithdrawToken0: BigInt(collateral0TotalAssets),
      maxWithdrawToken1: BigInt(collateral1TotalAssets),
    }
  })
}
