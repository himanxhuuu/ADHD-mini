import mongoose, { Schema, Document, Model } from "mongoose";

export interface IScreeningPrediction extends Document {
  learnerId: string;
  adhdProbability: number;
  confidence: number;
  epistemicUncertainty?: number;
  recommendedAction:
    | "visual_and_speech"
    | "text"
    | "manual_review"
    | "recommend_evaluation";
  topFeatures: Array<{
    feature: string;
    contribution: number;
    importance: number;
  }>;
  modelVersion: string;
  timestamp: Date;
}

const ScreeningPredictionSchema = new Schema<IScreeningPrediction>(
  {
    learnerId: { type: String, required: true, index: true },
    adhdProbability: { type: Number, required: true, min: 0, max: 1 },
    confidence: { type: Number, required: true, min: 0, max: 1 },
    epistemicUncertainty: { type: Number },
    recommendedAction: { type: String, required: true },
    topFeatures: [
      { feature: String, contribution: Number, importance: Number },
    ],
    modelVersion: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

ScreeningPredictionSchema.index({ learnerId: 1, timestamp: -1 });

export const ScreeningPrediction: Model<IScreeningPrediction> =
  mongoose.models.ScreeningPrediction ||
  mongoose.model<IScreeningPrediction>(
    "ScreeningPrediction",
    ScreeningPredictionSchema
  );
