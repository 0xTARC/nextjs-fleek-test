import clsx from 'clsx'
import { type FC, useState } from 'react'
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go'
import type { SortableTableProp } from './'
import { Tooltip } from '../tooltip'
import { table } from '../component.styles'

type THeadProps = Omit<SortableTableProp, 'children'>

export const THead: FC<THeadProps> = ({ columns, handleSorting }: THeadProps) => {
  const [sortField, setSortField] = useState('')
  const [order, setOrder] = useState('asc')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSortingChange = (accessor: any, type: string) => {
    const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc'
    setSortField(accessor)
    setOrder(sortOrder)
    handleSorting(accessor, sortOrder, type)
  }
  return (
    <tr className={table.tr}>
      {columns.map(({ label, accessor, sortable, style, type, tooltipContents }) => {
        if (type == null) {
          console.error('Error: type found to be null. Column: ', {
            label,
            accessor,
            sortable,
            style,
            type,
            tooltipContents,
          })
          return null
        }
        return (
          <td
            key={accessor}
            onClick={sortable ? () => handleSortingChange(accessor, type) : () => {}}
            className={clsx(table.th)}>
            <Tooltip contents={tooltipContents ? tooltipContents : { message: null }}>
              <span
                className={clsx('flex flex-row' + (sortable ? 'hover:cursor-pointer' : ''), style)}>
                <span
                  className={clsx('pr-2 whitespace-no-wrap', {
                    'underline decoration-dashed underline-offset-4 cursor-help':
                      tooltipContents != null,
                  })}>
                  {label.toUpperCase()}
                </span>
                {sortable ? (
                  order === 'asc' && sortField === accessor ? (
                    <GoTriangleUp />
                  ) : (
                    <GoTriangleDown />
                  )
                ) : null}
              </span>
            </Tooltip>
          </td>
        )
      })}
    </tr>
  )
}
