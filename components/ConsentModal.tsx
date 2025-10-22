"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConsent: (modalities: string[]) => void;
}

export default function ConsentModal({
  isOpen,
  onClose,
  onConsent,
}: ConsentModalProps) {
  const [selectedModalities, setSelectedModalities] = useState<string[]>([
    "behavior",
    "questionnaire",
  ]);
  const [consentVersion, setConsentVersion] = useState("v1.0_2024");

  const modalities = [
    {
      id: "behavior",
      name: "Behavioral Data",
      description:
        "Track learning interactions, response times, and engagement patterns",
      required: true,
    },
    {
      id: "questionnaire",
      name: "Questionnaire Responses",
      description: "Store answers to learning assessments and feedback forms",
      required: true,
    },
    {
      id: "audio",
      name: "Audio Data",
      description:
        "Record and analyze speech patterns for learning optimization",
      required: false,
    },
    {
      id: "video",
      name: "Video Data",
      description: "Capture screen interactions and visual attention patterns",
      required: false,
    },
  ];

  const handleModalityToggle = (modalityId: string) => {
    const modality = modalities.find((m) => m.id === modalityId);
    if (modality?.required) return; // Can't toggle required modalities

    setSelectedModalities((prev) =>
      prev.includes(modalityId)
        ? prev.filter((id) => id !== modalityId)
        : [...prev, modalityId]
    );
  };

  const handleConsent = () => {
    onConsent(selectedModalities);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-slate-800 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="text-center mb-6">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Privacy & Consent
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            We respect your privacy. Please choose which data types you're
            comfortable sharing.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {modalities.map((modality) => (
            <div
              key={modality.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedModalities.includes(modality.id)
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : modality.required
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : "border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-slate-800 dark:text-slate-100">
                      {modality.name}
                    </h3>
                    {modality.required && (
                      <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {modality.description}
                  </p>
                </div>
                <div className="ml-4">
                  {modality.required ? (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleModalityToggle(modality.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        selectedModalities.includes(modality.id)
                          ? "border-blue-500 bg-blue-500"
                          : "border-slate-300 dark:border-slate-600"
                      }`}
                    >
                      {selectedModalities.includes(modality.id) && (
                        <span className="text-white text-sm">✓</span>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Privacy Information */}
        <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-slate-800 dark:text-slate-100 mb-2">
            How We Protect Your Data
          </h3>
          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
            <li>• All data is encrypted in transit and at rest</li>
            <li>• Personal identifiers are anonymized</li>
            <li>• Data is only used for learning optimization</li>
            <li>• You can withdraw consent at any time</li>
            <li>• We comply with GDPR and COPPA regulations</li>
          </ul>
        </div>

        {/* Clinical Disclaimer */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-2">
            <span className="text-yellow-600 text-sm">⚠️</span>
            <div className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Important:</strong> This learning platform uses screening
              data to personalize your experience. It is not a diagnostic tool.
              ADHD can only be diagnosed by qualified healthcare professionals.
              If you have concerns, please consult with a healthcare provider.
            </div>
          </div>
        </div>

        {/* Consent Version */}
        <div className="text-xs text-slate-500 dark:text-slate-400 mb-6 text-center">
          Consent Version: {consentVersion} • Last Updated:{" "}
          {new Date().toLocaleDateString()}
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConsent}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            I Consent
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
