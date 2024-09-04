/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useSortableTable(data: any[], columns: any) {
  const [tableData, setTableData] = useState<any[]>([])

  useMemo(() => {
    setTableData(data)
  }, [data])

  const handleSorting = (sortField: string, sortOrder: any, type?: string) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        if (a[sortField] === undefined || a[sortField] === '-') return 1
        if (b[sortField] === undefined || b[sortField] === '-') return -1
        if (
          (a[sortField] === undefined || a[sortField] === '-') &&
          (b[sortField] === undefined || b[sortField] === '-')
        )
          return 0

        if (type === 'number') {
          const valA = revertFormattedNumber(a[sortField])
          const valB = revertFormattedNumber(b[sortField])
          if (sortOrder === 'asc') {
            return valA - valB
          } else {
            return valB - valA
          }
        } else if (type === 'string') {
          return (
            (a[sortField] as string).localeCompare(b[sortField], 'en', {
              numeric: true,
            }) * (sortOrder === 'asc' ? 1 : -1)
          )
        } else {
          // boolean
          if (sortOrder === 'asc') {
            return Number(a[sortField]) - Number(b[sortField])
          } else {
            return Number(b[sortField]) - Number(a[sortField])
          }
        }
      })
      setTableData(sorted)
    }
  }

  return { tableData, handleSorting }
}

const revertFormattedNumber = (num: string | number): number => {
  if (typeof num === 'number') return num

  let val
  if (num.includes('K')) {
    val = Number(num.slice(0, -1)) * 1000
  } else if (num.includes('M')) {
    val = Number(num.slice(0, -1)) * 1000000
  } else if (num.includes('B')) {
    val = Number(num.slice(0, -1)) * 1000000000
  } else {
    val = Number(num)
  }
  return val
}
