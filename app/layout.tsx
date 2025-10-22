import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "FocusFlow – AI Tutor for Neurodivergent Learners",
  description: "Personalized, adaptive learning with attention-aware support.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 text-slate-800 dark:text-slate-200 transition-colors">
        <ThemeProvider>
          <Navbar />
          <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
