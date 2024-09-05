import { FC } from 'react'
import { Table } from '../table'
import { TokenInfo } from '@uniswap/token-lists'
import { LoadingRows } from '../table/loading'
import { useSortableTable } from '../table/useSortableTable'
import { useScreenDetector } from '~/hooks/useScreenDetector'
import { Row } from './row'
import { Button } from '@radix-ui/themes'
import { sortTokenAddressPair } from '~/utils/tokens'
import { getAddress, zeroAddress } from 'viem'
import Link from 'next/link'

export type MarketTableInfo = {
  market: string
  fee: number
  apy: string
  token0WithLogoUri: Pick<TokenInfo, 'address' | 'symbol' | 'logoURI'>
  token1WithLogoUri: Pick<TokenInfo, 'address' | 'symbol' | 'logoURI'>
  poolId: string
  txCount: number
  tvl: number
  weeklyVol: number
  hasDepositedToPool: boolean
  hasDepositedToken0: boolean
  hasDepositedToken1: boolean
  hasPanopticPool: boolean
}

export type MarketTableProps = {
  markets: MarketTableInfo[]
  assetTokenAddress?: string
  quoteTokenAddress?: string
  fee?: number
  isLoading: boolean
}

const formatLargeScreenColumns = () => {
  return [
    {
      label: 'Market',
      accessor: 'market',
      sortable: false,
      style: 'justify-left items-left',
      type: 'string',
    },
    {
      label: 'TVL',
      accessor: 'tvl',
      sortable: false,
      style: 'justify-left items-left',
      type: 'string',
    },
    {
      label: '7 Days Volume',
      accessor: 'weeklyVol',
      sortable: false,
      style: 'justify-end items-end',
      type: 'string',
    },
    {
      label: 'Apy',
      accessor: 'apy',
      sortable: false,
      style: 'justify-end items-end',
      type: 'string',
    },
  ]
}

const formatMobileColumns = () => {
  return [
    {
      label: 'Market',
      accessor: 'market',
      sortable: false,
      style: 'justify-left items-left',
    },
    {
      label: 'apy',
      accessor: 'apy',
      sortable: false,
      style: 'justify-end items-end',
    },
  ]
}

export const MarketTable: FC<MarketTableProps> = ({
  markets,
  assetTokenAddress,
  quoteTokenAddress,
  fee,
  isLoading,
}) => {
  const { isMobile } = useScreenDetector()
  const columns = isMobile ? formatMobileColumns() : formatLargeScreenColumns()
  const { tableData, handleSorting } = useSortableTable(markets, columns)

  const [token0Address, token1Address] = sortTokenAddressPair(
    getAddress(assetTokenAddress ?? zeroAddress),
    getAddress(quoteTokenAddress ?? zeroAddress),
  )

  const portfolioRows = tableData.length ? (
    tableData.map((market, index) => <Row key={index} market={market} />)
  ) : (
    <tr>
      <td align="center" colSpan={5}>
        {fee != null ? (
          <div className="mt-4">
            <Button variant="soft" color="purple">
              <Link href={`/new-market?token0=${token0Address}&token1=${token1Address}&fee=${fee}`}>
                Create Market
              </Link>
            </Button>
          </div>
        ) : (
          'Select a fee tier to create a new market.'
        )}
      </td>
    </tr>
  )
  return (
    <Table columns={columns} handleSorting={handleSorting}>
      {isLoading ? <LoadingRows colCount={columns.length} /> : portfolioRows}
    </Table>
  )
}
