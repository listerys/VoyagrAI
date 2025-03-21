import { useRouter } from 'next/router'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useSimulation } from '@/contexts/SimulationContext'
import SimulationHeader from '@/components/simulations/SimulationHeader'
import SimulationResults from '@/components/simulations/SimulationResults'
import SimulationTimeline from '@/components/simulations/SimulationTimeline'
import SimulationRisks from '@/components/simulations/SimulationRisks'
import SimulationActions from '@/components/simulations/SimulationActions'
import { motion } from 'framer-motion'

export default function SimulationDetail() {
  const router = useRouter()
  const { id } = router.query
  const { getSimulation, isLoading } = useSimulation()
  const [simulation, setSimulation] = useState(null)
  
  useEffect(() => {
    if (id) {
      const fetchedSimulation = getSimulation(id)
      setSimulation(fetchedSimulation)
    }
  }, [id, getSimulation])
  
  if (isLoading || !simulation) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg">Loading simulation details...</p>
      </div>
    )
  }
  
  return (
    <>
      <Head>
        <title>{simulation.name} - ProjectSyncAI</title>
      </Head>
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SimulationHeader simulation={simulation} />
          
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <SimulationResults simulation={simulation} />
            </div>
            <div>
              <SimulationActions simulation={simulation} />
            </div>
          </div>
          
          <div className="mt-8">
            <SimulationTimeline simulation={simulation} />
          </div>
          
          <div className="mt-8">
            <SimulationRisks simulation={simulation} />
          </div>
        </motion.div>
      </main>
    </>
  )
}
