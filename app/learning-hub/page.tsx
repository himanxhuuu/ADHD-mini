"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Dashboard from "@/components/Dashboard";
import LessonPlayer from "@/components/LessonPlayer";
import ProgressReport from "@/components/ProgressReport";
import PersonalizationEngine from "@/components/PersonalizationEngine";
import ConsentModal from "@/components/ConsentModal";

export default function LearningHub() {
  const [currentView, setCurrentView] = useState<
    "dashboard" | "lesson" | "report"
  >("dashboard");
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<
    "text" | "visual_audio" | "gamified"
  >("text");
  const [showConsent, setShowConsent] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [learnerId] = useState("learner_123");

  // Mock ML data
  const [mlData, setMlData] = useState({
    adhdProbability: 0.65,
    confidence: 0.82,
    epistemicUncertainty: 0.03,
    recommendedAction: "visual_and_speech",
  });

  useEffect(() => {
    // Check if consent has been given
    const savedConsent = localStorage.getItem(`consent_${learnerId}`);
    if (savedConsent) {
      setConsentGiven(true);
    } else {
      setShowConsent(true);
    }
  }, [learnerId]);

  const handleConsent = (modalities: string[]) => {
    const consentData = {
      modalities,
      version: "v1.0_2024",
      timestamp: new Date().toISOString(),
      learnerId,
    };

    localStorage.setItem(`consent_${learnerId}`, JSON.stringify(consentData));
    setConsentGiven(true);
    setShowConsent(false);
  };

  const handleLessonStart = (lessonId: string) => {
    setSelectedLesson(lessonId);
    setCurrentView("lesson");
  };

  const handleLessonComplete = (sessionData: any) => {
    console.log("Lesson completed:", sessionData);
    // In real app, save to database
    setCurrentView("dashboard");
    setSelectedLesson(null);
  };

  const handleVariantChange = (
    variant: "text" | "visual_audio" | "gamified"
  ) => {
    setSelectedVariant(variant);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <Dashboard
            learnerId={learnerId}
            adhdProbability={mlData.adhdProbability}
            confidence={mlData.confidence}
            recommendedAction={mlData.recommendedAction}
          />
        );
      case "lesson":
        return selectedLesson ? (
          <div className="space-y-6">
            <PersonalizationEngine
              adhdProbability={mlData.adhdProbability}
              confidence={mlData.confidence}
              epistemicUncertainty={mlData.epistemicUncertainty}
              learnerId={learnerId}
              onVariantChange={handleVariantChange}
            />
            <LessonPlayer
              lessonId={selectedLesson}
              learnerId={learnerId}
              variant={selectedVariant}
              adhdProbability={mlData.adhdProbability}
              onComplete={handleLessonComplete}
            />
          </div>
        ) : null;
      case "report":
        return <ProgressReport learnerId={learnerId} />;
      default:
        return null;
    }
  };

  if (!consentGiven) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Privacy Consent Required
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Please review and accept our privacy policy to continue.
          </p>
          <button
            onClick={() => setShowConsent(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Review Privacy Policy
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <div className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                FocusFlow Learning Hub
              </h1>
              <nav className="flex gap-4">
                <button
                  onClick={() => setCurrentView("dashboard")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentView === "dashboard"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentView("report")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentView === "report"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  Reports
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Learner: {learnerId}
              </div>
              <button
                onClick={() => setShowConsent(true)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Privacy Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        key={currentView}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderCurrentView()}
      </motion.div>

      {/* Consent Modal */}
      <ConsentModal
        isOpen={showConsent}
        onClose={() => setShowConsent(false)}
        onConsent={handleConsent}
      />

      {/* Clinical Disclaimer Footer */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-t border-yellow-200 dark:border-yellow-800 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-sm text-yellow-800 dark:text-yellow-200">
            <span>⚠️</span>
            <span>
              <strong>Clinical Disclaimer:</strong> This is a learning platform
              with screening capabilities, not a diagnostic tool. ADHD can only
              be diagnosed by qualified healthcare professionals.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
