import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, ArrowUpRight, Loader2, ShieldCheck, AlertCircle } from 'lucide-react'

export default function RiskSummary() {
  const [isLoading, setIsLoading] = useState(true)
  const [riskData, setRiskData] = useState({
    highPriority: 0,
    mediumPriority: 0,
    lowPriority: 0,
    recentlyMitigated: 0
  })

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setRiskData({
        highPriority: 4,
        mediumPriority: 12,
        lowPriority: 8,
        recentlyMitigated: 5
      })
      setIsLoading(false)
    }, 1200)
  }, [])

  const riskItems = [
    {
      title: "Client requirements change on Project X",
      priority: "high",
      impact: "Timeline",
      daysActive: 3,
    },
    {
      title: "Resource allocation for Team Alpha",
      priority: "medium",
      impact: "Budget",
      daysActive: 7,
    },
    {
      title: "API integration delay with vendor",
      priority: "high",
      impact: "Timeline",
      daysActive: 5,
    }
  ]
  
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-100'
      case 'medium':
        return 'text-amber-600 bg-amber-50 border-amber-100'
      case 'low':
        return 'text-emerald-600 bg-emerald-50 border-emerald-100'
      default:
        return 'text-surface-600 bg-surface-50 border-surface-100'
    }
  }
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="h-full bg-white border border-surface-100 rounded-xl overflow-hidden flex flex-col">
      <div className="border-b border-surface-100 px-5 py-4 flex items-center justify-between">
        <h3 className="text-lg font-medium text-surface-900">Risk Summary</h3>
        
        {!isLoading && (
          <div className="flex items-center text-sm">
            <span className="text-surface-500 mr-1">Total:</span>
            <span className="font-medium text-surface-900">
              {riskData.highPriority + riskData.mediumPriority + riskData.lowPriority}
            </span>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="flex flex-col items-center">
            <Loader2 className="h-6 w-6 text-brand-500 animate-spin" />
            <p className="mt-3 text-sm text-surface-500">Loading risk data...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 p-5">
            <div className="bg-red-50 rounded-lg p-3 border border-red-100">
              <div className="flex justify-between items-start">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span className="text-xs font-medium text-red-600">High</span>
              </div>
              <p className="mt-3 text-2xl font-semibold text-surface-900">{riskData.highPriority}</p>
            </div>
            
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
              <div className="flex justify-between items-start">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <span className="text-xs font-medium text-amber-600">Medium</span>
              </div>
              <p className="mt-3 text-2xl font-semibold text-surface-900">{riskData.mediumPriority}</p>
            </div>
            
            <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
              <div className="flex justify-between items-start">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                <span className="text-xs font-medium text-emerald-600">Low</span>
              </div>
              <p className="mt-3 text-2xl font-semibold text-surface-900">{riskData.lowPriority}</p>
            </div>
            
            <div className="bg-sky-50 rounded-lg p-3 border border-sky-100">
              <div className="flex justify-between items-start">
                <ShieldCheck className="h-5 w-5 text-sky-500" />
                <span className="text-xs font-medium text-sky-600">Mitigated</span>
              </div>
              <p className="mt-3 text-2xl font-semibold text-surface-900">{riskData.recentlyMitigated}</p>
            </div>
          </div>
          
          <div className="px-5 pb-3">
            <h4 className="text-sm font-medium text-surface-900 mb-2">High Priority Risks</h4>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="px-5 pb-5 space-y-3 flex-1 overflow-auto"
          >
            {riskItems.filter(risk => risk.priority === "high").map((risk, index) => (
              <motion.div 
                key={index}
                variants={item}
                className="flex items-start p-3 rounded-lg border border-surface-100 hover:border-surface-200 transition-colors duration-200"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-medium text-surface-900">{risk.title}</h5>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getPriorityColor(risk.priority)}`}>
                      {risk.priority}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-3">
                    <span className="text-xs text-surface-500">Impact: {risk.impact}</span>
                    <span className="text-xs text-surface-500">{risk.daysActive} days active</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}

      <div className="border-t border-surface-100 px-5 py-4 mt-auto">
        <a href="/risks" className="inline-flex items-center justify-center w-full text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors duration-200 py-1.5 rounded-lg hover:bg-brand-50">
          View all risks
          <ArrowUpRight className="ml-1.5 h-4 w-4" />
        </a>
      </div>
    </div>
  )
}