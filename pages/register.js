import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'
import { ArrowLeft, AlertCircle } from 'lucide-react'

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const router = useRouter()
  const { register } = useAuth()
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }
    
    try {
      await register(formData)
      router.push('/dashboard')
    } catch (err) {
      setError(err.message || 'Registration failed')
      setIsLoading(false)
    }
  }
  
  return (
    <>
      <Head>
        <title>Register - ProjectSyncAI</title>
      </Head>
      
      <div className="min-h-screen flex flex-col justify-center bg-surface-50 py-12">
        <div className="relative sm:mx-auto sm:w-full sm:max-w-lg px-4">
          <Link href="/" className="absolute top-0 -mt-16 flex items-center gap-1.5 text-surface-600 hover:text-surface-900 transition-colors duration-200">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to home</span>
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-white mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-surface-900">
              Create your account
            </h2>
            <p className="mt-2 text-surface-600">
              Start managing your projects with AI-powered insights
            </p>
          </motion.div>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-lg px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white py-10 px-6 sm:px-10 border border-surface-100 rounded-2xl"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-surface-700 mb-1.5">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="sira-input sira-input-lg w-full rounded-xl"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-surface-700 mb-1.5">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="sira-input sira-input-lg w-full rounded-xl"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-surface-700 mb-1.5">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="sira-input sira-input-lg w-full rounded-xl"
                  placeholder="you@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-surface-700 mb-1.5">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="sira-input sira-input-lg w-full rounded-xl"
                  placeholder="••••••••"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-surface-700 mb-1.5">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="sira-input sira-input-lg w-full rounded-xl"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="rounded-xl bg-red-50 p-4 border border-red-100">
                  <div className="flex items-center gap-2.5">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <div className="text-sm text-red-700">{error}</div>
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="sira-btn-solid-brand sira-btn-lg w-full rounded-xl"
                >
                  {isLoading ? 'Creating account...' : 'Create account'}
                </button>
              </div>
            </form>
            
            <p className="mt-8 text-center text-sm text-surface-600">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-brand-600 hover:text-brand-500 transition-colors duration-200">
                Sign in instead
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  )
}