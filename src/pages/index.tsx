import type { TokenInfo } from '@uniswap/token-lists'

import numbro from 'numbro'
import { IoIosSwap as SwapIcon } from 'react-icons/io'
import { RxArrowDown as ArrowDownIcon, RxArrowUp as ArrowUpIcon } from 'react-icons/rx'

import { useQuery } from '@tanstack/react-query'
import Skeleton from 'react-loading-skeleton'
import { Address, getAddress, zeroAddress } from 'viem'
import { useAccount, useChainId } from 'wagmi'
import { ResponsiveLineChart } from '~/components/responsive-line-chart'
import {
  fetchHistoricalCommissionsMockData,
  fetchHistoricalCommissionsWithTotalEarned,
} from '~/queries/fetchHistoricalCommissions'
import { fetchPoolsWithApysSample } from '~/queries/fetchPoolsWithApysSample'
import { findTokenInTokenList } from '~/utils/tokens'
import { MarketInfo } from '~/components/market-info'
import { Apy } from '~/components/apy'
import { Button } from '~/components/button'
import Link from 'next/link'
import { getChainNameFromChainId } from '~/utils/constants'

export default function Index() {
  const chainId = useChainId()
  const { address, isConnected } = useAccount()

  const {
    data: fetchedHistoricalCommissions,
    isLoading: isHistoricalCommissionsLoading,
    // isError,
  } = useQuery({
    queryKey: ['historicalCommissions', chainId, address],
    queryFn: () => fetchHistoricalCommissionsWithTotalEarned(chainId, address ?? zeroAddress),
    enabled: address !== undefined,
  })

  const {
    data: poolsWithApysSample,
    isLoading: isPoolsWithApysSampleLoading,
    // isError,
  } = useQuery({
    queryKey: ['poolsWithApysSample', chainId, address],
    queryFn: () => fetchPoolsWithApysSample(chainId),
  })

  const historicalCommissions = isConnected
    ? fetchedHistoricalCommissions
    : fetchHistoricalCommissionsMockData

  return (
    <div className="grid grid-cols-2 gap-10 sm:gap-0 sm:px-24">
      {/* Deposit Summary */}
      <section
        className={
          'py-6 px-2 mx-4 flex flex-row shadow rounded-2xl border col-span-2 sm:px-0 sm:mx-0 sm:shadow-none sm:border-none sm:col-span-1 sm:flex-col'
        }>
        <div className="flex flex-col w-1/2 px-2 items-center justify-center sm:items-start sm:px-0">
          <p className="text-sm text-slate-400 sm:hidden">Deposited</p>
          <p className="text-3xl font-semibold w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
            {isHistoricalCommissionsLoading || historicalCommissions?.totalDeposited == null ? (
              <Skeleton />
            ) : (
              '$' +
              numbro(historicalCommissions.totalDeposited).format({
                average: true,
                thousandSeparated: true,
                mantissa: 2,
              })
            )}
          </p>
        </div>

        <div className="flex flex-col w-1/2 px-2 items-center justify-center sm:items-start sm:px-0">
          <p className="text-sm text-slate-400 sm:hidden">Earned</p>
          <p className=" flex text-3xl w-full justify-center font-semibold text-green-500 sm:text-sm sm:justify-start">
            {isHistoricalCommissionsLoading || historicalCommissions?.totalEarned == null ? (
              <Skeleton containerClassName="flex-1" />
            ) : (
              <>
                <span className="hidden sm:inline-block">+</span>$
                {numbro(historicalCommissions.totalEarned).format({
                  thousandSeparated: true,
                  mantissa: 2,
                })}
              </>
            )}
          </p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="flex justify-evenly col-span-2 sm:col-span-1">
        <div className="flex flex-col gap-1 items-center justify-center">
          <Button variant="primary" rounded>
            <Link href={'/earn?type=deposit'}>
              <ArrowDownIcon size="1.75rem" className="m-auto" />
            </Link>
          </Button>
          <p className="text-violet-700 font-semibold">Deposit</p>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center">
          <Button variant="secondary" rounded>
            <Link href={'/earn?type=withdraw'}>
              <ArrowUpIcon size="1.75rem" className="m-auto" />
            </Link>
          </Button>
          <p className="text-violet-700 font-semibold">Withdraw</p>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center">
          <Button variant="secondary" rounded>
            <Link
              href={`https://app.uniswap.org/swap?chainId=${getChainNameFromChainId(chainId)}`}
              target="_blank"
              rel="noopener noreferrer">
              <SwapIcon size="1.75rem" className="m-auto" />
            </Link>
          </Button>
          <p className="text-violet-700 font-semibold">Swap</p>
        </div>
      </section>

      {/* Line chart (only visible on desktop) */}
      <div className="hidden sm:block col-span-2 relative">
        {!isConnected ? (
          <p className="absolute inline-flex h-full justify-center items-center w-full text-center z-10 backdrop-blur-sm">
            Connect your wallet to see your earnings!
          </p>
        ) : null}
        {isHistoricalCommissionsLoading || historicalCommissions?.historicalCommissions == null ? (
          <Skeleton containerClassName={earnOpportunityCardSizeStyles} className="h-[300px]" />
        ) : (
          <ResponsiveLineChart
            data={historicalCommissions.historicalCommissions}
            id="historicalCommissions"
            height={300}
          />
        )}
      </div>

      {/* Earn preview */}
      <section className="col-span-full">
        <div className="col-span-full">
          <p className="col-span-ful text-sm text-slate-400">Discover opportunities to earn</p>

          <div className="flex flex-row gap-2 w-full overflow-x-auto">
            {isPoolsWithApysSampleLoading || poolsWithApysSample?.panopticPools == null ? (
              <Skeleton
                containerClassName="flex flex-row gap-2"
                className="min-w-60 h-32"
                count={3}
              />
            ) : (
              // TODO: render triple skeleton cards if data is null
              poolsWithApysSample.panopticPools.map((pp) => {
                // Merge subgraph token objects with the found logoURI from the token's entry in tokenList. If token doesn't exist in tokenList, logoURI will still be undefined but the other token properties (like the symbol) will still be available from the subgraph.
                const token0WithLogoUri = {
                  ...pp.underlyingPool.token0,
                  logoURI: findTokenInTokenList(getAddress(pp.underlyingPool.token0.id))?.logoURI,
                }
                const token1WithLogoUri = {
                  ...pp.underlyingPool.token1,
                  logoURI: findTokenInTokenList(getAddress(pp.underlyingPool.token1.id))?.logoURI,
                }
                return (
                  <EarnOpportunityCard
                    key={pp.id}
                    assetToken={token0WithLogoUri}
                    quoteToken={token1WithLogoUri}
                    feeTier={Number(pp.underlyingPool.feeTier)}
                    apy={pp.marketAvgSevenDayApy}
                    panopticPoolAddress={getAddress(pp.id)}
                  />
                )
              })
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

const earnOpportunityCardSizeStyles = 'min-w-60 h-32'

const EarnOpportunityCard = ({
  assetToken,
  quoteToken,
  feeTier,
  apy,
  panopticPoolAddress,
}: {
  assetToken?: Pick<TokenInfo, 'symbol' | 'logoURI'>
  quoteToken?: Pick<TokenInfo, 'symbol' | 'logoURI'>
  feeTier: number
  apy: number
  panopticPoolAddress: Address
}) => {
  return (
    <div className={`${earnOpportunityCardSizeStyles} flex flex-col border rounded p-4`}>
      <MarketInfo
        marketId={panopticPoolAddress}
        token0LogoUri={quoteToken}
        token1LogoUri={assetToken}
        token0Symbol={quoteToken ? quoteToken.symbol : ''}
        token1Symbol={assetToken ? assetToken.symbol : ''}
        hasSubInfo
        fee={feeTier / 100}
        showDirectIcon
      />
      <Apy apy={apy} className="mt-3" showLabel />
    </div>
  )
}