import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { LearningSession } from "@/models/LearningSession";
import { LearnerProgress } from "@/models/LearnerProgress";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      sessionId,
      interactions,
      accuracy,
      engagementScore,
      completedSteps,
    } = body;

    await connectToDatabase();

    // Update learning session
    const session = await LearningSession.findOne({ sessionId });
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Session not found" },
        { status: 404 }
      );
    }

    session.endTime = new Date();
    session.durationSeconds = Math.floor(
      (session.endTime.getTime() - session.startTime.getTime()) / 1000
    );
    session.progress.accuracy = accuracy;
    session.progress.engagementScore = engagementScore;
    session.progress.completedSteps = completedSteps;
    session.interactions = interactions;

    await session.save();

    // Update learner progress
    let learnerProgress = await LearnerProgress.findOne({
      learnerId: session.learnerId,
    });
    if (!learnerProgress) {
      learnerProgress = new LearnerProgress({
        learnerId: session.learnerId,
        totalPoints: 0,
        level: 1,
        currentStreak: 0,
        longestStreak: 0,
        badges: [],
        completedLessons: [],
        performanceMetrics: {
          averageAccuracy: 0,
          averageEngagement: 0,
          totalLearningTime: 0,
          improvementTrend: 0,
        },
        personalizationSettings: {
          preferredVariant: "auto",
          manualOverride: false,
          accessibilityPrefs: {
            fontSize: "medium",
            highContrast: false,
            captions: true,
            narrationSpeed: 1.0,
          },
        },
      });
    }

    // Update metrics
    const totalSessions = await LearningSession.countDocuments({
      learnerId: session.learnerId,
    });
    const avgAccuracy = await LearningSession.aggregate([
      { $match: { learnerId: session.learnerId } },
      { $group: { _id: null, avgAccuracy: { $avg: "$progress.accuracy" } } },
    ]);

    const avgEngagement = await LearningSession.aggregate([
      { $match: { learnerId: session.learnerId } },
      {
        $group: {
          _id: null,
          avgEngagement: { $avg: "$progress.engagementScore" },
        },
      },
    ]);

    learnerProgress.performanceMetrics.averageAccuracy =
      avgAccuracy[0]?.avgAccuracy || 0;
    learnerProgress.performanceMetrics.averageEngagement =
      avgEngagement[0]?.avgEngagement || 0;
    learnerProgress.performanceMetrics.totalLearningTime +=
      session.durationSeconds;
    learnerProgress.lastActiveDate = new Date();

    // Add completed lesson if not already present
    if (!learnerProgress.completedLessons.includes(session.lessonId)) {
      learnerProgress.completedLessons.push(session.lessonId);
    }

    // Calculate improvement trend (simplified)
    const recentSessions = await LearningSession.find({
      learnerId: session.learnerId,
    })
      .sort({ startTime: -1 })
      .limit(5);

    if (recentSessions.length >= 2) {
      const recentAvg =
        recentSessions
          .slice(0, 3)
          .reduce((sum, s) => sum + s.progress.accuracy, 0) / 3;
      const olderAvg =
        recentSessions
          .slice(3)
          .reduce((sum, s) => sum + s.progress.accuracy, 0) /
        Math.max(recentSessions.length - 3, 1);
      learnerProgress.performanceMetrics.improvementTrend =
        recentAvg - olderAvg;
    }

    await learnerProgress.save();

    return NextResponse.json({
      success: true,
      message: "Session completed successfully",
      metrics: {
        accuracy: accuracy,
        engagement: engagementScore,
        duration: session.durationSeconds,
        improvementTrend: learnerProgress.performanceMetrics.improvementTrend,
      },
    });
  } catch (error) {
    console.error("Error completing session:", error);
    return NextResponse.json(
      { success: false, error: "Failed to complete session" },
      { status: 500 }
    );
  }
}
