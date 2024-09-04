import { TokenBasicInfo } from '~/utils/userAccount'
import { TokenIcon } from './token-icon'
import { FC } from 'react'

type TokenInfoProps = {
  token: TokenBasicInfo
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const TokenInfo: FC<TokenInfoProps> = ({ token, size, className }) => {
  let width, height
  switch (size) {
    case 'sm':
      width = 20
      height = 20
      break
    case 'md':
      width = 32
      height = 32
      break
    case 'lg':
      width = 44
      height = 44
      break
    default:
      break
  }
  const { tokenLogoUri, tokenName } = token
  return (
    <div className="flex flex-row items-center gap-x-4">
      <TokenIcon token={tokenLogoUri} width={width} height={height} className={className} />
      <div className="flex flex-col justify-start items-start">
        <p className="text-lg font-medium text-[#131316]">{tokenName}</p>
        <p className="text-md font-medium text-[#7B7B7B]">{tokenLogoUri.symbol}</p>
      </div>
    </div>
  )
}
