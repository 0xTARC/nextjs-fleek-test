import clsx from 'clsx'

import type { TokenInfo } from '@uniswap/token-lists'
import { TokenBasicInfo } from '~/utils/userAccount'

function Placeholder({
  width = 20,
  height = 20,
  className = '',
}: {
  className?: string
  fill?: React.CSSProperties['color']
  width?: React.SVGAttributes<HTMLOrSVGElement>['width']
  height?: React.SVGAttributes<HTMLOrSVGElement>['height']
  opacity?: React.SVGAttributes<HTMLOrSVGElement>['opacity']
}) {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 25"
      height={height}
      width={width}
      className={className}>
      <path
        d="M12 24.5c6.627 0 12-5.373 12-12S18.627.5 12 .5 0 5.873 0 12.5s5.373 12 12 12Z"
        fill="#6100FF"
      />
    </svg>
  )
}

export const TokenIcon = ({
  token,
  className,
  width,
  height,
}: {
  token?: Pick<TokenInfo, 'symbol' | 'logoURI'>
  className?: string
  width?: number
  height?: number
}) => {
  if (token === undefined || token.logoURI === undefined) {
    return <Placeholder width={width} height={height} className={clsx('rounded-full', className)} />
  }
  const ipfsPrefix = 'ipfs://'
  const tokenLogoUri = token.logoURI.includes(ipfsPrefix)
    ? `https://ipfs.io/ipfs/${token.logoURI.slice(ipfsPrefix.length)}`
    : token.logoURI
  return (
    <div
      style={{
        width,
        height,
      }}>
      <img
        src={tokenLogoUri}
        alt={token.symbol}
        // The border-radius from rounded-full kinda cuts of the edges of square svgs, but whatever
        className={clsx('rounded-full w-full h-full', className)}
      />
    </div>
  )
}

export const TokenIcon2 = ({
  token,
  className,
  width,
  height,
}: {
  token?: TokenBasicInfo
  className?: string
  width?: number
  height?: number
}) => {
  if (token === undefined || token.tokenLogoUri === undefined || !token.tokenLogoUri.length) {
    return <Placeholder width={width} height={height} className={clsx('rounded-full', className)} />
  }
  const ipfsPrefix = 'ipfs://'
  const tokenLogoUri = token.tokenLogoUri.includes(ipfsPrefix)
    ? `https://ipfs.io/ipfs/${token.tokenLogoUri.slice(ipfsPrefix.length)}`
    : token.tokenLogoUri
  // console.log('tokenLogoUri: ', tokenLogoUri)
  return (
    <div
      style={{
        width,
        height,
      }}>
      <img
        src={tokenLogoUri}
        alt={token.tokenSymbol}
        // The border-radius from rounded-full kinda cuts of the edges of square svgs, but whatever
        className={clsx('rounded-full w-full h-full', className)}
      />
    </div>
  )
}
