import { Plus } from 'lucide-react'
import { useState } from 'react'

export default function CreateSimulationButton({ projects, label = 'Create Simulation' }) {
  const [isOpen, setIsOpen] = useState(false)
  
  const handleClick = () => {
    // In a real app, this would open a modal or navigate to creation page
    setIsOpen(true)
  }
  
  return (
    <>
      <button 
        onClick={handleClick}
        className="sira-btn-solid-brand rounded-lg flex items-center gap-2 border-0"
      >
        <Plus className="h-4 w-4" />
        {label}
      </button>
      
      {/* This is a placeholder for a simulation creation modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-surface-900 bg-opacity-50 flex items-center justify-center z-50"
             onClick={() => setIsOpen(false)}>
          <div 
            className="bg-white rounded-xl border border-surface-100 p-6 max-w-lg w-full mx-4"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-surface-900 mb-4">Create New Simulation</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="sim-name" className="block text-sm font-medium text-surface-700 mb-1">
                  Simulation Name
                </label>
                <input
                  id="sim-name"
                  type="text"
                  className="sira-input w-full rounded-lg"
                  placeholder="Enter simulation name"
                />
              </div>
              
              <div>
                <label htmlFor="project-select" className="block text-sm font-medium text-surface-700 mb-1">
                  Project
                </label>
                <select id="project-select" className="sira-input w-full rounded-lg appearance-none">
                  <option value="">Select a project</option>
                  {projects && projects.map(project => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="sim-type" className="block text-sm font-medium text-surface-700 mb-1">
                  Simulation Type
                </label>
                <select id="sim-type" className="sira-input w-full rounded-lg appearance-none">
                  <option value="timeline">Timeline Simulation</option>
                  <option value="resource">Resource Allocation</option>
                  <option value="budget">Budget Forecast</option>
                  <option value="risk">Risk Assessment</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setIsOpen(false)}
                className="sira-btn-ghost-surface rounded-lg"
              >
                Cancel
              </button>
              <button className="sira-btn-solid-brand rounded-lg">
                Create Simulation
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}