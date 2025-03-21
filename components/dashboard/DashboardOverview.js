import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Users, AlertTriangle, CheckCircle, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react'

export default function DashboardOverview() {
  // In a real app, this data would come from an API or context
  const [stats, setStats] = useState({
    activeProjects: 0,
    clients: 0,
    risksIdentified: 0,
    completedProjects: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setStats({
        activeProjects: 8,
        clients: 12,
        risksIdentified: 24,
        completedProjects: 15,
      })
      setIsLoading(false)
    }, 1000)
  }, [])

  const statCards = [
    {
      name: 'Active Projects',
      value: stats.activeProjects,
      icon: Clock,
      color: 'sky',
      change: '+2 this month',
      trend: 'up',
      link: '/projects?status=active'
    },
    {
      name: 'Total Clients',
      value: stats.clients,
      icon: Users,
      color: 'brand',
      change: '+3 this year',
      trend: 'up',
      link: '/clients'
    },
    {
      name: 'Identified Risks',
      value: stats.risksIdentified,
      icon: AlertTriangle,
      color: 'amber',
      change: '5 mitigated',
      trend: 'neutral',
      link: '/risks'
    },
    {
      name: 'Completed Projects',
      value: stats.completedProjects,
      icon: CheckCircle,
      color: 'emerald',
      change: '+1 this month',
      trend: 'up',
      link: '/projects?status=completed'
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-emerald-500" />
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-500" />
    return null
  }

  const getIconColor = (color) => {
    const colorMap = {
      sky: 'text-sky-500',
      brand: 'text-brand-500',
      amber: 'text-amber-500',
      emerald: 'text-emerald-500'
    }
    return colorMap[color] || 'text-surface-500'
  }

  const getBgColor = (color) => {
    const colorMap = {
      sky: 'bg-sky-50',
      brand: 'bg-brand-50',
      amber: 'bg-amber-50',
      emerald: 'bg-emerald-50'
    }
    return colorMap[color] || 'bg-surface-100'
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((_, index) => (
          <div key={index} className="bg-white border border-surface-100 rounded-xl p-6 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-surface-100"></div>
              <div className="space-y-3 flex-1">
                <div className="h-4 bg-surface-100 rounded w-2/3"></div>
                <div className="h-6 bg-surface-100 rounded w-1/3"></div>
              </div>
            </div>
            <div className="mt-4">
              <div className="h-4 bg-surface-100 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {statCards.map((stat) => (
        <motion.div
          key={stat.name}
          variants={item}
          className="bg-white border border-surface-100 rounded-xl overflow-hidden group"
        >
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${getBgColor(stat.color)}`}>
                <stat.icon className={`h-6 w-6 ${getIconColor(stat.color)}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-surface-500">{stat.name}</p>
                <p className="mt-1 text-2xl font-semibold text-surface-900">{stat.value.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center text-xs font-medium">
                {getTrendIcon(stat.trend)}
                <span className="ml-1.5 text-surface-600">{stat.change}</span>
              </div>
              
              <a href={stat.link} className="flex items-center gap-1 text-xs font-medium text-surface-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span>View details</span>
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}