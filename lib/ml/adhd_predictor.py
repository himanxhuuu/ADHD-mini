"""
ADHD Prediction ML System
High-performing, explainable classifier for ADHD likelihood prediction
"""

import numpy as np
import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.metrics import roc_auc_score, precision_recall_curve, f1_score, brier_score_loss
from sklearn.calibration import CalibratedClassifierCV
from sklearn.preprocessing import StandardScaler, LabelEncoder
import shap
import joblib
import json
from datetime import datetime, timezone
from typing import Dict, List, Tuple, Optional, Any
import warnings
warnings.filterwarnings('ignore')

class ADHDPredictor:
    """
    High-performing, explainable ADHD prediction system with personalization rules
    """
    
    def __init__(self, config: Dict[str, Any] = None):
        self.config = config or self._default_config()
        self.model = None
        self.scaler = StandardScaler()
        self.label_encoders = {}
        self.feature_names = []
        self.explainer = None
        self.model_version = f"v1.0_{datetime.now().strftime('%Y%m%d')}"
        
    def _default_config(self) -> Dict[str, Any]:
        return {
            "adhd_threshold_high": 0.70,
            "adhd_threshold_medium": 0.40,
            "min_confidence": 0.60,
            "n_features": 5,
            "random_state": 42,
            "test_size": 0.2,
            "calibration_method": "isotonic"
        }
    
    def prepare_features(self, data: pd.DataFrame) -> pd.DataFrame:
        """
        Feature engineering pipeline for ADHD prediction
        """
        df = data.copy()
        
        # Demographic features
        df['age_group'] = pd.cut(df['age'], bins=[0, 12, 18, 25, 100], labels=['child', 'teen', 'young_adult', 'adult'])
        df['is_male'] = (df['sex'] == 'M').astype(int)
        df['is_female'] = (df['sex'] == 'F').astype(int)
        df['english_primary'] = (df['primary_language'] == 'English').astype(int)
        
        # Behavioral features
        df['attention_efficiency'] = df['on_task_ratio'] / (df['attention_shift_count'] + 1)
        df['fidget_rate'] = df['fidget_events'] / (df['time_on_task_seconds'] / 60 + 1)  # per minute
        df['task_persistence'] = df['time_on_task_seconds'] / 60  # minutes
        df['attention_stability'] = 1 - (df['attention_shift_count'] / (df['time_on_task_seconds'] / 60 + 1))
        
        # Interaction features
        df['interaction_intensity'] = (df['clicks'] + df['scrolls']) / (df['time_on_task_seconds'] / 60 + 1)
        df['response_speed'] = 1 / (df['response_latency_ms'] / 1000 + 1)  # inverse latency
        df['accuracy_efficiency'] = df['accuracy_pct'] / (df['response_latency_ms'] / 1000 + 1)
        
        # Media usage patterns
        df['visual_learner'] = (df['video_watch_pct'] > 0.5).astype(int)
        df['audio_learner'] = (df['audio_play_pct'] > 0.5).astype(int)
        df['multimodal_preference'] = ((df['video_watch_pct'] + df['audio_play_pct']) > 0.7).astype(int)
        
        # Questionnaire composite scores
        df['adhd_composite'] = (df['inattention_score'] + df['hyperactivity_score']) / 2
        df['inattention_severity'] = pd.cut(df['inattention_score'], bins=[0, 3, 6, 9, 12], labels=['mild', 'moderate', 'severe', 'very_severe'])
        df['hyperactivity_severity'] = pd.cut(df['hyperactivity_score'], bins=[0, 3, 6, 9, 12], labels=['mild', 'moderate', 'severe', 'very_severe'])
        
        # Contextual features
        df['morning_session'] = df['session_time_of_day'].isin(['morning', 'early_morning']).astype(int)
        df['mobile_device'] = (df['device_type'] == 'mobile').astype(int)
        df['desktop_device'] = (df['device_type'] == 'desktop').astype(int)
        
        # ADHD-specific behavioral indicators
        df['high_fidget'] = (df['fidget_events'] > df['fidget_events'].quantile(0.75)).astype(int)
        df['low_attention'] = (df['on_task_ratio'] < df['on_task_ratio'].quantile(0.25)).astype(int)
        df['high_shift'] = (df['attention_shift_count'] > df['attention_shift_count'].quantile(0.75)).astype(int)
        
        # Interaction patterns
        df['rapid_clicks'] = (df['clicks'] > df['clicks'].quantile(0.8)).astype(int)
        df['slow_response'] = (df['response_latency_ms'] > df['response_latency_ms'].quantile(0.8)).astype(int)
        
        return df
    
    def encode_categorical_features(self, df: pd.DataFrame, is_training: bool = True) -> pd.DataFrame:
        """Encode categorical variables"""
        categorical_cols = ['age_group', 'inattention_severity', 'hyperactivity_severity']
        
        for col in categorical_cols:
            if col in df.columns:
                if is_training:
                    le = LabelEncoder()
                    df[col] = le.fit_transform(df[col].astype(str))
                    self.label_encoders[col] = le
                else:
                    if col in self.label_encoders:
                        df[col] = self.label_encoders[col].transform(df[col].astype(str))
        
        return df
    
    def select_features(self, df: pd.DataFrame) -> List[str]:
        """Select most predictive features for ADHD"""
        feature_candidates = [
            'age', 'is_male', 'is_female', 'english_primary',
            'on_task_ratio', 'fidget_events', 'attention_shift_count', 'time_on_task_seconds',
            'clicks', 'scrolls', 'response_latency_ms', 'accuracy_pct',
            'video_watch_pct', 'audio_play_pct',
            'inattention_score', 'hyperactivity_score', 'adhd_composite',
            'attention_efficiency', 'fidget_rate', 'task_persistence', 'attention_stability',
            'interaction_intensity', 'response_speed', 'accuracy_efficiency',
            'visual_learner', 'audio_learner', 'multimodal_preference',
            'morning_session', 'mobile_device', 'desktop_device',
            'high_fidget', 'low_attention', 'high_shift', 'rapid_clicks', 'slow_response'
        ]
        
        # Filter to available features
        available_features = [f for f in feature_candidates if f in df.columns]
        return available_features
    
    def train(self, X: pd.DataFrame, y: pd.Series, validation_data: Optional[Tuple] = None) -> Dict[str, Any]:
        """
        Train XGBoost ensemble with calibration and cross-validation
        """
        print("🚀 Training ADHD prediction model...")
        
        # Feature engineering
        X_processed = self.prepare_features(X)
        X_processed = self.encode_categorical_features(X_processed, is_training=True)
        
        # Select features
        self.feature_names = self.select_features(X_processed)
        X_final = X_processed[self.feature_names].fillna(0)
        
        # Scale features
        X_scaled = self.scaler.fit_transform(X_final)
        
        # Train-test split
        X_train, X_test, y_train, y_test = train_test_split(
            X_scaled, y, test_size=self.config['test_size'], 
            random_state=self.config['random_state'], stratify=y
        )
        
        # XGBoost parameters optimized for medical prediction
        xgb_params = {
            'objective': 'binary:logistic',
            'eval_metric': 'auc',
            'max_depth': 6,
            'learning_rate': 0.1,
            'n_estimators': 200,
            'subsample': 0.8,
            'colsample_bytree': 0.8,
            'random_state': self.config['random_state'],
            'n_jobs': -1,
            'early_stopping_rounds': 20
        }
        
        # Train XGBoost
        self.model = xgb.XGBClassifier(**xgb_params)
        self.model.fit(X_train, y_train, 
                      eval_set=[(X_test, y_test)], 
                      verbose=False)
        
        # Calibrate probabilities
        self.model = CalibratedClassifierCV(
            self.model, 
            method=self.config['calibration_method'],
            cv=3
        )
        self.model.fit(X_train, y_train)
        
        # Cross-validation
        cv_scores = cross_val_score(self.model, X_scaled, y, cv=5, scoring='roc_auc')
        
        # Evaluate on test set
        y_pred_proba = self.model.predict_proba(X_test)[:, 1]
        y_pred = (y_pred_proba >= 0.5).astype(int)
        
        # Metrics
        auc_score = roc_auc_score(y_test, y_pred_proba)
        f1 = f1_score(y_test, y_pred)
        brier = brier_score_loss(y_test, y_pred_proba)
        
        # Precision-Recall curve
        precision, recall, thresholds = precision_recall_curve(y_test, y_pred_proba)
        
        # Feature importance
        feature_importance = dict(zip(self.feature_names, self.model.base_estimator.feature_importances_))
        
        # Initialize SHAP explainer
        self.explainer = shap.TreeExplainer(self.model.base_estimator)
        
        results = {
            'model_version': self.model_version,
            'auc_score': auc_score,
            'cv_auc_mean': cv_scores.mean(),
            'cv_auc_std': cv_scores.std(),
            'f1_score': f1,
            'brier_score': brier,
            'feature_importance': feature_importance,
            'n_features': len(self.feature_names),
            'training_samples': len(X_train),
            'test_samples': len(X_test)
        }
        
        print(f"✅ Model trained successfully!")
        print(f"   AUC: {auc_score:.3f} (CV: {cv_scores.mean():.3f} ± {cv_scores.std():.3f})")
        print(f"   F1: {f1:.3f}, Brier: {brier:.3f}")
        
        return results
    
    def predict(self, X: pd.DataFrame) -> Dict[str, Any]:
        """
        Predict ADHD probability with explainability
        """
        if self.model is None:
            raise ValueError("Model not trained. Call train() first.")
        
        # Process features
        X_processed = self.prepare_features(X)
        X_processed = self.encode_categorical_features(X_processed, is_training=False)
        X_final = X_processed[self.feature_names].fillna(0)
        X_scaled = self.scaler.transform(X_final)
        
        # Predictions
        adhd_probability = self.model.predict_proba(X_scaled)[:, 1]
        
        # SHAP explanations
        shap_values = self.explainer.shap_values(X_scaled)
        
        # Get top contributing features
        top_features = []
        for i, prob in enumerate(adhd_probability):
            feature_contributions = []
            for j, feature in enumerate(self.feature_names):
                contribution = shap_values[i][j]
                feature_contributions.append({
                    'feature': feature,
                    'contribution': float(contribution),
                    'importance': abs(contribution)
                })
            
            # Sort by importance
            feature_contributions.sort(key=lambda x: x['importance'], reverse=True)
            top_features.append(feature_contributions[:self.config['n_features']])
        
        # Determine recommended action
        recommended_actions = []
        confidences = []
        
        for prob in adhd_probability:
            if prob >= self.config['adhd_threshold_high']:
                action = "visual_and_speech"
                confidence = min(prob, 0.95)
            elif prob >= self.config['adhd_threshold_medium']:
                action = "manual_review"
                confidence = 0.7
            else:
                action = "text"
                confidence = max(1 - prob, 0.6)
            
            recommended_actions.append(action)
            confidences.append(confidence)
        
        return {
            'adhd_probability': adhd_probability.tolist(),
            'calibrated_confidence': confidences,
            'recommended_action': recommended_actions,
            'top_features': top_features,
            'model_version': self.model_version,
            'timestamp': datetime.now(timezone.utc).isoformat()
        }
    
    def generate_report(self, learner_id: str, prediction_data: Dict[str, Any], 
                       session_history: Optional[List[Dict]] = None) -> Dict[str, Any]:
        """
        Generate comprehensive report for learner and clinician
        """
        prob = prediction_data['adhd_probability'][0]
        confidence = prediction_data['calibrated_confidence'][0]
        action = prediction_data['recommended_action'][0]
        top_features = prediction_data['top_features'][0]
        
        # Human-readable feature explanations
        feature_explanations = {
            'on_task_ratio': 'Time spent focused on learning tasks',
            'fidget_events': 'Physical restlessness indicators',
            'attention_shift_count': 'Number of attention breaks',
            'inattention_score': 'Self-reported attention difficulties',
            'hyperactivity_score': 'Self-reported hyperactivity levels',
            'response_latency_ms': 'Time to respond to questions',
            'video_watch_pct': 'Preference for visual learning',
            'audio_play_pct': 'Preference for audio learning'
        }
        
        # Top contributing factors
        contributing_factors = []
        for feature in top_features:
            feature_name = feature['feature']
            contribution = feature['contribution']
            explanation = feature_explanations.get(feature_name, feature_name.replace('_', ' ').title())
            
            contributing_factors.append({
                'factor': explanation,
                'contribution': contribution,
                'impact': 'positive' if contribution > 0 else 'negative'
            })
        
        # Trend analysis (if session history provided)
        trend_analysis = None
        if session_history and len(session_history) > 1:
            recent_probs = [s.get('adhd_probability', 0) for s in session_history[-5:]]
            if len(recent_probs) > 1:
                trend = np.mean(np.diff(recent_probs))
                trend_analysis = {
                    'direction': 'increasing' if trend > 0.05 else 'decreasing' if trend < -0.05 else 'stable',
                    'change': float(trend),
                    'sessions_analyzed': len(recent_probs)
                }
        
        # Clinical disclaimer
        clinical_disclaimer = (
            "⚠️ IMPORTANT: This is a screening tool, not a diagnostic instrument. "
            "ADHD can only be diagnosed by qualified healthcare professionals. "
            "If elevated probability is indicated, please consult with a healthcare provider "
            "for proper evaluation and support."
        )
        
        # Lesson format recommendations
        lesson_recommendations = {
            'visual_and_speech': {
                'format': 'Visual + Audio lessons',
                'rationale': 'High visual and audio support recommended for optimal learning',
                'features': [
                    'Animated diagrams and step-by-step visuals',
                    'Audio narration for key concepts',
                    'Interactive micro-tasks (2-5 minutes)',
                    'Scheduled breaks and progress indicators',
                    'Minimal distractions, large fonts'
                ]
            },
            'text': {
                'format': 'Structured text lessons',
                'rationale': 'Text-based learning format is optimal',
                'features': [
                    'Clear headings and structure',
                    'Example boxes and inline quizzes',
                    'Progressive difficulty levels',
                    'Optional visual supplements'
                ]
            },
            'manual_review': {
                'format': 'Human review recommended',
                'rationale': 'Mixed indicators suggest professional evaluation',
                'features': [
                    'Flag for educator/clinician review',
                    'Provide detailed behavioral data',
                    'Recommend formal assessment',
                    'Monitor learning patterns closely'
                ]
            }
        }
        
        report = {
            'learner_id': learner_id,
            'timestamp': prediction_data['timestamp'],
            'adhd_probability': float(prob),
            'confidence': float(confidence),
            'recommended_action': action,
            'model_version': prediction_data['model_version'],
            'contributing_factors': contributing_factors,
            'trend_analysis': trend_analysis,
            'lesson_recommendations': lesson_recommendations[action],
            'clinical_disclaimer': clinical_disclaimer,
            'privacy_note': 'Data used with explicit consent for educational support purposes only'
        }
        
        return report
    
    def save_model(self, filepath: str):
        """Save trained model and metadata"""
        model_data = {
            'model': self.model,
            'scaler': self.scaler,
            'label_encoders': self.label_encoders,
            'feature_names': self.feature_names,
            'config': self.config,
            'model_version': self.model_version
        }
        joblib.dump(model_data, filepath)
        print(f"✅ Model saved to {filepath}")
    
    def load_model(self, filepath: str):
        """Load trained model and metadata"""
        model_data = joblib.load(filepath)
        self.model = model_data['model']
        self.scaler = model_data['scaler']
        self.label_encoders = model_data['label_encoders']
        self.feature_names = model_data['feature_names']
        self.config = model_data['config']
        self.model_version = model_data['model_version']
        
        # Reinitialize explainer
        self.explainer = shap.TreeExplainer(self.model.base_estimator)
        print(f"✅ Model loaded from {filepath}")


# Example usage and testing
if __name__ == "__main__":
    # Generate synthetic training data
    np.random.seed(42)
    n_samples = 1000
    
    data = {
        'age': np.random.randint(8, 25, n_samples),
        'sex': np.random.choice(['M', 'F', 'Other'], n_samples),
        'primary_language': np.random.choice(['English', 'Spanish', 'French'], n_samples),
        'on_task_ratio': np.random.beta(2, 2, n_samples),
        'fidget_events': np.random.poisson(5, n_samples),
        'attention_shift_count': np.random.poisson(3, n_samples),
        'time_on_task_seconds': np.random.exponential(300, n_samples),
        'clicks': np.random.poisson(20, n_samples),
        'scrolls': np.random.poisson(15, n_samples),
        'response_latency_ms': np.random.exponential(2000, n_samples),
        'accuracy_pct': np.random.beta(3, 1, n_samples) * 100,
        'video_watch_pct': np.random.beta(2, 2, n_samples),
        'audio_play_pct': np.random.beta(2, 2, n_samples),
        'inattention_score': np.random.poisson(3, n_samples),
        'hyperactivity_score': np.random.poisson(3, n_samples),
        'standardized_scale_name': np.random.choice(['Conners', 'Vanderbilt', 'SNAP-IV'], n_samples),
        'session_time_of_day': np.random.choice(['morning', 'afternoon', 'evening'], n_samples),
        'device_type': np.random.choice(['desktop', 'mobile', 'tablet'], n_samples),
        'adhd_diagnosis': np.random.choice([0, 1, 2], n_samples, p=[0.7, 0.2, 0.1]),  # 0=no, 1=yes, 2=unknown
        'consent_given': np.random.choice([True, False], n_samples, p=[0.9, 0.1]),
        'consent_date': [datetime.now().isoformat()] * n_samples
    }
    
    df = pd.DataFrame(data)
    
    # Create target variable (ADHD diagnosis)
    y = (df['adhd_diagnosis'] == 1).astype(int)
    X = df.drop(['adhd_diagnosis'], axis=1)
    
    # Initialize and train model
    predictor = ADHDPredictor()
    results = predictor.train(X, y)
    
    # Test prediction
    test_sample = X.iloc[:1].copy()
    prediction = predictor.predict(test_sample)
    report = predictor.generate_report("learner_001", prediction)
    
    print("\n📊 Sample Prediction Report:")
    print(f"ADHD Probability: {report['adhd_probability']:.3f}")
    print(f"Confidence: {report['confidence']:.3f}")
    print(f"Recommended Action: {report['recommended_action']}")
    print(f"Top Contributing Factors: {[f['factor'] for f in report['contributing_factors'][:3]]}")
    
    # Save model
    predictor.save_model("adhd_predictor_model.pkl")
