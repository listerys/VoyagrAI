export function SimulationActions({ simulation }) {
    return (
      <div className="bg-white border border-surface-100 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
            <Lightbulb className="h-5 w-5 text-emerald-500" />
          </div>
          <h3 className="text-lg font-medium text-surface-900">AI Recommendations</h3>
        </div>
        
        <div className="space-y-4">
          <div className="border border-surface-100 rounded-lg p-4 hover:border-brand-200 transition-colors duration-200 cursor-pointer">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-brand-500" />
              <h4 className="text-sm font-medium text-surface-900">Optimize Timeline</h4>
            </div>
            <p className="text-xs text-surface-600 mb-2">Adjust resource allocation to prevent potential bottlenecks in week 4.</p>
            <button className="text-xs font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1">
              Apply recommendation
              <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          
          <div className="border border-surface-100 rounded-lg p-4 hover:border-brand-200 transition-colors duration-200 cursor-pointer">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <h4 className="text-sm font-medium text-surface-900">Mitigate Top Risk</h4>
            </div>
            <p className="text-xs text-surface-600 mb-2">Schedule additional review sessions for the vendor API integration.</p>
            <button className="text-xs font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1">
              Apply recommendation
              <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          
          <div className="border border-surface-100 rounded-lg p-4 hover:border-brand-200 transition-colors duration-200 cursor-pointer">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-sky-500" />
              <h4 className="text-sm font-medium text-surface-900">Communication Strategy</h4>
            </div>
            <p className="text-xs text-surface-600 mb-2">Increase client communication frequency to align expectations.</p>
            <button className="text-xs font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1">
              Apply recommendation
              <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
        </div>
        
        <button className="mt-5 text-center w-full text-sm font-medium text-brand-600 hover:text-brand-700 py-2 border border-transparent hover:border-brand-100 hover:bg-brand-50 rounded-lg transition-colors duration-200">
          View all recommendations
        </button>
      </div>
    )
  }