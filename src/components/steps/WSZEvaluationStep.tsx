import React, { useState } from "react";
import { useSurvey } from "@/contexts/SurveyContext";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import TeamEvaluationSection from "@/components/TeamEvaluationSection";
import { toast } from "sonner";

const WSZEvaluationStep = () => {
    const {
        surveyData,
        setSurveyData,
        prevStep,
        submitSurvey,
        validateCurrentStep,
    } = useSurvey();
    const [showValidation, setShowValidation] = useState(false);

    const updateWSZRating = (questionId: string, rating: number) => {
        setSurveyData((prev) => ({
            ...prev,
            wszTeamEvaluation: {
                ...prev.wszTeamEvaluation,
                ratings: prev.wszTeamEvaluation.ratings.map((q) =>
                    q.id === questionId ? { ...q, rating } : q
                ),
            },
        }));
    };

    const updateWSZOpenAnswer = (questionId: string, answer: string) => {
        setSurveyData((prev) => ({
            ...prev,
            wszTeamEvaluation: {
                ...prev.wszTeamEvaluation,
                openQuestions: prev.wszTeamEvaluation.openQuestions.map((q) =>
                    q.id === questionId ? { ...q, answer } : q
                ),
            },
        }));
    };

    const handleSubmit = async () => {
        setShowValidation(true);
        const validation = validateCurrentStep();

        if (validation.isValid) {
            await submitSurvey();
        } else {
            toast.error(
                validation.message ||
                    "Vui lòng hoàn thành tất cả các trường bắt buộc"
            );
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* <Card className="border border-survey-accent shadow-lg mb-6">
        <CardHeader className="bg-gradient-to-r from-survey-primary to-survey-secondary text-white rounded-t-lg">
          <CardTitle className="text-2xl">IV. Đánh giá OKR</CardTitle>
          <CardDescription className="text-white/80">
            Đánh giá về phương pháp OKR và triển khai trong team
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <TeamEvaluationSection
            title="Đánh giá về OKR"
            evaluation={surveyData.okrEvaluation}
            updateRating={updateOKRRating}
            updateOpenAnswer={() => {}}  // No open questions for OKR
            showValidation={showValidation}
          />
        </CardContent>
      </Card> */}

            <Card className="border border-survey-accent shadow-lg">
                <CardHeader className="bg-gradient-to-r from-survey-primary to-survey-secondary text-white rounded-t-lg">
                    <CardTitle className="text-2xl">
                        IV. Đánh giá Team WSZ
                    </CardTitle>
                    <CardDescription className="text-white/80">
                        Đánh giá quy trình làm việc và hiệu quả của toàn team
                    </CardDescription>
                </CardHeader>

                <CardContent className="pt-6">
                    <TeamEvaluationSection
                        title="Đánh giá Team WSZ"
                        evaluation={surveyData.wszTeamEvaluation}
                        updateRating={updateWSZRating}
                        updateOpenAnswer={updateWSZOpenAnswer}
                        showValidation={showValidation}
                    />
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={prevStep}>
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
