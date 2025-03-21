import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './Header'
import Sidebar from './Sidebar'
import { useAuth } from '@/contexts/AuthContext'

export default function Layout({ children }) {
  const router = useRouter()
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check if the current page is a public page (login, register, landing)
  const isPublicPage = ['/login', '/register', '/'].includes(router.pathname)

  // Effect to handle authentication
  useEffect(() => {
    // If the user is not logged in and the page is not public, redirect to login
    if (!user && !isPublicPage && router.pathname !== '/login') {
      router.push('/login')
    }

    // If the user is logged in and tries to access login/register, redirect to dashboard
    if (user && ['/login', '/register'].includes(router.pathname)) {
      router.push('/dashboard')
    }
    
    // Simulate page loading
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 300)
    
    return () => clearTimeout(timeout)
  }, [user, router, isPublicPage])

  // If it's a public page, don't show the layout
  if (isPublicPage) {
    return <div className="min-h-screen">{children}</div>
  }

  return (
    <div className="flex h-screen bg-surface-50 overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto pt-4 pb-8 px-4 md:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full items-center justify-center"
              >
                <div className="relative h-10 w-10">
                  <div className="absolute inset-0 rounded-full border-2 border-surface-200 opacity-75"></div>
                  <div className="absolute inset-0 rounded-full border-t-2 border-brand-500 animate-spin"></div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, type: 'tween' }}
                className="mx-auto max-w-7xl"
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}