
import React from 'react';
import { useSurvey } from '@/contexts/SurveyContext';
import GeneralInfoStep from './steps/GeneralInfoStep';
import InTeamEvaluationStep from './steps/InTeamEvaluationStep';
import CrossTeamEvaluationStep from './steps/CrossTeamEvaluationStep';
import WSZEvaluationStep from './steps/WSZEvaluationStep';
import ThankYouStep from './steps/ThankYouStep';
import { Progress } from '@/components/ui/progress';

const SurveyContainer = () => {
  const { currentStep, isSubmitted } = useSurvey();
  
  // Calculate progress percentage
  const totalSteps = 4; // Excluding thank you step
  const progressPercentage = Math.min(((currentStep) / totalSteps) * 100, 100);
  
  const renderStep = () => {
    if (isSubmitted) {
      return <ThankYouStep />;
    }
    
    switch (currentStep) {
      case 0:
        return <GeneralInfoStep />;
      case 1:
        return <InTeamEvaluationStep />;
      case 2:
        return <CrossTeamEvaluationStep />;
      case 3:
        return <WSZEvaluationStep />;
      default:
        return <GeneralInfoStep />;
    }
  };
  
  return (
    <div className="w-full px-4">
      {!isSubmitted && (
        <div className="w-full max-w-4xl mx-auto mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Tiến độ: {Math.round(progressPercentage)}%</span>
            <span>Bước {currentStep + 1}/{totalSteps}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      )}
      {renderStep()}
    </div>
  );
};

export default SurveyContainer;
