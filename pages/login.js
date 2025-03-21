import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'
import { ArrowLeft, AlertCircle } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (err) {
      setError('Invalid email or password')
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Login - ProjectSyncAI</title>
      </Head>

      <div className="min-h-screen flex flex-col justify-center bg-surface-50">
        <div className="relative sm:mx-auto sm:w-full sm:max-w-md px-4">
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
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                <path d="m16 8-4 4-4-4"/>
                <path d="M12 16V8"/>
              </svg>
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-surface-900">
              Welcome back
            </h2>
            <p className="mt-2 text-surface-600">
              Sign in to your ProjectSyncAI account
            </p>
          </motion.div>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white py-10 px-6 sm:px-10 border border-surface-100 rounded-2xl"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-surface-700 mb-1.5">
                  Email address
                </label>
                <div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="sira-input sira-input-lg w-full rounded-xl"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-sm font-medium text-surface-700">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-brand-600 hover:text-brand-500 transition-colors duration-200">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="sira-input sira-input-lg w-full rounded-xl"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-xl bg-red-50 p-4 border border-red-100">
                  <div className="flex items-center gap-2.5">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <div className="text-sm text-red-700">{error}</div>
                  </div>
                </div>
              )}

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="sira-checkbox"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-surface-700">
                  Remember me
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="sira-btn-solid-brand sira-btn-lg w-full rounded-xl"
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>

            <p className="mt-8 text-center text-sm text-surface-600">
              Don't have an account?{' '}
              <Link href="/register" className="font-medium text-brand-600 hover:text-brand-500 transition-colors duration-200">
                Create one now
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  )
}