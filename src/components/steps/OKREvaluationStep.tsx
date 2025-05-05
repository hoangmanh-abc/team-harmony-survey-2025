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

const OKREvaluationStep = () => {
    const {
        surveyData,
        setSurveyData,
        prevStep,
        nextStep,
        validateCurrentStep,
    } = useSurvey();
    const [showValidation, setShowValidation] = useState(false);

    const updateOKRRating = (questionId: string, rating: number) => {
        setSurveyData((prev) => ({
            ...prev,
            okrEvaluation: {
                ...prev.okrEvaluation,
                ratings: prev.okrEvaluation.ratings.map((q) =>
                    q.id === questionId ? { ...q, rating } : q
                ),
            },
        }));
    };

    const updateOKROpenAnswer = (questionId: string, answer: string) => {
        setSurveyData((prev) => ({
            ...prev,
            okrEvaluation: {
                ...prev.okrEvaluation,
                openQuestions: prev.okrEvaluation.openQuestions.map((q) =>
                    q.id === questionId ? { ...q, answer } : q
                ),
            },
        }));
    };

    const handleContinue = () => {
        setShowValidation(true);
        const validation = validateCurrentStep();

        if (validation.isValid) {
            nextStep();
            setShowValidation(false);
        } else {
            toast.error(
                validation.message ||
                    "Vui lòng hoàn thành tất cả trường bắt buộc"
            );
        }
    };
    console.log("surveyData ", surveyData);

    return (
        <div className="w-full max-w-4xl mx-auto">
            <Card className="border border-survey-accent shadow-lg mb-6">
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
                        updateOpenAnswer={updateOKROpenAnswer}
                        showValidation={showValidation}
                    />
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={prevStep}>
                        Quay lại
                    </Button>
                    <Button
                        onClick={handleContinue}
                        className="bg-survey-primary hover:bg-survey-dark text-white"
                    >
                        Tiếp tục
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default OKREvaluationStep;
