
import React, { useState } from 'react';
import { useSurvey } from '@/contexts/SurveyContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TeamEvaluationSection from '@/components/TeamEvaluationSection';

const CrossTeamEvaluationStep = () => {
  const { surveyData, setSurveyData, nextStep, prevStep } = useSurvey();
  const [activeTab, setActiveTab] = useState("dev");

  // Update rating for a specific team
  const updateRating = (team: keyof typeof teamData, questionId: string, rating: number) => {
    setSurveyData(prev => ({
      ...prev,
      [team]: {
        ...prev[team],
        ratings: prev[team].ratings.map(q => 
          q.id === questionId ? { ...q, rating } : q
        )
      }
    }));
  };

  // Update open answer for a specific team
  const updateOpenAnswer = (team: keyof typeof teamData, questionId: string, answer: string) => {
    setSurveyData(prev => ({
      ...prev,
      [team]: {
        ...prev[team],
        openQuestions: prev[team].openQuestions.map(q => 
          q.id === questionId ? { ...q, answer } : q
        )
      }
    }));
  };

  // Map team keys to their evaluation data and titles
  const teamData = {
    devTeamEvaluation: {
      data: surveyData.devTeamEvaluation,
      title: "Đánh giá team Developer (DEV)"
    },
    qaTeamEvaluation: {
      data: surveyData.qaTeamEvaluation,
      title: "Đánh giá team Tester (QA)"
    },
    baTeamEvaluation: {
      data: surveyData.baTeamEvaluation,
      title: "Đánh giá team BA"
    },
    designTeamEvaluation: {
      data: surveyData.designTeamEvaluation,
      title: "Đánh giá team DESIGN"
    },
    contentSeoTeamEvaluation: {
      data: surveyData.contentSeoTeamEvaluation,
      title: "Đánh giá team CONTENT - SEO"
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border border-survey-accent shadow-lg">
        <CardHeader className="bg-gradient-to-r from-survey-primary to-survey-secondary text-white rounded-t-lg">
          <CardTitle className="text-2xl">III. Đánh giá các team khác (cross-team)</CardTitle>
          <CardDescription className="text-white/80">
            Đánh giá các team bạn đã làm việc cùng
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-5">
              <TabsTrigger value="dev">DEV</TabsTrigger>
              <TabsTrigger value="qa">QA</TabsTrigger>
              <TabsTrigger value="ba">BA</TabsTrigger>
              <TabsTrigger value="design">DESIGN</TabsTrigger>
              <TabsTrigger value="contentSeo">CONTENT-SEO</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dev">
              <TeamEvaluationSection
                title={teamData.devTeamEvaluation.title}
                evaluation={teamData.devTeamEvaluation.data}
                updateRating={(questionId, rating) => updateRating('devTeamEvaluation', questionId, rating)}
                updateOpenAnswer={(questionId, answer) => updateOpenAnswer('devTeamEvaluation', questionId, answer)}
                className="mt-4"
              />
            </TabsContent>
            
            <TabsContent value="qa">
              <TeamEvaluationSection
                title={teamData.qaTeamEvaluation.title}
                evaluation={teamData.qaTeamEvaluation.data}
                updateRating={(questionId, rating) => updateRating('qaTeamEvaluation', questionId, rating)}
                updateOpenAnswer={(questionId, answer) => updateOpenAnswer('qaTeamEvaluation', questionId, answer)}
                className="mt-4"
              />
            </TabsContent>
            
            <TabsContent value="ba">
              <TeamEvaluationSection
                title={teamData.baTeamEvaluation.title}
                evaluation={teamData.baTeamEvaluation.data}
                updateRating={(questionId, rating) => updateRating('baTeamEvaluation', questionId, rating)}
                updateOpenAnswer={(questionId, answer) => updateOpenAnswer('baTeamEvaluation', questionId, answer)}
                className="mt-4"
              />
            </TabsContent>
            
            <TabsContent value="design">
              <TeamEvaluationSection
                title={teamData.designTeamEvaluation.title}
                evaluation={teamData.designTeamEvaluation.data}
                updateRating={(questionId, rating) => updateRating('designTeamEvaluation', questionId, rating)}
                updateOpenAnswer={(questionId, answer) => updateOpenAnswer('designTeamEvaluation', questionId, answer)}
                className="mt-4"
              />
            </TabsContent>
            
            <TabsContent value="contentSeo">
              <TeamEvaluationSection
                title={teamData.contentSeoTeamEvaluation.title}
                evaluation={teamData.contentSeoTeamEvaluation.data}
                updateRating={(questionId, rating) => updateRating('contentSeoTeamEvaluation', questionId, rating)}
                updateOpenAnswer={(questionId, answer) => updateOpenAnswer('contentSeoTeamEvaluation', questionId, answer)}
                className="mt-4"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep}
          >
            Quay lại
          </Button>
          <Button 
            onClick={nextStep}
            className="bg-survey-primary hover:bg-survey-dark text-white"
          >
            Tiếp theo
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CrossTeamEvaluationStep;
