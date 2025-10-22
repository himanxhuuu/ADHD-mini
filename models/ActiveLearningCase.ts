import mongoose, { Schema, Document, Model } from "mongoose";

export interface IActiveLearningCase extends Document {
  learnerId: string;
  adhdProbability: number;
  confidence: number;
  epistemicUncertainty: number;
  reason: "high_uncertainty" | "mid_band_probability" | "large_jump";
  modelVersion: string;
  status: "pending" | "labeled" | "dismissed";
  correctorRole?: "clinician" | "teacher" | "parent";
  correctionLabel?: 0 | 1;
  correctionConfidence?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ActiveLearningCaseSchema = new Schema<IActiveLearningCase>(
  {
    learnerId: { type: String, required: true, index: true },
    adhdProbability: { type: Number, required: true },
    confidence: { type: Number, required: true },
    epistemicUncertainty: { type: Number, required: true },
    reason: {
      type: String,
      enum: ["high_uncertainty", "mid_band_probability", "large_jump"],
      required: true,
    },
    modelVersion: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "labeled", "dismissed"],
      default: "pending",
    },
    correctorRole: { type: String, enum: ["clinician", "teacher", "parent"] },
    correctionLabel: { type: Number, enum: [0, 1] },
    correctionConfidence: { type: Number, min: 0, max: 1 },
  },
  { timestamps: true }
);

ActiveLearningCaseSchema.index({ status: 1, createdAt: -1 });

export const ActiveLearningCase: Model<IActiveLearningCase> =
  mongoose.models.ActiveLearningCase ||
  mongoose.model<IActiveLearningCase>(
    "ActiveLearningCase",
    ActiveLearningCaseSchema
  );
