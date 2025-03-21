import { useRouter } from 'next/router'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useProject } from '@/contexts/ProjectContext'
import { useSimulation } from '@/contexts/SimulationContext'
import ProjectHeader from '@/components/projects/ProjectHeader'
import ProjectTabs from '@/components/projects/ProjectTabs'
import ProjectOverview from '@/components/projects/ProjectOverview'
import RequirementsList from '@/components/requirements/RequirementsList'
import TimelineView from '@/components/projects/TimelineView'
import RiskMatrix from '@/components/projects/RiskMatrix'
import ContractSummary from '@/components/projects/ContractSummary'
import { motion } from 'framer-motion'

export default function ProjectDetail() {
  const router = useRouter()
  const { id } = router.query
  const { getProject, isLoading } = useProject()
  const [project, setProject] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  
  useEffect(() => {
    if (id) {
      const fetchedProject = getProject(id)
      setProject(fetchedProject)
    }
  }, [id, getProject])
  
  if (isLoading || !project) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg">Loading project details...</p>
      </div>
    )
  }
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ProjectOverview project={project} />
      case 'requirements':
        return <RequirementsList projectId={id} />
      case 'timeline':
        return <TimelineView projectId={id} />
      case 'risks':
        return <RiskMatrix projectId={id} />
      case 'contract':
        return <ContractSummary projectId={id} />
      default:
        return <ProjectOverview project={project} />
    }
  }
  
  return (
    <>
      <Head>
        <title>{project.name} - ProjectSyncAI</title>
      </Head>
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProjectHeader project={project} />
          
          <div className="mt-8">
            <ProjectTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              {renderTabContent()}
            </div>
          </div>
        </motion.div>
      </main>
    </>
  )
}
