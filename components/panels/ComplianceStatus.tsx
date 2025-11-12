'use client'

export default function ComplianceStatus() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Compliance Status</h2>
      
      <div className="mb-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded font-semibold">
          COMPLIANT
        </button>
      </div>

      <div className="flex items-start gap-4">
        <div className="grid grid-cols-5 gap-1">
          {/* Top row - 5 green squares */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-8 h-8 bg-green-500 rounded"></div>
          ))}
          {/* Bottom rows - 10 orange squares */}
          {[...Array(10)].map((_, i) => (
            <div key={i + 5} className="w-8 h-8 bg-orange-500 rounded"></div>
          ))}
        </div>

        <div className="flex-1">
          <div className="mb-2">
            <p className="text-sm font-semibold text-gray-700">
              32% REGIONAL EMISSIONS
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">
              4.5 t EMISSIONS LAST 30 DAYS
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

