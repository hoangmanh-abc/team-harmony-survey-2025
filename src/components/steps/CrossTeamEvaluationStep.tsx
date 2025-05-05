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

const CrossTeamEvaluationStep = () => {
    const {
        surveyData,
        setSurveyData,
        nextStep,
        prevStep,
        validateCurrentStep,
    } = useSurvey();
    const otherTeam = ConfigTeam.filter((team) => team.id !== surveyData.team);
    const [activeTab, setActiveTab] = useState(otherTeam[0].id);
    const [showValidation, setShowValidation] = useState(false);

    // Update rating for a specific team
    const updateRating = (
        team: keyof typeof teamData,
        questionId: string,
        rating: number
    ) => {
        setSurveyData((prev) => ({
            ...prev,
            [team]: {
                ...prev[team],
                ratings: prev[team].ratings.map((q) =>
                    q.id === questionId ? { ...q, rating } : q
                ),
            },
        }));
    };

    // Update open answer for a specific team
    const updateOpenAnswer = (
        team: keyof typeof teamData,
        questionId: string,
        answer: string
    ) => {
        setSurveyData((prev) => ({
            ...prev,
            [team]: {
                ...prev[team],
                openQuestions: prev[team].openQuestions.map((q) =>
                    q.id === questionId ? { ...q, answer } : q
                ),
            },
        }));
    };

    const handleContinue = () => {
        // Cross-team evaluations are optional, so we don't need to validate
        nextStep();
    };

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

    return (
        <div className="w-full max-w-4xl mx-auto">
            <Card className="border border-survey-accent shadow-lg">
                <CardHeader className="bg-gradient-to-r from-survey-primary to-survey-secondary text-white rounded-t-lg">
                    <CardTitle className="text-2xl">
                        III. Đánh giá các team khác (cross-team)
                    </CardTitle>
                    <CardDescription className="text-white/80">
                        Đánh giá các team bạn đã làm việc cùng
                    </CardDescription>
                </CardHeader>

                <CardContent className="pt-6">
                    <div className="bg-blue-50 p-4 rounded-md flex items-start gap-3 mb-4">
                        <Info
                            className="text-blue-500 mt-1 flex-shrink-0"
                            size={18}
                        />
                        <p className="text-blue-700 text-sm">
                            Vui lòng đánh giá các team mà bạn đã làm việc cùng.
                            Nếu bạn chưa từng làm việc với team nào đó, bạn có
                            thể bỏ qua.
                        </p>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="w-full grid grid-cols-5">
                            {ConfigTeam.filter(
                                (team) => team.id !== surveyData.team
                            ).map((team) => (
                                <TabsTrigger key={team.id} value={team.id}>
                                    {team.shortName}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <TabsContent value={"DEV"}>
                            <TeamEvaluationSection
                                title={teamData.devTeamEvaluation.title}
                                evaluation={teamData.devTeamEvaluation.data}
                                updateRating={(questionId, rating) =>
                                    updateRating(
                                        "devTeamEvaluation",
                                        questionId,
                                        rating
                                    )
                                }
                                updateOpenAnswer={(questionId, answer) =>
                                    updateOpenAnswer(
                                        "devTeamEvaluation",
                                        questionId,
                                        answer
                                    )
                                }
                                className="mt-4"
                            />
                        </TabsContent>

                        <TabsContent value="QA">
                            <TeamEvaluationSection
                                title={teamData.qaTeamEvaluation.title}
                                evaluation={teamData.qaTeamEvaluation.data}
                                updateRating={(questionId, rating) =>
                                    updateRating(
                                        "qaTeamEvaluation",
                                        questionId,
                                        rating
                                    )
                                }
                                updateOpenAnswer={(questionId, answer) =>
                                    updateOpenAnswer(
                                        "qaTeamEvaluation",
                                        questionId,
                                        answer
                                    )
                                }
                                className="mt-4"
                            />
                        </TabsContent>

                        <TabsContent value="BA">
                            <TeamEvaluationSection
                                title={teamData.baTeamEvaluation.title}
                                evaluation={teamData.baTeamEvaluation.data}
                                updateRating={(questionId, rating) =>
                                    updateRating(
                                        "baTeamEvaluation",
                                        questionId,
                                        rating
                                    )
                                }
                                updateOpenAnswer={(questionId, answer) =>
                                    updateOpenAnswer(
                                        "baTeamEvaluation",
                                        questionId,
                                        answer
                                    )
                                }
                                className="mt-4"
                            />
                        </TabsContent>

                        <TabsContent value="DESIGN">
                            <TeamEvaluationSection
                                title={teamData.designTeamEvaluation.title}
                                evaluation={teamData.designTeamEvaluation.data}
                                updateRating={(questionId, rating) =>
                                    updateRating(
                                        "designTeamEvaluation",
                                        questionId,
                                        rating
                                    )
                                }
                                updateOpenAnswer={(questionId, answer) =>
                                    updateOpenAnswer(
                                        "designTeamEvaluation",
                                        questionId,
                                        answer
                                    )
                                }
                                className="mt-4"
                            />
                        </TabsContent>

                        <TabsContent value="CONTENT_SEO">
                            <TeamEvaluationSection
                                title={teamData.contentSeoTeamEvaluation.title}
                                evaluation={
                                    teamData.contentSeoTeamEvaluation.data
                                }
                                updateRating={(questionId, rating) =>
                                    updateRating(
                                        "contentSeoTeamEvaluation",
                                        questionId,
                                        rating
                                    )
                                }
                                updateOpenAnswer={(questionId, answer) =>
                                    updateOpenAnswer(
                                        "contentSeoTeamEvaluation",
                                        questionId,
                                        answer
                                    )
                                }
                                className="mt-4"
                            />
                        </TabsContent>
                    </Tabs>
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

export default CrossTeamEvaluationStep;
