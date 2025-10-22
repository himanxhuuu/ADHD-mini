"use client"
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface InteractiveModule {
  id: string
  title: string
  description: string
  type: 'visual' | 'kinesthetic' | 'auditory' | 'mixed'
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedTime: number
  adhdFriendly: boolean
  interactive: boolean
  rewards: {
    points: number
    badges: string[]
  }
  content: {
    images?: string[]
    sounds?: string[]
    interactive?: any
  }
}

export default function InteractiveLearning() {
  const [modules, setModules] = useState<InteractiveModule[]>([])
  const [selectedModule, setSelectedModule] = useState<InteractiveModule | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [feedback, setFeedback] = useState<string>('')
  const [showReward, setShowReward] = useState(false)

  useEffect(() => {
    loadModules()
  }, [])

  const loadModules = () => {
    const adhdFriendlyModules: InteractiveModule[] = [
      {
        id: 'visual-math',
        title: '🎨 Visual Math Adventure',
        description: 'Learn math through colorful, interactive visualizations',
        type: 'visual',
        difficulty: 'easy',
        estimatedTime: 10,
        adhdFriendly: true,
        interactive: true,
        rewards: { points: 100, badges: ['🎨', '🧮'] },
        content: {
          images: [
            'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop'
          ],
          interactive: {
            type: 'visual_math',
            problems: [
              { question: 'How many colorful circles do you see?', answer: 5, image: 'circles' },
              { question: 'Count the triangles in the pattern', answer: 8, image: 'triangles' }
            ]
          }
        }
      },
      {
        id: 'kinesthetic-science',
        title: '🔬 Hands-On Science Lab',
        description: 'Explore science through interactive experiments and movements',
        type: 'kinesthetic',
        difficulty: 'medium',
        estimatedTime: 15,
        adhdFriendly: true,
        interactive: true,
        rewards: { points: 150, badges: ['🔬', '⚗️'] },
        content: {
          images: [
            'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop'
          ],
          interactive: {
            type: 'kinesthetic_science',
            experiments: [
              { name: 'Color Mixing', action: 'mix_colors', duration: 30 },
              { name: 'Sound Waves', action: 'create_sounds', duration: 45 }
            ]
          }
        }
      },
      {
        id: 'auditory-story',
        title: '🎵 Musical Story Journey',
        description: 'Learn through music, sounds, and interactive storytelling',
        type: 'auditory',
        difficulty: 'easy',
        estimatedTime: 12,
        adhdFriendly: true,
        interactive: true,
        rewards: { points: 120, badges: ['🎵', '📚'] },
        content: {
          sounds: ['nature', 'music', 'story'],
          interactive: {
            type: 'auditory_story',
            story: {
              title: 'The Musical Forest',
              chapters: [
                { text: 'Listen to the forest sounds...', sound: 'nature' },
                { text: 'Follow the musical notes...', sound: 'music' }
              ]
            }
          }
        }
      },
      {
        id: 'mixed-adventure',
        title: '🌟 Multi-Sensory Adventure',
        description: 'Combine visual, auditory, and kinesthetic learning',
        type: 'mixed',
        difficulty: 'hard',
        estimatedTime: 20,
        adhdFriendly: true,
        interactive: true,
        rewards: { points: 200, badges: ['🌟', '🏆'] },
        content: {
          images: [
            'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
          ],
          sounds: ['adventure', 'success'],
          interactive: {
            type: 'mixed_adventure',
            challenges: [
              { type: 'visual', task: 'Find the hidden objects', points: 50 },
              { type: 'auditory', task: 'Follow the sound clues', points: 50 },
              { type: 'kinesthetic', task: 'Complete the movement sequence', points: 50 }
            ]
          }
        }
      }
    ]

    setModules(adhdFriendlyModules)
  }

  const startModule = (module: InteractiveModule) => {
    setSelectedModule(module)
    setCurrentStep(0)
    setScore(0)
    setTimeLeft(module.estimatedTime * 60) // Convert to seconds
    setIsActive(true)
    setFeedback('')
  }

  const completeStep = (stepScore: number) => {
    setScore(prev => prev + stepScore)
    setCurrentStep(prev => prev + 1)
    
    // Provide immediate feedback
    if (stepScore > 0) {
      setFeedback('🎉 Great job! Keep it up!')
    } else {
      setFeedback('💪 Try again! You can do it!')
    }

    // Clear feedback after 2 seconds
    setTimeout(() => setFeedback(''), 2000)

    // Check if module is complete
    if (selectedModule && currentStep >= (selectedModule.content.interactive?.problems?.length || 3)) {
      completeModule()
    }
  }

  const completeModule = () => {
    setIsActive(false)
    setShowReward(true)
    
    // Send achievement data
    fetch('/api/gamification/check-achievements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dataType: 'activity',
        value: score / 100, // Normalize score
        metadata: {
          moduleId: selectedModule?.id,
          score: score,
          completed: true
        }
      })
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'visual': return '👁️'
      case 'kinesthetic': return '✋'
      case 'auditory': return '👂'
      case 'mixed': return '🌟'
      default: return '📚'
    }
  }

  if (selectedModule && isActive) {
    return (
      <ModulePlayer
        module={selectedModule}
        currentStep={currentStep}
        score={score}
        timeLeft={timeLeft}
        feedback={feedback}
        onCompleteStep={completeStep}
        onExit={() => {
          setSelectedModule(null)
          setIsActive(false)
        }}
      />
    )
  }

  if (showReward) {
    return (
      <RewardScreen
        module={selectedModule!}
        score={score}
        onContinue={() => {
          setShowReward(false)
          setSelectedModule(null)
        }}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          🎮 Interactive Learning Hub
        </h1>
        <p className="text-gray-600 text-lg">
          Designed specifically for ADHD learners with multi-sensory experiences!
        </p>
      </div>

      {/* ADHD-Friendly Features */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 transition-colors">
        <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
          🧠 ADHD-Friendly Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🎯</div>
            <div>
              <div className="font-medium text-gray-800 dark:text-white">Short Sessions</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">10-20 minute focused activities</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🎨</div>
            <div>
              <div className="font-medium text-gray-800 dark:text-white">Multi-Sensory</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Visual, auditory, and kinesthetic</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🏆</div>
            <div>
              <div className="font-medium text-gray-800 dark:text-white">Instant Rewards</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Points, badges, and achievements</div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
            onClick={() => startModule(module)}
          >
            {/* Module Image */}
            {module.content.images && module.content.images.length > 0 && (
              <div className="relative h-48 w-full">
                <Image
                  src={module.content.images[0]}
                  alt={module.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 flex space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(module.difficulty)}`}>
                    {module.difficulty}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                    {getTypeIcon(module.type)} {module.type}
                  </span>
                </div>
              </div>
            )}

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{module.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{module.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>⏱️ {module.estimatedTime} min</span>
                  <span>🎯 {module.rewards.points} pts</span>
                </div>
                <div className="flex space-x-1">
                  {module.rewards.badges.map((badge, idx) => (
                    <span key={idx} className="text-lg">{badge}</span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-green-600 dark:text-green-400 font-medium">ADHD-Friendly</span>
                  <span className="text-green-500 dark:text-green-400">✓</span>
                </div>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-800 dark:hover:to-purple-800 transition-all">
                  Start Learning
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ModulePlayer({ module, currentStep, score, timeLeft, feedback, onCompleteStep, onExit }: any) {
  const [userAnswer, setUserAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)

  const handleSubmit = () => {
    const correctAnswer = module.content.interactive.problems[currentStep]?.answer
    const isCorrect = parseInt(userAnswer) === correctAnswer
    const stepScore = isCorrect ? 20 : 0
    
    setShowResult(true)
    onCompleteStep(stepScore)
    
    setTimeout(() => {
      setShowResult(false)
      setUserAnswer('')
    }, 2000)
  }

  const currentProblem = module.content.interactive.problems[currentStep]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4 transition-colors">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full p-8 transition-colors">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{module.title}</h2>
            <p className="text-gray-600 dark:text-gray-300">Step {currentStep + 1} of {module.content.interactive.problems.length}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{score} pts</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Score</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-6">
          <motion.div
            className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / module.content.interactive.problems.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Problem */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{currentProblem?.question}</h3>
          
          {/* Visual Problem */}
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 mb-6 transition-colors">
            <div className="text-6xl">🔢</div>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Interactive visual problem here</p>
          </div>

          {/* Answer Input */}
          <div className="space-y-4">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter your answer..."
              className="w-full max-w-xs px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white rounded-lg text-center text-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              disabled={showResult}
            />
            
            <button
              onClick={handleSubmit}
              disabled={!userAnswer || showResult}
              className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-800 dark:hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          </div>
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center text-lg font-medium text-green-600 dark:text-green-400 mb-4"
            >
              {feedback}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center mb-6"
            >
              <div className="text-4xl mb-2">
                {parseInt(userAnswer) === currentProblem?.answer ? '🎉' : '💪'}
              </div>
              <p className="text-lg font-medium text-gray-800 dark:text-white">
                {parseInt(userAnswer) === currentProblem?.answer 
                  ? 'Correct! Well done!' 
                  : 'Not quite! The answer is ' + currentProblem?.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Exit Button */}
        <div className="text-center">
          <button
            onClick={onExit}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-medium transition-colors"
          >
            Exit Module
          </button>
        </div>
      </div>
    </div>
  )
}

function RewardScreen({ module, score, onContinue }: any) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4 transition-colors">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-8 text-center transition-colors"
      >
        <div className="text-6xl mb-4">🏆</div>
        <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Module Complete!</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">You finished {module.title}</p>
        
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-lg p-6 mb-6 transition-colors">
          <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">+{score} Points!</div>
          <div className="text-lg text-orange-700 dark:text-orange-300">Great job learning!</div>
        </div>

        <div className="flex justify-center space-x-2 mb-6">
          {module.rewards.badges.map((badge: string, index: number) => (
            <div key={index} className="text-3xl">{badge}</div>
          ))}
        </div>

        <button
          onClick={onContinue}
          className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-800 dark:hover:to-purple-800 transition-all"
        >
          Continue Learning
        </button>
      </motion.div>
    </div>
  )
}
