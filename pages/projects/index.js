import Head from 'next/head'
import { useState } from 'react'
import { useProject } from '@/contexts/ProjectContext'
import ProjectList from '@/components/projects/ProjectList'
import ProjectFilter from '@/components/projects/ProjectFilter'
import CreateProjectButton from '@/components/projects/CreateProjectButton'
import { motion } from 'framer-motion'

export default function Projects() {
  const { projects, isLoading } = useProject()
  const [filter, setFilter] = useState('all')
  
  // Filter projects based on status
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.status === filter)
  
  return (
    <>
      <Head>
        <title>Projects - ProjectSyncAI</title>
      </Head>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 dark:text-white"
          >
            Projects
          </motion.h1>
          
          <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
            <ProjectFilter filter={filter} setFilter={setFilter} />
            <CreateProjectButton />
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <p className="text-lg text-gray-600 dark:text-gray-400">Loading projects...</p>
            </div>
          ) : filteredProjects.length > 0 ? (
            <ProjectList projects={filteredProjects} />
          ) : (
            <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
              <p className="mb-4 text-lg text-gray-600 dark:text-gray-400">No projects found</p>
              <CreateProjectButton label="Create your first project" />
            </div>
          )}
        </motion.div>
      </main>
    </>
  )
}
