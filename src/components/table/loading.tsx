import { FC } from 'react'
import { table } from '../component.styles'
import { Skeleton } from '@radix-ui/themes'

type LoadingRowProps = {
  colCount: number
}

export const LoadingRows: FC<LoadingRowProps> = ({ colCount }) => {
  const skeltonRows = []

  for (let j = 0; j < colCount; j++) {
    skeltonRows.push(
      <td key={j} className={table.td}>
        <Skeleton />
      </td>,
    )
  }
  return (
    <>
      <tr className={table.tr}>{skeltonRows}</tr>
      <tr className={table.tr}>{skeltonRows}</tr>
      <tr className={table.tr}>{skeltonRows}</tr>
    </>
  )
}
