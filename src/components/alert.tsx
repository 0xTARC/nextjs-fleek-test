import { Callout } from '@radix-ui/themes'
import { FC } from 'react'
import { GoInfo } from 'react-icons/go'
type CalloutProps = {
  text: string
}

export const Alert: FC<CalloutProps> = ({ text }) => {
  return (
    <Callout.Root>
      <Callout.Icon>
        <GoInfo />
      </Callout.Icon>
      <Callout.Text>{text}</Callout.Text>
    </Callout.Root>
  )
}
