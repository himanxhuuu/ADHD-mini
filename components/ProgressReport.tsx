"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";

interface ProgressReportProps {
  learnerId: string;
  sessions?: any[];
}

export default function ProgressReport({
  learnerId,
  sessions = [],
}: ProgressReportProps) {
  const [reportData, setReportData] = useState<{
    learnerName: string;
    totalSessions: number;
    averageAccuracy: number;
    averageEngagement: number;
    improvementTrend: number;
    preferredVariant: string;
    adhdProbability: number;
    confidence: number;
    completedLessons: Array<{
      topic: string;
      accuracy: number;
      variant: string;
      date: string;
    }>;
    recentSessions: Array<{
      lesson: string;
      variant: string;
      accuracy: number;
      date: string;
      engagement?: number;
      duration?: number;
    }>;
  }>({
    learnerName: "Sample Learner",
    totalSessions: 0,
    averageAccuracy: 0,
    averageEngagement: 0,
    improvementTrend: 0,
    preferredVariant: "text",
    adhdProbability: 0.5,
    confidence: 0.8,
    completedLessons: [],
    recentSessions: [],
  });

  const [timeRange, setTimeRange] = useState("30d");

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setReportData({
      learnerName: "Alex Johnson",
      totalSessions: 12,
      averageAccuracy: 85,
      averageEngagement: 78,
      improvementTrend: 12,
      preferredVariant: "visual_audio",
      adhdProbability: 0.65,
      confidence: 0.82,
      completedLessons: [
        {
          topic: "Basic Fractions",
          accuracy: 90,
          variant: "visual_audio",
          date: "2024-01-20",
        },
        {
          topic: "Reading Comprehension",
          accuracy: 80,
          variant: "text",
          date: "2024-01-19",
        },
        {
          topic: "Multiplication Tables",
          accuracy: 95,
          variant: "gamified",
          date: "2024-01-18",
        },
      ],
      recentSessions: [
        {
          lesson: "Basic Fractions",
          date: "2024-01-20",
          accuracy: 90,
          engagement: 85,
          duration: 15,
          variant: "visual_audio",
        },
        {
          lesson: "Reading Comprehension",
          date: "2024-01-19",
          accuracy: 80,
          engagement: 75,
          duration: 12,
          variant: "text",
        },
        {
          lesson: "Multiplication Tables",
          date: "2024-01-18",
          accuracy: 95,
          engagement: 90,
          duration: 18,
          variant: "gamified",
        },
        {
          lesson: "Study Skills",
          date: "2024-01-17",
          accuracy: 75,
          engagement: 70,
          duration: 10,
          variant: "text",
        },
        {
          lesson: "Water Cycle",
          date: "2024-01-16",
          accuracy: 88,
          engagement: 82,
          duration: 14,
          variant: "visual_audio",
        },
      ],
    });
  }, [learnerId]);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.text("FocusFlow Learning Report", 20, 30);

    doc.setFontSize(12);
    doc.text(`Learner: ${reportData.learnerName}`, 20, 45);
    doc.text(`Report Date: ${new Date().toLocaleDateString()}`, 20, 55);

    // Summary Section
    doc.setFontSize(16);
    doc.text("Learning Summary", 20, 75);

    doc.setFontSize(10);
    doc.text(`Total Sessions: ${reportData.totalSessions}`, 20, 90);
    doc.text(`Average Accuracy: ${reportData.averageAccuracy}%`, 20, 100);
    doc.text(`Average Engagement: ${reportData.averageEngagement}%`, 20, 110);
    doc.text(`Improvement Trend: +${reportData.improvementTrend}%`, 20, 120);

    // ADHD Screening Results
    doc.setFontSize(16);
    doc.text("Screening Results", 20, 140);

    doc.setFontSize(10);
    doc.text(
      `ADHD Probability: ${(reportData.adhdProbability * 100).toFixed(1)}%`,
      20,
      155
    );
    doc.text(
      `Confidence: ${(reportData.confidence * 100).toFixed(1)}%`,
      20,
      165
    );
    doc.text(
      `Recommended Learning Style: ${reportData.preferredVariant.replace(
        "_",
        " "
      )}`,
      20,
      175
    );

    // Completed Lessons
    doc.setFontSize(16);
    doc.text("Completed Lessons", 20, 195);

    let yPos = 210;
    reportData.completedLessons.forEach((lesson, index) => {
      if (yPos > 280) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(
        `${index + 1}. ${lesson.topic} - ${lesson.accuracy}% accuracy`,
        20,
        yPos
      );
      yPos += 10;
    });

    // Clinical Disclaimer
    doc.setFontSize(12);
    doc.text("Important Clinical Disclaimer", 20, yPos + 20);
    doc.setFontSize(8);
    doc.text(
      "This report is based on screening data only and is not a diagnostic tool.",
      20,
      yPos + 30
    );
    doc.text(
      "ADHD can only be diagnosed by qualified healthcare professionals.",
      20,
      yPos + 40
    );
    doc.text(
      "If you have concerns, please consult with a healthcare provider.",
      20,
      yPos + 50
    );

    doc.save(
      `focusflow-report-${reportData.learnerName}-${
        new Date().toISOString().split("T")[0]
      }.pdf`
    );
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return "📈";
    if (trend < 0) return "📉";
    return "➡️";
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return "text-green-600";
    if (trend < 0) return "text-red-600";
    return "text-slate-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
                Progress Report
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                {reportData.learnerName} • Last 30 days
              </p>
            </div>
            <div className="flex gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <button
                onClick={generatePDF}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Export PDF
              </button>
            </div>
          </div>
        </motion.div>

        {/* Summary Cards */}
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
                  Total Sessions
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {reportData.totalSessions}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">📊</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Avg Accuracy
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {reportData.averageAccuracy}%
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">🎯</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Avg Engagement
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {reportData.averageEngagement}%
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold">⚡</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Improvement
                </p>
                <p
                  className={`text-2xl font-bold ${getTrendColor(
                    reportData.improvementTrend
                  )}`}
                >
                  {getTrendIcon(reportData.improvementTrend)}{" "}
                  {Math.abs(reportData.improvementTrend)}%
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold">📈</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ADHD Screening Results */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
              ADHD Screening Results
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-100">
                    Probability Score
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Based on behavioral patterns
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {(reportData.adhdProbability * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-slate-500">Screening only</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-100">
                    Confidence Level
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Model confidence
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {(reportData.confidence * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-slate-500">High confidence</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-100">
                    Recommended Style
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Optimal learning approach
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-purple-600 capitalize">
                    {reportData.preferredVariant.replace("_", " ")}
                  </div>
                  <div className="text-xs text-slate-500">Personalized</div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start gap-2">
                <span className="text-yellow-600 text-sm">⚠️</span>
                <div className="text-xs text-yellow-800 dark:text-yellow-200">
                  <strong>Clinical Note:</strong> This is a screening tool, not
                  a diagnostic instrument. For formal ADHD evaluation, consult a
                  qualified healthcare professional.
                </div>
              </div>
            </div>
          </motion.div>

          {/* Performance Trends */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
              Performance Trends
            </h2>

            <div className="space-y-3">
              {reportData.recentSessions.map((session, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-100">
                      {new Date(session.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                      {session.variant.replace("_", " ")} • {session.duration}{" "}
                      min
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-green-600">
                      {session.accuracy}%
                    </div>
                    <div className="text-sm text-slate-500">
                      {session.engagement}% engagement
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sparkline placeholder */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
              <div className="text-center">
                <div className="text-2xl mb-2">📈</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Performance trending upward over time
                </p>
                <div className="text-xs text-slate-500 mt-1">
                  +{reportData.improvementTrend}% improvement in last 30 days
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Completed Lessons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
            Completed Lessons
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reportData.completedLessons.map((lesson, index) => (
              <div
                key={index}
                className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg"
              >
                <h3 className="font-medium text-slate-800 dark:text-slate-100 mb-2">
                  {lesson.topic}
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400 capitalize">
                    {lesson.variant.replace("_", " ")}
                  </span>
                  <span className="font-semibold text-green-600">
                    {lesson.accuracy}%
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1">{lesson.date}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white"
        >
          <h2 className="text-xl font-semibold mb-4">Recommended Next Steps</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Learning Recommendations</h3>
              <ul className="text-blue-100 space-y-1 text-sm">
                <li>
                  • Continue with{" "}
                  {reportData.preferredVariant.replace("_", " ")} lessons
                </li>
                <li>
                  • Focus on maintaining {reportData.averageAccuracy}%+ accuracy
                </li>
                <li>• Try gamified challenges for engagement</li>
                <li>• Take regular breaks every 15-20 minutes</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Intervention Suggestions</h3>
              <ul className="text-blue-100 space-y-1 text-sm">
                <li>• Consider visual aids for complex topics</li>
                <li>• Use audio narration for better focus</li>
                <li>• Implement micro-learning sessions</li>
                <li>• Monitor attention patterns closely</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
