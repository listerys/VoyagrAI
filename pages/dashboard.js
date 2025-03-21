import Head from 'next/head'
import { useAuth } from '@/contexts/AuthContext'
import { useProject } from '@/contexts/ProjectContext'
import DashboardOverview from '@/components/dashboard/DashboardOverview'
import ProjectsSummary from '@/components/dashboard/ProjectsSummary'
import ClientsSummary from '@/components/dashboard/ClientsSummary'
import RecentActivity from '@/components/dashboard/RecentActivity'
import RiskSummary from '@/components/dashboard/RiskSummary'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const { user } = useAuth()
  const { projects } = useProject()
  
  if (!user) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    )
  }
  
  return (
    <>
      <Head>
        <title>Dashboard - ProjectSyncAI</title>
      </Head>
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user.firstName || 'User'}
          </h1>
          
          <DashboardOverview />
          
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ProjectsSummary />
            </div>
            <div>
              <ClientsSummary />
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <RecentActivity />
            </div>
            <div>
              <RiskSummary />
            </div>
          </div>
        </motion.div>
      </main>
    </>
  )
}
