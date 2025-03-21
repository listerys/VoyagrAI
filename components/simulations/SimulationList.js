import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowRight 
} from 'lucide-react'

export default function SimulationList({ simulations = [] }) {
  // If no simulations are provided, we'll use these mock simulations
  const mockSimulations = [
    {
      id: '1',
      name: 'Q4 Timeline Forecast',
      projectName: 'Website Redesign',
      type: 'timeline',
      createdAt: '2 days ago',
      lastRun: '1 day ago',
      status: 'success',
      metrics: { impact: 'Delay Risk: +14 days' }
    },
    {
      id: '2',
      name: 'Budget Optimization',
      projectName: 'Mobile App Development',
      type: 'budget',
      createdAt: '5 days ago',
      lastRun: '2 days ago',
      status: 'warning',
      metrics: { impact: 'Potential Overrun: $12,500' }
    },
    {
      id: '3',
      name: 'Team Allocation Scenario',
      projectName: 'CRM Integration',
      type: 'resource',
      createdAt: '1 week ago',
      lastRun: '3 days ago',
      status: 'success',
      metrics: { impact: 'Efficiency Gain: +15%' }
    }
  ]
  
  // Use provided simulations or fallback to mock data
  const simulationData = simulations.length > 0 ? simulations : mockSimulations
  
  const getSimulationIcon = (type) => {
    switch (type) {
      case 'timeline':
        return <Calendar className="h-5 w-5 text-sky-500" />
      case 'budget':
        return <DollarSign className="h-5 w-5 text-emerald-500" />
      case 'resource':
        return <Users className="h-5 w-5 text-violet-500" />
      case 'risk':
        return <TrendingUp className="h-5 w-5 text-amber-500" />
      default:
        return <Clock className="h-5 w-5 text-brand-500" />
    }
  }
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100'
      case 'warning':
        return 'bg-amber-50 text-amber-700 border-amber-100'
      case 'error':
        return 'bg-red-50 text-red-700 border-red-100'
      default:
        return 'bg-sky-50 text-sky-700 border-sky-100'
    }
  }
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }
  
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="rounded-xl border border-surface-100 bg-white overflow-hidden"
    >
      <ul className="divide-y divide-surface-100">
        {simulationData.map((simulation) => (
          <motion.li 
            key={simulation.id}
            variants={item}
          >
            <Link href={`/simulations/${simulation.id}`} className="block hover:bg-surface-50">
              <div className="px-5 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getSimulationIcon(simulation.type)}
                    <div>
                      <h3 className="text-lg font-medium text-surface-900">{simulation.name}</h3>
                      <p className="text-sm text-surface-600">Project: {simulation.projectName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium border ${getStatusColor(simulation.status)}`}>
                      {simulation.status === 'success' ? 'Success' : 
                       simulation.status === 'warning' ? 'Warning' : 
                       simulation.status === 'error' ? 'Error' : 'Running'}
                    </span>
                    <ArrowRight className="h-4 w-4 text-surface-400" />
                  </div>
                </div>
                
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="flex items-center">
                    <span className="text-xs text-surface-500 mr-1">Created:</span>
                    <span className="text-xs font-medium text-surface-700">{simulation.createdAt}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-surface-500 mr-1">Last run:</span>
                    <span className="text-xs font-medium text-surface-700">{simulation.lastRun}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-surface-500 mr-1">Impact:</span>
                    <span className="text-xs font-medium text-surface-700">
                      {simulation.metrics && simulation.metrics.impact ? simulation.metrics.impact : 'Not available'}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="inline-flex items-center text-xs font-medium text-brand-600">
                    View simulation details
                  </div>
                </div>
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}