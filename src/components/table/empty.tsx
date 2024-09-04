import { FC } from 'react'
import { table } from '../component.styles'
import clsx from 'clsx'
import { Badge } from '@radix-ui/themes'

type EmptyRowProps = {
  message: string
  colCount: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  color: any
}

export const EmptyRow: FC<EmptyRowProps> = ({ message, colCount, color }) => {
  return (
    <tr className={table.tr}>
      <td colSpan={colCount} className={clsx(table.empty)}>
        <Badge size="3" color={color}>
          {message}
        </Badge>
      </td>
    </tr>
  )
}
