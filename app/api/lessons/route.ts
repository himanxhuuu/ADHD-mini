import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Lesson } from "@/models/Lesson";
import { LearningSession } from "@/models/LearningSession";
import { LearnerProgress } from "@/models/LearnerProgress";
import seedLessons from "@/lib/seedLessons";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // Seed lessons if they don't exist
    const existingLessons = await Lesson.countDocuments();
    if (existingLessons === 0) {
      await Lesson.insertMany(seedLessons);
      console.log("Seeded lessons successfully");
    }

    const lessons = await Lesson.find({}).select(
      "lessonId topic difficulty durationSeconds variants metadata"
    );

    return NextResponse.json({
      success: true,
      lessons: lessons.map((lesson) => ({
        id: lesson.lessonId,
        topic: lesson.topic,
        difficulty: lesson.difficulty,
        duration: lesson.durationSeconds,
        variants: Object.keys(lesson.variants),
        tags: lesson.metadata.tags,
      })),
    });
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch lessons" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { learnerId, lessonId, variant, mlData, consent } = body;

    await connectToDatabase();

    // Create new learning session
    const sessionId = `session_${Date.now()}_${learnerId}`;
    const session = new LearningSession({
      sessionId,
      learnerId,
      lessonId,
      variant,
      startTime: new Date(),
      progress: {
        totalSteps: 0,
        completedSteps: [],
        accuracy: 0,
        engagementScore: 0,
      },
      mlData: {
        adhdProbability: mlData.adhdProbability,
        confidence: mlData.confidence,
        epistemicUncertainty: mlData.epistemicUncertainty,
        recommendedAction: mlData.recommendedAction,
        modelVersion: "v1.0_2024",
      },
      interactions: [],
      consent: {
        modalities: consent.modalities,
        version: consent.version,
        timestamp: new Date(consent.timestamp),
      },
    });

    await session.save();

    return NextResponse.json({
      success: true,
      sessionId,
      message: "Learning session started",
    });
  } catch (error) {
    console.error("Error starting learning session:", error);
    return NextResponse.json(
      { success: false, error: "Failed to start learning session" },
      { status: 500 }
    );
  }
}
