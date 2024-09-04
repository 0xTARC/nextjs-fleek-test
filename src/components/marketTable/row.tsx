import { FC } from 'react'
import { table } from '../component.styles'
import clsx from 'clsx'
import { MarketTableInfo } from '.'
import { useScreenDetector } from '~/hooks/useScreenDetector'
import { MarketInfo } from '../market-info'
import { useNavigate } from '@remix-run/react'
import { Apy } from '../apy'
import { convertMonetaryFormat } from '~/utils/price'
import { Button } from '../button'
import { TokenInfo } from '@uniswap/token-lists'

type RowProps = {
  market: MarketTableInfo
}

export const Row: FC<RowProps> = ({ market }) => {
  const { isMobile } = useScreenDetector()
  const navigate = useNavigate()
  const navigateToCreateMarket = (token0: string, token1: string, fee: number) => {
    const url = `/new-market?token0=${token0}&token1=${token1}&fee=${fee}`
    navigate(url)
  }
  const token0Address = (market.token0WithLogoUri as TokenInfo).address
  const token1Address = (market.token1WithLogoUri as TokenInfo).address

  return (
    <tr>
      {/* Market */}
      <td className={clsx(table.td)}>
        <MarketInfo
          marketId={market.poolId}
          token0LogoUri={market.token0WithLogoUri}
          token1LogoUri={market.token1WithLogoUri}
          token0Symbol={market.token0WithLogoUri.symbol}
          token1Symbol={market.token1WithLogoUri.symbol}
          hasSubInfo
          fee={market.fee}
          iconStyles={[
            market.hasDepositedToken0 ? 'border-2 border-yellow-500' : '',
            market.hasDepositedToken1 ? 'border-2 border-yellow-500' : '',
          ]}
        />
      </td>
      {/* Transactions */}
      {isMobile ? null : <td className={clsx(table.td)}>{market.txCount}</td>}
      {/* TVL */}
      {isMobile ? null : (
        <td className={clsx(table.td)}>{convertMonetaryFormat(market.tvl, true, 2)}</td>
      )}
      {/* Daily Volume */}
      {isMobile ? null : (
        <td className={clsx(table.td)}>{convertMonetaryFormat(market.weeklyVol, true, 2)}</td>
      )}
      {/* APY */}
      <td className={clsx(table.td)}>
        <div className={'flex flex-row justify-end'}>
          {market.hasPanopticPool ? (
            <Apy apy={Number(market.apy)} />
          ) : (
            <Button
              onClick={() =>
                navigateToCreateMarket(token0Address, token1Address, market.fee * 100)
              }>
              Create Market
            </Button>
          )}
        </div>
      </td>
    </tr>
  )
}
