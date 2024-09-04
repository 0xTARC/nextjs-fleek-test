import clsx from 'clsx'
import { type FC } from 'react'
import { RxChevronDown } from 'react-icons/rx'

interface DropDownArrowProps {
  isDropdown: boolean
  iconSize?: number
  arrowColor: 'white' | 'gray'
}

export const DropDownArrow: FC<DropDownArrowProps> = ({
  isDropdown,
  iconSize = 20,
  arrowColor,
}) => {
  return (
    <span
      className={clsx({
        'transition-transform duration-160 rotate-180': isDropdown,
        'transition-transform duration-160 rotate--180': !isDropdown,
      })}>
      <RxChevronDown size={iconSize} color={arrowColor} />
    </span>
  )
}
