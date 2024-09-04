import { chainToGraphQlSdk } from '~/subgraph'
import { calculate7DayAvgAPY } from '~/utils/collateral'

export const fetchPoolsWithApysSample = async (chainId: number) => {
  const sdk = chainToGraphQlSdk?.[chainId]
  const samplePoolsWithCollateralDayData = await sdk.GetSamplePoolsWithCollateralDayData()

  const poolsWithApysSample = samplePoolsWithCollateralDayData.panopticPools?.map(
    (panopticPool) => {
      const marketAvgSevenDayApy =
        !panopticPool.collateral0.collateralDayData.length ||
        !panopticPool.collateral1.collateralDayData.length
          ? 0
          : calculate7DayAvgAPY(
              Number(
                panopticPool.collateral0.collateralDayData[
                  panopticPool.collateral0.collateralDayData.length - 1
                ].sharePrice,
              ),
              Number(panopticPool.collateral0.collateralDayData[0].sharePrice),
              Number(
                panopticPool.collateral1.collateralDayData[
                  panopticPool.collateral1.collateralDayData.length - 1
                ].sharePrice,
              ),
              Number(panopticPool.collateral1.collateralDayData[0].sharePrice),
            )
      return {
        ...panopticPool,
        marketAvgSevenDayApy,
      }
    },
  )

  return { panopticPools: poolsWithApysSample }
}
