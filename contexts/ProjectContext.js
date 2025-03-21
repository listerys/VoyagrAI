import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'sonner'

const ProjectContext = createContext()

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // In a real app, this would be an API call
    // For demo purposes, we'll load mock data
    const loadProjects = async () => {
      try {
        setTimeout(() => {
          const mockProjects = [
            { id: '1', name: 'E-commerce Platform', client: 'Acme Corp', status: 'In Progress', dueDate: '2023-07-15', progress: 65, risk: 'Low' },
            { id: '2', name: 'Mobile App Development', client: 'TechSolutions', status: 'At Risk', dueDate: '2023-08-01', progress: 30, risk: 'High' },
            { id: '3', name: 'Website Redesign', client: 'Globex', status: 'In Progress', dueDate: '2023-06-30', progress: 80, risk: 'Medium' },
            { id: '4', name: 'CRM Integration', client: 'Initech', status: 'On Hold', dueDate: '2023-09-15', progress: 20, risk: 'Medium' },
            { id: '5', name: 'Data Migration', client: 'Umbrella Corp', status: 'Completed', dueDate: '2023-05-01', progress: 100, risk: 'Low' },
          ]
          setProjects(mockProjects)
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        toast.error('Failed to load projects: ' + error.message)
        setIsLoading(false)
      }
    }
    
    loadProjects()
  }, [])
  
  const getProject = (id) => {
    return projects.find(project => project.id === id) || null
  }
  
  const addProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now().toString(), // Use timestamp as ID in demo
      progress: 0,
      risk: 'Medium',
    }
    
    setProjects([...projects, newProject])
    toast.success('Project created successfully')
    return newProject
  }
  
  const updateProject = (id, updates) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, ...updates } : project
    ))
    toast.success('Project updated successfully')
  }
  
  const deleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id))
    toast.success('Project deleted successfully')
  }
  
  return (
    <ProjectContext.Provider value={{ 
      projects, 
      isLoading, 
      getProject, 
      addProject, 
      updateProject, 
      deleteProject 
    }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProject() {
  return useContext(ProjectContext)
}
