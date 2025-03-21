export function SimulationResults({ simulation }) {
    return (
      <div className="bg-white border border-surface-100 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50">
            <BarChart2 className="h-5 w-5 text-brand-500" />
          </div>
          <h3 className="text-lg font-medium text-surface-900">Simulation Results</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <div className="border border-surface-100 rounded-lg p-4">
            <p className="text-sm text-surface-500 mb-1">Projected Completion</p>
            <p className="text-xl font-semibold text-surface-900">{simulation.timeline.projected}</p>
          </div>
          
          <div className="border border-surface-100 rounded-lg p-4">
            <p className="text-sm text-surface-500 mb-1">Optimistic</p>
            <p className="text-xl font-semibold text-emerald-600">{simulation.timeline.optimistic}</p>
          </div>
          
          <div className="border border-surface-100 rounded-lg p-4">
            <p className="text-sm text-surface-500 mb-1">Pessimistic</p>
            <p className="text-xl font-semibold text-amber-600">{simulation.timeline.pessimistic}</p>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-surface-700">Confidence Level</span>
            <span className="text-sm font-medium text-surface-700">{simulation.confidence}%</span>
          </div>
          <div className="relative h-2.5 w-full rounded-full bg-surface-100">
            <div 
              className="absolute inset-0 h-2.5 rounded-full bg-brand-500" 
              style={{ width: `${simulation.confidence}%` }}
            />
          </div>
        </div>
        
        <div className="border-t border-surface-100 pt-5">
          <h4 className="text-sm font-medium text-surface-900 mb-3">Key Insights</h4>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 mt-0.5">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </span>
              <div>
                <p className="text-sm font-medium text-surface-900">85% chance of meeting client expectations</p>
                <p className="text-xs text-surface-500 mt-0.5">Based on historical project data and current progress</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-50 mt-0.5">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              </span>
              <div>
                <p className="text-sm font-medium text-surface-900">Resource constraints may impact timeline</p>
                <p className="text-xs text-surface-500 mt-0.5">Consider adding 1-2 additional developers in weeks 4-6</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-50 mt-0.5">
                <DollarSign className="h-4 w-4 text-sky-500" />
              </span>
              <div>
                <p className="text-sm font-medium text-surface-900">Budget projections on target</p>
                <p className="text-xs text-surface-500 mt-0.5">Current spending aligns with forecasted budget</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }