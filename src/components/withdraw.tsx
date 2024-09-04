import { Card } from '@radix-ui/themes'
import { FC, useEffect, useMemo, useState } from 'react'
import { Address, getAddress, zeroAddress } from 'viem'
import { TokenApyInfo } from '~/utils/userAccount'
import { TokenRelatedMarketInfo, getVaultsWithDepositsFromAccount } from './deposit'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { GetEthPriceUsdQuery, PanopticPoolAccount } from '~/graphql/types.generated'
import { DialogSelectMarket } from './dialog-select-market'
import { formatPpaAccountsForPortfolioInfo } from '~/utils/portfolio'
import { TokenInput } from './token-input'
import { DialogConfirmationWithdraw } from './dialog-confirm-withdraw'
import { PortfolioInfo } from './portfolioTable'
import { useRouter } from "next/router";
import { useReadContracts } from 'wagmi'
import { abi as CollateralTrackerAbi } from '~/abis/CollateralTracker'

type WithdrawProps = {
  address: Address | undefined
  isConnected: boolean
  chainId: number
  paramTokenId: string | null
  paramMarketId: string | null
  ethPriceUSD: UseQueryResult<GetEthPriceUsdQuery, Error>
}

export const Withdraw: FC<WithdrawProps> = ({
  address,
  isConnected,
  chainId,
  paramMarketId,
  paramTokenId,
  ethPriceUSD,
}) => {
  const [selectedToken, setSelectedToken] = useState<TokenApyInfo | undefined>(undefined)
  const [selectedMarket, setSelectedMarket] = useState<TokenRelatedMarketInfo | undefined>(
    undefined,
  )
  const [withdrawTokenAmount, setWithdrawTokenAmount] = useState<string>('')
  const ethPriceUSDFormatted = Number(ethPriceUSD.data?.bundle?.ethPriceUSD)
  const [maximumWithdrawBalance, setMaximumWithdrawBalance] = useState<bigint>(BigInt(0))
  const router = useRouter();

  const userDepositedMarkets = useQuery({
    queryKey: ['vaultsWithDepositsFromAccount', chainId, address],
    queryFn: () => getVaultsWithDepositsFromAccount(chainId, address ?? zeroAddress),
    enabled: isConnected,
  })

  const collateralTrackerAddressSet = useMemo(() => {
    const addressSet = new Set<Address>()
    if (userDepositedMarkets.data?.panopticPoolAccounts.length) {
      userDepositedMarkets.data?.panopticPoolAccounts.forEach((ppa) => {
        const collateral0Address = ppa.panopticPool.collateral0.id as Address
        const collateral1Address = ppa.panopticPool.collateral1.id as Address
        addressSet.add(collateral0Address)
        addressSet.add(collateral1Address)
      })
    }
    return addressSet
  }, [userDepositedMarkets.data?.panopticPoolAccounts])

  const { data: maxTokensWithdraw } = useReadContracts({
    contracts: [...collateralTrackerAddressSet].map((collateralTrackerAddress) => {
      return {
        address: collateralTrackerAddress,
        abi: CollateralTrackerAbi,
        functionName: 'maxWithdraw',
        args: [address ?? zeroAddress],
      }
    }),
  })

  const collateralTrackerAddressMaxWithdrawMap = useMemo(() => {
    const temp: Record<Address, bigint> = {}
    const collateralTrackerAddressArr = [...collateralTrackerAddressSet]
    for (let i = 0; i < collateralTrackerAddressArr.length; i++) {
      const collateralTrackerAddress = collateralTrackerAddressArr[i]
      const maxTokenWithdraw = maxTokensWithdraw
        ? (maxTokensWithdraw[i].result as bigint)
        : BigInt(0)
      temp[collateralTrackerAddress] = maxTokenWithdraw
    }
    return temp
  }, [collateralTrackerAddressSet, maxTokensWithdraw])

  // get user's deposited pools
  const depositedMarkets = useMemo(() => {
    return userDepositedMarkets.data?.panopticPoolAccounts.length
      ? formatPpaAccountsForPortfolioInfo(
          userDepositedMarkets.data?.panopticPoolAccounts as PanopticPoolAccount[],
          ethPriceUSDFormatted,
          collateralTrackerAddressMaxWithdrawMap,
        )
          .sort((a, b) => b.amountUSD - a.amountUSD)
          .filter((portfolio: PortfolioInfo) => {
            return (
              Math.floor(Number(portfolio.collateral0Shares)) > 0 ||
              Math.floor(Number(portfolio.collateral1Shares)) > 0
            )
          })
      : []
  }, [
    ethPriceUSDFormatted,
    userDepositedMarkets.data?.panopticPoolAccounts,
    collateralTrackerAddressMaxWithdrawMap,
  ])

  useEffect(() => {
    if (
      paramTokenId !== null &&
      selectedToken === undefined &&
      paramMarketId !== null &&
      selectedMarket === undefined &&
      depositedMarkets.length > 0
    ) {
      const matchedMarket = depositedMarkets.filter(
        (market) => getAddress(market.poolId) === getAddress(paramMarketId),
      )[0]

      if (matchedMarket !== undefined) {
        const {
          token0,
          token1,
          collateral1Shares,
          collateral0Shares,
          token1USD,
          token0USD,
          collateral1Assets,
          collateral0Assets,
          collateral1Address,
          collateral0Address,
        } = matchedMarket
        let selectedToken = undefined
        let hasDepositedCollateral = false
        let tokenUSD = 0
        let collateralAssets = BigInt(0)
        let collateralAddress = getAddress(zeroAddress)
        if (getAddress(token0.id) === getAddress(paramTokenId)) {
          selectedToken = token0
          hasDepositedCollateral = collateral0Shares > 0
          tokenUSD = token0USD
          collateralAssets = collateral0Assets
          collateralAddress = collateral0Address
        } else if (getAddress(token1.id) === getAddress(paramTokenId)) {
          selectedToken = token1
          hasDepositedCollateral = collateral1Shares > 0
          tokenUSD = token1USD
          collateralAssets = collateral1Assets
          collateralAddress = collateral1Address
        } else {
          selectedToken = undefined
        }

        setSelectedToken(
          selectedToken !== undefined
            ? ({
                tokenSymbol: selectedToken.symbol,
                tokenName: selectedToken.name,
                tokenBalanceUSD: Number(selectedToken),
                tokenAddress: selectedToken.id,
                tokenDecimals: selectedToken.decimals,
                tokenDerivedETH: selectedToken.derivedETH,
                apy: 0,
                tokenLogoUri: selectedToken,
                hasDepositedCollateral,
                tokenUSD: tokenUSD,
                collateralAssets: collateralAssets,
                collateralAddress: collateralAddress,
              } as TokenApyInfo)
            : undefined,
        )
        setMaximumWithdrawBalance(selectedToken !== undefined ? collateralAssets : BigInt(0))
      } else {
        router.push(`?type=withdraw`)
      }
    }
  }, [depositedMarkets, paramMarketId, paramTokenId, router, selectedMarket, selectedToken])

  useEffect(() => {
    if (paramMarketId !== null && selectedMarket === undefined && depositedMarkets.length > 0) {
      const matchedMarket = depositedMarkets.filter(
        (market) => getAddress(market.poolId) === getAddress(paramMarketId),
      )[0]

      if (matchedMarket !== undefined) {
        setSelectedMarket({
          market: matchedMarket.market,
          fee: matchedMarket.fee,
          apy: matchedMarket.apy,
          token0WithLogoUri: matchedMarket.token0WithLogoUri,
          token1WithLogoUri: matchedMarket.token1WithLogoUri,
          poolId: matchedMarket.poolId,
          hasCollateral0Shares: matchedMarket.collateral0Shares > 0,
          hasCollateral1Shares: matchedMarket.collateral1Shares > 0,
        })
      }
    }
  }, [depositedMarkets, paramMarketId, selectedMarket])

  const isLoadingParamToken = paramTokenId === null ? false : true && userDepositedMarkets.isLoading
  const isLoadingParamMarket =
    paramMarketId === null ? false : true && userDepositedMarkets.isLoading

  return (
    <Card size="3" className="w-full !p-2 shadow-card-shadow">
      <DialogSelectMarket
        userDepositedMarkets={depositedMarkets}
        setSelectedMarket={setSelectedMarket}
        paramMarketId={paramMarketId}
        paramTokenId={paramTokenId}
        setSelectedToken={setSelectedToken}
        selectedMarket={selectedMarket}
        setMaximumWithdrawBalance={setMaximumWithdrawBalance}
        isLoadingParamMarket={isLoadingParamMarket}
      />
      <TokenInput
        selectedToken={selectedToken}
        selectedMarket={selectedMarket}
        ethPriceUSD={Number(ethPriceUSD.data ? ethPriceUSD.data.bundle?.ethPriceUSD : 0)}
        value={withdrawTokenAmount}
        setValue={setWithdrawTokenAmount}
        maxValue={maximumWithdrawBalance}
        isLoading={isLoadingParamToken || isLoadingParamMarket}
      />
      <DialogConfirmationWithdraw
        selectedMarket={selectedMarket}
        selectedToken={selectedToken}
        withdrawTokenAmount={withdrawTokenAmount}
        ethPriceUSD={Number(ethPriceUSD.data ? ethPriceUSD.data.bundle?.ethPriceUSD : 0)}
        maxValue={maximumWithdrawBalance}
        isLoading={isLoadingParamToken || isLoadingParamMarket}
      />
    </Card>
  )
}
