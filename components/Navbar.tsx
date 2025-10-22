"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import ThemeToggle, { ThemeToggleCompact } from "./ThemeToggle";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-800">
      <nav className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <motion.span
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold"
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                F
              </motion.span>
              <span className="font-semibold text-slate-800 dark:text-slate-100">
                FocusFlow
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-1 ml-4">
              <Link
                href="/dashboard"
                className="px-3 py-2 rounded-md text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Dashboard
              </Link>
              <Link
                href="/learn"
                className="px-3 py-2 rounded-md text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Learn
              </Link>
              <Link
                href="/adhd-test"
                className="px-3 py-2 rounded-md text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                ADHD Test
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            <div className="sm:hidden">
              <ThemeToggleCompact />
            </div>
            <Link
              href="/login"
              className="px-3 py-2 rounded-md text-sm border border-slate-200 dark:border-slate-700"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-3 py-2 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
