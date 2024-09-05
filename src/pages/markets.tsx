import { useRouter } from 'next/router'
import { chainToBlocksGraphQlAPI, chainToGraphQlSdk } from '~/subgraph'
import { Container, DropdownMenu, Flex, IconButton, Skeleton } from '@radix-ui/themes'
import { useAccount, useChainId, useReadContracts } from 'wagmi'
import { Address, formatUnits, getAddress, zeroAddress } from 'viem'
import { useQueries, useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { OptionMint, PoolDayDataFragment, PoolHourDataFragment } from '~/graphql/types.generated'
import { DataLabel } from '~/components/data-label'
import { convertMonetaryFormat, tokenValueInUSD } from '~/utils/price'
import { abi as CollateralTrackerAbi } from '~/abis/CollateralTracker'
import { findTokenInTokenList, getAssetQuoteToken } from '~/utils/tokens'
import { MarketInfo } from '~/components/market-info'
import { calculate7DayAvgAPY } from '~/utils/collateral'
import Decimal from 'decimal.js'
import { BsArrowLeftRight } from 'react-icons/bs'
import { TokenInfo } from '@uniswap/token-lists'
import {
  TimerSeriesData,
  filterLeadingZeroToken1Price,
  formatPoolPriceTimeSeriesDailyChart,
  formatPoolPriceTimeSeriesHourlyChart,
  forwardFillMissingDailyData,
  forwardFillMissingHourlyData,
} from '~/utils/chartdata'
import { ChartType, ResponsivePriceChart } from '~/components/responsive-price-chart'
import { BlocksForPastWeekResponse, getEpochTime7DaysAgo } from '~/utils/timestamp'
import { calculateWeeklyVolume } from '~/utils/pool'
import { request as gqlRequest } from 'graphql-request'
import { Alert } from '~/components/alert'
import { Apy } from '~/components/apy'
import { useScreenDetector } from '~/hooks/useScreenDetector'
import { Button } from '~/components/button'
import { dropdownMenu, listItem, subSectionTitle } from '~/components/component.styles'
import { TokenStakedInfo } from '~/utils/userAccount'
import { TokenStakedTable } from '~/components/tokenStakedTable'
import { Sheet } from 'react-modal-sheet'
import clsx from 'clsx'

export const getMarketDetails = async (chainId: number, marketAddress: Address) => {
  const sdk = chainToGraphQlSdk?.[chainId]
  return sdk.GetMarketDetails({
    market: marketAddress.toLowerCase(),
  })
}

export const getMarketEvents = async (chainId: number, marketAddress: Address, weekAgo: number) => {
  const sdk = chainToGraphQlSdk?.[chainId]
  return sdk.GetMarketMintEvents({
    market: marketAddress.toLowerCase(),
    weekAgo: weekAgo.toString(),
  })
}

export const getPastWeekBlockNumber = async (chainId: number, weekAgo: number) => {
  const blocksApiUrl = chainToBlocksGraphQlAPI?.[chainId]
  const query = `{
    blocks(
      first: 1,
      where: {
        timestamp_gte: "${weekAgo}",
      }
    ) {
      number
    }
  }`
  const blocksForTimestamps = await gqlRequest<BlocksForPastWeekResponse>(blocksApiUrl, query)
  return blocksForTimestamps
}

export const getMarketDetailsFromBlock = async (
  chainId: number,
  marketAddress: Address,
  blockNumber: number,
) => {
  const sdk = chainToGraphQlSdk?.[chainId]
  return sdk.GetMarketDetailsFromBlock({
    market: marketAddress.toLowerCase(),
    blockNumber,
  })
}

export const getPpaAccountInfo = async (chainId: number, account: Address) => {
  const sdk = chainToGraphQlSdk?.[chainId]
  return sdk.GetPpaAccountCollateralInfo({
    account,
  })
}

export default function MarketDetails() {
  const chainId = useChainId()
  // const params = useParams()
  // const marketAddress = params['marketAddress'] as Address
  const router = useRouter();
  const marketAddress = (router.query.marketAddress as Address) ?? null
  const weekAgo = getEpochTime7DaysAgo()
  const [poolUtilization, setPoolUtilization] = useState<string | undefined>(undefined)
  const [tvl, setTvl] = useState<string | undefined>(undefined)
  const [weeklyVolume, setWeeklyVolume] = useState<string | undefined>(undefined)
  const [weeklyFees, setWeeklyFees] = useState<string | undefined>(undefined)
  const [isAssetToken0, setIsAssetToken0] = useState<boolean>(false)
  const [price, setPrice] = useState<string>('')
  const [priceChartType, setPriceChartType] = useState<ChartType>(ChartType.DAILY)
  const { isMobile } = useScreenDetector()
  const { isConnected, address } = useAccount()
  const [poolInfo, poolEvents, pastWeekBlockNumber, accountCollateralInfo] = useQueries({
    queries: [
      {
        queryKey: ['getMarketDetails', chainId, marketAddress],
        queryFn: () => getMarketDetails(chainId, marketAddress ?? zeroAddress),
        enabled: marketAddress !== undefined,
      },
      {
        queryKey: ['getMarketEvents', chainId, marketAddress, weekAgo],
        queryFn: () => getMarketEvents(chainId, marketAddress ?? zeroAddress, weekAgo),
        enabled: marketAddress !== undefined,
      },
      {
        queryKey: ['getPastWeekBlockNumber', chainId, weekAgo],
        queryFn: () => getPastWeekBlockNumber(chainId, weekAgo),
        enabled: marketAddress !== undefined,
      },
      {
        queryKey: ['getPpaAccountInfo', chainId, address],
        queryFn: () => getPpaAccountInfo(chainId, address ?? zeroAddress),
        enabled: isConnected && address !== undefined,
      },
    ],
  })

  const pastWeekPoolInfo = useQuery({
    queryKey: [
      'getMarketDetailsFromBlock',
      chainId,
      marketAddress,
      pastWeekBlockNumber.data?.blocks[0].number,
    ],
    queryFn: () =>
      getMarketDetailsFromBlock(
        chainId,
        marketAddress ?? zeroAddress,
        Number(pastWeekBlockNumber.data?.blocks[0].number),
      ),
    enabled:
      marketAddress !== undefined &&
      pastWeekBlockNumber !== undefined &&
      pastWeekBlockNumber.data !== undefined,
  })

  const { data: collateralData, isLoading: isLoadingCollateralData } = useReadContracts({
    contracts: [
      {
        address: poolInfo.data?.panopticPool?.collateral0.id
          ? (poolInfo.data?.panopticPool?.collateral0.id as Address)
          : zeroAddress,
        abi: CollateralTrackerAbi,
        functionName: 'getPoolData',
      },
      {
        address: poolInfo.data?.panopticPool?.collateral0.id
          ? (poolInfo.data?.panopticPool?.collateral0.id as Address)
          : zeroAddress,
        abi: CollateralTrackerAbi,
        functionName: 'totalAssets',
      },
      {
        address: poolInfo.data?.panopticPool?.collateral1.id
          ? (poolInfo.data?.panopticPool?.collateral1.id as Address)
          : zeroAddress,
        abi: CollateralTrackerAbi,
        functionName: 'getPoolData',
      },
      {
        address: poolInfo.data?.panopticPool?.collateral1.id
          ? (poolInfo.data?.panopticPool?.collateral1.id as Address)
          : zeroAddress,
        abi: CollateralTrackerAbi,
        functionName: 'totalAssets',
      },
      {
        address: poolInfo.data?.panopticPool?.collateral0.id
          ? (poolInfo.data?.panopticPool?.collateral0.id as Address)
          : zeroAddress,
        abi: CollateralTrackerAbi,
        functionName: 'maxWithdraw',
        args: [address ?? zeroAddress],
      },
      {
        address: poolInfo.data?.panopticPool?.collateral1.id
          ? (poolInfo.data?.panopticPool?.collateral1.id as Address)
          : zeroAddress,
        abi: CollateralTrackerAbi,
        functionName: 'maxWithdraw',
        args: [address ?? zeroAddress],
      },
    ],
    query: {
      enabled:
        poolInfo.data?.panopticPool?.collateral1.id !== undefined &&
        poolInfo.data?.panopticPool?.collateral0.id !== undefined,
    },
  })
  const enableWithdrawToken0 =
    collateralData !== undefined && collateralData[4].result !== undefined
      ? collateralData[4].result > BigInt(0)
      : false
  const enableWithdrawToken1 =
    collateralData !== undefined && collateralData[5].result !== undefined
      ? collateralData[5].result > BigInt(0)
      : false
  const userBalanceOfToken0 =
    collateralData !== undefined && collateralData[4].result !== undefined
      ? collateralData[4].result
      : BigInt(0)
  const userBalanceOfToken1 =
    collateralData !== undefined && collateralData[5].result !== undefined
      ? collateralData[5].result
      : BigInt(0)
  useEffect(() => {
    if (
      collateralData &&
      poolInfo.data &&
      poolInfo.data.panopticPool &&
      poolInfo.data.bundle &&
      poolEvents.data &&
      poolEvents.data.events &&
      pastWeekPoolInfo.data &&
      pastWeekPoolInfo.data.panopticPool &&
      pastWeekPoolInfo.data.bundle
    ) {
      const token0 = {
        ...poolInfo.data.panopticPool.underlyingPool.token0,
        address: poolInfo.data.panopticPool.underlyingPool.token0.id,
      }
      const token1 = {
        ...poolInfo.data.panopticPool.underlyingPool.token1,
        address: poolInfo.data.panopticPool.underlyingPool.token1.id,
      }
      const { isAssetToken0: isDefaultPoolAssetToken0 } = getAssetQuoteToken(
        token0 as unknown as TokenInfo,
        token1 as unknown as TokenInfo,
      )
      const token0Decimals = Number(token0.decimals)
      const token1Decimals = Number(token1.decimals)
      const insideAMMCollateral0 = Number(
        formatUnits(
          collateralData[0].result ? BigInt(collateralData[0].result[1]) : BigInt('0'),
          token0Decimals,
        ),
      )
      const totalAssetsCollateral0 = Number(
        formatUnits(
          collateralData[1].result ? BigInt(collateralData[1].result) : BigInt('0'),
          token0Decimals,
        ),
      )
      const insideAMMCollateral1 = Number(
        formatUnits(
          collateralData[2].result ? BigInt(collateralData[2].result[1]) : BigInt('0'),
          token1Decimals,
        ),
      )
      const totalAssetsCollateral1 = Number(
        formatUnits(
          collateralData[3].result ? BigInt(collateralData[3].result) : BigInt('0'),
          token1Decimals,
        ),
      )
      const token0DerivedEth = Number(poolInfo.data.panopticPool.underlyingPool.token0.derivedETH)
      const token1DerivedEth = Number(poolInfo.data.panopticPool.underlyingPool.token1.derivedETH)
      const currentEthPriceUSD = Number(poolInfo.data.bundle.ethPriceUSD)

      const insideAMMCollateral0USD = tokenValueInUSD(
        insideAMMCollateral0,
        token0DerivedEth,
        currentEthPriceUSD,
      )
      const insideAMMCollateral1USD = tokenValueInUSD(
        insideAMMCollateral1,
        token1DerivedEth,
        currentEthPriceUSD,
      )
      const totalAssetsCollateral0USD = tokenValueInUSD(
        totalAssetsCollateral0,
        token0DerivedEth,
        currentEthPriceUSD,
      )
      const totalAssetsCollateral1USD = tokenValueInUSD(
        totalAssetsCollateral1,
        token1DerivedEth,
        currentEthPriceUSD,
      )

      const totalAssetCollateral = totalAssetsCollateral0USD + totalAssetsCollateral1USD
      const totalCollateralInsideAmm = insideAMMCollateral0USD + insideAMMCollateral1USD
      const calPoolUtilization =
        totalAssetCollateral.toString() === '0'
          ? new Decimal(0)
          : new Decimal(totalCollateralInsideAmm).div(totalAssetCollateral)
      const calPoolUtilizationPercent = calPoolUtilization.mul(new Decimal(100))
      setPoolUtilization(calPoolUtilizationPercent.toFixed(2) + '%')
      setTvl(convertMonetaryFormat(totalAssetCollateral, true, 2))
      const weeklyVolume = calculateWeeklyVolume(
        poolEvents.data?.events as OptionMint[],
        currentEthPriceUSD,
        BigInt(poolInfo.data.panopticPool.underlyingPool.tickSpacing),
        isDefaultPoolAssetToken0,
      )
      setWeeklyVolume(convertMonetaryFormat(weeklyVolume, true, 2))

      const currentCommissions0 = new Decimal(poolInfo.data.panopticPool.commissions0).div(
        Decimal.pow(10, token0Decimals),
      )
      const currentCommissions1 = new Decimal(poolInfo.data.panopticPool.commissions1).div(
        Decimal.pow(10, token1Decimals),
      )
      const currentCommissions0USD = tokenValueInUSD(
        currentCommissions0.toNumber(),
        token0DerivedEth,
        currentEthPriceUSD,
      )
      const currentCommissions1USD = tokenValueInUSD(
        currentCommissions1.toNumber(),
        token1DerivedEth,
        currentEthPriceUSD,
      )

      const pastWeekToken0DerivedEth = Number(
        pastWeekPoolInfo.data.panopticPool.underlyingPool.token0.derivedETH,
      )
      const pastWeekToken1DerivedEth = Number(
        pastWeekPoolInfo.data.panopticPool.underlyingPool.token1.derivedETH,
      )
      const pastWeekEthPriceUSD = Number(pastWeekPoolInfo.data.bundle.ethPriceUSD)
      const pastWeekCommissions0 = new Decimal(pastWeekPoolInfo.data.panopticPool.commissions0).div(
        Decimal.pow(10, token0Decimals),
      )
      const pastWeekCommissions1 = new Decimal(pastWeekPoolInfo.data.panopticPool.commissions1).div(
        Decimal.pow(10, token1Decimals),
      )
      const pastWeekCommissions0USD = tokenValueInUSD(
        pastWeekCommissions0.toNumber(),
        pastWeekToken0DerivedEth,
        pastWeekEthPriceUSD,
      )
      const pastWeekCommissions1USD = tokenValueInUSD(
        pastWeekCommissions1.toNumber(),
        pastWeekToken1DerivedEth,
        pastWeekEthPriceUSD,
      )

      const netCommissions =
        currentCommissions0USD -
        pastWeekCommissions0USD +
        (currentCommissions1USD - pastWeekCommissions1USD)
      setWeeklyFees(convertMonetaryFormat(netCommissions > 0 ? netCommissions : 0, true, 2))
    }
  }, [collateralData, poolInfo.data, poolEvents.data, pastWeekPoolInfo.data])

  const renderMarketBasicInfo = useMemo(() => {
    if (
      poolInfo.isLoading ||
      poolInfo.data === undefined ||
      poolInfo.data.panopticPool === undefined ||
      poolInfo.data.panopticPool === null
    ) {
      return (
        <Flex direction="row" justify="between">
          <Skeleton height="48px" width="230px" />
          <Skeleton height="48px" width="100px" />
        </Flex>
      )
    } else {
      const marketInfo = poolInfo.data.panopticPool.underlyingPool
      const marketAvgSevenDayApy =
        !poolInfo.data.panopticPool?.collateral0.collateralDayData.length ||
        !poolInfo.data.panopticPool?.collateral1.collateralDayData.length
          ? 0
          : calculate7DayAvgAPY(
              Number(
                poolInfo.data.panopticPool?.collateral0.collateralDayData[
                  poolInfo.data.panopticPool.collateral0.collateralDayData.length - 1
                ].sharePrice,
              ),
              Number(poolInfo.data.panopticPool?.collateral0.collateralDayData[0].sharePrice),
              Number(
                poolInfo.data.panopticPool?.collateral1.collateralDayData[
                  poolInfo.data.panopticPool.collateral1.collateralDayData.length - 1
                ].sharePrice,
              ),
              Number(poolInfo.data.panopticPool?.collateral1.collateralDayData[0].sharePrice),
            )
      const token0Symbol = isAssetToken0 ? marketInfo.token0.symbol : marketInfo.token1.symbol
      const token1Symbol = isAssetToken0 ? marketInfo.token1.symbol : marketInfo.token0.symbol
      const token0WithLogoUri = {
        ...marketInfo.token0,
        logoURI: findTokenInTokenList(getAddress(marketInfo.token0.id))?.logoURI,
      }
      const token1WithLogoUri = {
        ...marketInfo.token1,
        logoURI: findTokenInTokenList(getAddress(marketInfo.token1.id))?.logoURI,
      }
      const token0LogoUri = isAssetToken0 ? token0WithLogoUri : token1WithLogoUri
      const token1LogoUri = isAssetToken0 ? token1WithLogoUri : token0WithLogoUri
      return (
        <Flex direction="row" justify="between">
          <div className="flex flex-row align-baseline gap-x-3">
            <MarketInfo
              marketId={marketInfo.id}
              token0LogoUri={token0LogoUri}
              token1LogoUri={token1LogoUri}
              token0Symbol={token0Symbol}
              token1Symbol={token1Symbol}
              hasSubInfo
              fee={Number(marketInfo.feeTier) / 100}
            />
            <IconButton size="1" variant="soft" onClick={() => setIsAssetToken0(!isAssetToken0)}>
              <BsArrowLeftRight />
            </IconButton>
          </div>
          <div className="flex flex-row items-center gap-x-3">
            <Apy apy={marketAvgSevenDayApy} showLabel={isMobile ? false : true} />
          </div>
        </Flex>
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    poolInfo.isLoading,
    poolInfo.data,
    isAssetToken0,
    isMobile,
    accountCollateralInfo.data,
    enableWithdrawToken0,
    enableWithdrawToken1,
  ])

  const renderPoolData = useMemo(() => {
    return [
      {
        label: '7D Volume',
        data: weeklyVolume ?? '-',
        loading: poolInfo.isLoading,
      },
      {
        label: 'Total value Locked',
        data: tvl ?? '-',
        loading: isLoadingCollateralData,
      },
      {
        label: 'Pool Utilization',
        data: poolUtilization ?? '-',
        loading: isLoadingCollateralData,
      },
      {
        label: '7D Fees',
        data: weeklyFees ?? '-',
        loading: poolInfo.isLoading,
      },
    ].map((item, index) => {
      return <DataLabel data={item.data} label={item.label} key={index} isLoading={item.loading} />
    })
  }, [weeklyVolume, tvl, isLoadingCollateralData, poolUtilization, weeklyFees, poolInfo.isLoading])

  const renderChart = useMemo(() => {
    if (poolInfo.isLoading) {
      return <Skeleton height="400px" />
    } else {
      if (
        poolInfo.data === undefined ||
        poolInfo.data.panopticPool === undefined ||
        poolInfo.data.panopticPool === null
      ) {
        return (
          <div className="h-[400px] flex flex-col justify-center items-center">
            <Alert text={'There is no price data for this pool.'} />
          </div>
        )
      }

      let chartData: TimerSeriesData[] = []
      if (priceChartType === ChartType.HOURLY) {
        // Hourly data
        const filteredPoolHourData = filterLeadingZeroToken1Price<PoolHourDataFragment[]>(
          poolInfo.data.panopticPool.underlyingPool.poolHourData.sort(
            (a, b) => a.periodStartUnix - b.periodStartUnix,
          ),
        )
        const forwardFilledHourlyData = forwardFillMissingHourlyData(filteredPoolHourData)
        chartData = formatPoolPriceTimeSeriesHourlyChart(forwardFilledHourlyData)
      } else if (priceChartType === ChartType.DAILY) {
        // Daily data
        const filteredPoolDailyData = filterLeadingZeroToken1Price(
          poolInfo.data.panopticPool.underlyingPool.poolDayData.sort((a, b) => a.date - b.date),
        )
        const forwardFilledDailyData = forwardFillMissingDailyData(
          filteredPoolDailyData as PoolDayDataFragment[],
        )
        chartData = formatPoolPriceTimeSeriesDailyChart(forwardFilledDailyData)
      }

      if (!isAssetToken0) {
        chartData = chartData.map((data) => {
          return { time: data.time, value: 1 / data.value }
        })
      }

      return (
        <div className="h-[400px]">
          {!chartData.length ? (
            <div className="h-[330px] flex flex-col justify-center items-center">
              <Alert text={'There is no price data for this pool.'} />
            </div>
          ) : (
            <>
              <div className="h-[32px]">
                <p className="text-xl font-semibold">Price {price}</p>
              </div>
              <ResponsivePriceChart
                data={chartData}
                id="poolPrice"
                height={300}
                setPrice={setPrice}
                chartType={priceChartType}
              />
            </>
          )}
          <div className="flex flex-row gap-x-3">
            <IconButton
              size="2"
              variant="soft"
              onClick={() => setPriceChartType(ChartType.HOURLY)}
              color={priceChartType === ChartType.HOURLY ? 'blue' : 'gray'}>
              1H
            </IconButton>
            <IconButton
              size="2"
              variant="soft"
              onClick={() => setPriceChartType(ChartType.DAILY)}
              color={priceChartType === ChartType.DAILY ? 'blue' : 'gray'}>
              1D
            </IconButton>
          </div>
        </div>
      )
    }
  }, [poolInfo.isLoading, poolInfo.data, priceChartType, isAssetToken0, price])

  const renderStakeTokensInfo = useMemo(() => {
    if (
      poolInfo.data === undefined ||
      poolInfo.data.panopticPool === undefined ||
      poolInfo.data.panopticPool === null ||
      poolInfo.data.bundle === undefined ||
      poolInfo.data.bundle === null
    ) {
      return
    } else {
      const token0Temp = poolInfo.data.panopticPool.underlyingPool.token0
      const token1Temp = poolInfo.data.panopticPool.underlyingPool.token1
      const currentEthPriceUSD = Number(poolInfo.data.bundle.ethPriceUSD)
      const token0: TokenStakedInfo = {
        tokenAddress: token0Temp.id,
        tokenDecimals: token0Temp.decimals,
        tokenName: token0Temp.name,
        tokenSymbol: token0Temp.symbol,
        tokenDerivedETH: token0Temp.derivedETH,
        tokenLogoUri: findTokenInTokenList(getAddress(token0Temp.id))?.logoURI ?? '',
        logoUri: findTokenInTokenList(getAddress(token0Temp.id))?.logoURI ?? '',
        stakedAmount: userBalanceOfToken0,
        hasDepositedCollateral: userBalanceOfToken0 > BigInt(0),
      }
      const token1: TokenStakedInfo = {
        tokenAddress: token1Temp.id,
        tokenDecimals: token1Temp.decimals,
        tokenName: token1Temp.name,
        tokenSymbol: token1Temp.symbol,
        tokenDerivedETH: token1Temp.derivedETH,
        tokenLogoUri: findTokenInTokenList(getAddress(token1Temp.id))?.logoURI ?? '',
        logoUri: findTokenInTokenList(getAddress(token1Temp.id))?.logoURI ?? '',
        stakedAmount: userBalanceOfToken1,
        hasDepositedCollateral: userBalanceOfToken1 > BigInt(0),
      }
      return (
        <div>
          <p className={subSectionTitle}>Balance</p>
          <TokenStakedTable
            tokens={[token0, token1]}
            panopticPoolId={marketAddress}
            isLoading={poolInfo.isLoading}
            ethPriceUSD={currentEthPriceUSD}
          />
        </div>
      )
    }
  }, [poolInfo.data, poolInfo.isLoading, userBalanceOfToken0, userBalanceOfToken1, marketAddress])

  return (
    <Container size="3">
      <Flex direction="column" gap="8">
        {renderMarketBasicInfo}
        {renderChart}
        <div className="flex flex-row items-center justify-between">{renderPoolData}</div>
        <div>{renderStakeTokensInfo}</div>
      </Flex>
    </Container>
  )
}
