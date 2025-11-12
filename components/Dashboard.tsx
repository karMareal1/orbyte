'use client'

import Header from './Header'
import ComplianceStatus from './panels/ComplianceStatus'
import SavingsOpportunities from './panels/SavingsOpportunities'
import RiskAssessment from './panels/RiskAssessment'
import ComplianceTrends from './panels/ComplianceTrends'
import RiskTrends from './panels/RiskTrends'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <ComplianceStatus />
            <SavingsOpportunities />
            <RiskAssessment />
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ComplianceTrends />
            <RiskTrends />
          </div>
        </div>
      </main>
    </div>
  )
}

