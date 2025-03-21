export function SimulationTimeline({ simulation }) {
    return (
      <div className="bg-white border border-surface-100 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50">
            <Calendar className="h-5 w-5 text-sky-500" />
          </div>
          <h3 className="text-lg font-medium text-surface-900">Timeline Analysis</h3>
        </div>
        
        <div className="relative h-40 mb-8">
          {/* This would be replaced with an actual chart in a real implementation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm text-surface-500">Timeline visualization would be shown here</p>
          </div>
        </div>
        
        <div className="border-t border-surface-100 pt-5">
          <h4 className="text-sm font-medium text-surface-900 mb-3">Key Milestones</h4>
          
          <div className="relative pl-6 border-l border-surface-200">
            <div className="mb-6">
              <div className="absolute -left-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border bg-emerald-50 border-emerald-100 text-emerald-700">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                </div>
              </div>
              
              <div className="ml-4 p-3 rounded-lg border border-surface-100 bg-white">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                  <h4 className="text-sm font-medium text-surface-900">Project Kickoff</h4>
                  <span className="text-xs text-surface-500">Completed</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 text-surface-500 mr-1.5" />
                  <span className="text-xs text-surface-500">July 5, 2023</span>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="absolute -left-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border bg-sky-50 border-sky-100 text-sky-700">
                  <Clock className="h-4 w-4 text-sky-500" />
                </div>
              </div>
              
              <div className="ml-4 p-3 rounded-lg border border-sky-100 bg-sky-50">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                  <h4 className="text-sm font-medium text-surface-900">Development Phase</h4>
                  <span className="text-xs text-surface-500">Current</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 text-surface-500 mr-1.5" />
                  <span className="text-xs text-surface-500">July 20, 2023</span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="absolute -left-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border bg-surface-50 border-surface-100 text-surface-700">
                  <Calendar className="h-4 w-4 text-surface-500" />
                </div>
              </div>
              
              <div className="ml-4 p-3 rounded-lg border border-surface-100 bg-white">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                  <h4 className="text-sm font-medium text-surface-900">Project Delivery</h4>
                  <span className="text-xs text-surface-500">Upcoming</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 text-surface-500 mr-1.5" />
                  <span className="text-xs text-surface-500">August 15, 2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }