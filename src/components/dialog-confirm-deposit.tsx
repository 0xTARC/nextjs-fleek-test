import { Dialog, Separator, Spinner } from '@radix-ui/themes'
import { FC, useMemo, useState } from 'react'
import { TokenApyInfo } from '~/utils/userAccount'
import { Button } from './button'
import { DialogTitle } from './dialog-title'
import { MarketInfo } from './market-info'
import { getAddress, parseUnits, zeroAddress } from 'viem'
import { TokenRelatedMarketInfo } from './deposit'
import { useDepositLiquidity } from '~/hooks/contracts/useDepositLiquidity'
import Skeleton from 'react-loading-skeleton'
import { Apy } from './apy'
import clsx from 'clsx'
import { useIsSupportedChain } from '~/hooks/useIsSupportedChain'
import { TxExplorerButton } from './tx-explorer-btn'
import { useAccount } from 'wagmi'

export type DialogConfirmationDepositProps = {
  selectedToken: TokenApyInfo | undefined
  selectedMarket: TokenRelatedMarketInfo | undefined
  depositTokenAmount: string
  ethPriceUSD: number
  maxValue: bigint
  isLoading: boolean
}

export const DialogConfirmationDeposit: FC<DialogConfirmationDepositProps> = ({
  selectedMarket,
  selectedToken,
  depositTokenAmount,
  ethPriceUSD,
  maxValue,
  isLoading,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [step, setStep] = useState<number>(1)
  const isSupportedChain = useIsSupportedChain()
  const { isConnected } = useAccount()
  const depositInfo = useMemo(() => {
    if (selectedMarket === undefined || selectedToken === undefined || !depositTokenAmount.length) {
      return null
    }

    return (
      <div className=" overflow-y-scroll">
        <Separator orientation="horizontal" size="4" />
        <div className="p-5 flex flex-col gap-y-5">
          <div className="flex flex-row items-center gap-x-3">
            <p className="font-medium text-[46px]">{depositTokenAmount}</p>
            <p className="font-medium text-[46px]">{selectedToken.tokenSymbol}</p>
          </div>
          <div className="flex flex-col items-start justify-start gap-y-3">
            <MarketInfo
              marketId={selectedMarket.poolId}
              token0LogoUri={selectedMarket.token0WithLogoUri}
              token1LogoUri={selectedMarket.token1WithLogoUri}
              token0Symbol={selectedMarket.token0WithLogoUri.symbol}
              token1Symbol={selectedMarket.token1WithLogoUri.symbol}
              hasSubInfo
              fee={selectedMarket.fee}
              iconStyles={[
                selectedMarket.hasCollateral0Shares ? 'border-2 border-yellow-500' : '',
                selectedMarket.hasCollateral1Shares ? 'border-2 border-yellow-500' : '',
              ]}
              hideHyperLink
              selectedToken={selectedToken}
            />
            <div className="flex flex-row items-center gap-x-1">
              <p
                className={clsx(
                  'text-xl font-semibold',
                  { 'text-green-500': Number(selectedMarket.apy) >= 0 },
                  { 'text-red-500': Number(selectedMarket.apy) < 0 },
                )}>
                to Earn
              </p>
              <Apy apy={Number(selectedMarket.apy)} />
            </div>
          </div>
        </div>
      </div>
    )
  }, [selectedMarket, selectedToken, depositTokenAmount])

  const collateralAddress = getAddress(
    selectedMarket && selectedMarket.collateralAddress
      ? selectedMarket.collateralAddress
      : zeroAddress,
  )

  const depositTokenAmountFormatted = parseUnits(
    depositTokenAmount,
    Number(selectedToken?.tokenDecimals),
  )
  const {
    write,
    isLoading: isLoadingDepositLiquidity,
    data,
    actionLabel,
    wait,
  } = useDepositLiquidity(collateralAddress, selectedToken, depositTokenAmountFormatted, () =>
    setStep(3),
  )

  const dialogContent = useMemo(() => {
    return (
      <>
        <DialogTitle
          dialogTitle={step !== 3 ? 'Confirm Deposit' : 'Successfully Deposited!'}
          setDialogOpen={setIsDialogOpen}
        />
        {depositInfo}
        {wait.isSuccess && wait.data.transactionHash ? (
          <div className="flex flex-row items-center justify-center">
            <TxExplorerButton txHash={wait.data.transactionHash} variant="hyperText" />
          </div>
        ) : null}
      </>
    )
  }, [depositInfo, step, wait])

  const buttons = useMemo(() => {
    if (step === 1) {
      return (
        <Button className="w-full" size="lg" onClick={() => setStep(2)}>
          Deposit
        </Button>
      )
    } else if (step === 2) {
      return (
        <Button
          className="w-full"
          size="lg"
          disabled={!data?.request}
          onClick={() => write(data!.request)}>
          {isLoadingDepositLiquidity ? (
            <div className="flex flex-row gap-x-3 items-center justify-center">
              <p>Pending</p> <Spinner size="3" />
            </div>
          ) : (
            actionLabel
          )}
        </Button>
      )
    } else {
      return (
        <Button className="w-full" size="lg" onClick={() => setIsDialogOpen(false)}>
          Done
        </Button>
      )
    }
  }, [write, isLoadingDepositLiquidity, data, actionLabel, step])

  const isDisabled =
    selectedMarket === undefined ||
    selectedToken === undefined ||
    depositTokenAmount.length === 0 ||
    Number(depositTokenAmount) === 0 ||
    Number(depositTokenAmount) > Number(maxValue) ||
    !isSupportedChain

  return (
    <>
      <Dialog.Root open={isDialogOpen}>
        <Dialog.Trigger>
          {isLoading ? (
            <Skeleton height={'60px'} />
          ) : (
            <Button
              className={'w-full'}
              size="lg"
              onClick={() => {
                if (isDisabled) return
                setIsDialogOpen(true)
              }}
              variant={isConnected && !isSupportedChain ? 'error' : 'primary'}
              disabled={isDisabled}>
              <p>Deposit</p>
            </Button>
          )}
        </Dialog.Trigger>
        <Dialog.Content className="!p-0" maxWidth={'500px'}>
          {dialogContent}
          <div className="p-2">{buttons}</div>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
