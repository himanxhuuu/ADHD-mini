"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface PersonalizationEngineProps {
  adhdProbability: number;
  confidence: number;
  epistemicUncertainty: number;
  learnerId: string;
  onVariantChange: (variant: "text" | "visual_audio" | "gamified") => void;
}

export default function PersonalizationEngine({
  adhdProbability,
  confidence,
  epistemicUncertainty,
  learnerId,
  onVariantChange,
}: PersonalizationEngineProps) {
  const [recommendedVariant, setRecommendedVariant] = useState<
    "text" | "visual_audio" | "gamified"
  >("text");
  const [manualOverride, setManualOverride] = useState(false);
  const [thresholds, setThresholds] = useState({
    high: 0.7,
    medium: 0.4,
    uncertaintyThreshold: 0.05,
  });

  useEffect(() => {
    determineRecommendedVariant();
  }, [adhdProbability, confidence, epistemicUncertainty]);

  const determineRecommendedVariant = () => {
    // High ADHD probability with high confidence
    if (
      adhdProbability >= thresholds.high &&
      epistemicUncertainty < thresholds.uncertaintyThreshold
    ) {
      setRecommendedVariant("visual_audio");
    }
    // Medium ADHD probability or high uncertainty
    else if (
      (adhdProbability >= thresholds.medium &&
        adhdProbability < thresholds.high) ||
      epistemicUncertainty >= thresholds.uncertaintyThreshold
    ) {
      setRecommendedVariant("gamified"); // Mixed mode with gamification
    }
    // Low ADHD probability
    else {
      setRecommendedVariant("text");
    }

    onVariantChange(recommendedVariant);
  };

  const getPersonalizationMessage = () => {
    if (
      adhdProbability >= thresholds.high &&
      epistemicUncertainty < thresholds.uncertaintyThreshold
    ) {
      return {
        message: "Visual + Audio lessons recommended for optimal learning",
        icon: "🎨",
        color: "blue",
        details:
          "High ADHD probability detected. Visual and audio content with interactive elements will help maintain focus and engagement.",
      };
    } else if (
      (adhdProbability >= thresholds.medium &&
        adhdProbability < thresholds.high) ||
      epistemicUncertainty >= thresholds.uncertaintyThreshold
    ) {
      return {
        message: "Gamified learning approach recommended",
        icon: "🎮",
        color: "purple",
        details:
          "Medium ADHD probability or high uncertainty. Gamified elements with mixed content types will provide flexible learning options.",
      };
    } else {
      return {
        message: "Text-based lessons work well for you",
        icon: "📚",
        color: "green",
        details:
          "Low ADHD probability detected. Traditional text-based learning with optional multimedia elements is recommended.",
      };
    }
  };

  const handleManualOverride = (
    variant: "text" | "visual_audio" | "gamified"
  ) => {
    setManualOverride(true);
    setRecommendedVariant(variant);
    onVariantChange(variant);
  };

  const resetToAutomatic = () => {
    setManualOverride(false);
    determineRecommendedVariant();
  };

  const personalizationInfo = getPersonalizationMessage();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Learning Personalization
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {manualOverride ? "Manual" : "Automatic"}
          </span>
          {manualOverride && (
            <button
              onClick={resetToAutomatic}
              className="text-xs text-blue-600 hover:text-blue-700"
            >
              Reset to Auto
            </button>
          )}
        </div>
      </div>

      {/* Current Recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-lg p-4 mb-4 border-2 ${
          personalizationInfo.color === "blue"
            ? "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20"
            : personalizationInfo.color === "purple"
            ? "border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-900/20"
            : "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
        }`}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{personalizationInfo.icon}</span>
          <div>
            <p className="font-medium text-slate-800 dark:text-slate-100">
              {personalizationInfo.message}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {personalizationInfo.details}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-400 mt-2">
          <div>ADHD Prob: {(adhdProbability * 100).toFixed(1)}%</div>
          <div>Confidence: {(confidence * 100).toFixed(1)}%</div>
          <div>Uncertainty: {(epistemicUncertainty * 100).toFixed(1)}%</div>
        </div>
      </motion.div>

      {/* Manual Override Options */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Manual Override (Teacher/Parent)
        </h4>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleManualOverride("text")}
            className={`p-3 rounded-lg border-2 transition-all ${
              recommendedVariant === "text"
                ? "border-blue-500 bg-blue-100 dark:bg-blue-900/30"
                : "border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"
            }`}
          >
            <div className="text-center">
              <div className="text-xl mb-1">📚</div>
              <div className="text-xs font-medium">Text</div>
            </div>
          </button>

          <button
            onClick={() => handleManualOverride("visual_audio")}
            className={`p-3 rounded-lg border-2 transition-all ${
              recommendedVariant === "visual_audio"
                ? "border-blue-500 bg-blue-100 dark:bg-blue-900/30"
                : "border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"
            }`}
          >
            <div className="text-center">
              <div className="text-xl mb-1">🎨</div>
              <div className="text-xs font-medium">Visual+Audio</div>
            </div>
          </button>

          <button
            onClick={() => handleManualOverride("gamified")}
            className={`p-3 rounded-lg border-2 transition-all ${
              recommendedVariant === "gamified"
                ? "border-blue-500 bg-blue-100 dark:bg-blue-900/30"
                : "border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"
            }`}
          >
            <div className="text-center">
              <div className="text-xl mb-1">🎮</div>
              <div className="text-xs font-medium">Gamified</div>
            </div>
          </button>
        </div>
      </div>

      {/* Template Parameters */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Lesson Template Parameters
        </h4>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <div className="text-slate-600 dark:text-slate-400">
              Segment Length:
            </div>
            <div className="font-medium">
              {recommendedVariant === "visual_audio"
                ? "60-90s"
                : recommendedVariant === "gamified"
                ? "45-60s"
                : "90-120s"}
            </div>
          </div>
          <div>
            <div className="text-slate-600 dark:text-slate-400">
              Interactivity:
            </div>
            <div className="font-medium">
              {recommendedVariant === "visual_audio"
                ? "Every 45-60s"
                : recommendedVariant === "gamified"
                ? "Continuous"
                : "Every 2-3 min"}
            </div>
          </div>
          <div>
            <div className="text-slate-600 dark:text-slate-400">
              Visual Density:
            </div>
            <div className="font-medium">
              {recommendedVariant === "visual_audio"
                ? "High"
                : recommendedVariant === "gamified"
                ? "Medium"
                : "Low"}
            </div>
          </div>
          <div>
            <div className="text-slate-600 dark:text-slate-400">Narration:</div>
            <div className="font-medium">
              {recommendedVariant === "visual_audio"
                ? "Always On"
                : recommendedVariant === "gamified"
                ? "Optional"
                : "Off"}
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Disclaimer */}
      <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <div className="flex items-start gap-2">
          <span className="text-yellow-600 text-sm">⚠️</span>
          <div className="text-xs text-yellow-800 dark:text-yellow-200">
            <strong>Clinical Note:</strong> This personalization is based on
            screening data only. For formal ADHD evaluation, consult a qualified
            healthcare professional.
          </div>
        </div>
      </div>
    </div>
  );
}
