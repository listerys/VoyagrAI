import { useRouter } from 'next/router'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import ClientHeader from '@/components/clients/ClientHeader'
import ClientProjects from '@/components/clients/ClientProjects'
import ClientExpectations from '@/components/clients/ClientExpectations'
import ClientCommunication from '@/components/clients/ClientCommunication'
import { motion } from 'framer-motion'

export default function ClientDetail() {
  const router = useRouter()
  const { id } = router.query
  const [client, setClient] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    if (id) {
      // Mock API call - replace with actual API call in a real app
      setTimeout(() => {
        setClient({
          id,
          name: 'Acme Corporation',
          email: 'contact@acmecorp.com',
          phone: '555-1234',
          address: '123 Business Ave, Tech City',
          contactPerson: 'John Smith',
          contactRole: 'Project Manager',
          projects: [
            { id: '1', name: 'Website Redesign', status: 'In Progress', timeline: '4 weeks', budget: '$75,000' },
            { id: '2', name: 'Mobile App Development', status: 'Planning', timeline: '12 weeks', budget: '$150,000' },
            { id: '3', name: 'E-commerce Integration', status: 'Completed', timeline: '8 weeks', budget: '$95,000' },
          ],
          expectations: [
            { id: '1', description: 'Weekly progress updates', status: 'Met', confidence: 90 },
            { id: '2', description: 'Launch within 2 months', status: 'At Risk', confidence: 65 },
            { id: '3', description: 'Stay within budget', status: 'Met', confidence: 85 }
          ],
          communications: [
            { id: '1', date: '2023-06-01', type: 'Email', summary: 'Kick-off meeting recap', sentiment: 'Positive' },
            { id: '2', date: '2023-06-08', type: 'Call', summary: 'Weekly update', sentiment: 'Neutral' },
            { id: '3', date: '2023-06-15', type: 'Meeting', summary: 'Design review', sentiment: 'Positive' }
          ]
        })
        setIsLoading(false)
      }, 1000)
    }
  }, [id])
  
  if (isLoading || !client) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg">Loading client details...</p>
      </div>
    )
  }
  
  return (
    <>
      <Head>
        <title>{client.name} - ProjectSyncAI</title>
      </Head>
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ClientHeader client={client} />
          
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <ClientProjects projects={client.projects} />
            <ClientExpectations expectations={client.expectations} />
          </div>
          
          <div className="mt-8">
            <ClientCommunication communications={client.communications} />
          </div>
        </motion.div>
      </main>
    </>
  )
}
