
import React from 'react';
import RatingScale from './RatingScale';
import { TeamEvaluation } from '@/contexts/SurveyContext';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface TeamEvaluationSectionProps {
  title: string;
  evaluation: TeamEvaluation;
  updateRating: (questionId: string, rating: number) => void;
  updateOpenAnswer: (questionId: string, answer: string) => void;
  className?: string;
  showValidation?: boolean;
}

const TeamEvaluationSection: React.FC<TeamEvaluationSectionProps> = ({
  title,
  evaluation,
  updateRating,
  updateOpenAnswer,
  className = '',
  showValidation = false,
}) => {
  // Function to check if a rating question has validation errors
  const hasRatingError = (question: { id: string; rating: number | null; required?: boolean }) => {
    return showValidation && question.required && question.rating === null;
  };

  // Function to check if an open question has validation errors
  const hasOpenQuestionError = (question: { id: string; answer: string; required?: boolean }) => {
    return showValidation && question.required && question.answer.trim() === '';
  };
  
  // Check if any validation errors exist
  const hasErrors = evaluation.ratings.some(q => hasRatingError(q)) || 
                    evaluation.openQuestions.some(q => hasOpenQuestionError(q));

  return (
    <div className={`section-card ${className}`}>
      <div className="section-header">
        <h3 className="text-lg font-bold text-survey-primary">{title}</h3>
      </div>

      {hasErrors && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Vui lòng hoàn thành tất cả các trường bắt buộc
          </AlertDescription>
        </Alert>
      )}

      {evaluation.ratings.length > 0 && (
        <div className="mb-6">
          {evaluation.ratings.map((question) => (
            <div 
              key={question.id} 
              className={`rating-item ${hasRatingError(question) ? 'border-l-4 border-red-500 pl-2' : ''}`}
            >
              <div className="rating-question">
                {question.text}
                {question.required && <span className="text-red-500 ml-1">*</span>}
              </div>
              <div className="rating-options">
                <RatingScale
                  id={question.id}
                  value={question.rating}
                  onChange={(value) => updateRating(question.id, value)}
                  hasError={hasRatingError(question)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {evaluation.openQuestions.length > 0 && (
        <div className="space-y-4">
          {evaluation.openQuestions.map((question) => (
            <div 
              key={question.id} 
              className={`space-y-2 ${hasOpenQuestionError(question) ? 'border-l-4 border-red-500 pl-2' : ''}`}
            >
              <label htmlFor={question.id} className="block text-sm md:text-base font-medium">
                {question.text}
                {question.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <Textarea
                id={question.id}
                value={question.answer}
                onChange={(e) => updateOpenAnswer(question.id, e.target.value)}
                className={`w-full min-h-[100px] ${hasOpenQuestionError(question) ? 'border-red-500 ring-red-500' : ''}`}
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
