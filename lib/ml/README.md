# ADHD Prediction ML System

A comprehensive machine learning system for predicting ADHD likelihood in learners and personalizing lesson formats accordingly.

## 🎯 System Overview

This ML system provides:

- **High-performing, explainable classifier** for ADHD probability prediction
- **Personalization engine** for adaptive lesson formats
- **Comprehensive reporting** with clinical disclaimers
- **Continuous monitoring** and model improvement
- **Fairness tracking** across demographic subgroups

## 🏗️ Architecture

### Core Components

1. **ADHDPredictor** (`adhd_predictor.py`)

   - XGBoost ensemble with calibration
   - SHAP explainability
   - Feature engineering pipeline
   - Uncertainty quantification

2. **PersonalizationEngine** (`personalization_engine.py`)

   - Rule-based lesson format recommendations
   - UI adaptation rules
   - Session structure optimization

3. **ModelMonitor** (`monitoring_system.py`)

   - Performance tracking
   - Data drift detection
   - Active learning queries
   - Fairness monitoring

4. **API Integration** (`/api/ml/adhd-prediction/route.ts`)
   - RESTful API endpoint
   - Real-time predictions
   - Report generation

## 📊 Model Performance

### Target Metrics

- **AUC-ROC**: ≥ 0.85
- **Sensitivity**: ≥ 0.80 at operational threshold
- **Calibration**: Brier score < 0.25
- **Fairness**: AUC gap < 0.10 across subgroups

### Evaluation Framework

- Stratified cross-validation
- Bootstrap confidence intervals
- Subgroup fairness analysis
- Drift detection monitoring

## 🔧 Usage

### Training the Model

```python
from lib.ml.adhd_predictor import ADHDPredictor
import pandas as pd

# Load training data
data = pd.read_csv('training_data.csv')
X = data.drop(['adhd_diagnosis'], axis=1)
y = data['adhd_diagnosis']

# Train model
predictor = ADHDPredictor()
results = predictor.train(X, y)

# Save model
predictor.save_model('adhd_model.pkl')
```

### Making Predictions

```python
# Load trained model
predictor = ADHDPredictor()
predictor.load_model('adhd_model.pkl')

# Make prediction
learner_data = {
    'age': 15,
    'sex': 'M',
    'on_task_ratio': 0.7,
    'fidget_events': 8,
    # ... other features
}

prediction = predictor.predict(pd.DataFrame([learner_data]))
```

### API Usage

```bash
curl -X POST http://localhost:3000/api/ml/adhd-prediction \
  -H "Content-Type: application/json" \
  -d '{
    "learner_id": "learner_001",
    "learner_data": {
      "demographic": {
        "age": 15,
        "sex": "M",
        "primary_language": "English"
      },
      "behavioral": {
        "on_task_ratio": 0.7,
        "fidget_events": 8,
        "attention_shift_count": 12,
        "time_on_task_seconds": 300
      },
      "interaction": {
        "clicks": 25,
        "scrolls": 15,
        "response_latency_ms": 2000,
        "accuracy_pct": 85
      },
      "screen_media": {
        "video_watch_pct": 0.6,
        "audio_play_pct": 0.3
      },
      "questionnaire": {
        "inattention_score": 6,
        "hyperactivity_score": 5,
        "standardized_scale_name": "Conners"
      },
      "contextual": {
        "session_time_of_day": "morning",
        "device_type": "desktop"
      },
      "consent": {
        "consent_given": true,
        "consent_date": "2024-01-01T00:00:00Z"
      }
    }
  }'
```

## 📈 Personalization Rules

### Lesson Format Recommendations

| ADHD Probability | Confidence | Recommended Action  | Lesson Format          |
| ---------------- | ---------- | ------------------- | ---------------------- |
| ≥ 0.70           | ≥ 0.60     | `visual_and_speech` | Visual + Audio lessons |
| 0.40 - 0.69      | ≥ 0.60     | `manual_review`     | Human review required  |
| < 0.40           | ≥ 0.60     | `text`              | Text-based lessons     |
| Any              | < 0.60     | `manual_review`     | Manual review          |

### Visual + Audio Format Features

- Animated diagrams and step-by-step visuals
- Audio narration for key concepts
- Interactive micro-tasks (2-5 minutes)
- Scheduled breaks and progress indicators
- Minimal distractions, large fonts

### Text Format Features

- Clear headings and structure
- Example boxes and inline quizzes
- Progressive difficulty levels
- Optional visual supplements

## 🔍 Explainability

### SHAP Values

- Per-prediction feature contributions
- Global feature importance
- Interaction effects

### Top Contributing Features

1. **Behavioral indicators**: on_task_ratio, fidget_events, attention_shift_count
2. **Questionnaire scores**: inattention_score, hyperactivity_score
3. **Interaction patterns**: response_latency_ms, accuracy_pct
4. **Media preferences**: video_watch_pct, audio_play_pct

## 📊 Monitoring & Continuous Learning

### Performance Tracking

- Real-time AUC, F1, calibration metrics
- Bootstrap confidence intervals
- Subgroup performance analysis

### Data Drift Detection

- Feature distribution monitoring
- Statistical significance testing
- Automated retraining triggers

### Active Learning

- Ambiguous case identification (0.4-0.7 probability)
- Human-in-the-loop corrections
- Label query optimization

### Fairness Monitoring

- Demographic subgroup analysis
- Bias detection and mitigation
- Equalized odds tracking

## 🛡️ Privacy & Ethics

### Data Protection

- Explicit consent requirements
- PII anonymization
- Secure data handling
- GDPR/HIPAA compliance

### Clinical Disclaimers

- Screening tool, not diagnostic
- Healthcare professional consultation required
- Clear limitations and risks

### Bias Mitigation

- Demographic parity monitoring
- Equalized opportunity tracking
- Subgroup performance analysis

## 🚀 Deployment

### Production Requirements

```bash
# Install dependencies
pip install -r requirements.txt

# Train model
python -m lib.ml.adhd_predictor

# Start monitoring
python -m lib.ml.monitoring_system

# Deploy API
npm run dev
```

### Model Versioning

- Semantic versioning (v1.0.0)
- Artifact storage (MLflow)
- A/B testing framework
- Rollback capabilities

## 📋 Evaluation Report Template

```json
{
  "model_version": "v1.0_20241201",
  "performance_metrics": {
    "auc_score": 0.87,
    "f1_score": 0.82,
    "brier_score": 0.18,
    "confidence_intervals": {
      "auc": [0.84, 0.9],
      "f1": [0.79, 0.85]
    }
  },
  "fairness_metrics": {
    "age_groups": {
      "auc_gap": 0.05,
      "fairness_concern": false
    },
    "gender": {
      "auc_gap": 0.08,
      "fairness_concern": false
    }
  },
  "drift_detection": {
    "overall_drift_detected": false,
    "max_drift_score": 0.06
  },
  "recommendations": {
    "retrain_required": false,
    "active_learning_queries": 12,
    "next_evaluation": "2024-02-01"
  }
}
```

## 🔧 Configuration

### Model Parameters

```python
config = {
    "adhd_threshold_high": 0.70,
    "adhd_threshold_medium": 0.40,
    "min_confidence": 0.60,
    "n_features": 5,
    "random_state": 42
}
```

### Monitoring Settings

```python
monitoring_config = {
    "drift_threshold": 0.1,
    "performance_threshold": 0.8,
    "retrain_frequency_days": 30,
    "active_learning_threshold": 0.4
}
```

## 📚 References

- [ADHD Diagnostic Criteria (DSM-5)](https://www.psychiatry.org/psychiatrists/practice/dsm)
- [Machine Learning Fairness](https://fairmlbook.org/)
- [SHAP Documentation](https://shap.readthedocs.io/)
- [XGBoost Documentation](https://xgboost.readthedocs.io/)

## ⚠️ Important Notes

1. **This is a screening tool, not a diagnostic instrument**
2. **ADHD can only be diagnosed by qualified healthcare professionals**
3. **Always include clinical disclaimers in user interfaces**
4. **Ensure proper consent and data protection measures**
5. **Regular model validation and bias testing required**
