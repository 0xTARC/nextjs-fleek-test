import { Flex, Skeleton } from '@radix-ui/themes'
import { FC } from 'react'

type DataLabelProps = {
  data: number | string | undefined
  label: string
  isLoading?: boolean | undefined
}

export const DataLabel: FC<DataLabelProps> = ({ data, label, isLoading = false }) => {
  return (
    <Flex direction="column" gap="1">
      <Skeleton loading={isLoading} width={'80px'} height={'10px'}>
        <p className="text-sm text-color-text-base">{label}</p>
      </Skeleton>
      <Skeleton loading={isLoading} width={'80px'} height={'26px'}>
        <p className="text-xl font-semibold">{data}</p>
      </Skeleton>
    </Flex>
  )
}
