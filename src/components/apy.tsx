import clsx from 'clsx'

export const Apy = ({
  apy,
  className,
  showLabel = false,
}: {
  apy: number
  className?: string
  showLabel?: boolean
}) => {
  return (
    <span
      className={clsx(
        'text-xl font-semibold flex flex-row items-center gap-x-2',
        { 'text-green-500': apy >= 0 },
        { 'text-red-500': apy < 0 },
        className,
      )}>
      {apy.toFixed(2)}% {showLabel ? <p>APY</p> : null}
    </span>
  )
}
