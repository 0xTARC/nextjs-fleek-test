import { TokenBasicInfo } from '~/utils/userAccount'
import { TokenIcon2 } from './token-icon'
import { FC } from 'react'

type TokenInfoProps = {
  token: TokenBasicInfo
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const TokenInfo2: FC<TokenInfoProps> = ({ token, size, className }) => {
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
  const { tokenName, tokenSymbol } = token
  return (
    <div className="flex flex-row items-center gap-x-4">
      <TokenIcon2 token={token} width={width} height={height} className={className} />
      <div className="flex flex-col justify-start items-start">
        <p className="text-lg font-medium text-[#131316]">{tokenName}</p>
        <p className="text-md font-medium text-[#7B7B7B]">{tokenSymbol}</p>
      </div>
    </div>
  )
}
