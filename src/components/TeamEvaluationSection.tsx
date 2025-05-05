
import React from 'react';
import RatingScale from './RatingScale';
import { TeamEvaluation } from '@/contexts/SurveyContext';
import { Textarea } from '@/components/ui/textarea';

interface TeamEvaluationSectionProps {
  title: string;
  evaluation: TeamEvaluation;
  updateRating: (questionId: string, rating: number) => void;
  updateOpenAnswer: (questionId: string, answer: string) => void;
  className?: string;
}

const TeamEvaluationSection: React.FC<TeamEvaluationSectionProps> = ({
  title,
  evaluation,
  updateRating,
  updateOpenAnswer,
  className = '',
}) => {
  return (
    <div className={`section-card ${className}`}>
      <div className="section-header">
        <h3 className="text-lg font-bold text-survey-primary">{title}</h3>
      </div>

      {evaluation.ratings.length > 0 && (
        <div className="mb-6">
          {evaluation.ratings.map((question) => (
            <div key={question.id} className="rating-item">
              <div className="rating-question">{question.text}</div>
              <div className="rating-options">
                <RatingScale
                  id={question.id}
                  value={question.rating}
                  onChange={(value) => updateRating(question.id, value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {evaluation.openQuestions.length > 0 && (
        <div className="space-y-4">
          {evaluation.openQuestions.map((question) => (
            <div key={question.id} className="space-y-2">
              <label htmlFor={question.id} className="block text-sm md:text-base font-medium">
                {question.text}
              </label>
              <Textarea
                id={question.id}
                value={question.answer}
                onChange={(e) => updateOpenAnswer(question.id, e.target.value)}
                className="w-full min-h-[100px]"
                placeholder="Nhập câu trả lời của bạn..."
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamEvaluationSection;
