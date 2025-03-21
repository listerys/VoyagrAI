import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, TrendingDown, Minus } from 'lucide-react'

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
        return 'bg-emerald-50 text-emerald-700'
      case 'negative':
        return 'bg-red-50 text-red-700'
      case 'neutral':
        return 'bg-amber-50 text-amber-700'
      default:
        return 'bg-surface-100 text-surface-700'
    }
  }

  return (
    <div className="card h-full">
      <div className="border-b border-surface-200 px-5 py-4">
        <h3 className="text-lg font-medium text-surface-900">Client Expectations</h3>
      </div>

      <div className="divide-y divide-surface-100">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center p-4">
            <p className="text-surface-500">Loading clients...</p>
          </div>
        ) : clients.length > 0 ? (
          clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="px-5 py-4 hover:bg-surface-50 transition-colors"
            >
              <Link href={`/clients/${client.id}`} className="flex items-center justify-between">
                <div>
                  <p className="text-base font-medium text-surface-900">{client.name}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
                      {client.activeProjects} project{client.activeProjects !== 1 ? 's' : ''}
                    </span>
                    <span className="text-xs text-surface-500">
                      {client.lastInteraction}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full ${getStatusColorClass(client.expectationStatus)}`}>
                    {getStatusIcon(client.expectationStatus)}
                  </span>
                  <ArrowRight className="ml-3 h-4 w-4 text-surface-400" />
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="flex h-64 items-center justify-center p-4">
            <p className="text-surface-500">No clients found</p>
          </div>
        )}
      </div>

      <div className="border-t border-surface-200 px-5 py-4 mt-auto">
        <Link href="/clients" className="inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700">
          View all clients
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}