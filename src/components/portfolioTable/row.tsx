import { FC } from 'react'
import { dropdownMenu, table } from '../component.styles'
import clsx from 'clsx'
import { PortfolioInfo } from '.'
import { TfiMoreAlt as MoreIcon } from 'react-icons/tfi'
import { DropdownMenu } from '@radix-ui/themes'
import { useScreenDetector } from '~/hooks/useScreenDetector'
import { MarketInfo } from '../market-info'
import { convertMonetaryFormat } from '~/utils/price'
import { Button } from '../button'
import { Apy } from '../apy'
import {useRouter} from 'next/router'

type RowProps = {
  portfolioInfo: PortfolioInfo
}

export const Row: FC<RowProps> = ({ portfolioInfo }) => {
  const { isMobile } = useScreenDetector()
  const router = useRouter()
  const navigateToDepositOrDeposit = (url: string) => router.push(url)
  return (
    <tr>
      {/* Market */}
      <td className={clsx(table.td)}>
        {isMobile ? (
          <MarketInfo
            marketId={portfolioInfo.poolId}
            token0LogoUri={portfolioInfo.token0WithLogoUri}
            token1LogoUri={portfolioInfo.token1WithLogoUri}
            token0Symbol={portfolioInfo.token0WithLogoUri.symbol}
            token1Symbol={portfolioInfo.token1WithLogoUri.symbol}
            hasSubInfo
            apy={portfolioInfo.apy}
            fee={portfolioInfo.fee}
            iconStyles={[
              portfolioInfo.collateral0Shares > 0 ? 'border-2 border-yellow-500' : '',
              portfolioInfo.collateral1Shares > 0 ? 'border-2 border-yellow-500' : '',
            ]}
          />
        ) : (
          <MarketInfo
            marketId={portfolioInfo.poolId}
            token0LogoUri={portfolioInfo.token0WithLogoUri}
            token1LogoUri={portfolioInfo.token1WithLogoUri}
            token0Symbol={portfolioInfo.token0WithLogoUri.symbol}
            token1Symbol={portfolioInfo.token1WithLogoUri.symbol}
            iconStyles={[
              portfolioInfo.collateral0Shares > 0 ? 'border-2 border-yellow-500' : '',
              portfolioInfo.collateral1Shares > 0 ? 'border-2 border-yellow-500' : '',
            ]}
          />
        )}
      </td>
      {/* Fee Tier */}
      {isMobile ? null : <td className={clsx(table.td)}>{portfolioInfo.fee}bps</td>}
      {/* APY */}
      {isMobile ? null : (
        <td className={clsx(table.td)}>
          <Apy apy={Number(portfolioInfo.apy)} />
        </td>
      )}
      {/* Amount */}
      <td className={clsx(table.td)}>
        <div className="flex flex-row items-center justify-end">
          <span className="pr-3">{convertMonetaryFormat(portfolioInfo.amountUSD, true, 2)}</span>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="flat">
                <MoreIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content color="gray" variant="soft">
              <DropdownMenu.Item
                className={dropdownMenu.item}
                onClick={() =>
                  navigateToDepositOrDeposit(
                    `/earn?type=deposit&tokenId=${portfolioInfo.token0.id}&marketId=${portfolioInfo.poolId}`,
                  )
                }>
                Deposit {portfolioInfo.collateral0Assets > BigInt(0) ? 'more' : ''}{' '}
                {portfolioInfo.token0WithLogoUri.symbol}
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className={clsx(dropdownMenu.item, {
                  'hover:cursor-default': portfolioInfo.collateral0Assets <= BigInt(0),
                })}
                disabled={portfolioInfo.collateral0Assets <= BigInt(0)}
                onClick={() => {
                  if (portfolioInfo.collateral0Assets <= BigInt(0)) return
                  navigateToDepositOrDeposit(
                    `/earn?type=withdraw&marketId=${portfolioInfo.poolId}&tokenId=${portfolioInfo.token0.id}`,
                  )
                }}>
                Withdraw {portfolioInfo.token0WithLogoUri.symbol}
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className={dropdownMenu.item}
                onClick={() =>
                  navigateToDepositOrDeposit(
                    `/earn?type=deposit&tokenId=${portfolioInfo.token1.id}&marketId=${portfolioInfo.poolId}`,
                  )
                }>
                Deposit {portfolioInfo.collateral1Assets > BigInt(0) ? 'more' : ''}{' '}
                {portfolioInfo.token1WithLogoUri.symbol}
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className={clsx(dropdownMenu.item, {
                  'hover:cursor-default': portfolioInfo.collateral1Assets <= BigInt(0),
                })}
                disabled={portfolioInfo.collateral1Assets <= BigInt(0)}
                onClick={() => {
                  if (portfolioInfo.collateral1Assets <= BigInt(0)) return
                  navigateToDepositOrDeposit(
                    `/earn?type=withdraw&marketId=${portfolioInfo.poolId}&tokenId=${portfolioInfo.token1.id}`,
                  )
                }}>
                Withdraw {portfolioInfo.token1WithLogoUri.symbol}
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </td>
    </tr>
  )
}
