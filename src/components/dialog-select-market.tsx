import { Dialog } from '@radix-ui/themes'
import { DropDownArrow } from './aimate-arrow'
import { Button } from './button'
import { FC, useMemo, useState } from 'react'
import clsx from 'clsx'
import { TokenApyInfo } from '~/utils/userAccount'
import { DialogTitle } from './dialog-title'
import { PortfolioInfo } from './portfolioTable'
import { MarketInfo } from './market-info'
import { convertMonetaryFormat } from '~/utils/price'
import { formatUnits, getAddress } from 'viem'
import { TokenInfoWithApy } from './token-info-with-apy'
import { findTokenInTokenList } from '~/utils/tokens'
import { PiCaretLeftThin } from 'react-icons/pi'
import { TokenRelatedMarketInfo } from './deposit'
import { useRouter } from 'next/router'
import {
  handleUrlSearchPramPreserveUpdate,
  handleUrlSearchPramRemoveKeys,
} from '~/utils/urlSearchParams'
import Skeleton from 'react-loading-skeleton'

type DialogSelectMarketProps = {
  setSelectedToken: React.Dispatch<TokenApyInfo | undefined>
  userDepositedMarkets: PortfolioInfo[]
  setSelectedMarket: React.Dispatch<TokenRelatedMarketInfo | undefined>
  selectedMarket: TokenRelatedMarketInfo | undefined
  paramTokenId: string | null
  paramMarketId: string | null
  isLoadingParamMarket: boolean
}

export const DialogSelectMarket: FC<DialogSelectMarketProps> = ({
  setSelectedToken,
  userDepositedMarkets,
  setSelectedMarket,
  selectedMarket,
  paramTokenId,
  paramMarketId,
  isLoadingParamMarket,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [step, setStep] = useState<number>(1)
  const [portfolio, setPortfolio] = useState<PortfolioInfo | undefined>(undefined)
  const [isReSelectedTokenAndMarket, setIsReSelectedTokenAndMarket] = useState<boolean>(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const router = useRouter()
  const query = new URLSearchParams(router.asPath.split("?")[1] || "")
  console.log('query: ', query)
  const type = query.get('type')

  const dialogContent = useMemo(() => {
    if (step === 1) {
      return (
        <>
          <DialogTitle dialogTitle={'Select a Market'} setDialogOpen={setIsDialogOpen} />
          <div className="min-h-80 overflow-y-scroll ">
            {userDepositedMarkets.map((market, idx) => (
              <div
                key={idx}
                role="presentation"
                className="hover:bg-gray-100 hover:cursor-pointer flex flex-row items-center justify-between gap-x-2 p-4 border-t border-gray-200"
                onClick={() => {
                  let url = `?type=${type}`
                  if (isReSelectedTokenAndMarket && selectedMarket !== undefined) {
                    setSelectedMarket(undefined)
                    setIsReSelectedTokenAndMarket(false)
                  }
                  if (paramMarketId !== null) {
                    handleUrlSearchPramRemoveKeys(router, query, ['marketId'])
                  }
                  setSelectedMarket({
                    market: market.market,
                    fee: market.fee,
                    apy: market.apy,
                    token0WithLogoUri: market.token0WithLogoUri,
                    token1WithLogoUri: market.token1WithLogoUri,
                    poolId: market.poolId,
                    hasCollateral0Shares: market.collateral0Shares > 0,
                    hasCollateral1Shares: market.collateral0Shares > 0,
                  })
                  url = `${url}&marketId=${market.poolId}`
                  router.push(url, undefined, {shallow:true})
                  setPortfolio(market)
                  setStep(2)
                }}>
                <MarketInfo
                  marketId={market.poolId}
                  token0LogoUri={market.token0}
                  token1LogoUri={market.token1WithLogoUri}
                  token0Symbol={market.token0WithLogoUri.symbol}
                  token1Symbol={market.token1WithLogoUri.symbol}
                  hideHyperLink
                  hasSubInfo
                  apy={market.apy}
                  fee={market.fee}
                  key={idx}
                  iconStyles={[
                    market.collateral0Shares > 0 ? 'border-2 border-yellow-500' : '',
                    market.collateral1Shares > 0 ? 'border-2 border-yellow-500' : '',
                  ]}
                />
                <p className="text-xl font-medium">
                  {convertMonetaryFormat(market.amountUSD, true, 2)}
                </p>
              </div>
            ))}
          </div>
        </>
      )
    } else if (step === 2) {
      if (portfolio === undefined) return

      const token0 = {
        tokenSymbol: portfolio.token0.symbol,
        tokenName: portfolio.token0.name,
        tokenBalanceUSD: Number(portfolio.token0),
        tokenAddress: portfolio.token0.id,
        tokenDecimals: portfolio.token0.decimals,
        tokenDerivedETH: portfolio.token0.derivedETH,
        apy: 0,
        tokenLogoUri: portfolio.token0,
        hasDepositedCollateral: portfolio.collateral0Shares > 0,
        tokenUSD: portfolio.token0USD,
        collateralAssets: portfolio.collateral0Assets,
        collateralAssetsFormatted: formatUnits(
          portfolio.collateral0Assets,
          Number(portfolio.token0.decimals),
        ),
        collateralAddress: portfolio.collateral0Address,
        maxWithDraw: portfolio.maxWithdrawToken0,
      }

      const token1 = {
        tokenSymbol: portfolio.token1.symbol,
        tokenName: portfolio.token1.name,
        tokenBalanceUSD: Number(portfolio.token1),
        tokenAddress: portfolio.token1.id,
        tokenDecimals: portfolio.token1.decimals,
        tokenDerivedETH: portfolio.token1.derivedETH,
        apy: 0,
        tokenLogoUri: portfolio.token1,
        hasDepositedCollateral: portfolio.collateral1Shares > 0,
        tokenUSD: portfolio.token1USD,
        collateralAssets: portfolio.collateral1Assets,
        collateralAssetsFormatted: formatUnits(
          portfolio.collateral1Assets,
          Number(portfolio.token1.decimals),
        ),
        collateralAddress: portfolio.collateral1Address,
        maxWithDraw: portfolio.maxWithdrawToken1,
      }

      return (
        <>
          <DialogTitle dialogTitle={'Select a Token'} setDialogOpen={setIsDialogOpen} />
          <div className="min-h-80 overflow-y-scroll ">
            <div
              onClick={() => {
                setStep(1)
                setSelectedToken(undefined)
                setSelectedMarket(undefined)
                router.push(`?type=${type}`,undefined,{shallow: true})
              }}
              role="presentation"
              className="hover:bg-gray-100 hover:cursor-pointer flex flex-row items-center justify-start gap-x-2 p-4">
              <PiCaretLeftThin size={32} color={'black'} />
              <MarketInfo
                marketId={portfolio.poolId}
                token0LogoUri={portfolio.token0}
                token1LogoUri={portfolio.token1WithLogoUri}
                token0Symbol={portfolio.token0WithLogoUri.symbol}
                token1Symbol={portfolio.token1WithLogoUri.symbol}
                hideHyperLink
                hasSubInfo
                apy={portfolio.apy}
                fee={portfolio.fee}
                iconStyles={[
                  portfolio.collateral0Shares > 0 ? 'border-2 border-yellow-500' : '',
                  portfolio.collateral1Shares > 0 ? 'border-2 border-yellow-500' : '',
                ]}
              />
            </div>
            {[token0, token1].map((token, index) => (
              <div
                className={clsx(
                  ' flex flex-row items-center justify-between border-t border-gray-200',
                  {
                    'hover:bg-gray-100 hover:cursor-pointer':
                      Math.floor(Number(token.maxWithDraw)) > 0,
                  },
                  {
                    'bg-gray-100 text-gray-400': Math.floor(Number(token.maxWithDraw)) === 0,
                  },
                )}
                key={index}
                // TODO: can prefetch maxwithdraw
                onClick={() => {
                  if (Number(token.maxWithDraw) > 0) {
                    setSelectedToken(token)
                    handleUrlSearchPramPreserveUpdate(
                      router,
                      query,
                      'tokenId',
                      token.tokenAddress,
                    )
                    setStep(1)
                    setIsDialogOpen(false)
                  }
                }}
                role="presentation">
                <TokenInfoWithApy
                  size="lg"
                  tokenInfo={{
                    tokenSymbol: token.tokenSymbol,
                    tokenName: token.tokenName,
                    tokenBalanceUSD: token.tokenUSD,
                    tokenAddress: token.tokenAddress,
                    tokenDecimals: token.tokenDecimals,
                    tokenDerivedETH: token.tokenDerivedETH,
                    apy: 0,
                    tokenLogoUri:
                      findTokenInTokenList(getAddress(token.tokenAddress))?.logoURI ?? '',
                    hasDepositedCollateral: token.maxWithDraw > BigInt(0),
                    collateralAddress: token.collateralAddress,
                  }}
                  isShowForwardArrow={false}
                  className="!border-t-0"
                />
                <div className="flex flex-col justify-end items-end gap-y-1 pr-4">
                  <p className="font-semibold text-xl">
                    {convertMonetaryFormat(
                      Number(formatUnits(token.maxWithDraw, Number(token.tokenDecimals))),
                      false,
                      4,
                    )}
                  </p>
                  <p className="text-md">{convertMonetaryFormat(token.tokenUSD, true, 2)}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )
    }
  }, [
    step,
    userDepositedMarkets,
    type,
    isReSelectedTokenAndMarket,
    selectedMarket,
    paramMarketId,
    setSelectedMarket,
    router,
    query,
    portfolio,
    setSelectedToken,
  ])

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={(isOpen) => setIsDialogOpen(isOpen)}>
      <Dialog.Trigger>
        {isLoadingParamMarket ? (
          <Skeleton height={'60px'} />
        ) : (
          <Button
            className={clsx('w-full', {
              'bg-white !text-black !py-2': selectedMarket !== undefined,
            })}
            size="lg"
            onClick={() => {
              if (!userDepositedMarkets.length) return
              setIsDialogOpen(true)
            }}
            disabled={!userDepositedMarkets.length}>
            {selectedMarket !== undefined ? (
              <div className="flex flex-row items-center justify-between">
                <MarketInfo
                  marketId={selectedMarket.poolId}
                  token0LogoUri={selectedMarket.token0WithLogoUri}
                  token1LogoUri={selectedMarket.token1WithLogoUri}
                  token0Symbol={selectedMarket.token0WithLogoUri.symbol}
                  token1Symbol={selectedMarket.token1WithLogoUri.symbol}
                  iconStyles={[
                    selectedMarket.hasCollateral0Shares ? 'border-2 border-yellow-500' : '',
                    selectedMarket.hasCollateral1Shares ? 'border-2 border-yellow-500' : '',
                  ]}
                  hideHyperLink
                  hasSubInfo
                  fee={selectedMarket.fee}
                />
                <div className="flex flex-row items-center justify-between gap-x-2">
                  <DropDownArrow
                    isDropdown={isDialogOpen}
                    arrowColor={selectedMarket !== undefined ? 'gray' : 'white'}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-row items-center justify-between">
                <p>Select a Token</p>
                <DropDownArrow
                  isDropdown={isDialogOpen}
                  arrowColor={selectedMarket !== undefined ? 'gray' : 'white'}
                />
              </div>
            )}
          </Button>
        )}
      </Dialog.Trigger>
      <Dialog.Content className="!p-0" maxWidth={'500px'}>
        {dialogContent}
      </Dialog.Content>
    </Dialog.Root>
  )
}
