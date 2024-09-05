import clsx from 'clsx'
import { FC, useState } from 'react'
import { dropdownMenu, listItem, table } from '../component.styles'
import { DropdownMenu } from '@radix-ui/themes'
import { Button } from '../button'
import { TfiMoreAlt as MoreIcon } from 'react-icons/tfi'
import { convertMonetaryFormat, tokenValueInUSD } from '~/utils/price'
import { Address, formatUnits } from 'viem'
import { TokenStakedInfo } from '~/utils/userAccount'
import { useScreenDetector } from '~/hooks/useScreenDetector'
import { Sheet } from 'react-modal-sheet'
import { TokenInfo2 } from '../token-info-2'
import { useRouter } from 'next/router'

type RowProps = {
  token: TokenStakedInfo
  poolId: Address
  ethPriceUSD: number
}

export const Row: FC<RowProps> = ({ token, poolId, ethPriceUSD }) => {
  const { isMobile } = useScreenDetector()
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState<boolean>(false)
  const router = useRouter()
  const navigateToDepositOrDeposit = (url: string) => router.push(url)
  const stakedBalance = formatUnits(token.stakedAmount, Number(token.tokenDecimals))
  const stakedBalanceUSD = tokenValueInUSD(
    Number(stakedBalance),
    Number(token.tokenDerivedETH),
    ethPriceUSD,
  )

  return (
    <tr>
      {/* Token */}
      <td className={clsx(table.td)}>
        <TokenInfo2
          token={{
            tokenLogoUri: token.tokenLogoUri,
            tokenSymbol: token.tokenSymbol,
            tokenName: token.tokenName,
            tokenAddress: token.tokenAddress,
          }}
          size={'lg'}
          className={token.hasDepositedCollateral ? 'border-2 border-yellow-500' : ''}
        />
      </td>
      {/* Amount */}
      <td className={clsx(table.td)}>
        <div className="flex flex-row items-center justify-end gap-x-4">
          <div className="flex flex-col items-end">
            <p className="text-xl text-color-text-base">
              {convertMonetaryFormat(Number(stakedBalance), false, 2)}
            </p>
            <p className="text-sm text-color-text-alt">
              {convertMonetaryFormat(Number(stakedBalanceUSD), true, 2)}
            </p>
          </div>
          {isMobile ? (
            <>
              <Button variant="flat" onClick={() => setIsOpenBottomSheet(true)}>
                <MoreIcon />
              </Button>
              <Sheet
                isOpen={isOpenBottomSheet}
                onClose={() => setIsOpenBottomSheet(false)}
                detent="content-height">
                <Sheet.Container>
                  <Sheet.Header />
                  <Sheet.Content>
                    <Sheet.Scroller>
                      <div className="flex flex-col gap-y-3 h-48 items-center justify-start">
                        <div
                          className={listItem.item}
                          onClick={() =>
                            navigateToDepositOrDeposit(
                              `/earn?type=deposit&tokenId=${token.tokenAddress}&marketId=${poolId}`,
                            )
                          }
                          role="presentation">
                          Deposit {BigInt(token.stakedAmount) > BigInt(0) ? 'more' : ''}{' '}
                          {token.tokenSymbol}
                        </div>
                        <div
                          className={listItem.item}
                          onClick={() =>
                            navigateToDepositOrDeposit(
                              `/earn?type=withdraw&marketId=${poolId}&tokenId=${token.tokenAddress}`,
                            )
                          }
                          role="presentation">
                          Withdraw {token.tokenSymbol}
                        </div>
                      </div>
                    </Sheet.Scroller>
                  </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
              </Sheet>
            </>
          ) : (
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
                      `/earn?type=deposit&tokenId=${token.tokenAddress}&marketId=${poolId}`,
                    )
                  }>
                  Deposit {BigInt(token.stakedAmount) > BigInt(0) ? 'more' : ''} {token.tokenSymbol}
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className={clsx(dropdownMenu.item, {
                    'hover:cursor-default': BigInt(token.stakedAmount) <= BigInt(0),
                  })}
                  disabled={BigInt(token.stakedAmount) <= BigInt(0)}
                  onClick={() => {
                    if (BigInt(token.stakedAmount) <= BigInt(0)) return
                    navigateToDepositOrDeposit(
                      `/earn?type=withdraw&marketId=${poolId}&tokenId=${token.tokenAddress}`,
                    )
                  }}>
                  Withdraw {token.tokenSymbol}
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
        </div>
      </td>
    </tr>
  )
}
