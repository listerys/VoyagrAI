import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BarChart2, 
  Briefcase, 
  Users, 
  FileText, 
  Calendar, 
  TrendingUp,
  LogOut,
  X
} from 'lucide-react'

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const router = useRouter()
  const { logout } = useAuth()

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && !event.target.closest('.sidebar') && !event.target.closest('button[aria-controls="sidebar"]')) {
        setSidebarOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [sidebarOpen, setSidebarOpen])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart2 },
    { name: 'Projects', href: '/projects', icon: Briefcase },
    { name: 'Clients', href: '/clients', icon: Users },
    { name: 'Requirements', href: '/requirements', icon: FileText },
    { name: 'Timelines', href: '/timelines', icon: Calendar },
    { name: 'Simulations', href: '/simulations', icon: TrendingUp },
  ]

  const sidebarVariants = {
    open: { x: 0 },
    closed: { 
      x: '-100%',
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  }
  
  // Only apply sidebar animation on mobile
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 1024 : false

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 }
  }

  return (
    <>
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 z-20 bg-surface-900 bg-opacity-50 transition-opacity lg:hidden" 
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className="sidebar fixed inset-y-0 left-0 z-30 w-64 flex-col bg-white border-r border-surface-100 lg:relative lg:flex">
        <motion.div
          className="h-full w-full flex flex-col lg:transform-none"
          initial={false}
          animate={(isMobile && !sidebarOpen) ? "closed" : "open"}
          variants={sidebarVariants}
        >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-surface-100">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
                <BarChart2 className="h-5 w-5" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-surface-900">ProjectSync<span className="text-brand-500">AI</span></span>
            </Link>
            <button
              className="sira-btn-ghost-surface p-1.5 rounded-lg text-surface-500 hover:text-surface-900 focus:outline-none lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Sidebar content */}
          <nav className="flex-1 px-3 py-6 space-y-1.5">
            {navigation.map((item) => {
              const isActive = router.pathname === item.href || router.pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-brand-50 text-brand-600'
                      : 'text-surface-700 hover:bg-surface-50 hover:text-surface-900'
                  }`}
                >
                  <item.icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-brand-500' : 'text-surface-500 group-hover:text-surface-700'}`} />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Sidebar footer */}
          <div className="border-t border-surface-100 p-3 mt-auto">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-surface-700 hover:bg-surface-50 hover:text-surface-900 transition-colors duration-200"
            >
              <LogOut className="h-5 w-5 text-surface-500" />
              Sign out
            </button>
          </div>
        </div>
        </motion.div>
      </div>
    </>
  )
}