import { FC } from 'react'
import { Table } from '../table'
import { Row } from './row'
import { TokenInfo } from '@uniswap/token-lists'
import { LoadingRows } from '../table/loading'
import { EmptyRow } from '../table/empty'
import { useSortableTable } from '../table/useSortableTable'
import { useScreenDetector } from '~/hooks/useScreenDetector'
import { Token } from '~/graphql/types.generated'
import { Address } from 'viem'

export type PortfolioInfo = {
  market: string
  fee: number
  apy: string
  amountUSD: number
  token0WithLogoUri: Pick<TokenInfo, 'symbol' | 'logoURI'>
  token1WithLogoUri: Pick<TokenInfo, 'symbol' | 'logoURI'>
  poolId: string
  collateral0Shares: number
  collateral1Shares: number
  token0USD: number
  token1USD: number
  collateral0Assets: bigint
  collateral1Assets: bigint
  token0: Token
  token1: Token
  collateral0Address: Address
  collateral1Address: Address
  maxWithdrawToken0: bigint
  maxWithdrawToken1: bigint
}

export type PortfolioTableProps = {
  portfolioInfo: PortfolioInfo[]
  isLoading: boolean
}

const formatLargeScreenColumns = () => {
  return [
    {
      label: 'Market',
      accessor: 'market',
      sortable: true,
      style: 'justify-left items-left',
      type: 'string',
    },
    {
      label: 'Fee Tier',
      accessor: 'fee',
      sortable: true,
      style: 'justify-left items-left',
      type: 'number',
    },
    {
      label: 'APY',
      accessor: 'apy',
      sortable: true,
      style: 'justify-left items-left',
      type: 'string',
    },
    {
      label: 'Amount',
      accessor: 'amount',
      sortable: true,
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
      sortable: true,
      style: 'justify-left items-left',
    },
    {
      label: 'Amount',
      accessor: 'amount',
      sortable: true,
      style: 'justify-end items-end',
    },
  ]
}

export const PortfolioTable: FC<PortfolioTableProps> = ({ portfolioInfo, isLoading }) => {
  const { isMobile } = useScreenDetector()
  const columns = isMobile ? formatMobileColumns() : formatLargeScreenColumns()
  const { tableData, handleSorting } = useSortableTable(portfolioInfo, columns)
  const portfolioRows = tableData.length ? (
    tableData.map((portfolioInfo, index) => <Row key={index} portfolioInfo={portfolioInfo} />)
  ) : (
    <EmptyRow message={`Deposit to start earning!`} colCount={columns.length} color={'purple'} />
  )
  return (
    <Table columns={columns} handleSorting={handleSorting}>
      {isLoading ? <LoadingRows colCount={columns.length} /> : portfolioRows}
    </Table>
  )
}
