import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  ChevronDown, 
  Bell, 
  Moon, 
  Sun, 
  Search,
  MessageSquare, 
  User,
  Settings,
  LogOut
} from 'lucide-react'

export default function Header({ sidebarOpen, setSidebarOpen }) {
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const router = useRouter()

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const handleClickOutside = (event) => {
    if (dropdownOpen && !event.target.closest('.profile-dropdown')) {
      setDropdownOpen(false)
    }
    if (notificationsOpen && !event.target.closest('.notifications-dropdown')) {
      setNotificationsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [dropdownOpen, notificationsOpen])

  return (
    <header className="sticky top-0 z-30 border-b border-surface-100 bg-white">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            className="sira-btn-ghost-surface p-2 rounded-lg text-surface-500 hover:text-surface-900 focus:outline-none lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-5 w-5" />
          </button>

          {/* Search bar */}
          <div className="hidden md:block relative">
            <div className={`relative transition-all duration-200 ${searchFocused ? 'w-80' : 'w-64'}`}>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Search className={`h-4 w-4 transition-colors duration-200 ${searchFocused ? 'text-brand-500' : 'text-surface-400'}`} />
              </div>
              <input 
                type="text" 
                placeholder="Search..." 
                className="sira-input rounded-xl pl-10 h-10 w-full border-surface-200 bg-surface-50 focus:border-brand-300"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="sira-btn-ghost-surface p-2.5 rounded-lg text-surface-500 hover:text-surface-900 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          )}

          {/* Notifications */}
          <div className="relative notifications-dropdown">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="sira-btn-ghost-surface p-2.5 rounded-lg text-surface-500 hover:text-surface-900 transition-colors duration-200 relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 block h-2 w-2 rounded-full bg-brand-500 ring-2 ring-white"></span>
            </button>

            {/* Notification dropdown */}
            <AnimatePresence>
              {notificationsOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-0 mt-2 w-80 origin-top-right rounded-xl bg-white py-1 border border-surface-100"
                >
                  <div className="px-4 py-3 border-b border-surface-100">
                    <h3 className="font-medium text-surface-900">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto px-2 py-2">
                    <a href="#" className="block px-2 py-2 rounded-lg hover:bg-surface-50 transition-colors duration-200">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                            <MessageSquare className="h-5 w-5" />
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-surface-900">New client comment</p>
                          <p className="text-xs text-surface-500 mt-0.5">1 hour ago</p>
                        </div>
                      </div>
                    </a>
                    <a href="#" className="block px-2 py-2 rounded-lg hover:bg-surface-50 transition-colors duration-200">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                            <MessageSquare className="h-5 w-5" />
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-surface-900">Project status updated</p>
                          <p className="text-xs text-surface-500 mt-0.5">2 hours ago</p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="px-4 py-2 border-t border-surface-100">
                    <a href="#" className="block text-center text-xs font-medium text-brand-600 hover:text-brand-700 transition-colors duration-200">
                      View all notifications
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile dropdown */}
          <div className="relative ml-1 profile-dropdown">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 rounded-lg px-1.5 py-1.5 hover:bg-surface-50 transition-colors duration-200"
              id="user-menu-button"
            >
              <span className="sr-only">Open user menu</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-white">
                {user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </div>
              <span className="hidden text-sm font-medium text-surface-700 md:block">{user?.firstName || 'User'}</span>
              <ChevronDown className="h-4 w-4 text-surface-400" />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white border border-surface-100" 
                  role="menu"
                >
                  <div className="px-4 py-3 border-b border-surface-100">
                    <p className="text-xs text-surface-500">Signed in as</p>
                    <p className="text-sm font-medium text-surface-900 truncate">{user?.email || 'user@example.com'}</p>
                  </div>
                  <div className="py-2 px-2">
                    <Link href="/profile" className="flex items-center gap-2.5 px-3 py-2 text-sm text-surface-700 hover:bg-surface-50 rounded-lg transition-colors duration-200" role="menuitem">
                      <User className="h-4 w-4 text-surface-500" />
                      Your Profile
                    </Link>
                    <Link href="/settings" className="flex items-center gap-2.5 px-3 py-2 text-sm text-surface-700 hover:bg-surface-50 rounded-lg transition-colors duration-200" role="menuitem">
                      <Settings className="h-4 w-4 text-surface-500" />
                      Settings
                    </Link>
                  </div>
                  <div className="py-2 px-2 border-t border-surface-100">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      role="menuitem"
                    >
                      <LogOut className="h-4 w-4 text-red-500" />
                      Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}