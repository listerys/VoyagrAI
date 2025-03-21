import { Briefcase, Calendar, Users } from 'lucide-react'

export default function ProjectHeader({ project }) {
  // This would normally use the passed project prop
  const projectData = project || {
    name: 'Website Redesign',
    client: 'Acme Corp',
    status: 'In Progress',
    dueDate: 'Dec 15, 2023'
  }

  // Function to get status badge styling
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'In Progress':
        return 'bg-sky-50 text-sky-700 border-sky-100'
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100'
      case 'At Risk':
        return 'bg-red-50 text-red-700 border-red-100'
      case 'On Hold':
        return 'bg-amber-50 text-amber-700 border-amber-100'
      default:
        return 'bg-surface-100 text-surface-700 border-surface-200'
    }
  }

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-surface-900">{projectData.name}</h1>
        <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium border ${getStatusBadgeClass(projectData.status)}`}>
          {projectData.status}
        </span>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-5">
        <div className="flex items-center gap-2 text-surface-600">
          <Users className="h-4 w-4 text-brand-500" />
          <span className="text-sm">Client: </span>
          <span className="text-sm font-medium text-surface-900">{projectData.client}</span>
        </div>
        
        <div className="flex items-center gap-2 text-surface-600">
          <Calendar className="h-4 w-4 text-brand-500" />
          <span className="text-sm">Due date: </span>
          <span className="text-sm font-medium text-surface-900">{projectData.dueDate}</span>
        </div>
      </div>
    </div>
  )
}