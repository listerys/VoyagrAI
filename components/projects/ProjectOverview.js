import { 
    BarChart2, 
    Users, 
    Calendar, 
    Clock, 
    DollarSign 
  } from 'lucide-react'
  
  export default function ProjectOverview({ project }) {
    // This would normally use the passed project prop
    const projectDetails = {
      description: 'Complete redesign of the corporate website with new branding, improved UX, and enhanced performance metrics.',
      team: [
        { name: 'Sarah Johnson', role: 'Project Manager' },
        { name: 'David Kim', role: 'Lead Developer' },
        { name: 'Emma Chen', role: 'UI/UX Designer' }
      ],
      timeline: {
        start: 'Sept 1, 2023',
        end: 'Dec 15, 2023',
        progress: 45
      },
      budget: {
        total: '$48,000',
        spent: '$21,600',
        remaining: '$26,400'
      },
      metrics: [
        { name: 'Hours Logged', value: '346' },
        { name: 'Tasks Completed', value: '28/62' },
        { name: 'Meetings Held', value: '12' }
      ]
    }
  
    return (
      <div className="bg-white border border-surface-100 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50">
            <BarChart2 className="h-5 w-5 text-brand-500" />
          </div>
          <h3 className="text-lg font-medium text-surface-900">Project Overview</h3>
        </div>
  
        <div className="space-y-6">
          {/* Description */}
          <div className="mb-6">
            <p className="text-sm leading-relaxed text-surface-700">{projectDetails.description}</p>
          </div>
          
          {/* Quick stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {projectDetails.metrics.map((metric, index) => (
              <div key={index} className="border border-surface-100 rounded-lg p-4">
                <p className="text-sm text-surface-500 mb-1">{metric.name}</p>
                <p className="text-xl font-semibold text-surface-900">{metric.value}</p>
              </div>
            ))}
          </div>
          
          {/* Timeline */}
          <div className="border-t border-surface-100 pt-5">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-4 w-4 text-brand-500" />
              <h4 className="text-sm font-medium text-surface-900">Timeline</h4>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-3">
              <div>
                <p className="text-xs text-surface-500 mb-1">Start Date</p>
                <p className="text-sm font-medium text-surface-900">{projectDetails.timeline.start}</p>
              </div>
              <div>
                <p className="text-xs text-surface-500 mb-1">End Date</p>
                <p className="text-sm font-medium text-surface-900">{projectDetails.timeline.end}</p>
              </div>
            </div>
            
            <div className="mt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-surface-700">Progress</span>
                <span className="text-xs font-medium text-surface-700">{projectDetails.timeline.progress}%</span>
              </div>
              <div className="relative h-2 w-full rounded-full bg-surface-100">
                <div 
                  className="absolute inset-0 h-2 rounded-full bg-brand-500" 
                  style={{ width: `${projectDetails.timeline.progress}%` }}
                />
              </div>
            </div>
          </div>
          
          {/* Budget */}
          <div className="border-t border-surface-100 pt-5">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="h-4 w-4 text-brand-500" />
              <h4 className="text-sm font-medium text-surface-900">Budget</h4>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-surface-500 mb-1">Total</p>
                <p className="text-sm font-medium text-surface-900">{projectDetails.budget.total}</p>
              </div>
              <div>
                <p className="text-xs text-surface-500 mb-1">Spent</p>
                <p className="text-sm font-medium text-surface-900">{projectDetails.budget.spent}</p>
              </div>
              <div>
                <p className="text-xs text-surface-500 mb-1">Remaining</p>
                <p className="text-sm font-medium text-surface-900">{projectDetails.budget.remaining}</p>
              </div>
            </div>
          </div>
          
          {/* Team */}
          <div className="border-t border-surface-100 pt-5">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-4 w-4 text-brand-500" />
              <h4 className="text-sm font-medium text-surface-900">Team</h4>
            </div>
            
            <div className="space-y-3">
              {projectDetails.team.map((member, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-900">{member.name}</p>
                    <p className="text-xs text-surface-500">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }