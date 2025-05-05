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

const InTeamEvaluationStep = () => {
    const {
        surveyData,
        setSurveyData,
        nextStep,
        prevStep,
        validateCurrentStep,
    } = useSurvey();

    const { isSingleMember } = surveyData;
    const [showValidation, setShowValidation] = useState(false);

    const updateRating = (questionId: string, rating: number) => {
        if (isSingleMember) {
            setSurveyData((prev) => ({
                ...prev,
                selfEvaluation: {
                    ...prev.selfEvaluation,
                    ratings: prev.selfEvaluation.ratings.map((q) =>
                        q.id === questionId ? { ...q, rating } : q
                    ),
                },
            }));
        } else {
            setSurveyData((prev) => ({
                ...prev,
                inTeamEvaluation: {
                    ...prev.inTeamEvaluation,
                    ratings: prev.inTeamEvaluation.ratings.map((q) =>
                        q.id === questionId ? { ...q, rating } : q
                    ),
                },
            }));
        }
    };

    const updateOpenAnswer = (questionId: string, answer: string) => {
        if (isSingleMember) {
            // No open questions for self evaluation in the current structure
            return;
        }

        setSurveyData((prev) => ({
            ...prev,
            inTeamEvaluation: {
                ...prev.inTeamEvaluation,
                openQuestions: prev.inTeamEvaluation.openQuestions.map((q) =>
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
            window.scrollTo({ top: 0, behavior: "smooth" });
            setShowValidation(false);
        } else {
            toast.error(
                validation.message ||
                    "Vui lòng hoàn thành tất cả trường bắt buộc"
            );
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <Card className="border border-survey-accent shadow-lg">
                <CardHeader className="bg-gradient-to-r from-survey-primary to-survey-secondary text-white rounded-t-lg">
                    <CardTitle className="text-2xl">
                        {isSingleMember
                            ? "II. Đánh giá bản thân"
                            : "II. Đánh giá bản thân và team"}
                    </CardTitle>
                    <CardDescription className="text-white/80">
                        Đánh giá trên thang điểm 1-5
                    </CardDescription>
                </CardHeader>

                <CardContent className="pt-6">
                    {/* Always show self evaluation - it's required */}
                    <TeamEvaluationSection
                        title="Tự đánh giá bản thân (Bắt buộc)"
                        evaluation={surveyData.selfEvaluation}
                        updateRating={(questionId, rating) => {
                            setSurveyData((prev) => ({
                                ...prev,
                                selfEvaluation: {
                                    ...prev.selfEvaluation,
                                    ratings: prev.selfEvaluation.ratings.map(
                                        (q) =>
                                            q.id === questionId
                                                ? { ...q, rating }
                                                : q
                                    ),
                                },
                            }));
                        }}
                        updateOpenAnswer={() => {}} // No open questions for self eval
                        showValidation={showValidation}
                        className="mb-6"
                    />

                    {/* Show team evaluation section only if not a single member */}
                    {!isSingleMember && (
                        <TeamEvaluationSection
                            title="Đánh giá team của bạn"
                            evaluation={surveyData.inTeamEvaluation}
                            updateRating={(questionId, rating) => {
                                setSurveyData((prev) => ({
                                    ...prev,
                                    inTeamEvaluation: {
                                        ...prev.inTeamEvaluation,
                                        ratings:
                                            prev.inTeamEvaluation.ratings.map(
                                                (q) =>
                                                    q.id === questionId
                                                        ? { ...q, rating }
                                                        : q
                                            ),
                                    },
                                }));
                            }}
                            updateOpenAnswer={updateOpenAnswer}
                            showValidation={showValidation}
                        />
                    )}
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={prevStep}>
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
