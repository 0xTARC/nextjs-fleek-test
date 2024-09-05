import { Table } from '../table'
import { LoadingRows } from '../table/loading'
import { FC } from 'react'
import { TokenStakedInfo } from '~/utils/userAccount'
import { Row } from './row'
import { Address } from 'viem'
import { useSortableTable } from '../table/useSortableTable'

type TokenStakedTableProps = {
  tokens: TokenStakedInfo[]
  panopticPoolId: Address
  ethPriceUSD: number
  isLoading: boolean
}

const tableColumns = () => {
  return [
    {
      label: 'Token',
      accessor: 'token',
      sortable: false,
      style: 'justify-left items-left',
    },
    {
      label: 'Amount',
      accessor: 'amount',
      sortable: false,
      style: 'justify-end items-end',
    },
  ]
}

export const TokenStakedTable: FC<TokenStakedTableProps> = ({
  tokens,
  isLoading,
  panopticPoolId,
  ethPriceUSD,
}) => {
  const columns = tableColumns()
  const { tableData, handleSorting } = useSortableTable(tokens, columns)
  const takeTokenRow = tableData.map((token, index) => (
    <Row key={index} token={token} poolId={panopticPoolId} ethPriceUSD={ethPriceUSD} />
  ))
  return (
    <Table columns={columns} handleSorting={handleSorting}>
      {isLoading ? <LoadingRows colCount={2} /> : takeTokenRow}
    </Table>
  )
}
