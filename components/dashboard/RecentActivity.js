import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, MessageSquare, FileEdit, Clock, CheckCircle, User, ArrowUpRight } from 'lucide-react'

export default function RecentActivity() {
  const [isLoading, setIsLoading] = useState(true)
  const [activities, setActivities] = useState([])

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setActivities([
        {
          id: 1,
          type: 'comment',
          user: 'Alex Morgan',
          project: 'Website Redesign',
          content: 'Added comments on the design proposal',
          time: '10 minutes ago',
          avatar: 'A'
        },
        {
          id: 2,
          type: 'update',
          user: 'Jamie Wilson',
          project: 'Mobile App Development',
          content: 'Updated project timeline',
          time: '1 hour ago',
          avatar: 'J'
        },
        {
          id: 3,
          type: 'completed',
          user: 'Taylor Swift',
          project: 'Marketing Campaign',
          content: 'Completed milestone: "Content Creation"',
          time: '3 hours ago',
          avatar: 'T'
        },
        {
          id: 4,
          type: 'comment',
          user: 'Casey Brown',
          project: 'CRM Integration',
          content: 'Left feedback on implementation plan',
          time: '5 hours ago',
          avatar: 'C'
        },
        {
          id: 5,
          type: 'update',
          user: 'Riley Johnson',
          project: 'Product Launch',
          content: 'Updated resource allocation',
          time: 'Yesterday',
          avatar: 'R'
        }
      ])
      setIsLoading(false)
    }, 1500)
  }, [])

  const getActivityIcon = (type) => {
    switch (type) {
      case 'comment':
        return <MessageSquare className="h-4 w-4 text-sky-500" />
      case 'update':
        return <FileEdit className="h-4 w-4 text-amber-500" />
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-emerald-500" />
      default:
        return <Clock className="h-4 w-4 text-brand-500" />
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'comment':
        return 'bg-sky-50 border-sky-100'
      case 'update':
        return 'bg-amber-50 border-amber-100'
      case 'completed':
        return 'bg-emerald-50 border-emerald-100'
      default:
        return 'bg-brand-50 border-brand-100'
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="h-full bg-white border border-surface-100 rounded-xl overflow-hidden flex flex-col">
      <div className="border-b border-surface-100 px-5 py-4">
        <h3 className="text-lg font-medium text-surface-900">Recent Activity</h3>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="flex flex-col items-center">
            <Loader2 className="h-6 w-6 text-brand-500 animate-spin" />
            <p className="mt-3 text-sm text-surface-500">Loading activity...</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-auto px-5 py-4">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {activities.map((activity) => (
              <motion.div
                key={activity.id}
                variants={item}
                className="flex gap-3"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="relative">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                      {activity.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <p className="font-medium text-surface-900 text-sm truncate">
                      {activity.user}
                    </p>
                    <span className="text-xs text-surface-500 whitespace-nowrap ml-2">
                      {activity.time}
                    </span>
                  </div>
                  
                  <p className="text-sm text-surface-700 mt-0.5 truncate">
                    {activity.content}
                  </p>
                  
                  <p className="text-xs text-surface-500 mt-1">
                    on <span className="text-brand-600">{activity.project}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      <div className="border-t border-surface-100 px-5 py-4 mt-auto">
        <a href="/activity" className="inline-flex items-center justify-center w-full text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors duration-200 py-1.5 rounded-lg hover:bg-brand-50">
          View all activity
          <ArrowUpRight className="ml-1.5 h-4 w-4" />
        </a>
      </div>
    </div>
  )
}