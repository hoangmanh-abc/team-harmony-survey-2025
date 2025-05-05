
import React from 'react';
import { useSurvey } from '@/contexts/SurveyContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import TeamEvaluationSection from '@/components/TeamEvaluationSection';

const InTeamEvaluationStep = () => {
  const { surveyData, setSurveyData, nextStep, prevStep } = useSurvey();
  const { isSingleMember } = surveyData;

  const updateRating = (questionId: string, rating: number) => {
    if (isSingleMember) {
      setSurveyData(prev => ({
        ...prev,
        selfEvaluation: {
          ...prev.selfEvaluation,
          ratings: prev.selfEvaluation.ratings.map(q => 
            q.id === questionId ? { ...q, rating } : q
          )
        }
      }));
    } else {
      setSurveyData(prev => ({
        ...prev,
        inTeamEvaluation: {
          ...prev.inTeamEvaluation,
          ratings: prev.inTeamEvaluation.ratings.map(q => 
            q.id === questionId ? { ...q, rating } : q
          )
        }
      }));
    }
  };

  const updateOpenAnswer = (questionId: string, answer: string) => {
    if (isSingleMember) {
      // No open questions for self evaluation in the current structure
      return;
    }
    
    setSurveyData(prev => ({
      ...prev,
      inTeamEvaluation: {
        ...prev.inTeamEvaluation,
        openQuestions: prev.inTeamEvaluation.openQuestions.map(q => 
          q.id === questionId ? { ...q, answer } : q
        )
      }
    }));
  };

  const handleContinue = () => {
    nextStep();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border border-survey-accent shadow-lg">
        <CardHeader className="bg-gradient-to-r from-survey-primary to-survey-secondary text-white rounded-t-lg">
          <CardTitle className="text-2xl">
            {isSingleMember
              ? "II. Tự đánh giá bản thân"
              : "II. Đánh giá team bạn đang thuộc (in-team)"}
          </CardTitle>
          <CardDescription className="text-white/80">
            {isSingleMember
              ? "Đánh giá hiệu suất làm việc của bản thân"
              : "Đánh giá trên thang điểm 1-5"}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <TeamEvaluationSection
            title={isSingleMember ? "Tự đánh giá bản thân" : "Đánh giá team của bạn"}
            evaluation={isSingleMember ? surveyData.selfEvaluation : surveyData.inTeamEvaluation}
            updateRating={updateRating}
            updateOpenAnswer={updateOpenAnswer}
          />
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep}
          >
            Quay lại
          </Button>
          <Button 
            onClick={handleContinue}
            className="bg-survey-primary hover:bg-survey-dark text-white"
          >
            Tiếp theo
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InTeamEvaluationStep;
