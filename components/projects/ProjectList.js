import Link from 'next/link'
import { ArrowLeft, Clock, AlertTriangle, CheckCircle, ArrowRight, PauseCircle } from 'lucide-react'

export default function ProjectList({ projects }) {
  // Function to get status icon based on project status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'In Progress':
        return <Clock className="h-5 w-5 text-sky-500" />
      case 'Completed':
        return <CheckCircle className="h-5 w-5 text-emerald-500" />
      case 'At Risk':
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case 'On Hold':
        return <PauseCircle className="h-5 w-5 text-amber-500" />
      default:
        return <Clock className="h-5 w-5 text-surface-500" />
    }
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
  
  // Function to get progress bar color based on project risk
  const getProgressColor = (progress, risk) => {
    if (risk === 'High') return 'bg-red-500'
    if (risk === 'Medium') return 'bg-amber-500'
    return 'bg-sky-500'
  }
  
  return (
    <div>
      <div className="mb-5 flex items-center">
        <Link href="/dashboard" className="flex items-center gap-1.5 text-surface-600 hover:text-surface-900">
          <ArrowLeft className="h-4 w-4" />
          <span className="font-medium">Back to Dashboard</span>
        </Link>
      </div>
      
      <div className="rounded-xl border border-surface-100 bg-white overflow-hidden">
        <ul className="divide-y divide-surface-100">
          {projects.map((project) => (
            <li key={project.id}>
              <Link href={`/projects/${project.id}`} className="block hover:bg-surface-50">
                <div className="px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(project.status)}
                      <p className="truncate text-lg font-medium text-surface-900">{project.name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium border ${getStatusBadgeClass(project.status)}`}>
                        {project.status}
                      </span>
                      <ArrowRight className="h-4 w-4 text-surface-400" />
                    </div>
                  </div>
                  
                  <div className="mt-2 flex flex-wrap gap-4">
                    <p className="flex items-center text-sm text-surface-600">
                      Client: <span className="ml-1 font-medium text-surface-700">{project.client}</span>
                    </p>
                    <p className="flex items-center text-sm text-surface-600">
                      Due: <span className="ml-1 font-medium text-surface-700">{project.dueDate}</span>
                    </p>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-surface-700">{project.progress}%</span>
                      <div className="relative h-2 flex-1 rounded-full bg-surface-100">
                        <div
                          className={`absolute inset-0 h-2 rounded-full ${getProgressColor(project.progress, project.risk)}`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border ${
                        project.risk === 'High' ? 'bg-red-50 text-red-700 border-red-100' :
                        project.risk === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                        'bg-emerald-50 text-emerald-700 border-emerald-100'
                      }`}>
                        {project.risk} Risk
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}