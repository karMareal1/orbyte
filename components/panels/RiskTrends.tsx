'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { period: 'Week 1', Risk: 32 },
  { period: 'Week 2', Risk: 35 },
  { period: 'Week 3', Risk: 30 },
  { period: 'Week 4', Risk: 38 },
  { period: 'Week 5', Risk: 36 },
  { period: 'Week 6', Risk: 38 },
]

export default function RiskTrends() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Risk Assessment</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis domain={[15, 50]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="Risk"
            stroke="#4ade80"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

