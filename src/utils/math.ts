export const mulDiv64 = (num1: bigint, num2: bigint): bigint => (num1 * num2) / BigInt(2 ** 64)
export const mulDiv128 = (num1: bigint, num2: bigint): bigint => (num1 * num2) / BigInt(2 ** 128)
export const mulDiv192 = (num1: bigint, num2: bigint): bigint => (num1 * num2) / BigInt(2 ** 192)
export const mulDiv96 = (num1: bigint, num2: bigint): bigint => (num1 * num2) / BigInt(2 ** 96)
export const decodeSignedIntToBigInt = (bits: number, num: bigint): bigint =>
  BigInt.asIntN(bits, num)
