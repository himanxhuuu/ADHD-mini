"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface DashboardProps {
  learnerId: string;
  adhdProbability?: number;
  confidence?: number;
  recommendedAction?: string;
}

export default function Dashboard({
  learnerId,
  adhdProbability = 0.5,
  confidence = 0.8,
  recommendedAction = "text",
}: DashboardProps) {
  const [progress, setProgress] = useState({
    totalPoints: 0,
    level: 1,
    currentStreak: 0,
    completedLessons: 0,
    averageAccuracy: 0,
  });

  const [recentSessions, setRecentSessions] = useState<Array<{
    lesson: string;
    variant: string;
    accuracy: number;
    date: string;
  }>>([]);
  const [availableLessons, setAvailableLessons] = useState<Array<{
    id: string;
    topic: string;
    difficulty: string;
    completed: boolean;
  }>>([]);

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setProgress({
      totalPoints: 150,
      level: 2,
      currentStreak: 5,
      completedLessons: 3,
      averageAccuracy: 85,
    });

    setRecentSessions([
      {
        lesson: "Basic Fractions",
        variant: "visual_audio",
        accuracy: 90,
        date: "2024-01-20",
      },
      {
        lesson: "Reading Comprehension",
        variant: "text",
        accuracy: 80,
        date: "2024-01-19",
      },
      {
        lesson: "Multiplication Tables",
        variant: "gamified",
        accuracy: 95,
        date: "2024-01-18",
      },
    ]);

    setAvailableLessons([
      {
        id: "fractions_intro_v1",
        topic: "Basic Fractions",
        difficulty: "beginner",
        completed: true,
      },
      {
        id: "reading_main_idea_v1",
        topic: "Reading Comprehension",
        difficulty: "beginner",
        completed: true,
      },
      {
        id: "multiplication_tables_v1",
        topic: "Short Multiplication",
        difficulty: "beginner",
        completed: true,
      },
      {
        id: "water_cycle_v1",
        topic: "Science: Water Cycle",
        difficulty: "intermediate",
        completed: false,
      },
      {
        id: "spelling_phonics_v1",
        topic: "Spelling & Phonics",
        difficulty: "beginner",
        completed: false,
      },
      {
        id: "study_skills_focus_v1",
        topic: "Study Skills",
        difficulty: "intermediate",
        completed: false,
      },
    ]);
  }, []);

  const getPersonalizationMessage = () => {
    if (adhdProbability >= 0.7) {
      return "🎯 Visual + Audio lessons recommended for optimal learning";
    } else if (adhdProbability >= 0.4) {
      return "⚖️ Mixed learning approach - you can choose your preferred style";
    } else {
      return "📚 Text-based lessons work well for you";
    }
  };

  const getConfidenceColor = (conf: number) => {
    if (conf >= 0.8) return "text-green-600";
    if (conf >= 0.6) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Ready to continue your learning journey?
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Total Points
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {progress.totalPoints}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">🏆</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Level
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {progress.level}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold">⭐</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Current Streak
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {progress.currentStreak}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold">🔥</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Accuracy
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {progress.averageAccuracy}%
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">🎯</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Personalization Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Learning Personalization
              </h3>
              <p className="text-blue-100">{getPersonalizationMessage()}</p>
              <div className="mt-2 text-sm text-blue-100">
                ADHD Probability: {(adhdProbability * 100).toFixed(1)}% |
                Confidence:{" "}
                <span className={getConfidenceColor(confidence)}>
                  {(confidence * 100).toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl mb-1">
                {adhdProbability >= 0.7
                  ? "🎨"
                  : adhdProbability >= 0.4
                  ? "⚖️"
                  : "📚"}
              </div>
              <div className="text-sm text-blue-100 capitalize">
                {recommendedAction.replace("_", " ")}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Lessons */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
              Available Lessons
            </h2>
            <div className="space-y-3">
              {availableLessons.map((lesson, index) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                    lesson.completed
                      ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                      : "border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-slate-800 dark:text-slate-100">
                        {lesson.topic}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                        {lesson.difficulty} level
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {lesson.completed && (
                        <span className="text-green-600 text-lg">✅</span>
                      )}
                      <Link
                        href={`/learn/${lesson.id}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        {lesson.completed ? "Review" : "Start"}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Sessions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
              Recent Sessions
            </h2>
            <div className="space-y-3">
              {recentSessions.map((session, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-slate-800 dark:text-slate-100">
                        {session.lesson}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {session.date} • {session.variant.replace("_", " ")}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-green-600">
                        {session.accuracy}%
                      </div>
                      <div className="text-xs text-slate-500">accuracy</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <Link
                href="/reports"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View detailed progress report →
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Clinical Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4"
        >
          <div className="flex items-start gap-3">
            <span className="text-yellow-600 text-lg">⚠️</span>
            <div className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Important:</strong> This is a screening tool, not a
              diagnostic instrument. ADHD can only be diagnosed by qualified
              healthcare professionals. If you have concerns, please consult
              with a healthcare provider for proper evaluation and support.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
