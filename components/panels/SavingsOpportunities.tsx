'use client'

export default function SavingsOpportunities() {
  const opportunities = [
    { text: 'Shutdown unused instances', percentage: '1%' },
    { text: 'Enable encryption on storage', percentage: '8%' },
    { text: 'Migrate to greener region', percentage: '7%' },
  ]

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Savings Opportunities</h2>
      <ul className="space-y-2">
        {opportunities.map((opp, index) => (
          <li key={index} className="flex items-center">
            <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
            <span className="text-sm text-gray-700">
              {opp.text} {opp.percentage}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

