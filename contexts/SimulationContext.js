import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'sonner'

const SimulationContext = createContext()

export function SimulationProvider({ children }) {
  const [simulations, setSimulations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // In a real app, this would be an API call
    // For demo purposes, we'll load mock data
    const loadSimulations = async () => {
      try {
        setTimeout(() => {
          const mockSimulations = [
            { 
              id: '1', 
              name: 'Baseline Projection', 
              project: 'E-commerce Platform', 
              date: '2023-06-01', 
              scenarios: 3,
              confidence: 85,
              timeline: {
                projected: '2023-07-15',
                optimistic: '2023-07-01',
                pessimistic: '2023-08-15',
              },
              risks: [
                { id: '1', name: 'Resource availability', probability: 'Medium', impact: 'High' },
                { id: '2', name: 'Scope creep', probability: 'High', impact: 'Medium' },
              ]
            },
            { 
              id: '2', 
              name: 'Accelerated Timeline', 
              project: 'Mobile App Development', 
              date: '2023-05-15', 
              scenarios: 2,
              confidence: 65,
              timeline: {
                projected: '2023-07-20',
                optimistic: '2023-07-10',
                pessimistic: '2023-08-30',
              },
              risks: [
                { id: '1', name: 'Quality issues', probability: 'High', impact: 'High' },
                { id: '2', name: 'Technical challenges', probability: 'Medium', impact: 'High' },
              ]
            },
            { 
              id: '3', 
              name: 'Extended Resources', 
              project: 'Website Redesign', 
              date: '2023-06-10', 
              scenarios: 4,
              confidence: 90,
              timeline: {
                projected: '2023-06-25',
                optimistic: '2023-06-20',
                pessimistic: '2023-07-10',
              },
              risks: [
                { id: '1', name: 'Client delays', probability: 'Low', impact: 'Medium' },
                { id: '2', name: 'Design changes', probability: 'Medium', impact: 'Low' },
              ]
            },
          ]
          setSimulations(mockSimulations)
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        toast.error('Failed to load simulations: ' + error.message)
        setIsLoading(false)
      }
    }
    
    loadSimulations()
  }, [])
  
  const getSimulation = (id) => {
    return simulations.find(simulation => simulation.id === id) || null
  }
  
  const addSimulation = (simulation) => {
    const newSimulation = {
      ...simulation,
      id: Date.now().toString(), // Use timestamp as ID in demo
      date: new Date().toISOString().split('T')[0],
      confidence: 75,
    }
    
    setSimulations([...simulations, newSimulation])
    toast.success('Simulation created successfully')
    return newSimulation
  }
  
  const updateSimulation = (id, updates) => {
    setSimulations(simulations.map(simulation => 
      simulation.id === id ? { ...simulation, ...updates } : simulation
    ))
    toast.success('Simulation updated successfully')
  }
  
  const deleteSimulation = (id) => {
    setSimulations(simulations.filter(simulation => simulation.id !== id))
    toast.success('Simulation deleted successfully')
  }
  
  return (
    <SimulationContext.Provider value={{ 
      simulations, 
      isLoading, 
      getSimulation, 
      addSimulation, 
      updateSimulation, 
      deleteSimulation 
    }}>
      {children}
    </SimulationContext.Provider>
  )
}

export function useSimulation() {
  return useContext(SimulationContext)
}
