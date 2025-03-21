import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'
import { BarChart2, CheckCircle, Clock, FileText, AlertTriangle, Users } from 'lucide-react'

export default function Home() {
  const { user } = useAuth()

  const features = [
    {
      title: "AI-Powered Requirements Analysis",
      description: "Intelligent interview tools to gather comprehensive project requirements and identify potential gaps.",
      icon: FileText,
      color: "brand",
      iconColor: "brand"
    },
    {
      title: "Project Simulation Engine",
      description: "Generate realistic timelines and budgets based on historical data and AI predictions.",
      icon: Clock,
      color: "sky",
      iconColor: "sky"
    },
    {
      title: "Client Expectation Management",
      description: "Track client expectations and identify when they're diverging from feasible outcomes.",
      icon: Users,
      color: "indigo",
      iconColor: "indigo" 
    },
    {
      title: "Risk & Change Impact Analysis",
      description: "Visualize how changes impact project timeline, budget, and resources in real-time.",
      icon: AlertTriangle,
      color: "amber",
      iconColor: "amber"
    },
    {
      title: "Resource Optimization",
      description: "Optimize team allocation based on skills and availability to prevent bottlenecks.",
      icon: BarChart2,
      color: "emerald",
      iconColor: "emerald"
    },
    {
      title: "Contract Analysis",
      description: "Identify ambiguities and unrealistic commitments in contracts before they cause problems.",
      icon: CheckCircle,
      color: "violet",
      iconColor: "violet"
    }
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <>
      <Head>
        <title>ProjectSyncAI - Aligning Project Expectations</title>
      </Head>

      <main className="overflow-hidden">
        {/* Hero section */}
        <section className="relative pt-24 pb-32 lg:pt-32 lg:pb-40">
          <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-white to-brand-50"></div>
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-surface-900 mb-8">
                Reduce project delays with <span className="text-brand-600 relative">
                  <span className="relative z-10">AI-powered</span>
                  <span className="absolute -bottom-1 left-0 w-full h-3 bg-brand-100 -z-0 rounded-full"></span>
                </span> insights
              </h1>
              <p className="text-xl md:text-2xl text-surface-600 mb-12 mx-auto max-w-2xl leading-relaxed">
                ProjectSyncAI helps align client expectations and delivery outcomes through intelligent project management and simulation.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                {user ? (
                  <Link href="/dashboard" className="inline-flex items-center justify-center h-14 px-8 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-full transition-colors duration-200">
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link href="/login" className="inline-flex items-center justify-center h-14 px-8 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-full transition-colors duration-200">
                      Get Started
                    </Link>
                    <Link href="/register" className="inline-flex items-center justify-center h-14 px-8 border-2 border-surface-200 hover:border-surface-300 text-surface-800 font-medium rounded-full transition-colors duration-200">
                      Learn More
                    </Link>
                  </>
                )}
              </div>
            </motion.div>

            {/* Visual element */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-20 lg:mt-24 relative mx-auto max-w-5xl"
            >
              <div className="relative overflow-hidden rounded-3xl border border-surface-200 bg-white">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-400 via-sky-500 to-indigo-500"></div>
                <img 
                  src="/api/placeholder/1000/500" 
                  alt="ProjectSyncAI Dashboard" 
                  className="w-full h-auto"
                />
              </div>
              
              {/* Floating elements - redesigned as modern pills */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -left-10 top-1/4 hidden lg:block"
              >
                <div className="bg-white rounded-full py-3 px-5 border border-surface-100 flex items-center gap-3">
                  <div className="rounded-full bg-emerald-100 p-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <span className="text-sm font-medium text-surface-900">Tasks completed</span>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -right-10 top-1/3 hidden lg:block"
              >
                <div className="bg-white rounded-full py-3 px-5 border border-surface-100 flex items-center gap-3">
                  <div className="rounded-full bg-amber-100 p-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                  </div>
                  <span className="text-sm font-medium text-surface-900">Risks identified</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-28 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl font-bold text-surface-900 mb-5">Features designed for project success</h2>
              <p className="text-xl text-surface-600 max-w-2xl mx-auto leading-relaxed">
                Our AI-powered toolset helps you predict, prevent, and mitigate risks before they impact your projects.
              </p>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  transition={{ duration: 0.5 }}
                  className="bg-surface-50 rounded-2xl p-8 border-2 border-surface-100 transition-all duration-300 hover:border-surface-200 flex flex-col"
                >
                  <div className={`bg-${feature.color}-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                    <feature.icon className={`h-8 w-8 text-${feature.iconColor}-500`} />
                  </div>
                  <h3 className="text-xl font-semibold text-surface-900 mb-3">{feature.title}</h3>
                  <p className="text-surface-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-28 bg-brand-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-surface-900 mb-5">Ready to sync your project expectations?</h2>
              <p className="text-xl text-surface-600 mb-12 leading-relaxed">
                Join the teams that deliver projects on time, every time with ProjectSyncAI's intelligent management tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                {user ? (
                  <Link href="/dashboard" className="inline-flex items-center justify-center h-14 px-8 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-full transition-colors duration-200">
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link href="/register" className="inline-flex items-center justify-center h-14 px-8 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-full transition-colors duration-200">
                      Start Free Trial
                    </Link>
                    <Link href="/login" className="inline-flex items-center justify-center h-14 px-8 border-2 border-surface-200 hover:border-surface-300 text-surface-800 font-medium rounded-full transition-colors duration-200">
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 bg-white border-t border-surface-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-3 mb-8 md:mb-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-white">
                  <BarChart2 className="h-6 w-6" />
                </div>
                <span className="text-2xl font-semibold tracking-tight text-surface-900">ProjectSync<span className="text-brand-500">AI</span></span>
              </div>
              <div className="flex gap-10">
                <a href="#" className="text-surface-600 hover:text-surface-900 transition-colors duration-200 text-lg">About</a>
                <a href="#" className="text-surface-600 hover:text-surface-900 transition-colors duration-200 text-lg">Features</a>
                <a href="#" className="text-surface-600 hover:text-surface-900 transition-colors duration-200 text-lg">Pricing</a>
                <a href="#" className="text-surface-600 hover:text-surface-900 transition-colors duration-200 text-lg">Contact</a>
              </div>
            </div>
            <div className="mt-12 pt-10 border-t border-surface-100 text-center text-surface-500">
              © 2023 ProjectSyncAI. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}