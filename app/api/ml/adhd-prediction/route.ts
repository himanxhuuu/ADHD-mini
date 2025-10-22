import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ScreeningPrediction } from "@/models/ScreeningPrediction";
import { ActiveLearningCase } from "@/models/ActiveLearningCase";

// Import ML components (these would be Python modules in production)
// For now, we'll create a TypeScript implementation

interface LearnerData {
  demographic: {
    age: number;
    sex: "M" | "F" | "Other";
    primary_language: string;
  };
  behavioral: {
    on_task_ratio: number;
    fidget_events: number;
    attention_shift_count: number;
    time_on_task_seconds: number;
  };
  interaction: {
    clicks: number;
    scrolls: number;
    response_latency_ms: number;
    accuracy_pct: number;
  };
  screen_media: {
    video_watch_pct: number;
    audio_play_pct: number;
  };
  questionnaire: {
    inattention_score: number;
    hyperactivity_score: number;
    standardized_scale_name: string;
  };
  contextual: {
    session_time_of_day: string;
    device_type: string;
  };
  clinical_label?: {
    adhd_diagnosis: 0 | 1 | 2; // 0=no, 1=yes, 2=unknown
  };
  consent: {
    consent_given: boolean;
    consent_date: string;
  };
}

interface PredictionResult {
  adhd_probability: number;
  calibrated_confidence: number;
  top_features: Array<{
    feature: string;
    contribution: number;
    importance: number;
  }>;
  recommended_action:
    | "visual_and_speech"
    | "text"
    | "manual_review"
    | "recommend_evaluation";
  model_version: string;
  timestamp: string;
}

type GroupKey = {
  age_band: "lt8" | "8_12" | "13_17" | "18plus";
  sex: "M" | "F" | "Other";
  language: "English" | "NonEnglish";
};

class ADHDMLPredictor {
  private modelVersion = "v1.0_20241201";
  private defaultThresholds = {
    high: 0.7,
    medium: 0.4,
    minConfidence: 0.6,
  } as const;
  // Example per-subgroup thresholds (would be learned during calibration phase and stored)
  private subgroupThresholds = new Map<
    string,
    { high: number; medium: number }
  >();

  private featureWeights = {
    // Behavioral indicators
    on_task_ratio: -0.3,
    fidget_events: 0.4,
    attention_shift_count: 0.5,
    time_on_task_seconds: -0.2,

    // Interaction patterns
    clicks: 0.1,
    scrolls: 0.2,
    response_latency_ms: 0.3,
    accuracy_pct: -0.4,

    // Media preferences
    video_watch_pct: 0.1,
    audio_play_pct: 0.1,

    // Questionnaire scores
    inattention_score: 0.6,
    hyperactivity_score: 0.6,

    // Demographics
    age: -0.1, // Younger = higher risk
    is_male: 0.2,

    // Context
    morning_session: -0.1,
    mobile_device: 0.1,
  };

  predict(data: LearnerData): PredictionResult {
    // Feature engineering
    const features = this.engineerFeatures(data);

    // Calculate ADHD probability using weighted features
    let adhdScore = 0.5; // Base probability

    for (const [feature, weight] of Object.entries(this.featureWeights)) {
      const value = features[feature] || 0;
      adhdScore += value * weight;
    }

    // Normalize to 0-1 range
    const adhdProbability = Math.max(0, Math.min(1, adhdScore));

    // Lightweight epistemic uncertainty via mini-ensemble jitter
    const epistemic_uncertainty = this.estimateUncertainty(features);

    // Calculate confidence based on data quality
    const confidence = this.calculateConfidence(data, adhdProbability);

    // Get top contributing features
    const topFeatures = this.getTopFeatures(features, adhdProbability);

    // Determine recommended action
    const group = this.getGroupKey(data);
    const recommendedAction = this.determineAction(
      adhdProbability,
      confidence,
      epistemic_uncertainty,
      group
    );

    return {
      adhd_probability: adhdProbability,
      calibrated_confidence: confidence,
      // @ts-expect-error extend contract for uncertainty
      epistemic_uncertainty,
      top_features: topFeatures,
      recommended_action: recommendedAction,
      model_version: this.modelVersion,
      timestamp: new Date().toISOString(),
    };
  }

  private engineerFeatures(data: LearnerData): Record<string, number> {
    const {
      demographic,
      behavioral,
      interaction,
      screen_media,
      questionnaire,
      contextual,
    } = data;

    return {
      // Demographics
      age: demographic.age,
      is_male: demographic.sex === "M" ? 1 : 0,
      english_primary: demographic.primary_language === "English" ? 1 : 0,

      // Behavioral
      on_task_ratio: behavioral.on_task_ratio,
      fidget_events: behavioral.fidget_events,
      attention_shift_count: behavioral.attention_shift_count,
      time_on_task_seconds: behavioral.time_on_task_seconds,

      // Interaction
      clicks: interaction.clicks,
      scrolls: interaction.scrolls,
      response_latency_ms: interaction.response_latency_ms,
      accuracy_pct: interaction.accuracy_pct,

      // Media
      video_watch_pct: screen_media.video_watch_pct,
      audio_play_pct: screen_media.audio_play_pct,

      // Questionnaire
      inattention_score: questionnaire.inattention_score,
      hyperactivity_score: questionnaire.hyperactivity_score,

      // Context
      morning_session: contextual.session_time_of_day === "morning" ? 1 : 0,
      mobile_device: contextual.device_type === "mobile" ? 1 : 0,

      // Derived features
      attention_efficiency:
        behavioral.on_task_ratio / (behavioral.attention_shift_count + 1),
      fidget_rate:
        behavioral.fidget_events / (behavioral.time_on_task_seconds / 60 + 1),
      interaction_intensity:
        (interaction.clicks + interaction.scrolls) /
        (behavioral.time_on_task_seconds / 60 + 1),
      adhd_composite:
        (questionnaire.inattention_score + questionnaire.hyperactivity_score) /
        2,
    };
  }

  private calculateConfidence(data: LearnerData, probability: number): number {
    let confidence = 0.5; // Base confidence

    // More data = higher confidence
    if (data.behavioral.time_on_task_seconds > 300) confidence += 0.1;
    if (data.interaction.clicks > 10) confidence += 0.1;
    if (data.questionnaire.inattention_score > 0) confidence += 0.1;
    if (data.questionnaire.hyperactivity_score > 0) confidence += 0.1;

    // Recent data = higher confidence
    const now = new Date();
    const hour = now.getHours();
    if (hour >= 8 && hour <= 18) confidence += 0.1;

    // ADHD-specific confidence adjustments
    if (probability > 0.7) confidence += 0.1;
    if (probability < 0.3) confidence += 0.1;

    return Math.min(confidence, 0.95);
  }

  private getTopFeatures(
    features: Record<string, number>,
    probability: number
  ): Array<{
    feature: string;
    contribution: number;
    importance: number;
  }> {
    const contributions = Object.entries(features).map(([feature, value]) => {
      const weight = (this.featureWeights as any)[feature] || 0;
      const contribution = value * weight;
      return {
        feature,
        contribution,
        importance: Math.abs(contribution),
      };
    });

    return contributions
      .sort((a, b) => b.importance - a.importance)
      .slice(0, 5);
  }

  private determineAction(
    probability: number,
    confidence: number,
    epistemic_uncertainty: number,
    group: GroupKey
  ): "visual_and_speech" | "text" | "manual_review" | "recommend_evaluation" {
    const groupKey = `${group.age_band}|${group.sex}|${group.language}`;
    const groupThresh =
      this.subgroupThresholds.get(groupKey) || this.defaultThresholds;

    // Uncertainty gate overrides
    const uncertaintyThreshold = 0.05;
    if (
      confidence < this.defaultThresholds.minConfidence ||
      epistemic_uncertainty >= uncertaintyThreshold
    ) {
      return "manual_review";
    }

    if (probability >= groupThresh.high) {
      return "visual_and_speech";
    } else if (probability >= groupThresh.medium) {
      return "manual_review";
    } else {
      return "text";
    }
  }

  private getGroupKey(data: LearnerData): GroupKey {
    const age = data.demographic.age;
    const age_band: GroupKey["age_band"] =
      age < 8 ? "lt8" : age < 13 ? "8_12" : age < 18 ? "13_17" : "18plus";
    const sex = data.demographic.sex;
    const language: GroupKey["language"] =
      data.demographic.primary_language === "English"
        ? "English"
        : "NonEnglish";
    return { age_band, sex, language };
  }

  private estimateUncertainty(features: Record<string, number>): number {
    // Mini-ensemble with gaussian jitter to approximate epistemic uncertainty
    const weights = this.featureWeights as Record<string, number>;
    const runs = 8;
    const probs: number[] = [];
    for (let i = 0; i < runs; i++) {
      let score = 0.5;
      for (const [f, w] of Object.entries(weights)) {
        const v = (features[f] || 0) * (1 + (Math.random() - 0.5) * 0.05); // 5% noise
        score += v * w;
      }
      probs.push(Math.max(0, Math.min(1, score)));
    }
    const mean = probs.reduce((a, b) => a + b, 0) / probs.length;
    const variance =
      probs.reduce((s, p) => s + (p - mean) * (p - mean), 0) / probs.length;
    return variance; // use variance as epistemic proxy
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { learner_id, learner_data } = body;

    if (!learner_id || !learner_data) {
      return NextResponse.json(
        { error: "learner_id and learner_data are required" },
        { status: 400 }
      );
    }

    // Validate consent
    if (!learner_data.consent?.consent_given) {
      return NextResponse.json(
        { error: "Consent required for ADHD prediction" },
        { status: 403 }
      );
    }

    // Initialize predictor
    const predictor = new ADHDMLPredictor();

    // Make prediction
    const prediction = predictor.predict(learner_data);

    // Generate report
    const report = generateReport(learner_id, prediction, learner_data);

    // Store prediction in database (with uncertainty)
    const predictionRecord = new ScreeningPrediction({
      learnerId: learner_id,
      adhdProbability: prediction.adhd_probability,
      confidence: prediction.calibrated_confidence,
      epistemicUncertainty: (prediction as any).epistemic_uncertainty,
      recommendedAction: prediction.recommended_action,
      topFeatures: prediction.top_features,
      modelVersion: prediction.model_version,
      timestamp: new Date(),
    });

    await predictionRecord.save();

    // Active learning enqueue
    const prob = prediction.adhd_probability;
    const unc = (prediction as any).epistemic_uncertainty as number;
    const midBand = prob >= 0.35 && prob <= 0.75;
    const highUnc = unc >= 0.05;
    if (highUnc || midBand) {
      await ActiveLearningCase.create({
        learnerId: learner_id,
        adhdProbability: prob,
        confidence: prediction.calibrated_confidence,
        epistemicUncertainty: unc,
        reason: highUnc ? "high_uncertainty" : "mid_band_probability",
        modelVersion: prediction.model_version,
      });
    }

    return NextResponse.json({
      success: true,
      prediction,
      report,
      clinical_disclaimer:
        "⚠️ IMPORTANT: This is a screening tool, not a diagnostic instrument. ADHD can only be diagnosed by qualified healthcare professionals. If elevated probability is indicated, please consult with a healthcare provider for proper evaluation and support.",
    });
  } catch (error) {
    console.error("ADHD prediction error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function generateReport(
  learnerId: string,
  prediction: PredictionResult,
  learnerData: LearnerData
) {
  const {
    adhd_probability,
    calibrated_confidence,
    recommended_action,
    top_features,
  } = prediction;

  // Human-readable feature explanations
  const featureExplanations: Record<string, string> = {
    on_task_ratio: "Time spent focused on learning tasks",
    fidget_events: "Physical restlessness indicators",
    attention_shift_count: "Number of attention breaks",
    inattention_score: "Self-reported attention difficulties",
    hyperactivity_score: "Self-reported hyperactivity levels",
    response_latency_ms: "Time to respond to questions",
    video_watch_pct: "Preference for visual learning",
    audio_play_pct: "Preference for audio learning",
  };

  // Top contributing factors
  const contributingFactors = top_features.map((feature) => ({
    factor:
      featureExplanations[feature.feature] ||
      feature.feature
        .replace("_", " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
    contribution: feature.contribution,
    impact: feature.contribution > 0 ? "positive" : "negative",
  }));

  // Lesson format recommendations
  const lessonRecommendations = {
    visual_and_speech: {
      format: "Visual + Audio lessons",
      rationale:
        "High visual and audio support recommended for optimal learning",
      features: [
        "Animated diagrams and step-by-step visuals",
        "Audio narration for key concepts",
        "Interactive micro-tasks (2-5 minutes)",
        "Scheduled breaks and progress indicators",
        "Minimal distractions, large fonts",
      ],
    },
    text: {
      format: "Structured text lessons",
      rationale: "Text-based learning format is optimal",
      features: [
        "Clear headings and structure",
        "Example boxes and inline quizzes",
        "Progressive difficulty levels",
        "Optional visual supplements",
      ],
    },
    manual_review: {
      format: "Human review recommended",
      rationale: "Mixed indicators suggest professional evaluation",
      features: [
        "Flag for educator/clinician review",
        "Provide detailed behavioral data",
        "Recommend formal assessment",
        "Monitor learning patterns closely",
      ],
    },
    recommend_evaluation: {
      format: "Professional evaluation recommended",
      rationale: "High probability suggests need for professional assessment",
      features: [
        "Continue with supportive learning format",
        "Document patterns for healthcare provider",
        "Consider formal ADHD assessment",
        "Implement classroom accommodations",
      ],
    },
  };

  return {
    learner_id: learnerId,
    timestamp: prediction.timestamp,
    adhd_probability: adhd_probability,
    confidence: calibrated_confidence,
    recommended_action: recommended_action,
    contributing_factors: contributingFactors,
    lesson_recommendations: lessonRecommendations[recommended_action],
    rationale: generateRationale(
      recommended_action,
      adhd_probability,
      calibrated_confidence
    ),
    privacy_note:
      "Data used with explicit consent for educational support purposes only",
  };
}

function generateRationale(
  action: string,
  probability: number,
  confidence: number
): string {
  if (action === "visual_and_speech") {
    return `High ADHD probability (${(probability * 100).toFixed(
      1
    )}%) with strong confidence (${(confidence * 100).toFixed(
      1
    )}%) indicates visual and audio learning support will be most effective. This format provides the structure and engagement needed for optimal learning.`;
  } else if (action === "text") {
    return `Low ADHD probability (${(probability * 100).toFixed(
      1
    )}%) suggests standard text-based learning will be appropriate. This format allows for self-paced, structured learning.`;
  } else {
    return `Mixed indicators (probability: ${(probability * 100).toFixed(
      1
    )}%, confidence: ${(confidence * 100).toFixed(
      1
    )}%) suggest professional review is needed to determine the most effective learning approach.`;
  }
}
