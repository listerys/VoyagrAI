export function SimulationHeader({ simulation }) {
    // Add confidence level indicator
    const getConfidenceColor = (confidence) => {
      if (confidence >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-100'
      if (confidence >= 60) return 'text-amber-600 bg-amber-50 border-amber-100'
      return 'text-red-600 bg-red-50 border-red-100'
    }
    
    return (
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-surface-900">{simulation.name}</h1>
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium border ${getConfidenceColor(simulation.confidence)}`}>
            <BarChart className="h-4 w-4 mr-1.5" />
            {simulation.confidence}% Confidence
          </span>
        </div>
        
        <div className="flex flex-wrap items-center gap-5 text-surface-600">
          <div className="flex items-center gap-1.5">
            <FileText className="h-4 w-4 text-brand-500" />
            <span className="text-sm">Project: </span>
            <span className="text-sm font-medium text-surface-900">{simulation.project}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-brand-500" />
            <span className="text-sm">Created: </span>
            <span className="text-sm font-medium text-surface-900">{simulation.date}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <BarChart2 className="h-4 w-4 text-brand-500" />
            <span className="text-sm">Scenarios: </span>
            <span className="text-sm font-medium text-surface-900">{simulation.scenarios}</span>
          </div>
        </div>
      </div>
    )
  }