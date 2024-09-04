import { Dialog } from '@radix-ui/themes'
import { DropDownArrow } from './aimate-arrow'
import { Button } from './button'
import { FC, useMemo, useState } from 'react'
import { DialogTitle } from './dialog-title'
import { TokenApyInfo } from '~/utils/userAccount'
import { TokenInfoWithApy } from './token-info-with-apy'
import { Loading } from './loading'
import { MarketInfo } from './market-info'
import clsx from 'clsx'
import { TokenRelatedMarketInfo } from './deposit'
import { useRouter } from 'next/router'
import {
  handleUrlSearchPramPreserveUpdate,
  handleUrlSearchPramRemoveKeys,
} from '~/utils/urlSearchParams'
import Skeleton from 'react-loading-skeleton'
import { Apy } from './apy'

type DialogSelectTokenProps = {
  tokenList: TokenApyInfo[]
  setSelectedToken: React.Dispatch<TokenApyInfo | undefined>
  selectedToken: TokenApyInfo | undefined
  isLoadingTokenRelatedVaults: boolean
  tokenRelatedVaultInfo: TokenRelatedMarketInfo[]
  setSelectedMarket: React.Dispatch<TokenRelatedMarketInfo | undefined>
  selectedMarket: TokenRelatedMarketInfo | undefined
  paramTokenId: string | null
  paramMarketId: string | null
  isLoadingParamToken: boolean
}

export const DialogSelectToken: FC<DialogSelectTokenProps> = ({
  tokenList,
  setSelectedToken,
  selectedToken,
  isLoadingTokenRelatedVaults,
  tokenRelatedVaultInfo,
  setSelectedMarket,
  selectedMarket,
  paramTokenId,
  paramMarketId,
  isLoadingParamToken,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isReSelectedTokenAndMarket, setIsReSelectedTokenAndMarket] = useState<boolean>(false)
  const [step, setStep] = useState<number>(1)
  const router = useRouter()
  const query = new URLSearchParams(router.asPath.split("?")[1] || "")
  console.log('query: ', query)
  const type = query.get('type')

  const selectToken = (token: TokenApyInfo) => {
    let url = `?type=${type}`
    if (isReSelectedTokenAndMarket && selectedToken !== undefined) {
      setSelectedToken(undefined)
      setIsReSelectedTokenAndMarket(false)
    }
    if (paramMarketId !== null) {
      handleUrlSearchPramRemoveKeys(router, query, ['marketId'])
    }

    setSelectedToken(token)
    // TODO: these router.pushes are forcing re-renders and causing step to reset
    // try what's mentioned in this issue https://github.com/vercel/next.js/discussions/18072
    url = `${url}&tokenId=${token.tokenAddress}`
    router.push(url, undefined, {shallow:true})
    setStep(2)
  }

  const clearSelectedToken = () => {
    setSelectedToken(undefined)
    setSelectedMarket(undefined)
    router.push(`?type=${type}`, undefined, {shallow: true})
    setStep(1)
  }

  const selectMarket = (market: TokenRelatedMarketInfo) => {
    setSelectedMarket(market)
    handleUrlSearchPramPreserveUpdate(router, query, 'marketId', market.poolId)
    setStep(1)
    setIsDialogOpen(false)
  }

  const dialogContent = useMemo(() => {
    if (step === 1 && tokenList.length) {
      return (
        <>
          <DialogTitle dialogTitle={'Select a Token'} setDialogOpen={setIsDialogOpen} />
          <div className="min-h-80 overflow-y-scroll">
            {tokenList.map((tokenInfo, idx) => (
              <div key={idx} onClick={() => selectToken(tokenInfo)} role="presentation">
                <TokenInfoWithApy
                  tokenInfo={tokenInfo}
                  size="lg"
                  className="hover:bg-gray-100 hover:cursor-pointer"
                />
              </div>
            ))}
          </div>
        </>
      )
    } else if (step === 2) {
      if (!selectedToken) return
      return (
        <>
          <DialogTitle dialogTitle={'Select a Market'} setDialogOpen={setIsDialogOpen} />
          <div className="min-h-80 overflow-y-scroll">
            <div onClick={() => clearSelectedToken()} role="presentation">
              <TokenInfoWithApy
                tokenInfo={selectedToken}
                size="lg"
                className="hover:bg-gray-100 hover:cursor-pointer"
                isShowBackArrow={true}
                isShowForwardArrow={false}
              />
            </div>
            {isLoadingTokenRelatedVaults ? (
              <div className="flex flex-row items-center justify-center h-full">
                <Loading />
              </div>
            ) : tokenRelatedVaultInfo.length ? (
              tokenRelatedVaultInfo.map(
                (tokenRelatedVault: TokenRelatedMarketInfo, idx: number) => (
                  <div
                    className="flex flex-row items-center justify-between gap-x-2 p-4 border-t border-gray-200 hover:bg-gray-100 hover:cursor-pointer"
                    key={idx}
                    onClick={() => selectMarket(tokenRelatedVault)}
                    role="presentation">
                    <MarketInfo
                      marketId={tokenRelatedVault.poolId}
                      token0LogoUri={tokenRelatedVault.token0WithLogoUri}
                      token1LogoUri={tokenRelatedVault.token1WithLogoUri}
                      token0Symbol={tokenRelatedVault.token0WithLogoUri.symbol}
                      token1Symbol={tokenRelatedVault.token1WithLogoUri.symbol}
                      hasSubInfo
                      fee={tokenRelatedVault.fee}
                      iconStyles={[
                        tokenRelatedVault.hasCollateral0Shares ? 'border-2 border-yellow-500' : '',
                        tokenRelatedVault.hasCollateral1Shares ? 'border-2 border-yellow-500' : '',
                      ]}
                      hideHyperLink
                      selectedToken={selectedToken}
                    />
                    <Apy apy={Number(tokenRelatedVault.apy)} />
                  </div>
                ),
              )
            ) : null}
          </div>
        </>
      )
    }
  }, [step, tokenList, tokenRelatedVaultInfo])

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={(isOpen) => setIsDialogOpen(isOpen)}>
      <Dialog.Trigger>
        {isLoadingParamToken ? (
          <Skeleton height={'60px'} />
        ) : (
          <Button
            className={clsx('w-full', {
              'bg-white !text-black !py-2': selectedMarket !== undefined,
            })}
            size="lg"
            onClick={() => {
              setIsDialogOpen(true)
              setIsReSelectedTokenAndMarket(true)
            }}>
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
                  selectedToken={selectedToken}
                  fee={selectedMarket.fee}
                  hideHyperLink
                  hasSubInfo
                />
                <div className="flex flex-row items-center justify-between gap-x-2">
                  <Apy apy={Number(selectedMarket.apy)} />
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
