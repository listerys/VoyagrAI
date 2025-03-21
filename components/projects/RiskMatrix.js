import { AlertTriangle, ArrowUpRight } from 'lucide-react'

export default function RiskMatrix({ projectId }) {
  // This would normally fetch data based on the projectId
  const risks = [
    { id: 1, name: 'Vendor API Integration Delay', impact: 'High', probability: 'Medium', status: 'Active' },
    { id: 2, name: 'Resource Availability', impact: 'Medium', probability: 'High', status: 'Active' },
    { id: 3, name: 'Scope Creep', impact: 'High', probability: 'High', status: 'Mitigated' },
    { id: 4, name: 'Budget Constraints', impact: 'Medium', probability: 'Low', status: 'Monitoring' },
    { id: 5, name: 'Technology Compatibility', impact: 'Low', probability: 'Medium', status: 'Closed' }
  ]

  // Colors for the matrix cells
  const getMatrixCellColor = (impact, probability) => {
    if (impact === 'High' && probability === 'High') return 'bg-red-50 border-red-100'
    if (impact === 'High' && probability === 'Medium') return 'bg-red-50 border-red-100'
    if (impact === 'Medium' && probability === 'High') return 'bg-red-50 border-red-100'
    if (impact === 'High' && probability === 'Low') return 'bg-amber-50 border-amber-100'
    if (impact === 'Medium' && probability === 'Medium') return 'bg-amber-50 border-amber-100'
    if (impact === 'Low' && probability === 'High') return 'bg-amber-50 border-amber-100'
    if (impact === 'Medium' && probability === 'Low') return 'bg-emerald-50 border-emerald-100'
    if (impact === 'Low' && probability === 'Medium') return 'bg-emerald-50 border-emerald-100'
    if (impact === 'Low' && probability === 'Low') return 'bg-emerald-50 border-emerald-100'
    return 'bg-surface-50 border-surface-100'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-red-50 text-red-700 border-red-100'
      case 'Mitigated':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100'
      case 'Monitoring':
        return 'bg-amber-50 text-amber-700 border-amber-100'
      case 'Closed':
        return 'bg-surface-100 text-surface-700 border-surface-200'
      default:
        return 'bg-surface-100 text-surface-700 border-surface-200'
    }
  }

  return (
    <div className="bg-white border border-surface-100 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
          <AlertTriangle className="h-5 w-5 text-red-500" />
        </div>
        <h3 className="text-lg font-medium text-surface-900">Risk Matrix</h3>
      </div>

      {/* The risk matrix */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <div className="w-28 text-right pr-4">
            <span className="text-xs font-medium text-surface-500">IMPACT</span>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-2">
            <div className="text-center">
              <span className="text-xs font-medium text-surface-500">LOW</span>
            </div>
            <div className="text-center">
              <span className="text-xs font-medium text-surface-500">MEDIUM</span>
            </div>
            <div className="text-center">
              <span className="text-xs font-medium text-surface-500">HIGH</span>
            </div>
          </div>
        </div>

        {/* Matrix rows */}
        <div className="flex items-center mb-2">
          <div className="w-28 text-right pr-4">
            <span className="text-xs font-medium text-surface-500">HIGH</span>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-2">
            <div className="h-16 rounded-lg border bg-amber-50 border-amber-100 flex items-center justify-center">
              <span className="text-xs font-medium">Medium Risk</span>
            </div>
            <div className="h-16 rounded-lg border bg-red-50 border-red-100 flex items-center justify-center">
              <span className="text-xs font-medium">High Risk</span>
            </div>
            <div className="h-16 rounded-lg border bg-red-50 border-red-100 flex items-center justify-center">
              <span className="text-xs font-medium">High Risk</span>
            </div>
          </div>
        </div>

        <div className="flex items-center mb-2">
          <div className="w-28 text-right pr-4">
            <span className="text-xs font-medium text-surface-500">MEDIUM</span>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-2">
            <div className="h-16 rounded-lg border bg-emerald-50 border-emerald-100 flex items-center justify-center">
              <span className="text-xs font-medium">Low Risk</span>
            </div>
            <div className="h-16 rounded-lg border bg-amber-50 border-amber-100 flex items-center justify-center">
              <span className="text-xs font-medium">Medium Risk</span>
            </div>
            <div className="h-16 rounded-lg border bg-red-50 border-red-100 flex items-center justify-center">
              <span className="text-xs font-medium">High Risk</span>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-28 text-right pr-4">
            <span className="text-xs font-medium text-surface-500">LOW</span>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-2">
            <div className="h-16 rounded-lg border bg-emerald-50 border-emerald-100 flex items-center justify-center">
              <span className="text-xs font-medium">Low Risk</span>
            </div>
            <div className="h-16 rounded-lg border bg-emerald-50 border-emerald-100 flex items-center justify-center">
              <span className="text-xs font-medium">Low Risk</span>
            </div>
            <div className="h-16 rounded-lg border bg-amber-50 border-amber-100 flex items-center justify-center">
              <span className="text-xs font-medium">Medium Risk</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-2">
          <span className="text-xs font-medium text-surface-500">PROBABILITY</span>
        </div>
      </div>

      {/* List of project risks */}
      <div className="border-t border-surface-100 pt-5">
        <h4 className="text-sm font-medium text-surface-900 mb-3">Project Risks</h4>
        
        <div className="space-y-3">
          {risks.map((risk) => (
            <div 
              key={risk.id} 
              className={`flex items-center justify-between p-3 rounded-lg border ${getMatrixCellColor(risk.impact, risk.probability)}`}
            >
              <div>
                <p className="text-sm font-medium text-surface-900">{risk.name}</p>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-xs text-surface-500">Impact: {risk.impact}</span>
                  <span className="text-xs text-surface-500">Probability: {risk.probability}</span>
                </div>
              </div>
              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border ${getStatusColor(risk.status)}`}>
                {risk.status}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-5 text-center">
          <a href={`/projects/${projectId}/risks`} className="inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700">
            View detailed risk analysis
            <ArrowUpRight className="ml-1.5 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}