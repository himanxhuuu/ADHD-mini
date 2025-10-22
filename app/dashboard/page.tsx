"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getADHDLevel, getLearningMode } from '@/lib/adaptiveEngine'

interface UserProfile {
  name: string
  adhdScore?: number
  preferences: {
    preferredMode?: 'text' | 'visual' | 'audio'
  }
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [attention, setAttention] = useState(0.8)
  const [engagement, setEngagement] = useState(0.7)
  const [performance, setPerformance] = useState(0.6)
  const [mood, setMood] = useState(0.8)
  const [loading, setLoading] = useState(true)
  const [recentPredictions, setRecentPredictions] = useState<any[]>([])

  useEffect(() => {
    fetchProfile()
    fetchRecentPredictions()
    
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setAttention(prev => Math.max(0.1, Math.min(1, prev + (Math.random() - 0.5) * 0.1)))
      setEngagement(prev => Math.max(0.1, Math.min(1, prev + (Math.random() - 0.5) * 0.1)))
      setPerformance(prev => Math.max(0.1, Math.min(1, prev + (Math.random() - 0.5) * 0.1)))
      setMood(prev => Math.max(0.1, Math.min(1, prev + (Math.random() - 0.5) * 0.1)))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/user/profile')
      const data = await res.json()
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRecentPredictions = async () => {
    try {
      const res = await fetch('/api/realtime/predict?limit=3')
      if (res.ok) {
        const data = await res.json()
        setRecentPredictions(data.predictions || [])
      }
    } catch (error) {
      console.error('Error fetching predictions:', error)
    }
  }

  if (loading) return <div className="p-8">Loading...</div>

  const adhdLevel = profile?.adhdScore ? getADHDLevel(profile.adhdScore) : 'Low'
  const learningMode = profile?.adhdScore ? getLearningMode(profile.adhdScore, attention) : 'text'
  const attentionPercent = Math.round(attention * 100)
  const engagementPercent = Math.round(engagement * 100)
  const performancePercent = Math.round(performance * 100)
  const moodPercent = Math.round(mood * 100)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {profile?.name || 'Learner'}</h1>
          {profile?.adhdScore && profile.adhdScore > 70 && (
            <div className="mt-2 flex items-center space-x-2">
              <span className="text-sm text-blue-600 font-medium">🧠 ADHD-Friendly Mode Active</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                Enhanced for your learning style
              </span>
            </div>
          )}
        </div>
        <div className="text-sm text-gray-500">
          ADHD Level: <span className="font-semibold text-blue-600">{adhdLevel}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <motion.div 
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-l-4 border-blue-500 transition-colors"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-gray-500 dark:text-gray-400 text-sm mb-2">Current Focus Level</div>
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{attentionPercent}%</div>
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">Real-time tracking</div>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-l-4 border-green-500 transition-colors"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          <div className="text-gray-500 dark:text-gray-400 text-sm mb-2">Engagement Level</div>
          <div className="text-4xl font-bold text-green-600 dark:text-green-400">{engagementPercent}%</div>
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">AI predicted</div>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-l-4 border-purple-500 transition-colors"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          <div className="text-gray-500 dark:text-gray-400 text-sm mb-2">Performance Score</div>
          <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">{performancePercent}%</div>
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">ML predicted</div>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-l-4 border-orange-500 transition-colors"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        >
          <div className="text-gray-500 dark:text-gray-400 text-sm mb-2">Mood Level</div>
          <div className="text-4xl font-bold text-orange-600 dark:text-orange-400">{moodPercent}%</div>
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">Real-time</div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg transition-colors">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link href="/dashboard/gamified" className="block p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-medium text-yellow-800 dark:text-yellow-200">🎮 Gamified Dashboard</span>
                <span className="text-yellow-600 dark:text-yellow-400">→</span>
              </div>
              <p className="text-sm text-yellow-600 dark:text-yellow-300 mt-1">Earn points, badges & achievements!</p>
            </Link>
            <Link href="/dashboard/interactive-learning" className="block p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-medium text-blue-800 dark:text-blue-200">🎯 Interactive Learning</span>
                <span className="text-blue-600 dark:text-blue-400">→</span>
              </div>
              <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">ADHD-friendly multi-sensory activities</p>
            </Link>
            <Link href="/dashboard/content-hub" className="block p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-medium text-green-800 dark:text-green-200">📚 Content Hub</span>
                <span className="text-green-600 dark:text-green-400">→</span>
              </div>
              <p className="text-sm text-green-600 dark:text-green-300 mt-1">Interactive learning with pictures</p>
            </Link>
            <Link href="/dashboard/realtime" className="block p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-medium text-purple-800 dark:text-purple-200">📊 Real-Time Analytics</span>
                <span className="text-purple-600 dark:text-purple-400">→</span>
              </div>
              <p className="text-sm text-purple-600 dark:text-purple-300 mt-1">Live predictions and insights</p>
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg transition-colors">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent AI Predictions</h3>
          <div className="space-y-3">
            {recentPredictions.length > 0 ? (
              recentPredictions.map((prediction, index) => (
                <div key={index} className="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-800 dark:text-white capitalize">
                      {(prediction?.type ?? '').replace('_', ' ')}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {Math.round(prediction.confidence * 100)}% confidence
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Predicted: {Math.round(prediction.predictedValue * 100)}%
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                <p>No predictions yet</p>
                <p className="text-sm">Start using the app to see AI insights!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Learning Progress</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Lessons Completed</span>
              <span className="font-semibold">0/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Active Time</span>
              <span className="font-semibold">0 hours</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div>• Completed ADHD Assessment</div>
            <div>• Profile setup complete</div>
            <div>• Ready to start learning!</div>
          </div>
        </div>
      </div>
    </div>
  )
}

