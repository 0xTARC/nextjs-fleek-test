import { PoolDayDataFragment, PoolHourDataFragment } from '~/graphql/types.generated'

export interface TimerSeriesData {
  time: number
  value: number
}

export const formatPoolPriceTimeSeriesDailyChart = (
  poolDayData: PoolDayDataFragment[],
): TimerSeriesData[] => {
  return poolDayData.map((dayData) => {
    return {
      time: dayData?.date ?? 0,
      value: Number(dayData?.token1Price ?? 0),
    }
  })
}

const findLastConsecutiveZeroIndex = (arr: PoolHourDataFragment[] | PoolDayDataFragment[]) => {
  const indices = []
  const isConsecutive = true

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].token1Price === '0') {
      if (isConsecutive) {
        indices.push(i)
      }
    } else {
      break
    }
  }

  return indices[indices.length - 1]
}

export const filterLeadingZeroToken1Price = <
  T extends PoolHourDataFragment[] | PoolDayDataFragment[],
>(
  poolHourlyData: T,
) => {
  const idx = findLastConsecutiveZeroIndex(poolHourlyData)
  return poolHourlyData.slice(idx + 1) as T
}

export const forwardFillMissingHourlyData = (poolHourlyData: PoolHourDataFragment[]) => {
  const EPOCH_TIME_HOURLY_SECONDS = 3600
  const result = []
  if (poolHourlyData.length == 0) return []

  for (let i = 0; i < poolHourlyData.length - 1; i++) {
    const currentTime = poolHourlyData[i]
    result.push(currentTime)
    const nextTime = poolHourlyData[i + 1]
    const diff = nextTime.periodStartUnix - currentTime.periodStartUnix
    const hoursAprt = Math.floor(diff / EPOCH_TIME_HOURLY_SECONDS)

    for (let j = 1; j < hoursAprt; j++) {
      const missingHour = {
        ...currentTime,
        periodStartUnix: currentTime.periodStartUnix + EPOCH_TIME_HOURLY_SECONDS * j,
      }
      result.push(missingHour)
    }
  }
  if (!result.includes(poolHourlyData[poolHourlyData.length - 1])) {
    result.push(poolHourlyData[poolHourlyData.length - 1])
  }

  return result
}

export const formatPoolPriceTimeSeriesHourlyChart = (
  poolHourlyData: PoolHourDataFragment[],
): TimerSeriesData[] => {
  if (poolHourlyData.length === 0) {
    return []
  }

  return poolHourlyData.map((hourlyData) => {
    return {
      time: hourlyData?.periodStartUnix ?? 0,
      value: Number(hourlyData?.token1Price ?? 0),
    }
  })
}

export const forwardFillMissingDailyData = (poolDayData: PoolDayDataFragment[]) => {
  const EPOCH_TIME_DAILY_SECONDS = 86400
  const result = []

  if (poolDayData.length == 0) return []

  for (let i = 0; i < poolDayData.length - 1; i++) {
    const currentTime = poolDayData[i]
    result.push(currentTime)

    const nextTime = poolDayData[i + 1]
    const diff = nextTime.date - currentTime.date
    const daysApart = Math.floor(diff / EPOCH_TIME_DAILY_SECONDS)

    // Create and append missing days
    for (let j = 1; j < daysApart; j++) {
      const missingDay = {
        ...currentTime,
        date: currentTime.date + EPOCH_TIME_DAILY_SECONDS * j,
      }
      result.push(missingDay)
    }
  }
  // Add the last element of the original array if it's not already included
  if (!result.includes(poolDayData[poolDayData.length - 1])) {
    result.push(poolDayData[poolDayData.length - 1])
  }

  return result
}

