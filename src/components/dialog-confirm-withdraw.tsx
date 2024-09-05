import { Dialog, Separator, Spinner } from '@radix-ui/themes'
import { FC, useMemo, useState } from 'react'
import { TokenApyInfo } from '~/utils/userAccount'
import { Button } from './button'
import { DialogTitle } from './dialog-title'
import { MarketInfo } from './market-info'
import { getAddress, parseUnits, zeroAddress } from 'viem'
import { TokenRelatedMarketInfo } from './deposit'
import { useWithdrawLiquidity } from '~/hooks/contracts/useWithdrawLiquidity'
import Skeleton from 'react-loading-skeleton'
import { Apy } from './apy'
import clsx from 'clsx'
import { useIsSupportedChain } from '~/hooks/useIsSupportedChain'
import { TxExplorerButton } from './tx-explorer-btn'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/router'

export type DialogConfirmationWithdrawProps = {
  selectedToken: TokenApyInfo | undefined
  selectedMarket: TokenRelatedMarketInfo | undefined
  withdrawTokenAmount: string
  maxValue: bigint
  isLoading: boolean
  onWithdrawSuccess: () => void
}

export const DialogConfirmationWithdraw: FC<DialogConfirmationWithdrawProps> = ({
  selectedMarket,
  selectedToken,
  withdrawTokenAmount,
  maxValue,
  isLoading,
  onWithdrawSuccess,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [step, setStep] = useState<number>(1)
  const isSupportedChain = useIsSupportedChain()
  const { isConnected } = useAccount()
  const router = useRouter()
  const withdrawAmountFormatted = parseUnits(
    withdrawTokenAmount,
    Number(selectedToken?.tokenDecimals),
  )
  const withdrawInfo = useMemo(() => {
    if (
      selectedMarket === undefined ||
      selectedToken === undefined ||
      !withdrawTokenAmount.length
    ) {
      return null
    }
    return (
      <div className=" overflow-y-scroll">
        <Separator orientation="horizontal" size="4" />
        <div className="p-5 flex flex-col gap-y-5">
          <div className="flex flex-row items-center gap-x-3">
            <p className="font-medium text-[46px]">{withdrawTokenAmount}</p>
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
                Earning
              </p>
              <Apy apy={Number(selectedMarket.apy)} />
            </div>
          </div>
        </div>
      </div>
    )
  }, [selectedMarket, selectedToken, withdrawTokenAmount])

  const collateralAddress = getAddress(
    selectedToken && selectedToken.collateralAddress
      ? selectedToken.collateralAddress
      : zeroAddress,
  )

  const {
    write,
    isReady: isWithdrawLiquidityReady,
    actionLabel,
    wait,
    errors,
  } = useWithdrawLiquidity(collateralAddress, selectedToken, withdrawAmountFormatted, () => {
    setStep(2)
    // refetch token balances so "amount to deposit" changes
    onWithdrawSuccess()
    setTimeout(() => {
      router.push('/portfolio')
    }, 3000)
  })
  const isError = errors.length > 0

  const dialogContent = useMemo(() => {
    return (
      <>
        <DialogTitle
          dialogTitle={step !== 2 ? 'Confirm Withdraw' : 'Successfully Withdrawn!'}
          setDialogOpen={setIsDialogOpen}
        />
        {withdrawInfo}
        {wait.isSuccess && wait.data.transactionHash ? (
          <div className="flex flex-row items-center justify-center">
            <TxExplorerButton txHash={wait.data.transactionHash} variant="hyperText" />
          </div>
        ) : null}
      </>
    )
  }, [withdrawInfo, step, wait])

  const buttons = useMemo(() => {
    if (step === 1) {
      return (
        <Button
          className="w-full"
          size="lg"
          variant={isError ? 'error' : 'primary'}
          disabled={isWithdrawLiquidityReady || isError}
          onClick={() => write()}>
          {isWithdrawLiquidityReady ? (
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
  }, [step, isError, isWithdrawLiquidityReady, actionLabel, write])

  const isDisabled =
    selectedMarket === undefined ||
    selectedToken === undefined ||
    withdrawTokenAmount.length === 0 ||
    Number(withdrawTokenAmount) === 0 ||
    Number(withdrawTokenAmount) > Number(maxValue) ||
    !isSupportedChain

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={(isOpen) => setIsDialogOpen(isOpen)}>
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
            <p>Withdraw</p>
          </Button>
        )}
      </Dialog.Trigger>
      <Dialog.Content className="!p-0" maxWidth={'500px'}>
        {dialogContent}
        <div className="p-2">{buttons}</div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
