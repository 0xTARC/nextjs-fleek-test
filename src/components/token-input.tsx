import { Button } from '@radix-ui/themes'
import { FC, useMemo } from 'react'
import { convertMonetaryFormat, tokenValueInUSD } from '~/utils/price'
import { TokenApyInfo } from '~/utils/userAccount'
import { PiApproximateEqualsBold } from 'react-icons/pi'
import { TokenRelatedMarketInfo } from './deposit'
import Skeleton from 'react-loading-skeleton'
import { formatUnits } from 'viem'

export type TokenInputProps = {
  selectedToken: TokenApyInfo | undefined
  selectedMarket: TokenRelatedMarketInfo | undefined
  ethPriceUSD: number
  value: string
  setValue: React.Dispatch<string>
  maxValue: bigint
  isLoading: boolean
  isWholeNumberOnly?: boolean
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export const TokenInput: FC<TokenInputProps> = ({
  selectedToken,
  selectedMarket,
  ethPriceUSD,
  value,
  setValue,
  maxValue,
  isLoading,
  isWholeNumberOnly = false,
}) => {
  const inputRegex = isWholeNumberOnly ? RegExp(`^\\d+$`) : RegExp(`^\\d*(?:\\\\[.])?\\d*$`)
  const maxDecimals = 9
  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      const decimalGroups = nextUserInput.split('.')
      if (decimalGroups.length > 1 && decimalGroups[1].length > maxDecimals) {
        return
      }

      setValue(nextUserInput)
    }
  }

  const numberOfTokenInUse = useMemo(() => {
    if (selectedToken === undefined) return 0
    return tokenValueInUSD(Number(value), Number(selectedToken.tokenDerivedETH), ethPriceUSD)
  }, [value, selectedToken, ethPriceUSD])

  const maxValueFormatted = formatUnits(maxValue, Number(selectedToken?.tokenDecimals))
  return (
    <div className="border border-gray-200 w-full rounded-xl my-2 py-2 px-4 h-[124px]">
      <div className="flex flex-row items-center justify-between pb-2">
        <div>
          {isLoading ? (
            <Skeleton width={260} height={56} />
          ) : (
            <input
              inputMode="decimal"
              autoComplete="off"
              autoCorrect="off"
              type="text"
              pattern="^[0-9]*[.,]?[0-9]*$"
              minLength={1}
              maxLength={80}
              spellCheck={false}
              placeholder="0.00"
              className="bg-white w-full h-full text-[48px] font-medium focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              value={value}
              onChange={(event) => {
                enforcer(event.target.value.replace(/,/g, '.'))
              }}
              readOnly={selectedToken === undefined && selectedMarket === undefined}
            />
          )}
        </div>
        {isLoading ? (
          <Skeleton width={100} height={56} />
        ) : selectedToken === undefined || selectedMarket === undefined ? null : (
          <p className="font-medium text-[48px] text-gray-400">{selectedToken.tokenSymbol}</p>
        )}
      </div>
      {isLoading ? (
        <div className="flex flex-row items-center justify-between">
          <Skeleton width={60} height={24} />
          <Skeleton width={160} height={24} />
        </div>
      ) : selectedToken === undefined || selectedMarket === undefined ? null : (
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-x-1">
            {numberOfTokenInUse === 0 ? null : <PiApproximateEqualsBold color="gray" />}
            <p className="font-medium text-md text-gray-400">
              {convertMonetaryFormat(numberOfTokenInUse, true, 2)}
            </p>
          </div>
          <div className="flex flex-row items-center gap-x-2">
            <p className="font-medium text-md text-gray-400">
              {convertMonetaryFormat(Number(maxValueFormatted), false, 4)}{' '}
              {selectedToken.tokenSymbol} Available{' '}
            </p>
            <Button
              color="gray"
              variant="solid"
              size="1"
              className="hover:cursor-pointer"
              onClick={(e) => {
                e.preventDefault()
                setValue(maxValueFormatted)
              }}
              radius="large">
              MAX
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
