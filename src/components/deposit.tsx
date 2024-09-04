import { Card } from '@radix-ui/themes'
import { FC, useEffect, useMemo, useState } from 'react'
import { DialogSelectToken } from './dialog-select-token'
import { TokenApyInfo, getPanopticPoolTokenInfo } from '~/utils/userAccount'
import { UseQueryResult, useQueries, useQuery } from '@tanstack/react-query'
import {
  GetEthPriceUsdQuery,
  PanopticPoolAccount,
  PanopticPoolFragment,
} from '~/graphql/types.generated'
import { chainToGraphQlSdk } from '~/subgraph'
import { Address, Hex, fromHex, getAddress, zeroAddress } from 'viem'
import { findTokenInTokenList } from '~/utils/tokens'
import { calculate7DayAvgAPY } from '~/utils/collateral'
import { getAlchemyInstance } from '~/utils/constants'
import { TokenInput } from './token-input'
import { DialogConfirmationDeposit } from './dialog-confirm-deposit'
import { TokenInfo } from '@uniswap/token-lists'
import { useReadContracts } from 'wagmi'
import { abi as CollateralTrackerAbi } from '../abis/CollateralTracker'
import { useAccountCollateralShares } from '~/hooks/useAccountInfo'

export type TokenRelatedMarketInfo = {
  market: string
  fee: number
  apy: string
  token0WithLogoUri: Pick<TokenInfo, 'symbol' | 'logoURI'>
  token1WithLogoUri: Pick<TokenInfo, 'symbol' | 'logoURI'>
  poolId: string
  hasCollateral0Shares: boolean
  hasCollateral1Shares: boolean
  collateralAddress?: Address | undefined
}

type DepositProps = {
  address: Address | undefined
  isConnected: boolean
  chainId: number
  paramTokenId: string | null
  paramMarketId: string | null
  ethPriceUSD: UseQueryResult<GetEthPriceUsdQuery, Error>
}

export const getVaultsWithDepositsFromAccount = async (chainId: number, address: Address) => {
  const sdk = chainToGraphQlSdk?.[chainId]
  const vaultsWithDeposits = await sdk.GetVaultsWithDepositsFromAccount({
    account: address.toLowerCase(),
  })

  return vaultsWithDeposits
}

export const getVaultsInfoFromNonDepositedPools = async (
  chainId: number,
  panopticPoolIds: Address[],
) => {
  const sdk = chainToGraphQlSdk?.[chainId]
  const vaultsWithDeposits = await sdk.GetVaultsInfoFromNonDepositedPools({
    panopticPoolIds: panopticPoolIds,
  })

  return vaultsWithDeposits
}

export const getVaultsInfoFromAllPools = async (chainId: number) => {
  const sdk = chainToGraphQlSdk?.[chainId]
  const vaultsWithDeposits = await sdk.GetVaultsInfoFromAllPools()

  return vaultsWithDeposits
}

export const getAccountBalances = async (chainId: number, address: Address) => {
  return await getAlchemyInstance(chainId).core.getTokenBalances(address)
}

export const getTokenRelatedMarkets = async (
  chainId: number,
  selectedToken: TokenApyInfo | undefined,
) => {
  if (selectedToken === undefined) return []
  const sdk = chainToGraphQlSdk?.[chainId]
  const tokenRelatedMarkets = await sdk.GetTokenRelatedMarkets({
    tokenId: selectedToken.tokenAddress.toLowerCase(),
  })
  return tokenRelatedMarkets
}

export const getVaultsInfoFromPoolIds = async (chainId: number, panopticPoolIds: string[]) => {
  const sdk = chainToGraphQlSdk?.[chainId]
  return await sdk.GetVaultsInfoFromPoolIds({
    panopticPoolIds: panopticPoolIds,
  })
}

export const Deposit: FC<DepositProps> = ({
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
  const [depositTokenAmount, setDepositTokenAmount] = useState<string>('')
  const [maxTokenAmount, setMaxTokenAmount] = useState<bigint>(BigInt(0))

  // find all pools if wallet is not connected
  const vaultsInfoFromAllPools = useQuery({
    queryKey: ['vaultsInfoFromAllPools', chainId],
    queryFn: () => getVaultsInfoFromAllPools(chainId),
    enabled: !isConnected,
  })

  // get all tokenInfo and sort by token's apy value
  const allPoolsTokenInfo =
    !isConnected && vaultsInfoFromAllPools.data?.panopticPoolAccounts.length && ethPriceUSD.data
      ? getPanopticPoolTokenInfo(
          vaultsInfoFromAllPools.data?.panopticPoolAccounts as PanopticPoolAccount[],
          Number(ethPriceUSD.data.bundle?.ethPriceUSD),
          null,
        ).sort((a, b) => b.apy - a.apy)
      : []

  // find user deposited pools and wallet balance when wallet connected
  const [userDepositedPools, accountBalances] = useQueries({
    queries: [
      {
        queryKey: ['vaultsWithDepositsFromAccount', chainId, address],
        queryFn: () => getVaultsWithDepositsFromAccount(chainId, address ?? zeroAddress),
        enabled: isConnected,
      },
      {
        queryKey: ['accountBalances', chainId, address],
        queryFn: () => getAccountBalances(chainId, address ?? zeroAddress),
        enabled: isConnected,
      },
    ],
  })
  const accountCollateralSharesMap = useAccountCollateralShares(
    userDepositedPools && userDepositedPools.data
      ? userDepositedPools.data?.panopticPoolAccounts
      : [],
  )

  // get user's deposited pools
  const userDepositedPoolAddress = useMemo(() => {
    return userDepositedPools.data && userDepositedPools.data.panopticPoolAccounts.length
      ? [
          ...new Set<Address>(
            userDepositedPools.data.panopticPoolAccounts.map(
              (ppa) => ppa.panopticPool.id as Address,
            ),
          ),
        ]
      : []
  }, [userDepositedPools])

  const otherPools = useQueries({
    queries: [
      {
        queryKey: ['vaultsInfoFromNonDepositedPools', chainId, userDepositedPoolAddress],
        queryFn: () => getVaultsInfoFromNonDepositedPools(chainId, userDepositedPoolAddress),
        enabled: isConnected && userDepositedPoolAddress.length > 0,
      },
      {
        queryKey: ['vaultsInfoFromAllPools', chainId],
        queryFn: () => getVaultsInfoFromAllPools(chainId),
        enabled: isConnected && userDepositedPoolAddress.length === 0,
      },
    ],
  })

  const userNotDepositedPools = !isConnected
    ? undefined
    : userDepositedPoolAddress.length > 0
      ? otherPools[0]
      : otherPools[1]

  const userWalletBalances =
    accountBalances.data && accountBalances.data.tokenBalances.length
      ? accountBalances.data.tokenBalances.reduce(
          (acc: Record<Address, bigint>, accountBalance) => {
            const { contractAddress, tokenBalance } = accountBalance
            acc[contractAddress as Address] =
              tokenBalance !== null ? fromHex(tokenBalance as Hex, 'bigint') : BigInt(0)
            return acc
          },
          {},
        )
      : null

  const accountDepositedTokens = userDepositedPools.data?.panopticPoolAccounts.length
    ? getPanopticPoolTokenInfo(
        userDepositedPools.data?.panopticPoolAccounts as PanopticPoolAccount[],
        Number(userDepositedPools.data.bundle?.ethPriceUSD),
        userWalletBalances,
      ).sort((a, b) => b.tokenBalanceUSD - a.tokenBalanceUSD)
    : []

  let tokensInUserNotDepositedPools: TokenApyInfo[]
  if (userNotDepositedPools && userNotDepositedPools.data?.panopticPoolAccounts.length) {
    const otherPoolsTokenInfo = getPanopticPoolTokenInfo(
      userNotDepositedPools.data?.panopticPoolAccounts as PanopticPoolAccount[],
      Number(userNotDepositedPools.data.bundle?.ethPriceUSD),
      userWalletBalances,
    )

    const sortByTokenBalance = otherPoolsTokenInfo
      .filter((tokenInfo) => tokenInfo.tokenBalanceUSD > 0)
      .sort((a, b) => b.tokenBalanceUSD - a.tokenBalanceUSD)

    const sortByTokenApy = otherPoolsTokenInfo
      .filter((tokenInfo) => tokenInfo.tokenBalanceUSD === 0)
      .sort((a, b) => b.apy - a.apy)

    tokensInUserNotDepositedPools = [...sortByTokenBalance, ...sortByTokenApy]
  } else {
    tokensInUserNotDepositedPools = []
  }

  const tokenAddressMap = [
    ...allPoolsTokenInfo,
    ...accountDepositedTokens,
    ...tokensInUserNotDepositedPools,
  ].reduce((acc: Record<Address, TokenApyInfo>, tokenInfo) => {
    const { tokenAddress, apy } = tokenInfo

    if (!Object.prototype.hasOwnProperty.call(acc, tokenAddress)) {
      acc[tokenAddress as Address] = tokenInfo
    } else {
      const existingTokenBalanceUSD = acc[tokenAddress as Address].tokenBalanceUSD
      const existingTokenApy = acc[tokenAddress as Address].apy

      if (existingTokenBalanceUSD !== 0 && apy > existingTokenApy) {
        acc[tokenAddress as Address].apy = apy
      }
    }

    return acc
  }, {})

  const tokenRelatedMarkets = useQuery({
    queryKey: ['tokenRelatedMarkets', chainId, selectedToken],
    queryFn: () => getTokenRelatedMarkets(chainId, selectedToken),
    enabled: selectedToken !== undefined,
  })

  const tokenRelatedMarketIds = tokenRelatedMarkets.data
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [
        ...(
          (tokenRelatedMarkets.data as any).panopticPools as unknown as PanopticPoolFragment[]
        ).reduce((acc: Set<string>, panopticPool: PanopticPoolFragment) => {
          acc.add(panopticPool.id.toLowerCase())
          return acc
        }, new Set<string>()),
      ]
    : []

  const tokenRelatedVaults = useQuery({
    queryKey: ['getVaultsInfoFromPoolIds', chainId, tokenRelatedMarketIds],
    queryFn: () => getVaultsInfoFromPoolIds(chainId, tokenRelatedMarketIds),
    enabled: tokenRelatedMarketIds.length > 0,
  })

  for (const [, value] of Object.entries(tokenAddressMap)) {
    value.hasDepositedCollateral =
      accountCollateralSharesMap[value.collateralAddress as Address] > 0
  }

  const tokenList = Object.values(tokenAddressMap).sort(
    (a, b) => Number(b.hasDepositedCollateral) - Number(a.hasDepositedCollateral),
  )
  const isLoadingTokenRelatedVaults = tokenRelatedVaults.isLoading
  const tokenRelatedVaultMap = useMemo(() => {
    return tokenRelatedVaults.data
      ? (
          (tokenRelatedMarkets.data as any).panopticPools as unknown as PanopticPoolFragment[]
        ).reduce((acc: Record<Address, TokenRelatedMarketInfo>, pool) => {
          const poolId = pool.id as Address
          if (acc[poolId]) {
            return acc
          }
          const token0Symbol = pool.underlyingPool.token0.symbol
          const token1Symbol = pool.underlyingPool.token1.symbol
          const collateral =
            getAddress(pool.underlyingPool.token0.id) === getAddress(selectedToken!.tokenAddress)
              ? pool.collateral0
              : pool.collateral1
          const token7DayApy =
            pool.collateral0.collateralDayData.length && pool.collateral1.collateralDayData.length
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
          acc[poolId] = {
            market: `${token0Symbol} / ${token1Symbol}`,
            fee: Number(pool.underlyingPool.feeTier) / 100,
            apy: token7DayApy.toFixed(2),
            token0WithLogoUri: {
              ...pool.underlyingPool.token0,
              logoURI: findTokenInTokenList(getAddress(pool.underlyingPool.token0.id))?.logoURI,
            },
            token1WithLogoUri: {
              ...pool.underlyingPool.token1,
              logoURI: findTokenInTokenList(getAddress(pool.underlyingPool.token1.id))?.logoURI,
            },
            poolId: pool.id,
            hasCollateral0Shares:
              accountCollateralSharesMap[pool.collateral0.id as Address] > BigInt(0),
            hasCollateral1Shares:
              accountCollateralSharesMap[pool.collateral1.id as Address] > BigInt(0),
            collateralAddress: collateral.id as Address,
          }
          return acc
        }, {})
      : {}
  }, [accountCollateralSharesMap, selectedToken, tokenRelatedMarkets.data, tokenRelatedVaults.data])

  const tokenRelatedVaultInfo =
    Object.keys(tokenRelatedVaultMap).length > 0
      ? Object.values(tokenRelatedVaultMap).sort((a, b) => Number(b.apy) - Number(a.apy))
      : []

  useEffect(() => {
    if (paramTokenId !== null && selectedToken === undefined) {
      setSelectedToken(tokenAddressMap[paramTokenId as Address])
    }
  }, [paramTokenId, selectedToken, tokenAddressMap])

  useEffect(() => {
    if (paramMarketId !== null && selectedMarket === undefined) {
      setSelectedMarket(tokenRelatedVaultMap[paramMarketId as Address])
    }
  }, [paramMarketId, selectedMarket, tokenRelatedVaultMap])

  let maximumTokenBalanceInWallet = BigInt(0)
  if (
    selectedToken !== undefined &&
    userWalletBalances !== null &&
    Object.prototype.hasOwnProperty.call(userWalletBalances, selectedToken.tokenAddress as Address)
  ) {
    maximumTokenBalanceInWallet = userWalletBalances[selectedToken.tokenAddress as Address]
  }

  const isLoadingParamToken =
    paramTokenId === null
      ? false
      : true &&
        (vaultsInfoFromAllPools.isLoading ||
          userDepositedPools.isLoading ||
          (userNotDepositedPools !== undefined ? userNotDepositedPools.isLoading : false))

  const isLoadingParamMarket = paramMarketId === null ? false : true && tokenRelatedVaults.isLoading

  useEffect(() => {
    setMaxTokenAmount(maximumTokenBalanceInWallet)
  }, [maximumTokenBalanceInWallet, selectedToken, setMaxTokenAmount])

  return (
    <Card size="3" className="w-full !p-2 shadow-card-shadow">
      <DialogSelectToken
        tokenList={tokenList}
        setSelectedToken={setSelectedToken}
        selectedToken={selectedToken}
        isLoadingTokenRelatedVaults={isLoadingTokenRelatedVaults}
        isLoadingParamToken={isLoadingParamToken}
        tokenRelatedVaultInfo={tokenRelatedVaultInfo}
        setSelectedMarket={setSelectedMarket}
        selectedMarket={selectedMarket}
        paramTokenId={paramTokenId}
        paramMarketId={paramMarketId}
      />
      <TokenInput
        selectedToken={selectedToken}
        selectedMarket={selectedMarket}
        ethPriceUSD={Number(ethPriceUSD.data ? ethPriceUSD.data.bundle?.ethPriceUSD : 0)}
        value={depositTokenAmount}
        setValue={setDepositTokenAmount}
        maxValue={maxTokenAmount}
        isLoading={isLoadingParamMarket || isLoadingParamToken}
      />
      <DialogConfirmationDeposit
        selectedMarket={selectedMarket}
        selectedToken={selectedToken}
        depositTokenAmount={depositTokenAmount}
        ethPriceUSD={Number(ethPriceUSD.data ? ethPriceUSD.data.bundle?.ethPriceUSD : 0)}
        maxValue={maxTokenAmount}
        isLoading={isLoadingParamMarket || isLoadingParamToken}
      />
    </Card>
  )
}
