import * as RadixTooltip from '@radix-ui/react-tooltip'
import type { ReactNode } from 'react'

export interface TooltipContents {
  message: ReactNode
  title?: string
}

export const Tooltip = ({
  children,
  contents,
}: {
  children: ReactNode
  contents: TooltipContents
}) => {
  if (contents.message === '' || contents.message == null) {
    return children
  }

  return (
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade rounded-[4px] px-2 py-2 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] bg-light-theme/color-background-float-translucent dark:bg-dark-theme/color-background-float-translucent border border-light-theme/color-border-float dark:border-dark-theme/color-border-float text-light-theme/color-text-base dark:text-dark-theme/color-text-base text-sm max-w-prose z-20"
          style={{
            backdropFilter: 'saturate(115%) blur(6px)',
          }}
          sideOffset={5}>
          {contents.title && <p className="text-md font-bold">{contents.title}</p>}
          <span>{contents.message}</span>
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  )
}
