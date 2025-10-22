import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILearningSession extends Document {
  sessionId: string;
  learnerId: string;
  lessonId: string;
  variant: "text" | "visual_audio" | "gamified";
  startTime: Date;
  endTime?: Date;
  durationSeconds?: number;
  progress: {
    currentSlide?: number;
    completedSteps: number[];
    totalSteps: number;
    accuracy: number;
    engagementScore: number;
  };
  mlData: {
    adhdProbability: number;
    confidence: number;
    epistemicUncertainty: number;
    recommendedAction: string;
    modelVersion: string;
  };
  interactions: Array<{
    timestamp: Date;
    type: "quiz_answer" | "slide_view" | "audio_play" | "gamified_action";
    data: any;
    correct?: boolean;
  }>;
  consent: {
    modalities: string[];
    version: string;
    timestamp: Date;
  };
}

const LearningSessionSchema = new Schema<ILearningSession>(
  {
    sessionId: { type: String, required: true, unique: true },
    learnerId: { type: String, required: true, index: true },
    lessonId: { type: String, required: true },
    variant: {
      type: String,
      enum: ["text", "visual_audio", "gamified"],
      required: true,
    },
    startTime: { type: Date, required: true },
    endTime: Date,
    durationSeconds: Number,
    progress: {
      currentSlide: Number,
      completedSteps: [Number],
      totalSteps: { type: Number, required: true },
      accuracy: { type: Number, default: 0 },
      engagementScore: { type: Number, default: 0 },
    },
    mlData: {
      adhdProbability: { type: Number, required: true },
      confidence: { type: Number, required: true },
      epistemicUncertainty: { type: Number, required: true },
      recommendedAction: { type: String, required: true },
      modelVersion: { type: String, required: true },
    },
    interactions: [
      {
        timestamp: { type: Date, default: Date.now },
        type: String,
        data: Schema.Types.Mixed,
        correct: Boolean,
      },
    ],
    consent: {
      modalities: [String],
      version: String,
      timestamp: Date,
    },
  },
  { timestamps: true }
);

LearningSessionSchema.index({ learnerId: 1, startTime: -1 });
LearningSessionSchema.index({ sessionId: 1 });

export const LearningSession: Model<ILearningSession> =
  mongoose.models.LearningSession ||
  mongoose.model<ILearningSession>("LearningSession", LearningSessionSchema);
