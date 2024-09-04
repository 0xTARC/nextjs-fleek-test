import { describe, expect, test } from 'vitest'
import { generateTimestamps } from './timestamp'

describe('generateTimestamps', () => {
  test("Generating 4 daily timestamps starting from today returns 4 timestamps, one day apart, with the last being the input date's timestamp", () => {
    const today = new Date('2023-12-04T12:34:56Z')
    const expectedTimestamps = [1701434096, 1701520496, 1701606896, 1701693296]

    const resultTimestamps = generateTimestamps(today.getTime() / 1000, '1d', 4)

    expect(resultTimestamps).toEqual(expectedTimestamps)
    expect(resultTimestamps[3]).toEqual(Math.floor(today.getTime() / 1000))
  })

  test("Generating 4 hourly timestamps returns 4 timestamps, one hour apart, with the last being the input date's timestamp", () => {
    const today = new Date('2023-12-04T12:34:56Z') // Replace with the actual current date
    const expectedTimestamps = [1701682496, 1701686096, 1701689696, 1701693296]

    const resultTimestamps = generateTimestamps(today.getTime() / 1000, '1h', 4)

    expect(resultTimestamps).toEqual(expectedTimestamps)
  })
})
