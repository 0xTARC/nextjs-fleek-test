export function shortenMantissaIfNecessary(
  value: number | string,
  accuracy?: number | undefined,
): string {
  let valueToFormat: string | number = value.toString()
  const subscriptNumbers: Record<number, string> = {
    3: '₃',
    4: '₄',
    5: '₅',
    6: '₆',
    7: '₇',
    8: '₈',
    9: '₉',
    10: '₁₀',
    11: '₁₁',
    12: '₁₂',
    13: '₁₃',
    14: '₁₄',
    15: '₁₅',
    16: '₁₆',
    17: '₁₇',
    18: '₁₈',
    19: '₁₉',
    20: '₂₀',
    21: '₂₁',
    22: '₂₂',
    23: '₂₃',
    24: '₂₄',
    25: '₂₅',
    26: '₂₆',
    27: '₂₇',
    28: '₂₈',
    29: '₂₉',
    30: '₃₀',
    31: '₃₁',
    32: '₃₂',
    33: '₃₃',
    34: '₃₄',
    35: '₃₅',
    36: '₃₆',
    37: '₃₇',
    38: '₃₈',
    39: '₃₉',
    40: '₄₀',
    41: '₄₁',
    42: '₄₂',
    43: '₄₃',
    44: '₄₄',
    45: '₄₅',
    46: '₄₆',
    47: '₄₇',
    48: '₄₈',
    49: '₄₉',
    50: '₅₀',
  }

  // value is in exponential format revert back to full notation for subscript application
  if (valueToFormat.includes('e')) {
    let addNegation
    if (valueToFormat[0] == '-') {
      addNegation = true
      valueToFormat = valueToFormat.substring(1)
    }

    const [coefficient, exponent] = valueToFormat.split('e-')
    const coefficientValue = parseFloat(coefficient).toString().replace('.', '')

    valueToFormat = '0.' + '0'.repeat(Number(exponent) - 1) + coefficientValue

    if (addNegation) {
      valueToFormat = '-' + valueToFormat
    }
  }

  // Split the number into whole and fractional parts
  const fixed = accuracy ?? 4
  const [whole, mantissa] = valueToFormat.toString().split('.')
  const leadingZeros = ((mantissa && mantissa.match(/^0*/)) || [''])[0]

  if (mantissa === undefined || leadingZeros.length <= fixed) {
    // strip trailing zeroes due to accuracy addition
    return Number(valueToFormat)
      .toFixed(fixed)
      .replace(/(\.0*|0+)$/, '')
  }

  return `${whole}.0${subscriptNumbers[leadingZeros.length - 1]}${mantissa.substring(
    leadingZeros.length,
    leadingZeros.length + fixed,
  )}`
}
