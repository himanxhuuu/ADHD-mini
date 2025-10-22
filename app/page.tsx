"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-50 dark:opacity-40">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-64 w-[48rem] rounded-full bg-gradient-to-br from-blue-400/30 via-purple-400/30 to-pink-400/30 blur-3xl" />
      </div>
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <motion.h1
                className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                An ADHD-friendly AI tutor that adapts to you
              </motion.h1>
              <motion.p
                className="mt-4 text-lg text-slate-600 dark:text-slate-300"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
              >
                FocusFlow personalizes content, nudges, and pacing to your
                attention and engagement in real time.
              </motion.p>
              <motion.div
                className="mt-8 flex flex-wrap items-center gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Link
                  href="/signup"
                  className="px-5 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700"
                >
                  Get started free
                </Link>
                <Link
                  href="/dashboard"
                  className="px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Explore dashboard
                </Link>
              </motion.div>
              <div className="mt-6 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <span>✅ Designed for neurodivergent learners</span>
                <span>🧠 AI predictions</span>
                <span>🎮 Gamified progress</span>
              </div>
            </div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl p-4 bg-blue-50 dark:bg-blue-900/20">
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      Attention
                    </div>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      82%
                    </div>
                  </div>
                  <div className="rounded-xl p-4 bg-green-50 dark:bg-green-900/20">
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      Engagement
                    </div>
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      74%
                    </div>
                  </div>
                  <div className="rounded-xl p-4 bg-purple-50 dark:bg-purple-900/20">
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      Performance
                    </div>
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      68%
                    </div>
                  </div>
                  <div className="rounded-xl p-4 bg-orange-50 dark:bg-orange-900/20">
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      Mood
                    </div>
                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                      79%
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
