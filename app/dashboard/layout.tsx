import { ReactNode } from 'react'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-12 bg-white dark:bg-slate-900 transition-colors">
      <aside className="col-span-3 md:col-span-2 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 p-4 space-y-3 transition-colors">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-gray-900 dark:text-white">FocusFlow</div>
          <ThemeToggle />
        </div>
        <nav className="space-y-2">
          <Link className="block px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-colors" href="/dashboard">Overview</Link>
          <Link className="block px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-colors" href="/dashboard/gamified">🎮 Gamified Dashboard</Link>
          <Link className="block px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-colors" href="/dashboard/interactive-learning">🎯 Interactive Learning</Link>
          <Link className="block px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-colors" href="/dashboard/content-hub">Content Hub</Link>
          <Link className="block px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-colors" href="/dashboard/realtime">Real-Time Analytics</Link>
          <Link className="block px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-colors" href="/learn">Learning Hub</Link>
          <Link className="block px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-colors" href="/adhd-test">ADHD Test</Link>
          <Link className="block px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-colors" href="/dashboard/attention">Attention Tracker</Link>
          <Link className="block px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-colors" href="/dashboard/reports">Reports</Link>
          <Link className="block px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-colors" href="/dashboard/settings">Settings</Link>
        </nav>
      </aside>
      <main className="col-span-9 md:col-span-10 p-6 bg-gray-50 dark:bg-slate-900 transition-colors">{children}</main>
    </div>
  )
}

