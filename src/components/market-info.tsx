import { FC } from 'react'
import { Link } from '@remix-run/react'
import { TokenPair } from './token-pair'
import { TokenInfo } from '@uniswap/token-lists'
import { PiCaretRightThin } from 'react-icons/pi'
import { TokenApyInfo } from '~/utils/userAccount'
import clsx from 'clsx'
import { Apy } from './apy'

type MarketInfoProps = {
  marketId: string
  token0LogoUri: Pick<TokenInfo, 'symbol' | 'logoURI'> | undefined
  token1LogoUri: Pick<TokenInfo, 'symbol' | 'logoURI'> | undefined
  token0Symbol: string
  token1Symbol: string
  hasSubInfo?: boolean
  apy?: string
  fee?: number
  iconStyles?: [base: string, quote: string]
  showDirectIcon?: boolean
  hideHyperLink?: boolean
  selectedToken?: TokenApyInfo | undefined
}

export const MarketInfo: FC<MarketInfoProps> = ({
  marketId,
  token0LogoUri,
  token1LogoUri,
  token0Symbol,
  token1Symbol,
  hasSubInfo = false,
  apy,
  fee,
  iconStyles,
  showDirectIcon = false,
  hideHyperLink = false,
  selectedToken,
}) => {
  const renderTokenPairIcons = () => {
    return <TokenPair tokens={[token0LogoUri, token1LogoUri]} size={'lg'} iconStyles={iconStyles} />
  }

  const marketName = () => {
    if (selectedToken === undefined) {
      return (
        <div className="flex flex-row items-center gap-x-1">
          <p className="text-lg font-medium text-[#131316] pr-1">{token0Symbol}</p>/
          <p className="text-lg font-medium text-[#7B7B7B] pl-1">{token1Symbol}</p>
        </div>
      )
    } else {
      return (
        <div className="flex flex-row items-center gap-x-1">
          <p
            className={clsx('text-lg font-medium pr-1 text-[#7B7B7B]', {
              '!text-[#131316]':
                selectedToken.tokenSymbol.toLowerCase() === token0Symbol.toLowerCase(),
            })}>
            {token0Symbol}
          </p>
          /
          <p
            className={clsx('text-lg font-medium pr-1 text-[#7B7B7B]', {
              '!text-[#131316]':
                selectedToken.tokenSymbol.toLowerCase() === token1Symbol.toLowerCase(),
            })}>
            {token1Symbol}
          </p>
        </div>
      )
    }
  }

  const renderTokenInfo = () => {
    return (
      <div className="flex flex-col items-start w-full">
        {showDirectIcon ? (
          <div className="flex flex-row items-center justify-between w-full">
            {marketName()}
            <PiCaretRightThin />
          </div>
        ) : (
          marketName()
        )}

        {hasSubInfo ? (
          <div className="flex flex-row items-center gap-x-2">
            {apy ? <Apy apy={Number(apy)} className="!text-sm" /> : null}
            {fee ? <p className="text-sm text-[#9191A7]">{fee}bps</p> : null}
          </div>
        ) : null}
      </div>
    )
  }

  if (showDirectIcon) {
    return (
      <>
        {hideHyperLink ? (
          <div className="flex flex-row items-center gap-x-2">
            {renderTokenPairIcons()}
            {renderTokenInfo()}
          </div>
        ) : (
          <Link to={`/markets/${marketId}`} className="-mt-1 text-xl text-slate-300">
            <div className="flex flex-row items-center gap-x-2">
              {renderTokenPairIcons()}
              {renderTokenInfo()}
            </div>
          </Link>
        )}
      </>
    )
  } else {
    return (
      <div className="flex flex-row items-center gap-x-2">
        {renderTokenPairIcons()}
        {hideHyperLink ? (
          renderTokenInfo()
        ) : (
          <Link to={`/markets/${marketId}`}>{renderTokenInfo()}</Link>
        )}
      </div>
    )
  }
}
