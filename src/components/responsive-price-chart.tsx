/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts'
import { TimerSeriesData } from '~/utils/chartdata'

export enum ChartType {
  DAILY = 'DAILY',
  HOURLY = 'HOURLY',
}

export function convertUnixEpochTimeToDateShortFormat(time: string, type: ChartType) {
  const date = new Date(parseInt(time) * 1000)
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  let formattedDate
  if (type === ChartType.HOURLY) {
    formattedDate = `${
      months[date.getUTCMonth()]
    } ${date.getUTCDate()} ${date.getUTCFullYear()} ${date.getUTCHours()}:${date
      .getUTCMinutes()
      .toString()
      .padStart(2, '0')}`
  } else if (type === ChartType.DAILY) {
    formattedDate = `${months[date.getUTCMonth()]} ${date.getUTCDate()} ${date.getUTCFullYear()}`
  }
  return formattedDate
}

const CustomTooltip = ({
  active,
  payload,
  setPrice,
  chartType,
}: {
  active: boolean
  payload: any
  setPrice: React.Dispatch<string>
  chartType: ChartType
}) => {
  if (active && payload && payload.length) {
    setPrice(payload[0].value)
    return (
      <div className="flex flex-row items-center gap-x-3 bg-[#FFAC6E] text-white fill-[#FFAC6E] px-2">
        <p className="label">{`${convertUnixEpochTimeToDateShortFormat(payload[0]['payload']['time'], chartType)}`}</p>
      </div>
    )
  }

  return null
}

export const ResponsivePriceChart = ({
  data,
  id,
  height,
  setPrice,
  chartType,
}: {
  data: TimerSeriesData[]
  id: string
  height: number
  setPrice: React.Dispatch<string>
  chartType: ChartType
}) => {
  return (
    <ResponsiveContainer width="100%" height={height} id={id}>
      <LineChart data={data} margin={{ top: 20, bottom: 20 }}>
        <Tooltip
          content={
            <CustomTooltip active={false} payload={[]} setPrice={setPrice} chartType={chartType} />
          }
          cursor={{ stroke: '#FFAC6E' }}
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="value"
          className="text-xs stroke-violet-700"
          yAxisId="left"
          activeDot={{ className: 'fill-[#FFAC6E]', r: 6 }}
          fill="#FFAC6E"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
