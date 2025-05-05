
import React from 'react';
import { useSurvey } from '@/contexts/SurveyContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import TeamEvaluationSection from '@/components/TeamEvaluationSection';
import { toast } from 'sonner';

const WSZEvaluationStep = () => {
  const { surveyData, setSurveyData, prevStep, submitSurvey } = useSurvey();

  const updateRating = (questionId: string, rating: number) => {
    setSurveyData(prev => ({
      ...prev,
      wszTeamEvaluation: {
        ...prev.wszTeamEvaluation,
        ratings: prev.wszTeamEvaluation.ratings.map(q => 
          q.id === questionId ? { ...q, rating } : q
        )
      }
    }));
  };

  const updateOpenAnswer = (questionId: string, answer: string) => {
    setSurveyData(prev => ({
      ...prev,
      wszTeamEvaluation: {
        ...prev.wszTeamEvaluation,
        openQuestions: prev.wszTeamEvaluation.openQuestions.map(q => 
          q.id === questionId ? { ...q, answer } : q
        )
      }
    }));
  };

  const handleSubmit = async () => {
    // Check if at least one rating is provided
    const hasAnyRating = surveyData.wszTeamEvaluation.ratings.some(q => q.rating !== null);
    
    if (!hasAnyRating) {
      toast.error("Vui lòng đánh giá ít nhất một tiêu chí trước khi hoàn thành");
      return;
    }
    
    await submitSurvey();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border border-survey-accent shadow-lg">
        <CardHeader className="bg-gradient-to-r from-survey-primary to-survey-secondary text-white rounded-t-lg">
          <CardTitle className="text-2xl">IV. Đánh giá Team WSZ</CardTitle>
          <CardDescription className="text-white/80">
            Đánh giá quy trình làm việc và hiệu quả của toàn team
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <TeamEvaluationSection
            title="Đánh giá Team WSZ"
            evaluation={surveyData.wszTeamEvaluation}
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
            onClick={handleSubmit}
            className="bg-survey-primary hover:bg-survey-dark text-white"
          >
            Hoàn thành
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WSZEvaluationStep;
