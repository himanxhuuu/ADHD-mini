import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILesson extends Document {
  lessonId: string;
  topic: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  durationSeconds: number;
  variants: {
    text?: {
      sections: Array<{
        title: string;
        content: string;
        examples?: string[];
        quizPoints?: Array<{
          question: string;
          options: string[];
          correctIndex: number;
        }>;
      }>;
    };
    visualAudio?: {
      storyboard: Array<{
        slide: number;
        title: string;
        image: string;
        caption: string;
        audioScript: string;
        audioUrl?: string;
      }>;
      microQuizzes: Array<{
        timeOffset: number;
        type: "multiple_choice" | "true_false";
        prompt: string;
        options: string[];
        correctIndex: number;
      }>;
    };
    gamified?: {
      steps: Array<{
        step: number;
        type: "drag_drop" | "quick_tap" | "matching" | "sequence";
        prompt: string;
        successCriteria: string;
        reward: number;
        hint?: string;
        explanation?: string;
      }>;
      totalReward: number;
    };
  };
  metadata: {
    lastUpdated: Date;
    author: string;
    tags: string[];
    accessibility: {
      captions: boolean;
      transcripts: boolean;
      keyboardNav: boolean;
    };
  };
}

const LessonSchema = new Schema<ILesson>(
  {
    lessonId: { type: String, required: true, unique: true },
    topic: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
    durationSeconds: { type: Number, required: true },
    variants: {
      text: {
        sections: [
          {
            title: String,
            content: String,
            examples: [String],
            quizPoints: [
              {
                question: String,
                options: [String],
                correctIndex: Number,
              },
            ],
          },
        ],
      },
      visualAudio: {
        storyboard: [
          {
            slide: Number,
            title: String,
            image: String,
            caption: String,
            audioScript: String,
            audioUrl: String,
          },
        ],
        microQuizzes: [
          {
            timeOffset: Number,
            type: String,
            prompt: String,
            options: [String],
            correctIndex: Number,
          },
        ],
      },
      gamified: {
        steps: [
          {
            step: Number,
            type: String,
            prompt: String,
            successCriteria: String,
            reward: Number,
            hint: String,
            explanation: String,
          },
        ],
        totalReward: Number,
      },
    },
    metadata: {
      lastUpdated: { type: Date, default: Date.now },
      author: String,
      tags: [String],
      accessibility: {
        captions: { type: Boolean, default: true },
        transcripts: { type: Boolean, default: true },
        keyboardNav: { type: Boolean, default: true },
      },
    },
  },
  { timestamps: true }
);

LessonSchema.index({ lessonId: 1 });
LessonSchema.index({ topic: 1, difficulty: 1 });

export const Lesson: Model<ILesson> =
  mongoose.models.Lesson || mongoose.model<ILesson>("Lesson", LessonSchema);
