import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, TrendingDown, Minus, Loader2 } from 'lucide-react'

export default function ClientsSummary() {
  // In a real app, this data would come from an API or context
  const [clients, setClients] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setClients([
        { id: '1', name: 'Acme Corp', activeProjects: 2, expectationStatus: 'positive', lastInteraction: '2 days ago' },
        { id: '2', name: 'TechSolutions', activeProjects: 1, expectationStatus: 'negative', lastInteraction: '1 week ago' },
        { id: '3', name: 'Globex', activeProjects: 3, expectationStatus: 'neutral', lastInteraction: 'Yesterday' },
        { id: '4', name: 'Initech', activeProjects: 1, expectationStatus: 'positive', lastInteraction: 'Today' },
      ])
      setIsLoading(false)
    }, 1000)
  }, [])
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-emerald-500" />
      case 'negative':
        return <TrendingDown className="h-4 w-4 text-red-500" />
      case 'neutral':
        return <Minus className="h-4 w-4 text-amber-500" />
      default:
        return <Minus className="h-4 w-4 text-surface-500" />
    }
  }
  
  const getStatusColorClass = (status) => {
    switch (status) {
      case 'positive':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100'
      case 'negative':
        return 'bg-red-50 text-red-700 border-red-100'
      case 'neutral':
        return 'bg-amber-50 text-amber-700 border-amber-100'
      default:
        return 'bg-surface-100 text-surface-700 border-surface-200'
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }
  
  return (
    <div className="h-full bg-white border border-surface-100 rounded-xl overflow-hidden flex flex-col">
      <div className="border-b border-surface-100 px-5 py-4">
        <h3 className="text-lg font-medium text-surface-900">Client Expectations</h3>
      </div>

      <div className="divide-y divide-surface-100 flex-1 overflow-auto">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center p-4">
            <div className="flex flex-col items-center">
              <Loader2 className="h-6 w-6 text-brand-500 animate-spin" />
              <p className="mt-3 text-sm text-surface-500">Loading clients...</p>
            </div>
          </div>
        ) : clients.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
          >
            {clients.map((client) => (
              <motion.div
                key={client.id}
                variants={item}
                className="group hover:bg-surface-50 transition-colors duration-200"
              >
                <Link href={`/clients/${client.id}`} className="flex items-center justify-between px-5 py-4">
                  <div>
                    <p className="text-base font-medium text-surface-900">{client.name}</p>
                    <div className="mt-1.5 flex items-center gap-3">
                      <span className="inline-flex items-center rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700 border border-brand-100">
                        {client.activeProjects} project{client.activeProjects !== 1 ? 's' : ''}
                      </span>
                      <span className="text-xs text-surface-500">
                        {client.lastInteraction}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full border ${getStatusColorClass(client.expectationStatus)}`}>
                      {getStatusIcon(client.expectationStatus)}
                    </span>
                    <ArrowRight className="h-4 w-4 text-surface-400 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="flex h-64 items-center justify-center p-4">
            <p className="text-surface-500">No clients found</p>
          </div>
        )}
      </div>

      <div className="border-t border-surface-100 px-5 py-4 mt-auto">
        <Link href="/clients" className="inline-flex items-center justify-center w-full text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors duration-200 py-1.5 rounded-lg hover:bg-brand-50">
          View all clients
          <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}