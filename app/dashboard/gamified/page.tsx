"use client"
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface UserProgress {
  totalPoints: number
  level: number
  currentStreak: number
  longestStreak: number
  focusStreak: number
  learningStreak: number
  totalLearningTime: number
  completedActivities: number
  highScores: {
    attention: number
    engagement: number
    performance: number
  }
  badges: string[]
  weeklyGoal: number
  dailyGoal: number
  recentAchievements: any[]
}

interface Achievement {
  _id: string
  title: string
  description: string
  icon: string
  points: number
  unlockedAt: string
  achievementType: string
}

export default function GamifiedDashboard() {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [recentAchievements, setRecentAchievements] = useState<Achievement[]>([])
  const [currentMetrics, setCurrentMetrics] = useState({
    attention: 0.5,
    engagement: 0.5,
    performance: 0.5,
    mood: 0.5
  })
  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProgress()
    startRealTimeUpdates()
    
    return () => {
      // Cleanup
    }
  }, [])

  const fetchProgress = async () => {
    try {
      const response = await fetch('/api/gamification/progress')
      if (response.ok) {
        const data = await response.json()
        setProgress(data.progress)
        setRecentAchievements(data.progress.recentAchievements || [])
      }
    } catch (error) {
      console.error('Error fetching progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const startRealTimeUpdates = () => {
    const interval = setInterval(async () => {
      // Simulate real-time data updates
      const newMetrics = {
        attention: Math.max(0, Math.min(1, currentMetrics.attention + (Math.random() - 0.5) * 0.1)),
        engagement: Math.max(0, Math.min(1, currentMetrics.engagement + (Math.random() - 0.5) * 0.1)),
        performance: Math.max(0, Math.min(1, currentMetrics.performance + (Math.random() - 0.5) * 0.1)),
        mood: Math.max(0, Math.min(1, currentMetrics.mood + (Math.random() - 0.5) * 0.1))
      }
      
      setCurrentMetrics(newMetrics)

      // Check for achievements
      try {
        const achievementResponse = await fetch('/api/gamification/check-achievements', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dataType: 'attention',
            value: newMetrics.attention,
            metadata: { timestamp: new Date().toISOString() }
          })
        })

        if (achievementResponse.ok) {
          const achievementData = await achievementResponse.json()
          if (achievementData.achievements && achievementData.achievements.length > 0) {
            setShowAchievement(achievementData.achievements[0])
            fetchProgress() // Refresh progress
          }
        }
      } catch (error) {
        console.error('Error checking achievements:', error)
      }
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }

  const getLevelProgress = () => {
    if (!progress) return 0
    const currentLevelPoints = (progress.level - 1) * 1000
    const nextLevelPoints = progress.level * 1000
    const progressPoints = progress.totalPoints - currentLevelPoints
    const levelRange = nextLevelPoints - currentLevelPoints
    return Math.min((progressPoints / levelRange) * 100, 100)
  }

  const getStreakEmoji = (streak: number) => {
    if (streak >= 30) return '🔥🔥🔥'
    if (streak >= 14) return '🔥🔥'
    if (streak >= 7) return '🔥'
    if (streak >= 3) return '⚡'
    return '💪'
  }

  const getMetricColor = (value: number) => {
    if (value >= 0.8) return 'text-green-600'
    if (value >= 0.6) return 'text-yellow-600'
    if (value >= 0.4) return 'text-orange-600'
    return 'text-red-600'
  }

  const getMetricEmoji = (value: number) => {
    if (value >= 0.8) return '🌟'
    if (value >= 0.6) return '👍'
    if (value >= 0.4) return '😐'
    return '😴'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Achievement Popup */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -100 }}
            className="fixed top-4 right-4 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-xl shadow-2xl max-w-sm"
          >
            <div className="text-center">
              <div className="text-4xl mb-2">{showAchievement.icon}</div>
              <h3 className="text-xl font-bold mb-2">{showAchievement.title}</h3>
              <p className="text-sm mb-2">{showAchievement.description}</p>
              <div className="text-lg font-bold">+{showAchievement.points} points!</div>
            </div>
            <button
              onClick={() => setShowAchievement(null)}
              className="absolute top-2 right-2 text-white hover:text-gray-200"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🎮 Your Learning Adventure
          </h1>
          <p className="text-gray-600">Level up your learning with fun challenges!</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{progress?.totalPoints || 0} pts</div>
          <div className="text-sm text-gray-500">Total Points</div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-xl p-6 text-white transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">Level {progress?.level || 1}</h2>
            <p className="text-blue-100 dark:text-blue-200">Keep learning to level up!</p>
          </div>
          <div className="text-3xl">🏆</div>
        </div>
        <div className="w-full bg-blue-300 dark:bg-blue-400 rounded-full h-4 mb-2">
          <motion.div
            className="bg-white dark:bg-gray-100 h-4 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${getLevelProgress()}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="text-sm text-blue-100 dark:text-blue-200">
          {progress?.totalPoints || 0} / {(progress?.level || 1) * 1000} points to next level
        </div>
      </div>

      {/* Streaks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-l-4 border-orange-500 transition-colors"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">Learning Streak</div>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {progress?.learningStreak || 0} days
              </div>
            </div>
            <div className="text-3xl">{getStreakEmoji(progress?.learningStreak || 0)}</div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-l-4 border-green-500 transition-colors"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">Focus Streak</div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {progress?.focusStreak || 0} days
              </div>
            </div>
            <div className="text-3xl">🎯</div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-l-4 border-purple-500 transition-colors"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">Activities</div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {progress?.completedActivities || 0}
              </div>
            </div>
            <div className="text-3xl">🎮</div>
          </div>
        </motion.div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(currentMetrics).map(([key, value]) => (
          <motion.div
            key={key}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg transition-colors"
            animate={{ 
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              ]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              delay: Object.keys(currentMetrics).indexOf(key) * 0.2
            }}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">{getMetricEmoji(value)}</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm mb-1 capitalize">{key}</div>
              <div className={`text-2xl font-bold ${getMetricColor(value)}`}>
                {Math.round(value * 100)}%
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Achievements */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg transition-colors">
        <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
          🏆 Recent Achievements
        </h2>
        {recentAchievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentAchievements.map((achievement, index) => (
              <motion.div
                key={achievement._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{achievement.description}</p>
                    <div className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                      +{achievement.points} points
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <div className="text-4xl mb-2">🎯</div>
            <p>Complete activities to earn achievements!</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-600 dark:to-blue-600 rounded-xl p-6 text-white transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <h3 className="text-xl font-bold mb-2">🚀 Start Learning</h3>
          <p className="text-green-100 dark:text-green-200 mb-4">Jump into interactive activities and earn points!</p>
          <button className="bg-white dark:bg-gray-100 text-green-600 dark:text-green-700 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 dark:hover:bg-green-200 transition-colors">
            Explore Content Hub
          </button>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 rounded-xl p-6 text-white transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <h3 className="text-xl font-bold mb-2">📊 View Analytics</h3>
          <p className="text-purple-100 dark:text-purple-200 mb-4">See your learning progress and insights!</p>
          <button className="bg-white dark:bg-gray-100 text-purple-600 dark:text-purple-700 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 dark:hover:bg-purple-200 transition-colors">
            View Analytics
          </button>
        </motion.div>
      </div>
    </div>
  )
}
