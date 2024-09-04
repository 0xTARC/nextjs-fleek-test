import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts'
import { CommissionsData } from '~/utils/collateral'

export const ResponsiveLineChart = ({
  data,
  id,
  height,
}: {
  data: CommissionsData[]
  id: string
  height: number
}) => {
  return (
    <ResponsiveContainer width="100%" height={height} id={id}>
      <LineChart data={data} margin={{ top: 20, bottom: 20 }}>
        <Tooltip />

        {/* USD units*/}
        <Line
          dot={false}
          type="monotone"
          dataKey="commissionsUsd"
          name="USD"
          stroke=""
          className="text-xs stroke-violet-700"
          yAxisId="left"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
