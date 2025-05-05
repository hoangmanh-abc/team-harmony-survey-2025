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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeamEvaluationSection from "@/components/TeamEvaluationSection";
import { Info } from "lucide-react";
import { ConfigTeam } from "@/data/initialSurveyData";
import { toast } from "sonner";

const CrossTeamEvaluationStep = () => {
    const {
        surveyData,
        setSurveyData,
        nextStep,
        prevStep,
        validateCurrentStep,
    } = useSurvey();
    const otherTeam = ConfigTeam.filter((team) => team.id !== surveyData.team);
    const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
    const [showValidation, setShowValidation] = useState(false);

    // Map team keys to their evaluation data and titles
    const teamData = {
        devTeamEvaluation: {
            data: surveyData.devTeamEvaluation,
            title: "Đánh giá team Developer (DEV)",
        },
        qaTeamEvaluation: {
            data: surveyData.qaTeamEvaluation,
            title: "Đánh giá team Tester (QA)",
        },
        baTeamEvaluation: {
            data: surveyData.baTeamEvaluation,
            title: "Đánh giá team BA",
        },
        designTeamEvaluation: {
            data: surveyData.designTeamEvaluation,
            title: "Đánh giá team DESIGN",
        },
        contentSeoTeamEvaluation: {
            data: surveyData.contentSeoTeamEvaluation,
            title: "Đánh giá team CONTENT - SEO",
        },
    };

    // Lấy key team hiện tại
    const teamId = otherTeam[currentTeamIndex]?.id;
    const teamKey = (() => {
        switch (teamId) {
            case "DEV":
                return "devTeamEvaluation";
            case "QA":
                return "qaTeamEvaluation";
            case "BA":
                return "baTeamEvaluation";
            case "DESIGN":
                return "designTeamEvaluation";
            case "CONTENT_SEO":
                return "contentSeoTeamEvaluation";
            default:
                return "";
        }
    })();

    // Nếu không còn team nào (lỗi cấu hình)
    if (!teamKey) return null;

    // Update rating cho team hiện tại
    const updateRating = (questionId: string, rating: number) => {
        setSurveyData((prev) => ({
            ...prev,
            [teamKey]: {
                ...prev[teamKey],
                ratings: prev[teamKey].ratings.map((q) =>
                    q.id === questionId ? { ...q, rating } : q
                ),
            },
        }));
    };

    // Update open answer cho team hiện tại
    const updateOpenAnswer = (questionId: string, answer: string) => {
        setSurveyData((prev) => ({
            ...prev,
            [teamKey]: {
                ...prev[teamKey],
                openQuestions: prev[teamKey].openQuestions.map((q) =>
                    q.id === questionId ? { ...q, answer } : q
                ),
            },
        }));
    };

    // Xử lý nút tiếp theo
    const handleContinue = () => {
        // Có thể thêm validate nếu muốn
        if (currentTeamIndex < otherTeam.length - 1) {
            setCurrentTeamIndex(currentTeamIndex + 1);
            setShowValidation(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            nextStep();
        }
    };

    // Xử lý nút quay lại
    const handleBack = () => {
        if (currentTeamIndex > 0) {
            setCurrentTeamIndex(currentTeamIndex - 1);
            setShowValidation(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            prevStep();
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <Card className="border border-survey-accent shadow-lg">
                <CardHeader className="bg-gradient-to-r from-survey-primary to-survey-secondary text-white rounded-t-lg">
                    <CardTitle className="text-2xl">
                        III. Đánh giá các team khác (cross-team)
                    </CardTitle>
                    <CardDescription className="text-white/80">
                        Đánh giá các team bạn đã làm việc cùng, bỏ qua nếu không
                        làm việc cùng
                    </CardDescription>
                </CardHeader>

                <CardContent className="pt-6">
                    {/* <div className="bg-blue-50 p-4 rounded-md flex items-start gap-3 mb-4">
                        <Info
                            className="text-blue-500 mt-1 flex-shrink-0"
                            size={18}
                        />
                        <p className="text-blue-700 text-sm">
                            {`Team ${
                                otherTeam[currentTeamIndex]?.name
                            }: Vui lòng đánh giá team này. (${
                                currentTeamIndex + 1
                            }/${otherTeam.length})`}
                        </p>
                    </div> */}
                    <TeamEvaluationSection
                        title={teamData[teamKey].title}
                        evaluation={teamData[teamKey].data}
                        updateRating={updateRating}
                        updateOpenAnswer={updateOpenAnswer}
                        showValidation={showValidation}
                        className="mt-4"
                    />
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleBack}>
                        {currentTeamIndex === 0 ? "Quay lại" : "Trước"}
                    </Button>
                    <Button
                        onClick={handleContinue}
                        className="bg-survey-primary hover:bg-survey-dark text-white"
                    >
                        {currentTeamIndex === otherTeam.length - 1
                            ? "Tiếp theo"
                            : "Tiếp tục"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default CrossTeamEvaluationStep;
