import { 
    BarChart2, 
    FileText, 
    Calendar, 
    AlertTriangle, 
    FileCheck 
  } from 'lucide-react'
  
  export default function ProjectTabs({ activeTab, setActiveTab }) {
    const tabs = [
      { id: 'overview', label: 'Overview', icon: BarChart2 },
      { id: 'requirements', label: 'Requirements', icon: FileText },
      { id: 'timeline', label: 'Timeline', icon: Calendar },
      { id: 'risks', label: 'Risks', icon: AlertTriangle },
      { id: 'contract', label: 'Contract', icon: FileCheck }
    ]
  
    return (
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
    )
  }