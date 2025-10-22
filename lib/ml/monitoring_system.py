"""
Continuous Learning and Model Monitoring System
Tracks model performance, detects drift, and enables active learning
"""

import numpy as np
import pandas as pd
from typing import Dict, List, Any, Optional, Tuple
from datetime import datetime, timezone, timedelta
import json
import joblib
from dataclasses import dataclass
from sklearn.metrics import roc_auc_score, precision_recall_curve, f1_score
from sklearn.model_selection import cross_val_score
import warnings
warnings.filterwarnings('ignore')

@dataclass
class MonitoringConfig:
    """Configuration for monitoring system"""
    drift_threshold: float = 0.1
    performance_threshold: float = 0.8
    retrain_frequency_days: int = 30
    active_learning_threshold: float = 0.4
    min_samples_for_retrain: int = 100
    bootstrap_samples: int = 1000

class ModelMonitor:
    """
    Comprehensive model monitoring and continuous learning system
    """
    
    def __init__(self, config: Optional[MonitoringConfig] = None):
        self.config = config or MonitoringConfig()
        self.performance_history = []
        self.drift_detection_history = []
        self.active_learning_queries = []
        self.model_versions = []
        self.fairness_metrics = {}
        
    def log_prediction(self, learner_id: str, features: Dict[str, Any], 
                      prediction: Dict[str, Any], actual_label: Optional[int] = None,
                      outcome: Optional[Dict[str, Any]] = None) -> str:
        """
        Log prediction with metadata for monitoring
        """
        log_entry = {
            'timestamp': datetime.now(timezone.utc).isoformat(),
            'learner_id': learner_id,
            'features': features,
            'prediction': prediction,
            'actual_label': actual_label,
            'outcome': outcome,
            'model_version': prediction.get('model_version', 'unknown')
        }
        
        # Store in performance history
        self.performance_history.append(log_entry)
        
        # Check for active learning opportunities
        if self._should_query_for_label(prediction):
            self.active_learning_queries.append({
                'learner_id': learner_id,
                'timestamp': datetime.now(timezone.utc).isoformat(),
                'adhd_probability': prediction['adhd_probability'][0],
                'confidence': prediction['calibrated_confidence'][0],
                'reason': 'ambiguous_prediction'
            })
        
        return log_entry['timestamp']
    
    def _should_query_for_label(self, prediction: Dict[str, Any]) -> bool:
        """Determine if prediction should be flagged for active learning"""
        prob = prediction['adhd_probability'][0]
        confidence = prediction['calibrated_confidence'][0]
        
        # Query for ambiguous cases
        return (self.config.active_learning_threshold <= prob <= 0.7 and 
                confidence < 0.8)
    
    def calculate_performance_metrics(self, time_window_days: int = 30) -> Dict[str, Any]:
        """
        Calculate performance metrics for recent predictions
        """
        cutoff_date = datetime.now(timezone.utc) - timedelta(days=time_window_days)
        
        # Filter recent predictions with labels
        recent_predictions = [
            p for p in self.performance_history
            if (datetime.fromisoformat(p['timestamp'].replace('Z', '+00:00')) >= cutoff_date
            and p['actual_label'] is not None
        ]
        
        if len(recent_predictions) < 10:
            return {'error': 'Insufficient labeled data for performance calculation'}
        
        # Extract predictions and labels
        y_true = [p['actual_label'] for p in recent_predictions]
        y_pred_proba = [p['prediction']['adhd_probability'][0] for p in recent_predictions]
        y_pred = [1 if prob >= 0.5 else 0 for prob in y_pred_proba]
        
        # Calculate metrics
        auc = roc_auc_score(y_true, y_pred_proba)
        f1 = f1_score(y_true, y_pred)
        
        # Bootstrap confidence intervals
        bootstrap_aucs = []
        bootstrap_f1s = []
        
        for _ in range(self.config.bootstrap_samples):
            indices = np.random.choice(len(y_true), len(y_true), replace=True)
            y_true_boot = [y_true[i] for i in indices]
            y_pred_proba_boot = [y_pred_proba[i] for i in indices]
            y_pred_boot = [1 if prob >= 0.5 else 0 for prob in y_pred_proba_boot]
            
            if len(set(y_true_boot)) > 1:  # Ensure both classes present
                bootstrap_aucs.append(roc_auc_score(y_true_boot, y_pred_proba_boot))
                bootstrap_f1s.append(f1_score(y_true_boot, y_pred_boot))
        
        # Calculate confidence intervals
        auc_ci = (np.percentile(bootstrap_aucs, 2.5), np.percentile(bootstrap_aucs, 97.5))
        f1_ci = (np.percentile(bootstrap_f1s, 2.5), np.percentile(bootstrap_f1s, 97.5))
        
        metrics = {
            'time_window_days': time_window_days,
            'sample_size': len(recent_predictions),
            'auc_score': float(auc),
            'auc_confidence_interval': auc_ci,
            'f1_score': float(f1),
            'f1_confidence_interval': f1_ci,
            'threshold_met': auc >= self.config.performance_threshold,
            'calculation_timestamp': datetime.now(timezone.utc).isoformat()
        }
        
        return metrics
    
    def detect_data_drift(self, reference_data: pd.DataFrame, 
                         current_data: pd.DataFrame) -> Dict[str, Any]:
        """
        Detect data drift between reference and current data
        """
        drift_results = {}
        
        # Compare feature distributions
        for column in reference_data.columns:
            if column in current_data.columns:
                ref_mean = reference_data[column].mean()
                ref_std = reference_data[column].std()
                curr_mean = current_data[column].mean()
                curr_std = current_data[column].std()
                
                # Calculate drift score
                mean_drift = abs(ref_mean - curr_mean) / (ref_std + 1e-8)
                std_drift = abs(ref_std - curr_std) / (ref_std + 1e-8)
                
                drift_score = max(mean_drift, std_drift)
                
                drift_results[column] = {
                    'drift_score': float(drift_score),
                    'reference_mean': float(ref_mean),
                    'current_mean': float(curr_mean),
                    'drift_detected': drift_score > self.config.drift_threshold
                }
        
        # Overall drift assessment
        max_drift = max([r['drift_score'] for r in drift_results.values()])
        significant_drift = any([r['drift_detected'] for r in drift_results.values()])
        
        drift_summary = {
            'overall_drift_detected': significant_drift,
            'max_drift_score': float(max_drift),
            'drift_threshold': self.config.drift_threshold,
            'features_with_drift': [k for k, v in drift_results.items() if v['drift_detected']],
            'detection_timestamp': datetime.now(timezone.utc).isoformat()
        }
        
        # Store drift detection result
        self.drift_detection_history.append({
            'timestamp': datetime.now(timezone.utc).isoformat(),
            'drift_summary': drift_summary,
            'feature_drift': drift_results
        })
        
        return {
            'drift_summary': drift_summary,
            'feature_drift': drift_results
        }
    
    def calculate_fairness_metrics(self, time_window_days: int = 30) -> Dict[str, Any]:
        """
        Calculate fairness metrics across demographic subgroups
        """
        cutoff_date = datetime.now(timezone.utc) - timedelta(days=time_window_days)
        
        # Filter recent predictions with demographic data
        recent_predictions = [
            p for p in self.performance_history
            if (datetime.fromisoformat(p['timestamp'].replace('Z', '+00:00')) >= cutoff_date
            and p['actual_label'] is not None
            and 'features' in p
        ]
        
        if len(recent_predictions) < 50:
            return {'error': 'Insufficient data for fairness analysis'}
        
        # Group by demographics
        subgroups = {
            'age_groups': {'child': [], 'teen': [], 'adult': []},
            'gender': {'male': [], 'female': [], 'other': []},
            'language': {'english': [], 'non_english': []}
        }
        
        for pred in recent_predictions:
            features = pred['features']
            age = features.get('age', 18)
            sex = features.get('sex', 'Other')
            language = features.get('primary_language', 'English')
            
            # Age groups
            if age < 13:
                subgroups['age_groups']['child'].append(pred)
            elif age < 18:
                subgroups['age_groups']['teen'].append(pred)
            else:
                subgroups['age_groups']['adult'].append(pred)
            
            # Gender
            if sex == 'M':
                subgroups['gender']['male'].append(pred)
            elif sex == 'F':
                subgroups['gender']['female'].append(pred)
            else:
                subgroups['gender']['other'].append(pred)
            
            # Language
            if language == 'English':
                subgroups['language']['english'].append(pred)
            else:
                subgroups['language']['non_english'].append(pred)
        
        # Calculate metrics for each subgroup
        fairness_results = {}
        
        for category, groups in subgroups.items():
            category_results = {}
            
            for group_name, group_predictions in groups.items():
                if len(group_predictions) < 10:
                    continue
                
                y_true = [p['actual_label'] for p in group_predictions]
                y_pred_proba = [p['prediction']['adhd_probability'][0] for p in group_predictions]
                
                if len(set(y_true)) > 1:  # Ensure both classes present
                    auc = roc_auc_score(y_true, y_pred_proba)
                    category_results[group_name] = {
                        'sample_size': len(group_predictions),
                        'auc_score': float(auc),
                        'positive_rate': sum(y_true) / len(y_true)
                    }
            
            if category_results:
                # Calculate fairness metrics
                aucs = [r['auc_score'] for r in category_results.values()]
                max_auc = max(aucs)
                min_auc = min(aucs)
                auc_gap = max_auc - min_auc
                
                fairness_results[category] = {
                    'subgroup_metrics': category_results,
                    'auc_gap': float(auc_gap),
                    'fairness_concern': auc_gap > 0.1  # 10% gap threshold
                }
        
        self.fairness_metrics = fairness_results
        return fairness_results
    
    def should_retrain_model(self) -> Tuple[bool, List[str]]:
        """
        Determine if model should be retrained based on monitoring data
        """
        reasons = []
        
        # Check performance degradation
        recent_metrics = self.calculate_performance_metrics(time_window_days=7)
        if 'auc_score' in recent_metrics:
            if recent_metrics['auc_score'] < self.config.performance_threshold:
                reasons.append(f"Performance below threshold: {recent_metrics['auc_score']:.3f} < {self.config.performance_threshold}")
        
        # Check for data drift
        if self.drift_detection_history:
            latest_drift = self.drift_detection_history[-1]
            if latest_drift['drift_summary']['overall_drift_detected']:
                reasons.append("Significant data drift detected")
        
        # Check retrain frequency
        if self.model_versions:
            last_retrain = datetime.fromisoformat(self.model_versions[-1]['timestamp'].replace('Z', '+00:00'))
            days_since_retrain = (datetime.now(timezone.utc) - last_retrain).days
            if days_since_retrain >= self.config.retrain_frequency_days:
                reasons.append(f"Retrain frequency reached: {days_since_retrain} days")
        
        # Check sample size
        recent_predictions = [
            p for p in self.performance_history
            if p['actual_label'] is not None
        ]
        if len(recent_predictions) >= self.config.min_samples_for_retrain:
            reasons.append(f"Sufficient new data available: {len(recent_predictions)} samples")
        
        should_retrain = len(reasons) > 0
        return should_retrain, reasons
    
    def get_active_learning_queries(self, limit: int = 10) -> List[Dict[str, Any]]:
        """
        Get pending active learning queries
        """
        return self.active_learning_queries[-limit:]
    
    def mark_query_resolved(self, learner_id: str, label: int, confidence: float):
        """
        Mark an active learning query as resolved
        """
        # Remove from pending queries
        self.active_learning_queries = [
            q for q in self.active_learning_queries 
            if q['learner_id'] != learner_id
        ]
        
        # Log the resolution
        resolution = {
            'learner_id': learner_id,
            'timestamp': datetime.now(timezone.utc).isoformat(),
            'label': label,
            'confidence': confidence,
            'status': 'resolved'
        }
        
        # This would typically be stored in a database
        print(f"✅ Active learning query resolved for {learner_id}: label={label}, confidence={confidence}")
    
    def generate_monitoring_report(self) -> Dict[str, Any]:
        """
        Generate comprehensive monitoring report
        """
        # Performance metrics
        performance_metrics = self.calculate_performance_metrics()
        
        # Fairness metrics
        fairness_metrics = self.calculate_fairness_metrics()
        
        # Retrain recommendation
        should_retrain, retrain_reasons = self.should_retrain_model()
        
        # Active learning status
        pending_queries = len(self.active_learning_queries)
        
        # Model version history
        model_versions = len(self.model_versions)
        
        report = {
            'timestamp': datetime.now(timezone.utc).isoformat(),
            'performance_metrics': performance_metrics,
            'fairness_metrics': fairness_metrics,
            'retrain_recommendation': {
                'should_retrain': should_retrain,
                'reasons': retrain_reasons
            },
            'active_learning': {
                'pending_queries': pending_queries,
                'recent_queries': self.get_active_learning_queries(5)
            },
            'model_management': {
                'total_versions': model_versions,
                'latest_version': self.model_versions[-1] if self.model_versions else None
            },
            'data_quality': {
                'total_predictions': len(self.performance_history),
                'labeled_predictions': len([p for p in self.performance_history if p['actual_label'] is not None]),
                'label_rate': len([p for p in self.performance_history if p['actual_label'] is not None]) / max(len(self.performance_history), 1)
            }
        }
        
        return report
    
    def save_monitoring_data(self, filepath: str):
        """Save monitoring data to file"""
        data = {
            'performance_history': self.performance_history,
            'drift_detection_history': self.drift_detection_history,
            'active_learning_queries': self.active_learning_queries,
            'model_versions': self.model_versions,
            'fairness_metrics': self.fairness_metrics,
            'config': self.config
        }
        
        with open(filepath, 'w') as f:
            json.dump(data, f, indent=2, default=str)
        
        print(f"✅ Monitoring data saved to {filepath}")
    
    def load_monitoring_data(self, filepath: str):
        """Load monitoring data from file"""
        with open(filepath, 'r') as f:
            data = json.load(f)
        
        self.performance_history = data.get('performance_history', [])
        self.drift_detection_history = data.get('drift_detection_history', [])
        self.active_learning_queries = data.get('active_learning_queries', [])
        self.model_versions = data.get('model_versions', [])
        self.fairness_metrics = data.get('fairness_metrics', {})
        
        print(f"✅ Monitoring data loaded from {filepath}")


# Example usage
if __name__ == "__main__":
    # Initialize monitoring system
    monitor = ModelMonitor()
    
    # Simulate some predictions
    for i in range(50):
        features = {
            'age': np.random.randint(8, 25),
            'sex': np.random.choice(['M', 'F', 'Other']),
            'on_task_ratio': np.random.beta(2, 2),
            'fidget_events': np.random.poisson(5)
        }
        
        prediction = {
            'adhd_probability': [np.random.beta(2, 2)],
            'calibrated_confidence': [np.random.beta(3, 1)],
            'model_version': 'v1.0'
        }
        
        actual_label = np.random.choice([0, 1], p=[0.7, 0.3])
        
        monitor.log_prediction(
            learner_id=f"learner_{i:03d}",
            features=features,
            prediction=prediction,
            actual_label=actual_label
        )
    
    # Generate monitoring report
    report = monitor.generate_monitoring_report()
    
    print("📊 Monitoring Report:")
    print(f"Total Predictions: {report['data_quality']['total_predictions']}")
    print(f"Labeled Predictions: {report['data_quality']['labeled_predictions']}")
    print(f"Label Rate: {report['data_quality']['label_rate']:.1%}")
    print(f"Should Retrain: {report['retrain_recommendation']['should_retrain']}")
    print(f"Pending Queries: {report['active_learning']['pending_queries']}")
