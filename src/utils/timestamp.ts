/**
 * Generates an array of timestamps, oldest to newest, based on the specified parameters.
 *
 * @param {number} startTimestampSec - The starting timestamp in seconds.
 * @param {'1d' | '1h'} interval - The time interval for each period ('1d' for 1 day, '1h' for 1 hour).
 * @param {number} numberOfPeriods - The number of periods to generate timestamps for.
 * @returns {number[]} An array of timestamps representing each period.
 * @throws {Error} Throws an error if numberOfPeriods is less than 1.
 */
export function generateTimestamps(
  startTimestampSec: number,
  interval: '1d' | '1h',
  numberOfPeriods: number,
): number[] {
  if (numberOfPeriods < 1) {
    throw new Error('numberOfPeriods must be >= 1')
  }

  const timestamps: number[] = []

  const intervalToSeconds = {
    '1d': 86400,
    '1h': 3600,
  }

  for (let i = numberOfPeriods - 1; i >= 0; i--) {
    timestamps.push(Math.floor(startTimestampSec) - i * intervalToSeconds[interval])
  }

  return timestamps
}

export interface BlocksForTimestampsResponse {
  [timestamp: string]: { number: string }[] | []
}

export interface BlocksForPastWeekResponse {
  blocks: { number: string }[]
}

export interface CommissionsTimeSeriesResponse {
  [timestamp: `${string}bundle`]: { ethPriceUSD: string }
  [timestamp: `${string}panopticPoolAccounts`]: any
}

export function getEpochTime7DaysAgo() {
  const currentTimeMilliseconds = Date.now()
  const oneDayMilliseconds = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
  const weekAgoMilliseconds = oneDayMilliseconds * 7
  const pastTimeMilliseconds = currentTimeMilliseconds - weekAgoMilliseconds
  const pastTimeSeconds = Math.floor(pastTimeMilliseconds / 1000)
  return pastTimeSeconds
}
