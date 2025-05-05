import { SurveyData } from "@/types/survey";

// Function to validate the current step and ensure required fields are filled
export const validateCurrentStep = (
    currentStep: number,
    surveyData: SurveyData
): { isValid: boolean; message?: string } => {
    switch (currentStep) {
        case 0: // General Info step
            if (!surveyData.team) {
                return {
                    isValid: false,
                    message: "Vui lòng chọn team của bạn",
                };
            }
            return { isValid: true };

        case 1: // Self/InTeam Evaluation
            // Self evaluation is mandatory
            const selfEvalRequired = surveyData.selfEvaluation.ratings
                .filter((q) => q.required)
                .every((q) => q.rating !== null);

            if (!selfEvalRequired) {
                return {
                    isValid: false,
                    message:
                        "Vui lòng hoàn thành tất cả câu hỏi tự đánh giá bản thân",
                };
            }

            // If not single member, check team evaluation too
            if (!surveyData.isSingleMember) {
                const teamEvalRequired = surveyData.inTeamEvaluation.ratings
                    .filter((q) => q.required)
                    .every((q) => q.rating !== null);

                if (!teamEvalRequired) {
                    return {
                        isValid: false,
                        message:
                            "Vui lòng hoàn thành tất cả câu hỏi đánh giá team",
                    };
                }
            }

            return { isValid: true };

        case 2: // Cross Team Evaluation - no required fields
            return { isValid: true };
        case 3: // OKR Evaluation
            // Check all required rating questions
            const okrRatingsValid = surveyData.okrEvaluation.ratings
                .filter((q) => q.required)
                .every((q) => q.rating !== null);

            if (!okrRatingsValid) {
                return {
                    isValid: false,
                    message:
                        "Vui lòng hoàn thành tất cả câu hỏi đánh giá OKR bắt buộc",
                };
            }

            // Check all required open questions
            const okrOpenQuestionsValid = surveyData.okrEvaluation.openQuestions
                .filter((q) => q.required)
                .every((q) => q.answer.trim() !== "");

            if (!okrOpenQuestionsValid) {
                return {
                    isValid: false,
                    message:
                        "Vui lòng trả lời tất cả câu hỏi mở về OKR bắt buộc",
                };
            }

            return { isValid: true };

        case 4: // WSZ Evaluation
            // Check all required rating questions
            const wszRatingsValid = surveyData.wszTeamEvaluation.ratings
                .filter((q) => q.required)
                .every((q) => q.rating !== null);

            if (!wszRatingsValid) {
                return {
                    isValid: false,
                    message:
                        "Vui lòng hoàn thành tất cả câu hỏi đánh giá bắt buộc",
                };
            }

            // Check all required open questions
            const wszOpenQuestionsValid =
                surveyData.wszTeamEvaluation.openQuestions
                    .filter((q) => q.required)
                    .every((q) => q.answer.trim() !== "");

            if (!wszOpenQuestionsValid) {
                return {
                    isValid: false,
                    message: "Vui lòng trả lời tất cả câu hỏi mở bắt buộc",
                };
            }

            // Check OKR evaluation
            const okrValid = surveyData.okrEvaluation.ratings
                .filter((q) => q.required)
                .every((q) => q.rating !== null);

            if (!okrValid) {
                return {
                    isValid: false,
                    message: "Vui lòng hoàn thành tất cả câu hỏi đánh giá OKR",
                };
            }

            return { isValid: true };

        default:
            return { isValid: true };
    }
};

// Function to prepare survey data for database submission
export const prepareSurveyData = (surveyData: SurveyData) => {
    const {
        selfEvaluation,
        inTeamEvaluation,
        devTeamEvaluation,
        qaTeamEvaluation,
        baTeamEvaluation,
        designTeamEvaluation,
        contentSeoTeamEvaluation,
        wszTeamEvaluation,
        okrEvaluation,
    } = surveyData;

    // Map ratings from each evaluation object to database column format
    return {
        name: surveyData.name || null,
        team: surveyData.team || null,
        is_single_member: surveyData.isSingleMember,

        // Self evaluation ratings
        self_proactive_rating: selfEvaluation.ratings[0].rating,
        self_collaboration_rating: selfEvaluation.ratings[1].rating,
        self_timely_response_rating: selfEvaluation.ratings[2].rating,
        self_improvement_rating: selfEvaluation.ratings[3].rating,
        self_satisfaction_rating: selfEvaluation.ratings[4].rating,

        // In-team evaluation
        inteam_respect_rating: inTeamEvaluation.ratings[0].rating,
        inteam_support_rating: inTeamEvaluation.ratings[1].rating,
        inteam_clarity_rating: inTeamEvaluation.ratings[2].rating,
        inteam_growth_rating: inTeamEvaluation.ratings[3].rating,
        inteam_satisfaction_rating: inTeamEvaluation.ratings[4].rating,
        inteam_strengths: inTeamEvaluation.openQuestions[0].answer || null,
        inteam_improvements: inTeamEvaluation.openQuestions[1].answer || null,

        // DEV team evaluation
        dev_requirements_rating: devTeamEvaluation.ratings[0].rating,
        dev_proactive_rating: devTeamEvaluation.ratings[1].rating,
        dev_solutions_rating: devTeamEvaluation.ratings[2].rating,
        dev_support_rating: devTeamEvaluation.ratings[3].rating,
        dev_satisfaction_rating: devTeamEvaluation.ratings[4].rating,
        dev_strengths: devTeamEvaluation.openQuestions[0].answer || null,
        dev_improvements: devTeamEvaluation.openQuestions[1].answer || null,

        // QA team evaluation
        qa_testing_rating: qaTeamEvaluation.ratings[0].rating,
        qa_collaboration_rating: qaTeamEvaluation.ratings[1].rating,
        qa_communication_rating: qaTeamEvaluation.ratings[2].rating,
        qa_timing_rating: qaTeamEvaluation.ratings[3].rating,
        qa_satisfaction_rating: qaTeamEvaluation.ratings[4].rating,
        qa_strengths: qaTeamEvaluation.openQuestions[0].answer || null,
        qa_improvements: qaTeamEvaluation.openQuestions[1].answer || null,

        // BA team evaluation
        ba_clarity_rating: baTeamEvaluation.ratings[0].rating,
        ba_collaboration_rating: baTeamEvaluation.ratings[1].rating,
        ba_response_rating: baTeamEvaluation.ratings[2].rating,
        ba_documentation_rating: baTeamEvaluation.ratings[3].rating,
        ba_satisfaction_rating: baTeamEvaluation.ratings[4].rating,
        ba_strengths: baTeamEvaluation.openQuestions[0].answer || null,
        ba_improvements: baTeamEvaluation.openQuestions[1].answer || null,

        // Design team evaluation
        design_requirements_rating: designTeamEvaluation.ratings[0].rating,
        design_communication_rating: designTeamEvaluation.ratings[1].rating,
        design_delivery_rating: designTeamEvaluation.ratings[2].rating,
        design_creativity_rating: designTeamEvaluation.ratings[3].rating,
        design_satisfaction_rating: designTeamEvaluation.ratings[4].rating,
        design_strengths: designTeamEvaluation.openQuestions[0].answer || null,
        design_improvements:
            designTeamEvaluation.openQuestions[1].answer || null,

        // Content-SEO team evaluation
        content_quality_rating: contentSeoTeamEvaluation.ratings[0].rating,
        content_collaboration_rating:
            contentSeoTeamEvaluation.ratings[1].rating,
        content_response_rating: contentSeoTeamEvaluation.ratings[2].rating,
        content_satisfaction_rating: contentSeoTeamEvaluation.ratings[3].rating,
        content_strengths:
            contentSeoTeamEvaluation.openQuestions[0].answer || null,
        content_improvements:
            contentSeoTeamEvaluation.openQuestions[1].answer || null,

        // OKR evaluation
        okr_understanding_rating: okrEvaluation.ratings[0].rating,
        okr_team_awareness_rating: okrEvaluation.ratings[1].rating,
        okr_personal_rating: okrEvaluation.ratings[2].rating,
        okr_process_rating: okrEvaluation.ratings[3].rating,
        okr_implementation_rating: okrEvaluation.ratings[4].rating,

        // WSZ team evaluation
        wsz_process_rating: wszTeamEvaluation.ratings[0].rating,
        wsz_meetings_rating: wszTeamEvaluation.ratings[1].rating,
        wsz_goals_rating: wszTeamEvaluation.ratings[2].rating,
        wsz_product_understanding_rating: wszTeamEvaluation.ratings[3].rating,
        wsz_satisfaction_rating: wszTeamEvaluation.ratings[4].rating,
        wsz_process_improvements:
            wszTeamEvaluation.openQuestions[0].answer || null,
        wsz_next_quarter_changes:
            wszTeamEvaluation.openQuestions[1].answer || null,
    };
};
