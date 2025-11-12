'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { month: 'Jan', Compliance: 32, Emissions: 35 },
  { month: 'Feb', Compliance: 38, Emissions: 32 },
  { month: 'Mar', Compliance: 35, Emissions: 38 },
  { month: 'Apr', Compliance: 40, Emissions: 36 },
  { month: 'May', Compliance: 36, Emissions: 39 },
  { month: 'Jun', Compliance: 42, Emissions: 38 },
]

export default function ComplianceTrends() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">
        Compliance & Emissions Trends
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[20, 45]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Compliance"
            stroke="#3b82f6"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="Emissions"
            stroke="#4ade80"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

