
import React, { createContext, useContext, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type TeamType = 'DEV' | 'BA' | 'CONTENT' | 'SEO' | 'DESIGN' | 'QA' | 'MKT' | 'OTHER' | '';

export interface RatingQuestion {
  id: string;
  text: string;
  rating: number | null;
}

export interface OpenQuestion {
  id: string;
  text: string;
  answer: string;
}

export interface TeamEvaluation {
  ratings: RatingQuestion[];
  openQuestions: OpenQuestion[];
}

export interface SurveyData {
  name: string;
  team: TeamType;
  isSingleMember: boolean;
  selfEvaluation: TeamEvaluation;
  inTeamEvaluation: TeamEvaluation;
  devTeamEvaluation: TeamEvaluation;
  qaTeamEvaluation: TeamEvaluation;
  baTeamEvaluation: TeamEvaluation;
  designTeamEvaluation: TeamEvaluation;
  contentSeoTeamEvaluation: TeamEvaluation;
  wszTeamEvaluation: TeamEvaluation;
}

interface SurveyContextType {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  surveyData: SurveyData;
  setSurveyData: React.Dispatch<React.SetStateAction<SurveyData>>;
  nextStep: () => void;
  prevStep: () => void;
  isSubmitted: boolean;
  submitSurvey: () => Promise<void>;
}

const SurveyContext = createContext<SurveyContextType>({} as SurveyContextType);

// Initial data for the survey
const initialSurveyData: SurveyData = {
  name: '',
  team: '' as TeamType,
  isSingleMember: false,
  
  // Self evaluation (for single members)
  selfEvaluation: {
    ratings: [
      { id: 'self_proactive', text: 'Tôi chủ động và bám sát mục tiêu công việc', rating: null },
      { id: 'self_collaboration', text: 'Tôi phối hợp hiệu quả với các team khác', rating: null },
      { id: 'self_timely_response', text: 'Tôi phản hồi và xử lý yêu cầu đúng thời hạn', rating: null },
      { id: 'self_improvement', text: 'Tôi tìm cách cải thiện hiệu quả công việc', rating: null },
      { id: 'self_satisfaction', text: 'Tôi hài lòng với hiệu suất làm việc của mình trong quý này', rating: null },
    ],
    openQuestions: []
  },
  
  // In-team evaluation (for team members)
  inTeamEvaluation: {
    ratings: [
      { id: 'inteam_respect', text: 'Tôi cảm thấy được lắng nghe và tôn trọng ý kiến của mình.', rating: null },
      { id: 'inteam_support', text: 'Mức độ hỗ trợ và hợp tác giữa các thành viên trong team.', rating: null },
      { id: 'inteam_clarity', text: 'Sự rõ ràng trong việc phân công nhiệm vụ và trách nhiệm.', rating: null },
      { id: 'inteam_growth', text: 'Tôi cảm thấy có cơ hội để phát triển kỹ năng và học hỏi trong team.', rating: null },
      { id: 'inteam_satisfaction', text: 'Mức độ hài lòng tổng thể với team trong quý vừa qua', rating: null },
    ],
    openQuestions: [
      { id: 'inteam_strengths', text: 'Theo bạn, điều gì team đã làm tốt trong quý này?', answer: '' },
      { id: 'inteam_improvements', text: 'Team còn điều gì cần cải thiện?', answer: '' },
    ]
  },
  
  // DEV team evaluation
  devTeamEvaluation: {
    ratings: [
      { id: 'dev_requirements', text: 'Developer triển khai đúng yêu cầu, đúng hạn', rating: null },
      { id: 'dev_proactive', text: 'Chủ động xử lý vấn đề và phối hợp tốt', rating: null },
      { id: 'dev_solutions', text: 'Đề xuất giải pháp khi gặp khó khăn', rating: null },
      { id: 'dev_support', text: 'Hỗ trợ hiệu quả khi có vấn đề phát sinh', rating: null },
      { id: 'dev_satisfaction', text: 'Mức độ hài lòng với team Developer', rating: null },
    ],
    openQuestions: [
      { id: 'dev_strengths', text: 'Bạn đánh giá cao điều gì ở team Developer?', answer: '' },
      { id: 'dev_improvements', text: 'Góp ý giúp team Developer làm việc hiệu quả hơn?', answer: '' },
    ]
  },
  
  // QA team evaluation
  qaTeamEvaluation: {
    ratings: [
      { id: 'qa_testing', text: 'Tester kiểm thử kỹ và phát hiện lỗi kịp thời', rating: null },
      { id: 'qa_collaboration', text: 'Phối hợp tốt để cải thiện chất lượng sản phẩm', rating: null },
      { id: 'qa_communication', text: 'Giao tiếp rõ ràng và báo cáo lỗi có giá trị', rating: null },
      { id: 'qa_timing', text: 'Thời gian kiểm thử hợp lý, hỗ trợ tiến độ chung', rating: null },
      { id: 'qa_satisfaction', text: 'Mức độ hài lòng với team Tester', rating: null },
    ],
    openQuestions: [
      { id: 'qa_strengths', text: 'Điều bạn thấy tốt nhất ở team Tester?', answer: '' },
      { id: 'qa_improvements', text: 'Góp ý giúp team Tester nâng cao hiệu quả kiểm thử?', answer: '' },
    ]
  },
  
  // BA team evaluation
  baTeamEvaluation: {
    ratings: [
      { id: 'ba_clarity', text: 'Team BA truyền đạt yêu cầu rõ ràng, dễ hiểu', rating: null },
      { id: 'ba_collaboration', text: 'Phối hợp hiệu quả với team bạn trong quá trình triển khai', rating: null },
      { id: 'ba_response', text: 'Phản hồi nhanh và đầy đủ khi có yêu cầu/góp ý', rating: null },
      { id: 'ba_documentation', text: 'Tài liệu và backlog hỗ trợ tốt cho công việc', rating: null },
      { id: 'ba_satisfaction', text: 'Mức độ hài lòng tổng thể với team BA', rating: null },
    ],
    openQuestions: [
      { id: 'ba_strengths', text: 'Bạn đánh giá cao điểm nào của team BA?', answer: '' },
      { id: 'ba_improvements', text: 'Góp ý giúp team BA phối hợp hiệu quả hơn?', answer: '' },
    ]
  },
  
  // Design team evaluation
  designTeamEvaluation: {
    ratings: [
      { id: 'design_requirements', text: 'Thiết kế đáp ứng đúng yêu cầu và mục tiêu', rating: null },
      { id: 'design_communication', text: 'Giao tiếp giữa team Design và team bạn hiệu quả', rating: null },
      { id: 'design_delivery', text: 'Thiết kế được bàn giao đúng thời hạn, đúng chuẩn và đầy đủ', rating: null },
      { id: 'design_creativity', text: 'Thiết kế đẹp và sáng tạo', rating: null },
      { id: 'design_satisfaction', text: 'Mức độ hài lòng tổng thể với team Design', rating: null },
    ],
    openQuestions: [
      { id: 'design_strengths', text: 'Điều bạn hài lòng nhất về team Design?', answer: '' },
      { id: 'design_improvements', text: 'Góp ý giúp team Design làm việc hiệu quả hơn?', answer: '' },
    ]
  },
  
  // Content-SEO team evaluation
  contentSeoTeamEvaluation: {
    ratings: [
      { id: 'content_quality', text: 'Nội dung đúng chủ đề và chất lượng', rating: null },
      { id: 'content_collaboration', text: 'Phối hợp tốt với team bạn để đạt mục tiêu sản phẩm', rating: null },
      { id: 'content_response', text: 'Phản hồi nhanh khi cần chỉnh sửa nội dung', rating: null },
      { id: 'content_satisfaction', text: 'Mức độ hài lòng tổng thể với team CONTENT – SEO', rating: null },
    ],
    openQuestions: [
      { id: 'content_strengths', text: 'Nhận xét tích cực dành cho team CONTENT – SEO?', answer: '' },
      { id: 'content_improvements', text: 'Góp ý giúp team CONTENT – SEO cải thiện hiệu quả?', answer: '' },
    ]
  },
  
  // WSZ team evaluation
  wszTeamEvaluation: {
    ratings: [
      { id: 'wsz_process', text: 'Bạn đánh giá ntn về quy trình làm việc của team', rating: null },
      { id: 'wsz_meetings', text: 'Các buổi họp (Daily, Planning, Review…) có hiệu quả không', rating: null },
      { id: 'wsz_goals', text: 'Bạn có hiểu rõ về mục tiêu trong quý này không', rating: null },
      { id: 'wsz_product_understanding', text: 'Bạn đánh giá mức độ hiểu sản phẩm WSZ của mình ở mức nào?', rating: null },
      { id: 'wsz_satisfaction', text: 'Mức độ hài lòng tổng thể với team WSZ', rating: null },
    ],
    openQuestions: [
      { id: 'wsz_process_improvements', text: 'Bạn có đề xuất gì để cải thiện quy trình làm việc giữa các team và cả team WSZ?', answer: '' },
      { id: 'wsz_next_quarter_changes', text: 'Bạn mong muốn điều gì được thay đổi trong quý tiếp theo?', answer: '' },
    ]
  }
};

export const SurveyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [surveyData, setSurveyData] = useState<SurveyData>(initialSurveyData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Function to prepare survey data for database submission
  const prepareSurveyData = () => {
    const { 
      selfEvaluation, inTeamEvaluation, 
      devTeamEvaluation, qaTeamEvaluation, baTeamEvaluation, 
      designTeamEvaluation, contentSeoTeamEvaluation, wszTeamEvaluation 
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
      design_improvements: designTeamEvaluation.openQuestions[1].answer || null,
      
      // Content-SEO team evaluation
      content_quality_rating: contentSeoTeamEvaluation.ratings[0].rating,
      content_collaboration_rating: contentSeoTeamEvaluation.ratings[1].rating,
      content_response_rating: contentSeoTeamEvaluation.ratings[2].rating,
      content_satisfaction_rating: contentSeoTeamEvaluation.ratings[3].rating,
      content_strengths: contentSeoTeamEvaluation.openQuestions[0].answer || null,
      content_improvements: contentSeoTeamEvaluation.openQuestions[1].answer || null,
      
      // WSZ team evaluation
      wsz_process_rating: wszTeamEvaluation.ratings[0].rating,
      wsz_meetings_rating: wszTeamEvaluation.ratings[1].rating,
      wsz_goals_rating: wszTeamEvaluation.ratings[2].rating,
      wsz_product_understanding_rating: wszTeamEvaluation.ratings[3].rating,
      wsz_satisfaction_rating: wszTeamEvaluation.ratings[4].rating,
      wsz_process_improvements: wszTeamEvaluation.openQuestions[0].answer || null,
      wsz_next_quarter_changes: wszTeamEvaluation.openQuestions[1].answer || null,
    };
  };

  // Function to submit survey data to Supabase
  const submitSurvey = async () => {
    try {
      const surveyDataForDb = prepareSurveyData();
      
      const { error } = await supabase
        .from('survey_responses')
        .insert([surveyDataForDb]);
      
      if (error) {
        console.error('Error submitting survey:', error);
        toast.error('Có lỗi khi gửi khảo sát. Vui lòng thử lại!');
        return;
      }
      
      setIsSubmitted(true);
      toast.success('Khảo sát đã được gửi thành công!');
    } catch (err) {
      console.error('Exception when submitting survey:', err);
      toast.error('Có lỗi khi gửi khảo sát. Vui lòng thử lại!');
    }
  };

  return (
    <SurveyContext.Provider value={{ 
      currentStep, 
      setCurrentStep, 
      surveyData, 
      setSurveyData,
      nextStep,
      prevStep,
      isSubmitted,
      submitSurvey
    }}>
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
};
