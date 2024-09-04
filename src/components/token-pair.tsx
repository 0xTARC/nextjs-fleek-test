import clsx from 'clsx'

import type { TokenInfo } from '@uniswap/token-lists'

import { TokenIcon } from './token-icon'

export const TokenPair = ({
  className = '',
  tokens,
  size = 'sm',
  iconStyles,
}: {
  className?: string
  tokens: [
    base: Pick<TokenInfo, 'symbol' | 'logoURI'> | undefined,
    quote: Pick<TokenInfo, 'symbol' | 'logoURI'> | undefined,
  ]
  size?: 'sm' | 'md' | 'lg'
  iconStyles?: [base: string, quote: string]
}) => {
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
  return (
    <div className={clsx('flex flex-row items-center', className)}>
      <TokenIcon
        token={tokens[0]}
        width={width}
        height={height}
        className={clsx(iconStyles ? iconStyles[0] : '')}
      />
      <TokenIcon
        token={tokens[1]}
        className={clsx('-ml-2', iconStyles ? iconStyles[1] : '')}
        width={width}
        height={height}
      />
    </div>
  )
}
