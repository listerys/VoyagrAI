import { Plus } from 'lucide-react'

export default function CreateProjectButton({ label = 'Create Project' }) {
  return (
    <button className="sira-btn-solid-brand rounded-lg flex items-center gap-2 border-0">
      <Plus className="h-4 w-4" />
      {label}
    </button>
  )
}