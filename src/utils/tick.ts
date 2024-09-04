export const asTicks = (
  strike: bigint,
  width: bigint,
  poolTickSpacing: bigint,
): Record<string, bigint> => {
  const oneSidedRange = (width * poolTickSpacing) / BigInt(2)
  return {
    legLowerTick: BigInt(strike - oneSidedRange),
    legUpperTick: BigInt(strike + oneSidedRange),
  }
}
