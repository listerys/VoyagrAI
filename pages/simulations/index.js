import Head from 'next/head'
import { useState } from 'react'
import { useProject } from '@/contexts/ProjectContext'
import { useSimulation } from '@/contexts/SimulationContext'
import SimulationList from '@/components/simulations/SimulationList'
import CreateSimulationButton from '@/components/simulations/CreateSimulationButton'
import { motion } from 'framer-motion'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function Simulations() {
  const { projects } = useProject()
  const { simulations, isLoading } = useSimulation()
  
  return (
    <>
      <Head>
        <title>Project Simulations - ProjectSyncAI</title>
      </Head>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-5">
          <Link href="/dashboard" className="flex items-center gap-1.5 text-surface-600 hover:text-surface-900">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
        </div>
        
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-surface-900"
          >
            Project Simulations
          </motion.h1>
          
          <CreateSimulationButton projects={projects} />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="flex flex-col items-center">
                <Loader2 className="h-6 w-6 text-brand-500 animate-spin" />
                <p className="mt-3 text-sm text-surface-500">Loading simulations...</p>
              </div>
            </div>
          ) : simulations && simulations.length > 0 ? (
            <SimulationList simulations={simulations} />
          ) : (
            <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-surface-100 border-dashed bg-white p-6 text-center">
              <p className="mb-4 text-surface-600">No simulations found</p>
              <CreateSimulationButton label="Create your first simulation" projects={projects} />
            </div>
          )}
        </motion.div>
      </main>
    </>
  )
}