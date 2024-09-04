export const tokenValueInUSD = (price: number, tokenDerivedEth: number, ethToUsd: number) => {
  return price * tokenDerivedEth * ethToUsd
}

export function convertMonetaryFormat(
  value: number,
  withDollarSign = true,
  priceFixedDigits = 2,
  withPositiveSign = false,
): string {
  let result = ''
  let temp = 0

  if (Math.abs(Number(value)) >= 1.0e12) {
    temp = Math.abs(Number(value)) / 1.0e12
    result = withDollarSign
      ? convertMoneyFormat(temp, priceFixedDigits) + 'T'
      : temp.toFixed(priceFixedDigits) + 'T'
  } else if (Math.abs(Number(value)) >= 1.0e9) {
    temp = Math.abs(Number(value)) / 1.0e9
    result = withDollarSign
      ? convertMoneyFormat(temp, priceFixedDigits) + 'B'
      : temp.toFixed(priceFixedDigits) + 'B'
  } else if (Math.abs(Number(value)) >= 1.0e6) {
    temp = Math.abs(Number(value)) / 1.0e6
    result = withDollarSign
      ? convertMoneyFormat(temp, priceFixedDigits) + 'M'
      : temp.toFixed(priceFixedDigits) + 'M'
  } else if (Math.abs(Number(value)) >= 1.0e3) {
    temp = Math.abs(Number(value)) / 1.0e3
    result = withDollarSign
      ? convertMoneyFormat(temp, priceFixedDigits) + 'K'
      : temp.toFixed(priceFixedDigits) + 'K'
  } else {
    temp = Math.abs(Number(value))
    result = withDollarSign
      ? convertMoneyFormat(temp, priceFixedDigits)
      : temp.toPrecision(1.5 * priceFixedDigits)
    if (Number(result) !== 0 && !withDollarSign) {
      result = Number.parseFloat(result).toString()
    }
  }

  return Number(value) < 0 ? `-${result}` : withPositiveSign ? `+${result}` : result
}

export function convertMoneyFormat(value: number, priceFixedDigits: number): string {
  if (value === 0) return '$0.00'
  const shiftedNumber = value * Math.pow(10, priceFixedDigits)
  const truncatedNumber = Math.floor(shiftedNumber) / Math.pow(10, priceFixedDigits)
  return `$${truncatedNumber.toString()}`
}
