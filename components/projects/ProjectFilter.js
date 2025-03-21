import { ChevronDown } from 'lucide-react'

export default function ProjectFilter({ filter, setFilter }) {
  return (
    <div className="relative">
      <select 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)} 
        className="sira-input rounded-lg pl-3 pr-10 py-2 appearance-none bg-white border border-surface-200 focus:border-brand-300 focus:ring focus:ring-brand-200 focus:ring-opacity-25"
      >
        <option value="all">All Projects</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
        <option value="At Risk">At Risk</option>
        <option value="On Hold">On Hold</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-surface-500">
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  )
}