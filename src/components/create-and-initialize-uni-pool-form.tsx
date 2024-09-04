import * as Label from '@radix-ui/react-label'
import { Callout } from '@radix-ui/themes'
import { TokenInfo } from '@uniswap/token-lists'
import clsx from 'clsx'
import Decimal from 'decimal.js'
import { useState } from 'react'
import { RxInfoCircled as InfoCircledIcon } from 'react-icons/rx'
import { getAddress, zeroAddress } from 'viem'
import { inputStyles } from '~/components/component.styles'
import { useCreateAndInitializeUniswapPool } from '~/hooks/contracts/useCreateAndInitializeUniswapPool'
import { validateNonNegativeDecimalInput } from '~/utils/inputValidationUtils'
import { tickToPrice } from '~/utils/options'
import { MAX_TICK } from '~/utils/uniswap'
import { Button } from './button'
import { useAccount } from 'wagmi'

export function CreateAndInitializeUniPoolForm({
  token0,
  token1, // if no asset token specified use the uniswap default (token0)
  fee,
  onInitializeConfirmed,
  isAssetToken0 = true, // if no asset token specified use the uniswap default (token0)
}: {
  token0: TokenInfo
  token1: TokenInfo
  fee: number
  onInitializeConfirmed?: () => void
  isAssetToken0?: boolean
}) {
  const [initialQuotePrice, setInitialQuotePrice] = useState('')
  const { address } = useAccount()

  // If user is viewing this market as token1/token0, make sure to invert their input price
  // to get back to token0/token1 price so the correct sqrt price gets passed in to the smart contract call
  const initialPrice =
    initialQuotePrice === ''
      ? ''
      : isAssetToken0
        ? initialQuotePrice
        : (1 / Number(initialQuotePrice)).toString()

  // Convert decimal price into sqrtX96 format (https://docs.uniswap.org/contracts/v4/concepts/managing-positions#squareroot-price-x96)
  const initialSqrtPriceDecimal =
    initialPrice === ''
      ? ''
      : new Decimal(Math.sqrt(Number(initialPrice))).mul(new Decimal((2n ** 96n).toString()))
  Decimal.set({ toExpPos: 99 }) // Specify a sufficient precision to avoid exponential notation when converting this Decimal value to a string (ex. toString() returns '1e+12' in favor of '1000000000000')
  const initialSqrtPriceStr = initialSqrtPriceDecimal.toString()

  const initialUnitPriceLabel = `1 ${isAssetToken0 ? token0?.symbol : token1?.symbol} = ${
    initialQuotePrice === '' ? '?' : initialQuotePrice
  } ${isAssetToken0 ? token1?.symbol : token0?.symbol}`

  const {
    action: createAndInitializePoolAction,
    actionLabel: createAndInitializePoolActionLabel,
    simulate: simulateCreateAndInitializePool,
    write: writeCreateAndInitializePool,
    wait: waitCreateAndInitializePool,
  } = useCreateAndInitializeUniswapPool(
    {
      token0: getAddress(token0?.address ?? zeroAddress),
      token1: getAddress(token1?.address ?? zeroAddress),
      fee: fee,
      initSqrtPriceX96Str: initialSqrtPriceStr,
      disabled: false,
    },
    onInitializeConfirmed,
  )

  return (
    <div className="my-3 flex flex-col gap-1 w-full">
      <Label.Root htmlFor="v3-price-input">Choose initial price:</Label.Root>
      <input
        className={clsx(inputStyles, '!py-2 w-full')}
        name="v3-price-input"
        id="v3-price-input"
        value={initialQuotePrice}
        onChange={(e) => {
          const v = e.target.value
          validateNonNegativeDecimalInput(
            v,
            setInitialQuotePrice,
            tickToPrice(MAX_TICK).toString(), // Limit max input price to max possible pool price
          )
        }}
      />
      <p className="text-md text-slate-600">{initialUnitPriceLabel}</p>

      <Callout.Root className="mt-4" color="gray">
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          The Uniswap pool must be initialized before you can create a market. To initialize, select
          a starting price for the pool.
        </Callout.Text>
      </Callout.Root>

      <Button
        disabled={
          address === undefined ||
          initialQuotePrice === '' ||
          !createAndInitializePoolAction.write ||
          createAndInitializePoolAction.isLoading ||
          createAndInitializePoolAction.isSuccess ||
          simulateCreateAndInitializePool.error != null ||
          writeCreateAndInitializePool.isPending ||
          waitCreateAndInitializePool.isLoading
        }
        unsafeDisable={
          address === undefined ||
          initialQuotePrice === '' ||
          !createAndInitializePoolAction.write ||
          createAndInitializePoolAction.isLoading ||
          createAndInitializePoolAction.isSuccess ||
          simulateCreateAndInitializePool.error != null ||
          writeCreateAndInitializePool.isPending ||
          waitCreateAndInitializePool.isLoading
        }
        onClick={() => createAndInitializePoolAction.write?.()}
        size="lg"
        className="w-full rounded-xl font-light mt-4">
        {createAndInitializePoolActionLabel}
      </Button>
    </div>
  )
}
