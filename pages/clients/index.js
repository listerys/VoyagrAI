import Head from 'next/head'
import { useState } from 'react'
import ClientList from '@/components/clients/ClientList'
import CreateClientButton from '@/components/clients/CreateClientButton'
import { motion } from 'framer-motion'

export default function Clients() {
  // Mock clients data (would come from a context or API in a real app)
  const [clients, setClients] = useState([
    { id: '1', name: 'Acme Corp', email: 'contact@acmecorp.com', phone: '555-1234', projectCount: 3 },
    { id: '2', name: 'Globex Industries', email: 'info@globex.com', phone: '555-5678', projectCount: 2 },
    { id: '3', name: 'TechSolutions', email: 'hello@techsolutions.io', phone: '555-9012', projectCount: 5 }
  ])
  
  return (
    <>
      <Head>
        <title>Clients - ProjectSyncAI</title>
      </Head>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 dark:text-white"
          >
            Clients
          </motion.h1>
          
          <CreateClientButton />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {clients.length > 0 ? (
            <ClientList clients={clients} />
          ) : (
            <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
              <p className="mb-4 text-lg text-gray-600 dark:text-gray-400">No clients found</p>
              <CreateClientButton label="Add your first client" />
            </div>
          )}
        </motion.div>
      </main>
    </>
  )
}
