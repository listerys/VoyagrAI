import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Users, 
  DollarSign,
  BarChart2,
  Play,
  Download,
  RotateCw,
  Share2
} from 'lucide-react'

export default function SimulationDetail() {
  const router = useRouter()
  const { id } = router.query
  const [simulation, setSimulation] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // Simulate loading data
    if (id) {
      setTimeout(() => {
        // Mock data for the simulation
        setSimulation({
          id: id,
          name: 'Q4 Timeline Forecast',
          projectName: 'Website Redesign',
          projectId: 'proj-123',
          type: 'timeline',
          createdAt: '2 days ago',
          lastRun: '1 day ago',
          status: 'success',
          description: 'This simulation analyzes the impact of current progress on the Q4 timeline and predicts potential delays.',
          metrics: {
            impact: 'Delay Risk: +14 days',
            confidence: '85%',
            keyFactors: [
              { name: 'Resource Availability', impact: 'High', value: '-10%' },
              { name: 'Scope Changes', impact: 'Medium', value: '+15%' },
              { name: 'Vendor Delays', impact: 'High', value: '+8 days' }
            ]
          },
          charts: {
            timeline: {
              original: { startDate: 'Sept 1, 2023', endDate: 'Dec 1, 2023' },
              predicted: { startDate: 'Sept 1, 2023', endDate: 'Dec 15, 2023' }
            }
          },
          recommendations: [
            'Increase development resources by 2 FTEs',
            'Reduce scope of feature X to meet deadlines',
            'Start vendor coordination 2 weeks earlier'
          ]
        })
        setIsLoading(false)
      }, 800)
    }
  }, [id])

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

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High':
        return 'text-red-600'
      case 'Medium':
        return 'text-amber-600'
      case 'Low':
        return 'text-emerald-600'
      default:
        return 'text-surface-600'
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'scenarios', label: 'Scenarios', icon: TrendingUp },
    { id: 'history', label: 'History', icon: Clock }
  ]

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center py-12">
        <div className="flex flex-col items-center">
          <div className="relative h-10 w-10">
            <div className="absolute inset-0 rounded-full border-2 border-surface-200 opacity-75"></div>
            <div className="absolute inset-0 rounded-full border-t-2 border-brand-500 animate-spin"></div>
          </div>
          <p className="mt-4 text-surface-600">Loading simulation details...</p>
        </div>
      </div>
    )
  }

  if (!simulation) {
    return (
      <div className="py-8">
        <div className="mb-5">
          <Link href="/simulations" className="flex items-center gap-1.5 text-surface-600 hover:text-surface-900">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">Back to Simulations</span>
          </Link>
        </div>
        <div className="rounded-xl border border-surface-100 bg-white p-12 text-center">
          <p className="text-surface-600">Simulation not found</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{simulation.name} - ProjectSyncAI</title>
      </Head>

      <div className="py-8">
        <div className="mb-5">
          <Link href="/simulations" className="flex items-center gap-1.5 text-surface-600 hover:text-surface-900">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">Back to Simulations</span>
          </Link>
        </div>

        {/* Simulation header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              {getSimulationIcon(simulation.type)}
              <h1 className="text-2xl font-bold text-surface-900">{simulation.name}</h1>
            </div>
            <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium border ${getStatusColor(simulation.status)}`}>
              {simulation.status === 'success' ? 'Success' : 
               simulation.status === 'warning' ? 'Warning' : 
               simulation.status === 'error' ? 'Error' : 'Running'}
            </span>
          </div>
          
          <div className="mt-3 space-y-1">
            <p className="text-surface-600">
              Project: <Link href={`/projects/${simulation.projectId}`} className="text-brand-600 hover:text-brand-700">{simulation.projectName}</Link>
            </p>
            <p className="text-surface-600">
              Last run: <span className="text-surface-700">{simulation.lastRun}</span> • 
              Created: <span className="text-surface-700">{simulation.createdAt}</span>
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button className="sira-btn-solid-brand rounded-lg flex items-center gap-2 border-0">
            <Play className="h-4 w-4" />
            Run Simulation
          </button>
          <button className="sira-btn-outline-surface rounded-lg flex items-center gap-2">
            <RotateCw className="h-4 w-4" />
            Update Parameters
          </button>
          <button className="sira-btn-outline-surface rounded-lg flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Results
          </button>
          <button className="sira-btn-outline-surface rounded-lg flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-surface-100 mb-6">
          <div className="flex overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${
                    isActive
                      ? 'border-brand-500 text-brand-600'
                      : 'border-transparent text-surface-600 hover:text-surface-900 hover:border-surface-200'
                  }`}
                >
                  <tab.icon className={`h-4 w-4 ${isActive ? 'text-brand-500' : 'text-surface-500'}`} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* Main simulation results */}
              <div className="bg-white border border-surface-100 rounded-xl p-6 mb-6">
                <h2 className="text-lg font-medium text-surface-900 mb-4">Simulation Results</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-surface-700 mb-2">Description</h3>
                    <p className="text-surface-600">{simulation.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-surface-700 mb-3">Key Metrics</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border border-surface-100 rounded-lg p-4">
                        <p className="text-sm text-surface-500 mb-1">Predicted Impact</p>
                        <p className="text-xl font-semibold text-surface-900">{simulation.metrics.impact}</p>
                      </div>
                      <div className="border border-surface-100 rounded-lg p-4">
                        <p className="text-sm text-surface-500 mb-1">Confidence Level</p>
                        <p className="text-xl font-semibold text-surface-900">{simulation.metrics.confidence}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-surface-700 mb-3">Timeline Comparison</h3>
                    <div className="border border-surface-100 rounded-lg p-4 space-y-4">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-xs text-surface-500">Original Timeline</p>
                          <p className="text-sm font-medium text-surface-900">
                            {simulation.charts.timeline.original.startDate} - {simulation.charts.timeline.original.endDate}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-surface-500">Predicted Timeline</p>
                          <p className="text-sm font-medium text-red-600">
                            {simulation.charts.timeline.predicted.startDate} - {simulation.charts.timeline.predicted.endDate}
                          </p>
                        </div>
                      </div>
                      
                      {/* Simple timeline visualization */}
                      <div className="relative pt-5">
                        <div className="h-2 w-full bg-surface-100 rounded-full mb-5 relative">
                          <div className="absolute inset-0 h-2 w-3/4 bg-brand-500 rounded-full"></div>
                          <div className="absolute inset-0 h-2 w-5/6 bg-red-500 rounded-full opacity-70"></div>
                        </div>
                        <div className="flex justify-between text-xs text-surface-500">
                          <span>{simulation.charts.timeline.original.startDate}</span>
                          <span>{simulation.charts.timeline.predicted.endDate}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-4 text-xs">
                        <div className="flex items-center">
                          <span className="block h-3 w-3 rounded-full bg-brand-500 mr-1"></span>
                          <span>Original</span>
                        </div>
                        <div className="flex items-center">
                          <span className="block h-3 w-3 rounded-full bg-red-500 opacity-70 mr-1"></span>
                          <span>Predicted</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recommendations */}
              <div className="bg-white border border-surface-100 rounded-xl p-6">
                <h2 className="text-lg font-medium text-surface-900 mb-4">Recommendations</h2>
                <ul className="space-y-3">
                  {simulation.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 mt-0.5 text-xs font-medium text-brand-700">
                        {index + 1}
                      </span>
                      <p className="text-surface-700">{recommendation}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              {/* Key factors panel */}
              <div className="bg-white border border-surface-100 rounded-xl p-6">
                <h2 className="text-lg font-medium text-surface-900 mb-4">Key Factors</h2>
                <div className="space-y-4">
                  {simulation.metrics.keyFactors.map((factor, index) => (
                    <div key={index} className="border border-surface-100 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-medium text-surface-900">{factor.name}</p>
                        <span className={`text-xs font-medium ${getImpactColor(factor.impact)}`}>
                          {factor.impact} Impact
                        </span>
                      </div>
                      <p className="text-xl font-semibold text-surface-900">{factor.value}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-surface-100">
                  <h3 className="text-sm font-medium text-surface-700 mb-3">Sensitivity Analysis</h3>
                  <p className="text-sm text-surface-600 mb-3">
                    How changes to these factors affect the overall prediction:
                  </p>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-surface-700">Resource Availability</span>
                        <span className="text-red-600">76%</span>
                      </div>
                      <div className="h-1.5 w-full bg-surface-100 rounded-full">
                        <div className="h-1.5 w-3/4 bg-red-500 rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-surface-700">Scope Changes</span>
                        <span className="text-amber-600">54%</span>
                      </div>
                      <div className="h-1.5 w-full bg-surface-100 rounded-full">
                        <div className="h-1.5 w-1/2 bg-amber-500 rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-surface-700">Vendor Delays</span>
                        <span className="text-red-600">68%</span>
                      </div>
                      <div className="h-1.5 w-full bg-surface-100 rounded-full">
                        <div className="h-1.5 w-2/3 bg-red-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'scenarios' && (
          <div className="bg-white border border-surface-100 rounded-xl p-6">
            <h2 className="text-lg font-medium text-surface-900 mb-4">Alternative Scenarios</h2>
            <p className="text-surface-600 mb-6">Compare different scenarios to analyze potential outcomes.</p>
            
            <div className="text-center py-12">
              <p className="text-surface-600">No alternative scenarios have been created yet.</p>
              <button className="sira-btn-solid-brand rounded-lg mt-4">Create New Scenario</button>
            </div>
          </div>
        )}
        
        {activeTab === 'history' && (
          <div className="bg-white border border-surface-100 rounded-xl p-6">
            <h2 className="text-lg font-medium text-surface-900 mb-4">Simulation History</h2>
            <p className="text-surface-600 mb-6">View previous runs of this simulation.</p>
            
            <div className="space-y-4">
              <div className="border border-surface-100 rounded-lg p-4 hover:border-surface-200">
                <div className="flex justify-between mb-2">
                  <p className="text-sm font-medium text-surface-900">Run #3 (Latest)</p>
                  <span className="text-xs text-surface-500">1 day ago</span>
                </div>
                <div className="flex justify-between text-xs text-surface-600">
                  <span>Outcome: Delay Risk +14 days</span>
                  <span className="text-emerald-600">Success</span>
                </div>
              </div>
              
              <div className="border border-surface-100 rounded-lg p-4 hover:border-surface-200">
                <div className="flex justify-between mb-2">
                  <p className="text-sm font-medium text-surface-900">Run #2</p>
                  <span className="text-xs text-surface-500">3 days ago</span>
                </div>
                <div className="flex justify-between text-xs text-surface-600">
                  <span>Outcome: Delay Risk +10 days</span>
                  <span className="text-emerald-600">Success</span>
                </div>
              </div>
              
              <div className="border border-surface-100 rounded-lg p-4 hover:border-surface-200">
                <div className="flex justify-between mb-2">
                  <p className="text-sm font-medium text-surface-900">Run #1</p>
                  <span className="text-xs text-surface-500">1 week ago</span>
                </div>
                <div className="flex justify-between text-xs text-surface-600">
                  <span>Outcome: Delay Risk +7 days</span>
                  <span className="text-emerald-600">Success</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}