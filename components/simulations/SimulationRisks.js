export function SimulationRisks({ simulation }) {
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
    
    return (
      <div className="bg-white border border-surface-100 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <h3 className="text-lg font-medium text-surface-900">Risk Analysis</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border border-surface-100 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-sm font-medium text-surface-900 mb-1">Risk Matrix</h4>
                <p className="text-xs text-surface-500">Impact vs. Probability</p>
              </div>
              <button className="text-brand-600 hover:text-brand-700">
                <HelpCircle className="h-4 w-4" />
              </button>
            </div>
            
            <div className="h-48 mt-3 flex items-center justify-center">
              <p className="text-sm text-surface-500">Risk matrix visualization would be shown here</p>
            </div>
          </div>
          
          <div className="border border-surface-100 rounded-lg p-4">
            <h4 className="text-sm font-medium text-surface-900 mb-3">Top Risks</h4>
            
            <div className="space-y-3">
              {simulation.risks.map((risk, index) => (
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
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-surface-100 pt-5">
          <h4 className="text-sm font-medium text-surface-900 mb-3">Risk Mitigation Actions</h4>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 mt-0.5">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
              </span>
              <div>
                <p className="text-sm font-medium text-surface-900">Implement resource backup plan</p>
                <p className="text-xs text-surface-500 mt-0.5">Identify alternative resources that can join in Week 3 if needed</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-50 mt-0.5">
                <Clock className="h-4 w-4 text-amber-500" />
              </span>
              <div>
                <p className="text-sm font-medium text-surface-900">Add buffer to API integration timeline</p>
                <p className="text-xs text-surface-500 mt-0.5">Establish weekly checkpoints with vendor to monitor progress</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } 