import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILearnerProgress extends Document {
  learnerId: string;
  totalPoints: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  badges: string[];
  completedLessons: string[];
  performanceMetrics: {
    averageAccuracy: number;
    averageEngagement: number;
    totalLearningTime: number;
    improvementTrend: number;
  };
  personalizationSettings: {
    preferredVariant: "text" | "visual_audio" | "gamified" | "auto";
    manualOverride?: boolean;
    accessibilityPrefs: {
      fontSize: "small" | "medium" | "large";
      highContrast: boolean;
      captions: boolean;
      narrationSpeed: number;
    };
  };
  lastActiveDate: Date;
}

const LearnerProgressSchema = new Schema<ILearnerProgress>(
  {
    learnerId: { type: String, required: true, unique: true, index: true },
    totalPoints: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    badges: [String],
    completedLessons: [String],
    performanceMetrics: {
      averageAccuracy: { type: Number, default: 0 },
      averageEngagement: { type: Number, default: 0 },
      totalLearningTime: { type: Number, default: 0 },
      improvementTrend: { type: Number, default: 0 },
    },
    personalizationSettings: {
      preferredVariant: {
        type: String,
        enum: ["text", "visual_audio", "gamified", "auto"],
        default: "auto",
      },
      manualOverride: { type: Boolean, default: false },
      accessibilityPrefs: {
        fontSize: {
          type: String,
          enum: ["small", "medium", "large"],
          default: "medium",
        },
        highContrast: { type: Boolean, default: false },
        captions: { type: Boolean, default: true },
        narrationSpeed: { type: Number, default: 1.0, min: 0.5, max: 2.0 },
      },
    },
    lastActiveDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

LearnerProgressSchema.index({ learnerId: 1 });
LearnerProgressSchema.index({ totalPoints: -1 }); // For leaderboards

export const LearnerProgress: Model<ILearnerProgress> =
  mongoose.models.LearnerProgress ||
  mongoose.model<ILearnerProgress>("LearnerProgress", LearnerProgressSchema);
