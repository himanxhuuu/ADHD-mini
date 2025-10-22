"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ILesson } from "@/models/Lesson";

interface LessonPlayerProps {
  lessonId: string;
  learnerId: string;
  variant?: "text" | "visual_audio" | "gamified";
  adhdProbability?: number;
  onComplete?: (sessionData: any) => void;
}

export default function LessonPlayer({
  lessonId,
  learnerId,
  variant = "text",
  adhdProbability = 0.5,
  onComplete,
}: LessonPlayerProps) {
  const [lesson, setLesson] = useState<ILesson | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [sessionData, setSessionData] = useState({
    startTime: new Date(),
    interactions: [] as any[],
    accuracy: 0,
    engagementScore: 0,
  });

  useEffect(() => {
    // Mock lesson data - in real app, fetch from API
    const mockLesson = {
      lessonId: "fractions_intro_v1",
      topic: "Basic Fractions",
      difficulty: "beginner",
      durationSeconds: 300,
      variants: {
        text: {
          sections: [
            {
              title: "What is a Fraction?",
              content:
                "A fraction represents parts of a whole. It has two numbers: a numerator (top) and denominator (bottom).",
              examples: ["1/2 means one half", "3/4 means three quarters"],
              quizPoints: [
                {
                  question: "What does the numerator represent?",
                  options: [
                    "Parts you have",
                    "Total parts",
                    "The whole",
                    "Nothing",
                  ],
                  correctIndex: 0,
                },
              ],
            },
            {
              title: "Visualizing Fractions",
              content:
                "Think of a pizza cut into equal slices. If you have 3 slices out of 8 total slices, you have 3/8 of the pizza.",
              examples: ["1/2 = half a pizza", "1/4 = quarter of a pizza"],
              quizPoints: [
                {
                  question:
                    "If a pizza has 6 slices and you eat 2, what fraction did you eat?",
                  options: ["2/6", "6/2", "1/3", "2/3"],
                  correctIndex: 0,
                },
              ],
            },
          ],
        },
        visualAudio: {
          storyboard: [
            {
              slide: 1,
              title: "What is a Fraction?",
              image: "/images/fractions/pizza-whole.svg",
              caption: "A whole pizza represents 1",
              audioScript:
                "Look at this whole pizza. This represents the number 1, or one whole.",
              audioUrl: "/audio/fractions/slide1.mp3",
            },
            {
              slide: 2,
              title: "Cutting the Pizza",
              image: "/images/fractions/pizza-halves.svg",
              caption: "Cut into 2 equal parts",
              audioScript:
                "Now I cut the pizza into 2 equal parts. Each part is called one half.",
              audioUrl: "/audio/fractions/slide2.mp3",
            },
            {
              slide: 3,
              title: "Numerator and Denominator",
              image: "/images/fractions/fraction-parts.svg",
              caption: "Top number = numerator, bottom = denominator",
              audioScript:
                "The top number tells us how many parts we have. The bottom number tells us how many total parts there are.",
              audioUrl: "/audio/fractions/slide3.mp3",
            },
          ],
          microQuizzes: [
            {
              timeOffset: 90,
              type: "multiple_choice",
              prompt: "Which number is the numerator in 3/4?",
              options: ["3", "4", "Both", "Neither"],
              correctIndex: 0,
            },
          ],
        },
        gamified: {
          steps: [
            {
              step: 1,
              type: "drag_drop",
              prompt: "Drag the shaded part to show 1/2",
              successCriteria: "correct_placement",
              reward: 10,
              hint: "Half means 1 out of 2 parts",
              explanation:
                "Great! You correctly identified that 1/2 means one part out of two equal parts.",
            },
            {
              step: 2,
              type: "quick_tap",
              prompt: "Tap the correct fraction for 3 slices out of 8",
              successCriteria: "tap_3_8",
              reward: 15,
              hint: "Count the slices you have vs total slices",
              explanation:
                "Perfect! 3/8 means you have 3 slices out of 8 total slices.",
            },
          ],
          totalReward: 25,
        },
      },
      metadata: {
        lastUpdated: new Date(),
        author: "FocusFlow Team",
        tags: ["math", "fractions", "beginner"],
        accessibility: {
          captions: true,
          transcripts: true,
          keyboardNav: true,
        },
      },
    };
    setLesson(mockLesson as any);
  }, [lessonId]);

  const handleQuizAnswer = (answerIndex: number) => {
    setQuizAnswer(answerIndex);
    const isCorrect = answerIndex === getCurrentQuiz()?.correctIndex;

    if (isCorrect) {
      setScore(score + 10);
    }

    // Log interaction
    setSessionData((prev) => ({
      ...prev,
      interactions: [
        ...prev.interactions,
        {
          timestamp: new Date(),
          type: "quiz_answer",
          data: { answerIndex, isCorrect },
          correct: isCorrect,
        },
      ],
    }));

    setTimeout(() => {
      setShowQuiz(false);
      setQuizAnswer(null);
      nextContent();
    }, 2000);
  };

  const getCurrentQuiz = () => {
    if (variant === "text" && lesson?.variants.text) {
      return lesson.variants.text.sections[currentSection]?.quizPoints?.[0];
    } else if (variant === "visual_audio" && lesson?.variants.visualAudio) {
      return lesson.variants.visualAudio.microQuizzes[currentSlide];
    }
    return null;
  };

  const nextContent = () => {
    if (variant === "text" && lesson?.variants.text) {
      if (currentSection < lesson.variants.text.sections.length - 1) {
        setCurrentSection(currentSection + 1);
      } else {
        completeLesson();
      }
    } else if (variant === "visual_audio" && lesson?.variants.visualAudio) {
      if (currentSlide < lesson.variants.visualAudio.storyboard.length - 1) {
        setCurrentSlide(currentSlide + 1);
      } else {
        completeLesson();
      }
    } else if (variant === "gamified" && lesson?.variants.gamified) {
      if (currentStep < lesson.variants.gamified.steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        completeLesson();
      }
    }
  };

  const completeLesson = () => {
    const endTime = new Date();
    const duration =
      (endTime.getTime() - sessionData.startTime.getTime()) / 1000;

    const finalSessionData = {
      ...sessionData,
      endTime,
      durationSeconds: duration,
      accuracy:
        (sessionData.interactions.filter((i) => i.correct).length /
          Math.max(sessionData.interactions.length, 1)) *
        100,
      engagementScore: Math.min(score * 2, 100),
    };

    onComplete?.(finalSessionData);
  };

  const renderTextVariant = () => {
    if (!lesson?.variants.text) return null;

    const section = lesson.variants.text.sections[currentSection];
    if (!section) return null;

    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
            {section.title}
          </h2>

          <div className="prose prose-slate dark:prose-invert max-w-none mb-6">
            <p className="text-lg leading-relaxed">{section.content}</p>
          </div>

          {section.examples && section.examples.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Examples:
              </h3>
              <ul className="list-disc list-inside text-blue-700 dark:text-blue-300">
                {section.examples.map((example, index) => (
                  <li key={index}>{example}</li>
                ))}
              </ul>
            </div>
          )}

          {section.quizPoints && section.quizPoints.length > 0 && (
            <div className="mt-6">
              <button
                onClick={() => setShowQuiz(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Take Quiz
              </button>
            </div>
          )}

          <div className="flex justify-between items-center mt-8">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Section {currentSection + 1} of{" "}
              {lesson.variants.text.sections.length}
            </div>
            <button
              onClick={nextContent}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {currentSection < lesson.variants.text.sections.length - 1
                ? "Next"
                : "Complete"}
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  const renderVisualAudioVariant = () => {
    if (!lesson?.variants.visualAudio) return null;

    const slide = lesson.variants.visualAudio.storyboard[currentSlide];
    if (!slide) return null;

    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              {slide.title}
            </h2>

            {/* Placeholder for image */}
            <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center mb-4">
              <div className="text-6xl">🍕</div>
            </div>

            <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
              {slide.caption}
            </p>
          </div>

          {/* Audio controls */}
          <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  {isPlaying ? "⏸️" : "▶️"}
                </button>
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-100">
                    Audio Narration
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {slide.audioScript}
                  </p>
                </div>
              </div>
              <div className="text-sm text-slate-500">
                Slide {currentSlide + 1} of{" "}
                {lesson.variants.visualAudio.storyboard.length}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={nextContent}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {currentSlide < lesson.variants.visualAudio.storyboard.length - 1
                ? "Next"
                : "Complete"}
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  const renderGamifiedVariant = () => {
    if (!lesson?.variants.gamified) return null;

    const step = lesson.variants.gamified.steps[currentStep];
    if (!step) return null;

    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-8 shadow-lg"
        >
          <div className="text-center mb-6">
            <div className="text-4xl mb-4">🎮</div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              Challenge {currentStep + 1}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
              {step.prompt}
            </p>
            <div className="text-sm text-purple-600 dark:text-purple-400">
              Reward: {step.reward} points
            </div>
          </div>

          {/* Gamified interaction area */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 mb-6 min-h-48 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🧩</div>
              <p className="text-slate-600 dark:text-slate-400">
                Interactive challenge area
              </p>
              <p className="text-sm text-slate-500 mt-2">
                {step.type.replace("_", " ")} challenge
              </p>
            </div>
          </div>

          {step.hint && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mb-6">
              <p className="text-yellow-800 dark:text-yellow-200">
                <strong>Hint:</strong> {step.hint}
              </p>
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Step {currentStep + 1} of {lesson.variants.gamified.steps.length}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => {
                  setScore(score + step.reward);
                  nextContent();
                }}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Complete Challenge
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  const renderQuiz = () => {
    const quiz = getCurrentQuiz();
    if (!quiz) return null;

    return (
      <AnimatePresence>
        {showQuiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-8 max-w-md w-full mx-4"
            >
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">
                Quick Quiz
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                {'prompt' in quiz ? quiz.prompt : quiz.question}
              </p>

              <div className="space-y-3">
                {quiz.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuizAnswer(index)}
                    disabled={quizAnswer !== null}
                    className={`w-full p-4 rounded-lg text-left transition-colors ${
                      quizAnswer === index
                        ? index === quiz.correctIndex
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {quizAnswer !== null && (
                <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <p className="text-blue-800 dark:text-blue-200">
                    {quizAnswer === quiz.correctIndex
                      ? "✅ Correct!"
                      : "❌ Try again next time!"}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">
            Loading lesson...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 py-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {lesson.topic}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 capitalize">
              {variant.replace("_", " ")} mode • Score: {score} points
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              ADHD Probability: {(adhdProbability * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-slate-500">
              Recommended: {variant.replace("_", " ")}
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      {variant === "text" && renderTextVariant()}
      {variant === "visual_audio" && renderVisualAudioVariant()}
      {variant === "gamified" && renderGamifiedVariant()}

      {/* Quiz Modal */}
      {renderQuiz()}
    </div>
  );
}
