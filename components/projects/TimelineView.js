import { Calendar, CheckCircle, Clock, ArrowUpRight } from 'lucide-react'

export default function TimelineView({ projectId }) {
  // This would normally fetch data based on the projectId
  const timelineData = {
    startDate: 'Sept 1, 2023',
    endDate: 'Dec 15, 2023',
    currentDate: 'Oct 25, 2023',
    progress: 45,
    milestones: [
      { 
        id: 1, 
        name: 'Project Kickoff', 
        date: 'Sept 5, 2023', 
        status: 'completed', 
        description: 'Initial meeting with client to establish project goals and requirements' 
      },
      { 
        id: 2, 
        name: 'Design Approval', 
        date: 'Sept 22, 2023', 
        status: 'completed', 
        description: 'Client approval of wireframes and design concepts' 
      },
      { 
        id: 3, 
        name: 'Development Phase 1', 
        date: 'Oct 20, 2023', 
        status: 'completed', 
        description: 'Core functionality implementation and testing' 
      },
      { 
        id: 4, 
        name: 'Client Review', 
        date: 'Oct 27, 2023', 
        status: 'current', 
        description: 'Present progress to client and gather feedback' 
      },
      { 
        id: 5, 
        name: 'Development Phase 2', 
        date: 'Nov 15, 2023', 
        status: 'upcoming', 
        description: 'Implement remaining features and address feedback' 
      },
      { 
        id: 6, 
        name: 'Quality Assurance', 
        date: 'Nov 30, 2023', 
        status: 'upcoming', 
        description: 'Final testing and bug fixes' 
      },
      { 
        id: 7, 
        name: 'Launch', 
        date: 'Dec 15, 2023', 
        status: 'upcoming', 
        description: 'Product deployment and handover' 
      }
    ]
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-50 border-emerald-100 text-emerald-700'
      case 'current':
        return 'bg-sky-50 border-sky-100 text-sky-700'
      case 'upcoming':
        return 'bg-surface-50 border-surface-100 text-surface-700'
      default:
        return 'bg-surface-50 border-surface-100 text-surface-700'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-emerald-500" />
      case 'current':
        return <Clock className="h-4 w-4 text-sky-500" />
      case 'upcoming':
        return <Calendar className="h-4 w-4 text-surface-500" />
      default:
        return <Calendar className="h-4 w-4 text-surface-500" />
    }
  }

  return (
    <div className="bg-white border border-surface-100 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50">
          <Calendar className="h-5 w-5 text-sky-500" />
        </div>
        <h3 className="text-lg font-medium text-surface-900">Project Timeline</h3>
      </div>

      {/* Timeline summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <div className="border border-surface-100 rounded-lg p-4">
          <p className="text-sm text-surface-500 mb-1">Start Date</p>
          <p className="text-lg font-semibold text-surface-900">{timelineData.startDate}</p>
        </div>
        
        <div className="border border-surface-100 rounded-lg p-4">
          <p className="text-sm text-surface-500 mb-1">Current Date</p>
          <p className="text-lg font-semibold text-brand-600">{timelineData.currentDate}</p>
        </div>
        
        <div className="border border-surface-100 rounded-lg p-4">
          <p className="text-sm text-surface-500 mb-1">End Date</p>
          <p className="text-lg font-semibold text-surface-900">{timelineData.endDate}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-surface-700">Progress</span>
          <span className="text-sm font-medium text-surface-700">{timelineData.progress}%</span>
        </div>
        <div className="relative h-2.5 w-full rounded-full bg-surface-100">
          <div 
            className="absolute inset-0 h-2.5 rounded-full bg-brand-500" 
            style={{ width: `${timelineData.progress}%` }}
          />
        </div>
      </div>

      {/* Timeline visualization */}
      <div className="relative mt-8 pl-6 border-l border-surface-200">
        {timelineData.milestones.map((milestone, index) => (
          <div key={milestone.id} className="mb-6 last:mb-0">
            <div className="absolute -left-3">
              <div className={`flex h-6 w-6 items-center justify-center rounded-full border ${getStatusColor(milestone.status)}`}>
                {getStatusIcon(milestone.status)}
              </div>
            </div>
            
            <div className={`ml-4 p-4 rounded-lg border ${milestone.status === 'current' ? 'border-sky-100 bg-sky-50' : 'border-surface-100 bg-white'}`}>
              <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                <h4 className="text-sm font-medium text-surface-900">{milestone.name}</h4>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${getStatusColor(milestone.status)}`}>
                  {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                </span>
              </div>
              
              <p className="text-xs text-surface-600 mb-2">{milestone.description}</p>
              
              <div className="flex items-center">
                <Calendar className="h-3.5 w-3.5 text-surface-500 mr-1.5" />
                <span className="text-xs text-surface-500">{milestone.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a href={`/projects/${projectId}/timeline/edit`} className="inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700">
          Adjust project timeline
          <ArrowUpRight className="ml-1.5 h-4 w-4" />
        </a>
      </div>
    </div>
  )
}