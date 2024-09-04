export function validateNonNegativeDecimalInput(
  newValue: string,
  setState: React.Dispatch<string>,
  maxValue?: string,
): void {
  if (newValue === '') {
    setState('')
    return
  }

  const isValidDecimal = /^\d*\.?\d{0,18}$/.test(newValue) && parseFloat(newValue) >= 0 // limit float inputs to 18 characters total

  if (maxValue && maxValue.length && isValidDecimal) {
    if (Number(newValue) <= Number(maxValue)) {
      setState(newValue)
    }
  } else if (isValidDecimal) {
    // limit input length to 20 digits total, preventing runtime error from value too big for BigInt
    setState(newValue)
  }
}
