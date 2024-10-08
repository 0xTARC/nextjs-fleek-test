import clsx from 'clsx'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'flat' | 'error' | 'default' | 'border'
  size?: 'lg'
  rounded?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant = 'primary', className = '', disabled, size, rounded = false, ...rest },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        aria-disabled={disabled}
        disabled={disabled}
        {...rest}
        className={clsx(
          'font-semibold text-sm leading-[17px] px-3 py-[9.5px]  aria-disabled:opacity-50 aria-disabled:cursor-not-allowed',
          {
            'bg-color-primary text-white rounded-lg': variant === 'primary',
          },
          {
            ' bg-red-300 text-white rounded-lg': variant === 'error',
          },
          {
            'bg-color-secondary text-color-primary rounded-lg': variant === 'secondary',
          },
          {
            'bg-gray-200 text-color-text-base': variant === 'default',
          },
          {
            'p-2 bg-transparent !border-none hover:bg-gray-50': variant === 'flat',
          },
          {
            '!p-4 !rounded-xl !text-lg': size === 'lg',
          },
          {
            '!w-14 !h-14 !rounded-full !px-0': rounded,
          },
          {
            '!border !border-gray-200': 'border',
          },
          className,
        )}>
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
