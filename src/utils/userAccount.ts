import { Address, formatUnits, getAddress } from 'viem'
import { PanopticPoolAccount, Token } from '~/graphql/types.generated'
import { findTokenInTokenList } from './tokens'
import { tokenValueInUSD } from './price'
import { calculate7DayAPY } from './collateral'

export type TokenBasicInfo = {
  tokenLogoUri: string
  tokenSymbol: string
  tokenName: string
  tokenAddress: string
}

export type TokenApyInfo = {
  tokenBalanceUSD: number
  tokenDecimals: string
  tokenDerivedETH: string
  apy: number
  hasDepositedCollateral?: boolean
  collateralAddress?: Address
} & TokenBasicInfo

export type TokenStakedInfo = {
  stakedAmount: bigint
  hasDepositedCollateral: boolean
  tokenDecimals: string
  tokenDerivedETH: string
  logoUri: string
} & TokenBasicInfo

export const getTokenInfo = (
  token: Token,
  ethPriceUSD: number,
  currentSharePrice: number,
  sevenDayOldSharePrice: number,
  userWalletBalances: Record<Address, bigint> | null,
  tokenCollateralAddress: Address,
) => {
  const { symbol, name, id, decimals, derivedETH } = token
  const walletBalance =
    userWalletBalances && Object.prototype.hasOwnProperty.call(userWalletBalances, id)
      ? userWalletBalances[id as Address]
      : BigInt(0)
  const tokenBalance = formatUnits(walletBalance, Number(decimals))
  const tokenBalanceUSD = tokenValueInUSD(Number(tokenBalance), Number(derivedETH), ethPriceUSD)
  return {
    tokenSymbol: symbol,
    tokenName: name,
    tokenBalanceUSD,
    tokenAddress: id,
    apy: calculate7DayAPY(currentSharePrice, sevenDayOldSharePrice),
    tokenLogoUri: findTokenInTokenList(getAddress(token.id))?.logoURI ?? '',
    tokenDecimals: decimals,
    tokenDerivedETH: derivedETH,
    collateralAddress: tokenCollateralAddress,
  }
}

export const getPanopticPoolTokenInfo = (
  panopticPoolAccounts: PanopticPoolAccount[],
  ethPriceUSD: number,
  userWalletBalances: Record<Address, bigint> | null,
) => {
  return Object.values(
    panopticPoolAccounts.reduce((acc: Record<Address, TokenApyInfo>, ppa) => {
      const token0Address = ppa.panopticPool.underlyingPool.token0.id as Address
      const token1Address = ppa.panopticPool.underlyingPool.token1.id as Address
      if (!Object.prototype.hasOwnProperty.call(acc, token0Address)) {
        acc[token0Address] = getTokenInfo(
          ppa.panopticPool.underlyingPool.token0 as unknown as Token,
          ethPriceUSD,
          ppa.panopticPool.collateral0.collateralDayData.length
            ? Number(
                ppa.panopticPool.collateral0.collateralDayData[
                  ppa.panopticPool.collateral0.collateralDayData.length - 1
                ].sharePrice,
              )
            : 0,
          ppa.panopticPool.collateral0.collateralDayData.length
            ? Number(ppa.panopticPool.collateral0.collateralDayData[0].sharePrice)
            : 0,
          userWalletBalances,
          ppa.panopticPool.collateral0.id as Address,
        )
      }

      if (!Object.prototype.hasOwnProperty.call(acc, token1Address)) {
        acc[token1Address] = getTokenInfo(
          ppa.panopticPool.underlyingPool.token1 as unknown as Token,
          ethPriceUSD,
          ppa.panopticPool.collateral1.collateralDayData.length
            ? Number(
                ppa.panopticPool.collateral1.collateralDayData[
                  ppa.panopticPool.collateral1.collateralDayData.length - 1
                ].sharePrice,
              )
            : 0,
          ppa.panopticPool.collateral1.collateralDayData.length
            ? Number(ppa.panopticPool.collateral1.collateralDayData[0].sharePrice)
            : 0,
          userWalletBalances,
          ppa.panopticPool.collateral1.id as Address,
        )
      }
      return acc
    }, {}),
  ).flat()
}
