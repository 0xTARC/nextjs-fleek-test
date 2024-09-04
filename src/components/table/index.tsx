import type { FC, ReactNode } from 'react'
import { THead } from './thead'
import { TooltipContents } from '../tooltip'
import { table } from '../component.styles'

type Col = {
  label: string
  accessor: string
  sortable: boolean
  style: string
  type?: string
  tooltipContents?: TooltipContents
}

export interface SortableTableProp {
  columns: Col[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSorting: any
  children: ReactNode
  colgroup?: ReactNode
}

export const Table: FC<SortableTableProp> = ({
  columns,
  handleSorting,
  children,
  colgroup,
}: SortableTableProp) => {
  return (
    <div className={table.wrapper}>
      <table className={table.table}>
        {colgroup ? colgroup : null}
        <THead columns={columns} handleSorting={handleSorting} />
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}
