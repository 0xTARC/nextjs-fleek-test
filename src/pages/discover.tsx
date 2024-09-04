import { Container } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import { TokenInfo } from '@uniswap/token-lists'
import { Address, formatUnits, getAddress, zeroAddress } from 'viem'
import { useAccount, useChainId, useReadContracts } from 'wagmi'
import { MarketTable, MarketTableInfo } from '~/components/marketTable'
import { OptionMint } from '~/graphql/types.generated'
import { chainToGraphQlSdk } from '~/subgraph'
import { calculate7DayAvgAPY } from '~/utils/collateral'
import { calculateWeeklyVolume } from '~/utils/pool'
import { tokenValueInUSD } from '~/utils/price'
import { getEpochTime7DaysAgo } from '~/utils/timestamp'
import {
  findTokenInTokenList,
  getAssetQuoteToken,
  getChainSpecificTokensList,
} from '~/utils/tokens'
import { abi as CollateralTrackerAbi } from '~/abis/CollateralTracker'
import { useMemo, useState } from 'react'
import { Button } from '~/components/button'
import { useAccountCollateralShares } from '~/hooks/useAccountInfo'
import { CurrencySelect } from '~/components/currency-select'
import { NATIVE_TOKENS, STABLECOINS } from '~/utils/constants'
import { useUserAddedTokens } from '~/hooks/useToken'
import { FeeTierSelect } from '~/components/fee-tier-select'
import { useScreenDetector } from '~/hooks/useScreenDetector'
import { Sheet } from 'react-modal-sheet'
import { IoSearch } from 'react-icons/io5'

export function clientLoader() {
  const data = { success: true }
  return data
}

export const getMarkets = async (chainId: number) => {
  const sdk = chainToGraphQlSdk?.[chainId]
  const markets = await sdk.GetMarkets()
  return markets
}

export const getMarketsMintEvents = async (chainId: number, weekAgo: number) => {
  const sdk = chainToGraphQlSdk?.[chainId]
  const marketsMintEvents = await sdk.GetMarketsMintEvents({
    weekAgo: weekAgo.toString(),
  })
  return marketsMintEvents
}

export const getMarketsBySelectedTokenAndFeeTier = async (
  chainId: number,
  assetToken: TokenInfo | undefined,
  quoteToken: TokenInfo | undefined,
  feeTiers: number | undefined,
) => {
  if (assetToken === undefined || quoteToken === undefined) return undefined
  const sdk = chainToGraphQlSdk?.[chainId]
  const markets = await sdk.GetMarketsBySelectedTokenAndFeeTier({
    assetToken: assetToken.address.toLowerCase(),
    quoteToken: quoteToken.address.toLowerCase(),
    feeTiers: feeTiers === undefined ? ['100', '500', '3000', '10000'] : [feeTiers.toString()],
  })
  return markets
}

export const getAccountDepositedVaults = async (chainId: number, account: Address) => {
  const sdk = chainToGraphQlSdk?.[chainId]
  const accountDepositedVaults = await sdk.GetVaultsWithDepositsFromAccount({
    account: account.toLowerCase(),
  })
  return accountDepositedVaults
}

export default function Discover() {
  const chainId = useChainId()
  const { address } = useAccount()
  const [filterType, setFilterType] = useState<
    'default' | 'yourMarkets' | 'topMarket' | 'topTraded'
  >('default')

  const [assetToken, setAssetToken] = useState<TokenInfo | undefined>(undefined)
  const [quoteToken, setQuoteToken] = useState<TokenInfo | undefined>(undefined)
  const [selectedFeeTier, setSelectedFeeTier] = useState<number>() // SUPER_LOW = 100, LOW = 500, MEDIUM = 3000, HIGH = 10000,
  const { isMobile } = useScreenDetector()
  const [isOpenMobileMarketSearch, setOpenMobileMarketSearch] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['markets', chainId, address],
    queryFn: () => getMarkets(chainId),
  })

  const { data: poolEvents } = useQuery({
    queryKey: ['marketsEvents', chainId],
    queryFn: () => getMarketsMintEvents(chainId, getEpochTime7DaysAgo()),
  })

  const { data: accountDepositedVaults, isLoading: isLoadingAccountDepositedVaults } = useQuery({
    queryKey: ['accountDepositedVaults', chainId, address],
    queryFn: () => getAccountDepositedVaults(chainId, address ?? zeroAddress),
    enabled: address !== undefined,
  })

  const { data: filterMarketsFromSelections, isLoading: isLoadingFilterMarketsFromSelections } =
    useQuery({
      queryKey: ['marketByAssetQuoteAndFeeTier', chainId, assetToken, quoteToken, selectedFeeTier],
      queryFn: () =>
        getMarketsBySelectedTokenAndFeeTier(chainId, assetToken, quoteToken, selectedFeeTier),
      enabled: assetToken !== undefined && quoteToken !== undefined,
    })

  const poolIdMintEventsMap = useMemo(() => {
    return poolEvents?.events.length
      ? poolEvents?.events.reduce((acc: Record<string, OptionMint[]>, event) => {
          const poolId = (event as OptionMint).panopticPool.id

          if (!Object.prototype.hasOwnProperty.call(acc, poolId)) {
            acc[poolId] = [event as OptionMint]
          } else {
            acc[poolId].push(event as OptionMint)
          }
          return acc
        }, {})
      : {}
  }, [poolEvents?.events])

  const currentEthPriceUSD = Number(data?.bundle?.ethPriceUSD)

  const collateralTrackerAddressSet = useMemo(() => {
    const addressSet = new Set<Address>()
    if (data?.panopticPools.length) {
      data?.panopticPools.forEach((market) => {
        const collateral0Address = market.collateral0.id as Address
        const collateral1Address = market.collateral1.id as Address
        addressSet.add(collateral0Address)
        addressSet.add(collateral1Address)
      })
    }
    return addressSet
  }, [data?.panopticPools])

  const { data: collateralTotalAssets, isLoading: isLoadingTotalAssets } = useReadContracts({
    contracts: [...collateralTrackerAddressSet].map((collateralTrackerAddress) => {
      return {
        address: collateralTrackerAddress,
        abi: CollateralTrackerAbi,
        functionName: 'totalAssets',
      }
    }),
  })

  const accountCollateralSharesMap = useAccountCollateralShares(
    accountDepositedVaults ? accountDepositedVaults.panopticPoolAccounts : [],
  )
  const collateralTotalAssetsMap = useMemo(() => {
    const temp: Record<Address, bigint> = {}
    const collateralTrackerAddressArr = [...collateralTrackerAddressSet]
    for (let i = 0; i < collateralTrackerAddressArr.length; i++) {
      const collateralTrackerAddress = collateralTrackerAddressArr[i]
      const totalAssets = collateralTotalAssets
        ? (collateralTotalAssets[i].result as bigint)
        : BigInt(0)
      temp[collateralTrackerAddress] = totalAssets
    }
    return temp
  }, [collateralTotalAssets, collateralTrackerAddressSet])

  const markets = useMemo(() => {
    if (filterMarketsFromSelections !== undefined) {
      const selectedMarkets = filterMarketsFromSelections.pools
        .map((uniswapPool) => {
          const { panopticPool } = uniswapPool
          const token0Decimals = Number(uniswapPool.token0.decimals)
          const token1Decimals = Number(uniswapPool.token1.decimals)
          const token0DerivedEth = Number(uniswapPool.token0.derivedETH)
          const token1DerivedEth = Number(uniswapPool.token1.derivedETH)
          let apy = 0
          const fee = Number(uniswapPool.feeTier) / 100
          let poolId = zeroAddress.toString()
          let txCount = 0
          let totalAssetCollateral = 0
          let userCollateral0Shares = BigInt(0)
          let userCollateral1Shares = BigInt(0)
          let weeklyVol = 0
          let hasPanopticPool = false
          if (panopticPool !== undefined && panopticPool !== null) {
            hasPanopticPool = true
            const collateral0DayData = panopticPool.collateral0.collateralDayData
            const collateral1DayData = panopticPool.collateral1.collateralDayData
            poolId = panopticPool.id.toString()
            txCount = Number(panopticPool.txCount)
            apy =
              collateral0DayData.length && collateral1DayData.length
                ? calculate7DayAvgAPY(
                    Number(collateral0DayData[collateral0DayData.length - 1].sharePrice),
                    Number(collateral0DayData[0].sharePrice),
                    Number(collateral1DayData[collateral1DayData.length - 1].sharePrice),
                    Number(collateral1DayData[0].sharePrice),
                  )
                : 0

            const totalAssetsCollateral0 = Number(
              formatUnits(
                BigInt(collateralTotalAssetsMap[panopticPool.collateral0.id as Address]),
                token0Decimals,
              ),
            )

            const totalAssetsCollateral1 = Number(
              formatUnits(
                BigInt(collateralTotalAssetsMap[panopticPool.collateral1.id as Address]),
                token1Decimals,
              ),
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

            totalAssetCollateral = totalAssetsCollateral0USD + totalAssetsCollateral1USD

            userCollateral0Shares =
              accountCollateralSharesMap[panopticPool.collateral0.id as Address]
            userCollateral1Shares =
              accountCollateralSharesMap[panopticPool.collateral1.id as Address]
            const mintEvents = poolIdMintEventsMap[poolId]

            if (mintEvents !== undefined && mintEvents.length) {
              const { isAssetToken0 } = getAssetQuoteToken(
                uniswapPool.token0 as unknown as TokenInfo,
                uniswapPool.token1 as unknown as TokenInfo,
              )
              weeklyVol = calculateWeeklyVolume(
                mintEvents as OptionMint[],
                currentEthPriceUSD,
                BigInt(uniswapPool.tickSpacing),
                isAssetToken0,
              )
            }
          }

          return {
            market: `${uniswapPool.token0.symbol} / ${uniswapPool.token1.symbol}`,
            fee,
            apy: apy.toFixed(2),
            token0WithLogoUri: {
              ...uniswapPool.token0,
              logoURI: findTokenInTokenList(getAddress(uniswapPool.token0.id))?.logoURI,
              address: uniswapPool.token0.id as Address,
            },
            token1WithLogoUri: {
              ...uniswapPool.token1,
              logoURI: findTokenInTokenList(getAddress(uniswapPool.token1.id))?.logoURI,
              address: uniswapPool.token1.id as Address,
            },
            poolId,
            txCount,
            tvl: totalAssetCollateral,
            weeklyVol,
            hasDepositedToPool:
              userCollateral0Shares > BigInt(0) || userCollateral1Shares > BigInt(0),
            hasDepositedToken0: userCollateral0Shares > BigInt(0),
            hasDepositedToken1: userCollateral1Shares > BigInt(0),
            hasPanopticPool,
          } as MarketTableInfo
        })
        .sort((a, b) => a.market.localeCompare(b.market))
      return selectedMarkets
    } else {
      return data?.panopticPools.length
        ? data?.panopticPools
            .map((pool) => {
              const token0Symbol = pool.underlyingPool.token0.symbol
              const token1Symbol = pool.underlyingPool.token1.symbol
              const token0Decimals = Number(pool.underlyingPool.token1.decimals)
              const token1Decimals = Number(pool.underlyingPool.token1.decimals)
              const token0DerivedEth = Number(pool.underlyingPool.token0.derivedETH)
              const token1DerivedEth = Number(pool.underlyingPool.token1.derivedETH)

              const marketAvgSevenDayApy =
                pool.collateral0.collateralDayData.length &&
                pool.collateral1.collateralDayData.length
                  ? calculate7DayAvgAPY(
                      Number(
                        pool.collateral0.collateralDayData[
                          pool.collateral0.collateralDayData.length - 1
                        ].sharePrice,
                      ),
                      Number(pool.collateral0.collateralDayData[0].sharePrice),
                      Number(
                        pool.collateral1.collateralDayData[
                          pool.collateral1.collateralDayData.length - 1
                        ].sharePrice,
                      ),
                      Number(pool.collateral1.collateralDayData[0].sharePrice),
                    )
                  : 0

              const totalAssetsCollateral0 = Number(
                formatUnits(
                  BigInt(collateralTotalAssetsMap[pool.collateral0.id as Address]),
                  token0Decimals,
                ),
              )

              const totalAssetsCollateral1 = Number(
                formatUnits(
                  BigInt(collateralTotalAssetsMap[pool.collateral1.id as Address]),
                  token1Decimals,
                ),
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
              const token0 = {
                ...pool.underlyingPool.token0,
                address: pool.underlyingPool.token0.id,
              }
              const token1 = {
                ...pool.underlyingPool.token1,
                address: pool.underlyingPool.token1.id,
              }

              const mintEvents = poolIdMintEventsMap[pool.id]
              let weeklyVol = 0
              if (mintEvents !== undefined && mintEvents.length) {
                const { isAssetToken0 } = getAssetQuoteToken(
                  token0 as unknown as TokenInfo,
                  token1 as unknown as TokenInfo,
                )
                weeklyVol = calculateWeeklyVolume(
                  mintEvents as OptionMint[],
                  currentEthPriceUSD,
                  BigInt(pool.underlyingPool.tickSpacing),
                  isAssetToken0,
                )
              }
              const collateral0Address = pool.collateral0.id as Address
              const collateral1Address = pool.collateral1.id as Address
              const userCollateral0Shares =
                accountCollateralSharesMap[collateral0Address as Address]
              const userCollateral1Shares =
                accountCollateralSharesMap[collateral1Address as Address]
              return {
                market: `${token0Symbol} / ${token1Symbol}`,
                fee: Number(pool.underlyingPool.feeTier) / 100,
                apy: marketAvgSevenDayApy.toFixed(2),
                token0WithLogoUri: {
                  ...pool.underlyingPool.token0,
                  logoURI: findTokenInTokenList(getAddress(pool.underlyingPool.token0.id))?.logoURI,
                  address: pool.underlyingPool.token0.id as Address,
                },
                token1WithLogoUri: {
                  ...pool.underlyingPool.token1,
                  logoURI: findTokenInTokenList(getAddress(pool.underlyingPool.token1.id))?.logoURI,
                  address: pool.underlyingPool.token1.id as Address,
                },
                poolId: pool.id,
                txCount: Number(pool.txCount), //TODO: keep this txCount wait for subgraph update
                tvl: totalAssetCollateral,
                weeklyVol,
                hasDepositedToPool:
                  userCollateral0Shares > BigInt(0) || userCollateral1Shares > BigInt(0),
                hasDepositedToken0: userCollateral0Shares > BigInt(0),
                hasDepositedToken1: userCollateral1Shares > BigInt(0),
                hasPanopticPool: true,
              } as MarketTableInfo
            })
            .sort((a, b) => a.market.localeCompare(b.market))
        : []
    }
  }, [
    accountCollateralSharesMap,
    collateralTotalAssetsMap,
    currentEthPriceUSD,
    data?.panopticPools,
    poolIdMintEventsMap,
    filterMarketsFromSelections,
  ])

  const filterMarkets = useMemo(() => {
    if (!markets.length) return []

    switch (filterType) {
      case 'topMarket':
        return markets.sort((a, b) => Number(b.apy) - Number(a.apy))
      case 'yourMarkets':
        return markets.filter((market) => market.hasDepositedToPool)
      case 'topTraded':
        return markets.sort((a, b) => b.weeklyVol - a.weeklyVol)
      default:
        return markets.sort((a, b) => a.market.localeCompare(b.market))
    }
  }, [filterType, markets])

  const { userAddedTokens, addNewToken } = useUserAddedTokens(chainId)
  const tokens = getChainSpecificTokensList(chainId)
  const currentChainTokens = [...tokens, ...Object.values(userAddedTokens[chainId])].filter(
    (t) => t.address !== zeroAddress, // Filter out default "Unknown" token used to prime localStorage for custom tokens
  )

  // Add WETH as quote token even if chain is polygon or avax
  const polygonWeth = getAddress('0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619')
  const avaxWeth = getAddress('0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB')
  const commonQuoteTokens = new Set([...STABLECOINS, ...NATIVE_TOKENS, polygonWeth, avaxWeth])
  const currentChainCommonQuoteTokens = currentChainTokens.filter((token) =>
    commonQuoteTokens.has(token.address as Address),
  )
  const currentChainTokenAddressSet = new Set(currentChainTokens.map((token) => token.address))
  const selectMarketDropDown = (
    <CurrencySelect
      label="Market"
      selectedToken={assetToken}
      onTokenSelect={(selectedToken) => {
        setAssetToken(selectedToken)

        // If not in token list, add to userAddedTokens tokenlist
        // TODO: In the future, don't just select - show warning first if the found token is not in token list
        if (
          selectedToken !== undefined &&
          !currentChainTokenAddressSet.has(selectedToken.address)
        ) {
          addNewToken(selectedToken)
        }

        if (selectedToken == null) {
          // If user cleared out input, don't auto select a quote token
          if (quoteToken == null) {
            // If quoteToken is also null, reset fee tier
            setSelectedFeeTier(undefined)
          }
          return
        } else if (quoteToken == null) {
          // After choosing asset token, auto-select quote token if there's not currently one selected
          if (
            new Set([...NATIVE_TOKENS, polygonWeth, avaxWeth]).has(selectedToken.address as Address)
          ) {
            // If newly selectedToken is WETH or other native wrapped asset, select the first stablecoin as quote
            const currentChainStables = currentChainTokens.filter((token) =>
              STABLECOINS.has(token.address as Address),
            )
            setQuoteToken(currentChainStables?.[0])
          } else {
            // Auto-select quote as the first common quote token
            setQuoteToken(currentChainCommonQuoteTokens?.[0])
          }
        } else if (quoteToken !== undefined && quoteToken?.address == selectedToken.address) {
          // If existing quoteToken is the same as the newly selected assetToken,
          // deselect the quoteToken
          setQuoteToken(undefined)
        }
      }}
      selectableTokens={currentChainTokens}
    />
  )
  const selectPriceInDropDown = (
    <CurrencySelect
      label="Priced in"
      selectedToken={quoteToken}
      onTokenSelect={(selectedToken) => {
        setQuoteToken(selectedToken)

        // If not in token list, add to userAddedTokens tokenlist
        // TODO: In the future, don't just select - show warning first if the found token is not in token list
        if (selectedToken !== undefined && !currentChainTokens.includes(selectedToken)) {
          addNewToken(selectedToken)
        }

        if (selectedToken == null && assetToken == null) {
          // If clearing quoteToken and assetToken is also null, reset fee tier
          setSelectedFeeTier(undefined)
        }

        if (assetToken !== undefined && assetToken?.address == selectedToken?.address) {
          // If existing assetToken is the same as the newly selected quoteToken,
          // deselect the assetToken
          setAssetToken(undefined)
        }
      }}
      suggestedTokens={currentChainCommonQuoteTokens}
      selectableTokens={currentChainTokens}
    />
  )
  const selectFeeDropDown = (
    <FeeTierSelect
      label="Fee tier"
      onFeeTierSelect={setSelectedFeeTier}
      // Don't allow specifying a fee tier unless one of the tokens is selected because that would be silly
      // Also because making both token addresses optional while filtering by fee tier was really gross to make work
      disabled={assetToken == null || quoteToken == null}
      selectedFeeTier={selectedFeeTier}
    />
  )

  return (
    <Container size="4">
      <div className="flex flex-col gap-y-10">
        {isMobile ? (
          <>
            <div className="flex flex-row items-center justify-between">
              <h2 className="text-color-text-alt text-2xl font-medium">Discover</h2>
              <div className="flex flex-row items-center justify-end">
                <Button
                  variant="flat"
                  className="!border-none"
                  onClick={() => setOpenMobileMarketSearch(true)}>
                  <IoSearch size={26} />
                </Button>
              </div>
            </div>
            <Sheet
              isOpen={isOpenMobileMarketSearch}
              onClose={() => setOpenMobileMarketSearch(false)}
              detent="content-height">
              <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
                  <Sheet.Scroller className="p-4 flex flex-col gap-y-10">
                    <div>
                      <p className="text-lg font-semibold pb-10">Search Market</p>
                      <div className="flex flex-wrap w-full items-start gap-3 justify-between">
                        {selectMarketDropDown}
                        {selectPriceInDropDown}
                        {selectFeeDropDown}
                      </div>
                    </div>
                    <Button
                      variant="border"
                      className="!rounded-full !text-lg"
                      onClick={() => setOpenMobileMarketSearch(false)}>
                      Close
                    </Button>
                  </Sheet.Scroller>
                </Sheet.Content>
              </Sheet.Container>
              <Sheet.Backdrop />
            </Sheet>
          </>
        ) : (
          <>
            <h2 className="text-color-text-alt text-2xl font-medium">Discover</h2>
            <div className="flex flex-row gap-x-6 items-center">
              {selectMarketDropDown}
              {selectPriceInDropDown}
              {selectFeeDropDown}
            </div>
          </>
        )}
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-row items-center gap-x-4">
            <Button
              variant={filterType === 'default' ? 'primary' : 'default'}
              onClick={() => {
                setFilterType('default')
              }}>
              All
            </Button>
            <Button
              variant={filterType === 'yourMarkets' ? 'primary' : 'default'}
              onClick={() => {
                setFilterType('yourMarkets')
              }}>
              Your Markets
            </Button>
            <Button
              variant={filterType === 'topMarket' ? 'primary' : 'default'}
              onClick={() => {
                setFilterType('topMarket')
              }}>
              Top Markets
            </Button>
            <Button
              variant={filterType === 'topTraded' ? 'primary' : 'default'}
              onClick={() => {
                setFilterType('topTraded')
              }}>
              Top Traded
            </Button>
          </div>
          <div className="pb-10">
            <MarketTable
              markets={filterMarkets}
              assetTokenAddress={assetToken?.address}
              quoteTokenAddress={quoteToken?.address}
              fee={selectedFeeTier}
              isLoading={
                isLoading ||
                isLoadingTotalAssets ||
                isLoadingAccountDepositedVaults ||
                isLoadingFilterMarketsFromSelections
              }
            />
          </div>
        </div>
      </div>
    </Container>
  )
}
