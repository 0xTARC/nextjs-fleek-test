import { FC } from 'react'
import { TokenApyInfo } from '~/utils/userAccount'
import { convertMonetaryFormat } from '~/utils/price'
import { PiCaretRightThin, PiCaretLeftThin } from 'react-icons/pi'
import { clsx } from 'clsx'
import { Apy } from './apy'
import { TokenInfo } from './token-info'

type TokenInfoWithApyProps = {
  tokenInfo: TokenApyInfo
  size?: 'sm' | 'md' | 'lg'
  className?: string
  isShowForwardArrow?: boolean
  isShowBackArrow?: boolean
}

export const TokenInfoWithApy: FC<TokenInfoWithApyProps> = ({
  tokenInfo,
  size = 'sm',
  className,
  isShowForwardArrow = true,
  isShowBackArrow = false,
}) => {
  const {
    tokenLogoUri,
    tokenBalanceUSD,
    tokenName,
    tokenAddress,
    apy,
    hasDepositedCollateral,
    tokenSymbol,
  } = tokenInfo
  return (
    <div
      className={clsx(
        'flex flex-row items-center justify-between gap-x-2 p-4 border-t border-gray-200',
        className,
      )}>
      <div className="w-fit flex flex-row items-center justify-center gap-x-2">
        {isShowBackArrow ? <PiCaretLeftThin size={32} color={'black'} /> : null}
        <TokenInfo
          token={{
            tokenLogoUri: tokenLogoUri,
            tokenName: tokenName,
            tokenAddress: tokenAddress,
            tokenSymbol: tokenSymbol,
          }}
          className={hasDepositedCollateral ? 'border-2 border-yellow-500' : ''}
          size={size}
        />
      </div>
      {isShowForwardArrow ? (
        <div className="flex flex-row items-center gap-x-3">
          <div className="flex flex-col items-end w-fit">
            <Apy apy={apy} />
            {tokenBalanceUSD === 0 ? null : (
              <p className="text-md">{convertMonetaryFormat(tokenBalanceUSD, true, 2)}</p>
            )}
          </div>
          <PiCaretRightThin size={32} color={'black'} />
        </div>
      ) : null}
    </div>
  )
}
