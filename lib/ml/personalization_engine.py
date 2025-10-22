"""
Personalization Engine for ADHD-Adaptive Learning
Implements lesson format recommendations based on ML predictions
"""

from typing import Dict, List, Any, Optional
import json
from datetime import datetime, timezone
from dataclasses import dataclass
from enum import Enum

class LessonFormat(Enum):
    VISUAL_SPEECH = "visual_and_speech"
    TEXT = "text"
    MANUAL_REVIEW = "manual_review"
    RECOMMEND_EVALUATION = "recommend_evaluation"

@dataclass
class PersonalizationConfig:
    """Configuration for personalization rules"""
    adhd_threshold_high: float = 0.70
    adhd_threshold_medium: float = 0.40
    min_confidence: float = 0.60
    session_duration_min: int = 2
    session_duration_max: int = 5
    break_interval_minutes: int = 15
    font_size_multiplier: float = 1.2
    distraction_reduction: bool = True

class PersonalizationEngine:
    """
    Rule-based personalization engine for ADHD-adaptive learning
    """
    
    def __init__(self, config: Optional[PersonalizationConfig] = None):
        self.config = config or PersonalizationConfig()
        self.lesson_templates = self._initialize_lesson_templates()
        self.ui_adaptations = self._initialize_ui_adaptations()
    
    def _initialize_lesson_templates(self) -> Dict[str, Dict[str, Any]]:
        """Initialize lesson format templates"""
        return {
            "visual_and_speech": {
                "name": "Visual + Audio Learning",
                "description": "High visual and audio support for ADHD learners",
                "features": {
                    "visual_support": {
                        "animated_diagrams": True,
                        "step_by_step_visuals": True,
                        "highlighted_cues": True,
                        "color_coding": True,
                        "progress_indicators": True
                    },
                    "audio_support": {
                        "narration_enabled": True,
                        "speech_synthesis": True,
                        "audio_descriptions": True,
                        "background_music": False,
                        "voice_guidance": True
                    },
                    "interaction": {
                        "micro_tasks": True,
                        "task_duration_min": 2,
                        "task_duration_max": 5,
                        "interactive_elements": True,
                        "immediate_feedback": True
                    },
                    "ui_adaptations": {
                        "minimal_distractions": True,
                        "large_fonts": True,
                        "clear_navigation": True,
                        "focus_mode": True,
                        "break_reminders": True
                    }
                },
                "content_structure": {
                    "chunking": True,
                    "chunk_size_minutes": 3,
                    "break_interval": 15,
                    "progress_tracking": True,
                    "achievement_badges": True
                }
            },
            "text": {
                "name": "Structured Text Learning",
                "description": "Traditional text-based learning format",
                "features": {
                    "text_support": {
                        "structured_headings": True,
                        "example_boxes": True,
                        "inline_quizzes": True,
                        "progressive_difficulty": True
                    },
                    "navigation": {
                        "table_of_contents": True,
                        "bookmarking": True,
                        "search_function": True,
                        "note_taking": True
                    },
                    "assessment": {
                        "periodic_quizzes": True,
                        "comprehension_checks": True,
                        "progress_tracking": True
                    }
                },
                "content_structure": {
                    "linear_progression": True,
                    "self_paced": True,
                    "optional_supplements": True
                }
            },
            "manual_review": {
                "name": "Human Review Required",
                "description": "Mixed indicators require professional evaluation",
                "features": {
                    "flagging": {
                        "educator_alert": True,
                        "clinician_notification": True,
                        "detailed_behavioral_data": True
                    },
                    "monitoring": {
                        "extended_observation": True,
                        "pattern_analysis": True,
                        "trend_tracking": True
                    },
                    "recommendations": {
                        "formal_assessment": True,
                        "specialized_support": True,
                        "parent_consultation": True
                    }
                }
            }
        }
    
    def _initialize_ui_adaptations(self) -> Dict[str, Dict[str, Any]]:
        """Initialize UI adaptation rules"""
        return {
            "adhd_friendly": {
                "visual": {
                    "font_size": "large",
                    "font_family": "sans-serif",
                    "line_spacing": "1.5x",
                    "color_scheme": "high_contrast",
                    "distraction_reduction": True
                },
                "layout": {
                    "single_column": True,
                    "minimal_sidebar": True,
                    "focus_mode": True,
                    "progress_bar": True,
                    "timer_visible": True
                },
                "interactions": {
                    "large_buttons": True,
                    "clear_focus_states": True,
                    "keyboard_navigation": True,
                    "voice_commands": True
                }
            },
            "standard": {
                "visual": {
                    "font_size": "medium",
                    "font_family": "default",
                    "line_spacing": "normal",
                    "color_scheme": "standard"
                },
                "layout": {
                    "multi_column": True,
                    "full_sidebar": True,
                    "standard_navigation": True
                }
            }
        }
    
    def determine_lesson_format(self, adhd_probability: float, confidence: float) -> LessonFormat:
        """
        Determine lesson format based on ADHD probability and confidence
        """
        if confidence < self.config.min_confidence:
            return LessonFormat.MANUAL_REVIEW
        
        if adhd_probability >= self.config.adhd_threshold_high:
            return LessonFormat.VISUAL_SPEECH
        elif adhd_probability >= self.config.adhd_threshold_medium:
            return LessonFormat.MANUAL_REVIEW
        else:
            return LessonFormat.TEXT
    
    def generate_lesson_config(self, format_type: LessonFormat, 
                             learner_profile: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate personalized lesson configuration
        """
        base_config = self.lesson_templates.get(format_type.value, {})
        
        # Customize based on learner profile
        config = base_config.copy()
        
        # Age-based adaptations
        age = learner_profile.get('age', 18)
        if age < 12:
            config['features']['interaction']['task_duration_max'] = 3
            config['features']['visual_support']['color_coding'] = True
        elif age > 18:
            config['features']['interaction']['task_duration_max'] = 8
        
        # Device-based adaptations
        device_type = learner_profile.get('device_type', 'desktop')
        if device_type == 'mobile':
            config['features']['visual_support']['step_by_step_visuals'] = True
            config['features']['ui_adaptations']['large_fonts'] = True
        
        # Language-based adaptations
        primary_language = learner_profile.get('primary_language', 'English')
        if primary_language != 'English':
            config['features']['audio_support']['speech_synthesis'] = True
            config['features']['audio_support']['voice_guidance'] = True
        
        return config
    
    def generate_ui_adaptations(self, format_type: LessonFormat, 
                              learner_profile: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate UI adaptation rules
        """
        if format_type == LessonFormat.VISUAL_SPEECH:
            ui_config = self.ui_adaptations['adhd_friendly'].copy()
        else:
            ui_config = self.ui_adaptations['standard'].copy()
        
        # Customize based on learner characteristics
        age = learner_profile.get('age', 18)
        if age < 16:
            ui_config['visual']['font_size'] = 'large'
            ui_config['layout']['single_column'] = True
        
        # Device-specific adaptations
        device_type = learner_profile.get('device_type', 'desktop')
        if device_type == 'mobile':
            ui_config['visual']['font_size'] = 'large'
            ui_config['layout']['single_column'] = True
            ui_config['interactions']['large_buttons'] = True
        
        return ui_config
    
    def create_lesson_plan(self, learner_id: str, prediction_data: Dict[str, Any],
                          learner_profile: Dict[str, Any]) -> Dict[str, Any]:
        """
        Create comprehensive lesson plan based on ML prediction
        """
        adhd_prob = prediction_data['adhd_probability'][0]
        confidence = prediction_data['calibrated_confidence'][0]
        
        # Determine lesson format
        format_type = self.determine_lesson_format(adhd_prob, confidence)
        
        # Generate configurations
        lesson_config = self.generate_lesson_config(format_type, learner_profile)
        ui_config = self.generate_ui_adaptations(format_type, learner_profile)
        
        # Create session structure
        session_plan = self._create_session_structure(format_type, learner_profile)
        
        # Generate content recommendations
        content_recommendations = self._generate_content_recommendations(
            format_type, learner_profile, prediction_data
        )
        
        # Create monitoring plan
        monitoring_plan = self._create_monitoring_plan(learner_id, prediction_data)
        
        lesson_plan = {
            'learner_id': learner_id,
            'timestamp': datetime.now(timezone.utc).isoformat(),
            'format_type': format_type.value,
            'adhd_probability': float(adhd_prob),
            'confidence': float(confidence),
            'lesson_config': lesson_config,
            'ui_config': ui_config,
            'session_plan': session_plan,
            'content_recommendations': content_recommendations,
            'monitoring_plan': monitoring_plan,
            'rationale': self._generate_rationale(format_type, adhd_prob, confidence)
        }
        
        return lesson_plan
    
    def _create_session_structure(self, format_type: LessonFormat, 
                                learner_profile: Dict[str, Any]) -> Dict[str, Any]:
        """Create session structure based on format type"""
        age = learner_profile.get('age', 18)
        
        if format_type == LessonFormat.VISUAL_SPEECH:
            return {
                'session_duration': min(max(age * 2, 10), 30),  # Age-appropriate duration
                'break_interval': 15,
                'micro_tasks': True,
                'task_duration': {
                    'min': 2,
                    'max': 5
                },
                'interactive_elements': True,
                'progress_tracking': True
            }
        elif format_type == LessonFormat.TEXT:
            return {
                'session_duration': min(max(age * 3, 15), 45),
                'break_interval': 30,
                'micro_tasks': False,
                'task_duration': {
                    'min': 10,
                    'max': 20
                },
                'interactive_elements': False,
                'progress_tracking': True
            }
        else:  # Manual review
            return {
                'session_duration': 20,
                'break_interval': 10,
                'micro_tasks': True,
                'task_duration': {
                    'min': 3,
                    'max': 7
                },
                'interactive_elements': True,
                'progress_tracking': True,
                'flag_for_review': True
            }
    
    def _generate_content_recommendations(self, format_type: LessonFormat,
                                        learner_profile: Dict[str, Any],
                                        prediction_data: Dict[str, Any]) -> Dict[str, Any]:
        """Generate content recommendations based on learner profile"""
        recommendations = {
            'primary_format': format_type.value,
            'content_types': [],
            'difficulty_level': 'adaptive',
            'accessibility_features': []
        }
        
        if format_type == LessonFormat.VISUAL_SPEECH:
            recommendations['content_types'] = [
                'animated_videos',
                'interactive_diagrams',
                'step_by_step_tutorials',
                'audio_narrations',
                'visual_quizzes'
            ]
            recommendations['accessibility_features'] = [
                'screen_reader_support',
                'voice_commands',
                'large_text_options',
                'color_contrast_enhancement'
            ]
        elif format_type == LessonFormat.TEXT:
            recommendations['content_types'] = [
                'structured_text',
                'example_boxes',
                'inline_quizzes',
                'reference_materials'
            ]
            recommendations['accessibility_features'] = [
                'text_to_speech',
                'bookmarking',
                'note_taking'
            ]
        
        # Add learner-specific recommendations
        age = learner_profile.get('age', 18)
        if age < 12:
            recommendations['content_types'].append('gamified_elements')
            recommendations['difficulty_level'] = 'beginner'
        elif age > 18:
            recommendations['content_types'].append('advanced_concepts')
            recommendations['difficulty_level'] = 'intermediate'
        
        return recommendations
    
    def _create_monitoring_plan(self, learner_id: str, 
                              prediction_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create monitoring plan for learner progress"""
        return {
            'tracking_metrics': [
                'attention_level',
                'task_completion_rate',
                'response_accuracy',
                'session_duration',
                'break_frequency',
                'engagement_score'
            ],
            'assessment_intervals': {
                'daily': ['attention_level', 'engagement_score'],
                'weekly': ['task_completion_rate', 'response_accuracy'],
                'monthly': ['overall_progress', 'format_effectiveness']
            },
            'alert_thresholds': {
                'low_attention': 0.3,
                'low_engagement': 0.4,
                'high_distraction': 0.7
            },
            'review_triggers': [
                'sustained_low_performance',
                'format_ineffectiveness',
                'behavioral_changes'
            ]
        }
    
    def _generate_rationale(self, format_type: LessonFormat, 
                          adhd_prob: float, confidence: float) -> str:
        """Generate human-readable rationale for format choice"""
        if format_type == LessonFormat.VISUAL_SPEECH:
            return (
                f"High ADHD probability ({adhd_prob:.1%}) with strong confidence ({confidence:.1%}) "
                f"indicates visual and audio learning support will be most effective. "
                f"This format provides the structure and engagement needed for optimal learning."
            )
        elif format_type == LessonFormat.TEXT:
            return (
                f"Low ADHD probability ({adhd_prob:.1%}) suggests standard text-based learning "
                f"will be appropriate. This format allows for self-paced, structured learning."
            )
        else:
            return (
                f"Mixed indicators (probability: {adhd_prob:.1%}, confidence: {confidence:.1%}) "
                f"suggest professional review is needed to determine the most effective learning approach."
            )
    
    def update_config(self, new_config: PersonalizationConfig):
        """Update personalization configuration"""
        self.config = new_config
        print(f"✅ Personalization config updated: thresholds={new_config.adhd_threshold_high}/{new_config.adhd_threshold_medium}")
    
    def get_format_statistics(self, lesson_plans: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Get statistics on format distribution"""
        format_counts = {}
        for plan in lesson_plans:
            format_type = plan.get('format_type', 'unknown')
            format_counts[format_type] = format_counts.get(format_type, 0) + 1
        
        total = sum(format_counts.values())
        format_percentages = {k: v/total for k, v in format_counts.items()}
        
        return {
            'total_learners': total,
            'format_distribution': format_counts,
            'format_percentages': format_percentages,
            'most_common_format': max(format_counts, key=format_counts.get) if format_counts else None
        }


# Example usage
if __name__ == "__main__":
    # Initialize personalization engine
    engine = PersonalizationEngine()
    
    # Example learner profile
    learner_profile = {
        'age': 15,
        'sex': 'M',
        'primary_language': 'English',
        'device_type': 'desktop'
    }
    
    # Example prediction data
    prediction_data = {
        'adhd_probability': [0.75],
        'calibrated_confidence': [0.85],
        'recommended_action': ['visual_and_speech']
    }
    
    # Generate lesson plan
    lesson_plan = engine.create_lesson_plan(
        learner_id="learner_001",
        prediction_data=prediction_data,
        learner_profile=learner_profile
    )
    
    print("🎯 Generated Lesson Plan:")
    print(f"Format: {lesson_plan['format_type']}")
    print(f"Rationale: {lesson_plan['rationale']}")
    print(f"Session Duration: {lesson_plan['session_plan']['session_duration']} minutes")
    print(f"Content Types: {lesson_plan['content_recommendations']['content_types']}")
