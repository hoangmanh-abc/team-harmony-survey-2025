
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type TeamType = 'DEV' | 'BA' | 'CONTENT' | 'SEO' | 'DESIGN' | 'QA' | 'MKT' | 'OTHER' | '';
export type RatingQuestion = {
  id: string;
  text: string;
  rating: number | null;
};

export type OpenQuestion = {
  id: string;
  text: string;
  answer: string;
};

export type TeamEvaluation = {
  ratings: RatingQuestion[];
  openQuestions: OpenQuestion[];
};

export type SurveyData = {
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
};

interface SurveyContextProps {
  surveyData: SurveyData;
  currentStep: number;
  setSurveyData: React.Dispatch<React.SetStateAction<SurveyData>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  nextStep: () => void;
  prevStep: () => void;
  submitSurvey: () => void;
  isSubmitted: boolean;
}

const initialSurveyData: SurveyData = {
  name: '',
  team: '',
  isSingleMember: false,
  selfEvaluation: {
    ratings: [
      { id: 'self1', text: 'Tôi chủ động và bám sát mục tiêu công việc', rating: null },
      { id: 'self2', text: 'Tôi phối hợp hiệu quả với các team khác', rating: null },
      { id: 'self3', text: 'Tôi phản hồi và xử lý yêu cầu đúng thời hạn', rating: null },
      { id: 'self4', text: 'Tôi tìm cách cải thiện hiệu quả công việc', rating: null },
      { id: 'self5', text: 'Tôi hài lòng với hiệu suất làm việc của mình trong quý này', rating: null },
    ],
    openQuestions: []
  },
  inTeamEvaluation: {
    ratings: [
      { id: 'inteam1', text: 'Tôi cảm thấy được lắng nghe và tôn trọng ý kiến của mình', rating: null },
      { id: 'inteam2', text: 'Mức độ hỗ trợ và hợp tác giữa các thành viên trong team', rating: null },
      { id: 'inteam3', text: 'Sự rõ ràng trong việc phân công nhiệm vụ và trách nhiệm', rating: null },
      { id: 'inteam4', text: 'Tôi cảm thấy có cơ hội để phát triển kỹ năng và học hỏi trong team', rating: null },
      { id: 'inteam5', text: 'Mức độ hài lòng tổng thể với team trong quý vừa qua', rating: null },
    ],
    openQuestions: [
      { id: 'inteamOpen1', text: 'Theo bạn, điều gì team đã làm tốt trong quý này?', answer: '' },
      { id: 'inteamOpen2', text: 'Team còn điều gì cần cải thiện?', answer: '' },
    ]
  },
  devTeamEvaluation: {
    ratings: [
      { id: 'dev1', text: 'Developer triển khai đúng yêu cầu, đúng hạn', rating: null },
      { id: 'dev2', text: 'Chủ động xử lý vấn đề và phối hợp tốt', rating: null },
      { id: 'dev3', text: 'Đề xuất giải pháp khi gặp khó khăn', rating: null },
      { id: 'dev4', text: 'Hỗ trợ hiệu quả khi có vấn đề phát sinh', rating: null },
      { id: 'dev5', text: 'Mức độ hài lòng với team Developer', rating: null },
    ],
    openQuestions: [
      { id: 'devOpen1', text: 'Bạn đánh giá cao điều gì ở team Developer?', answer: '' },
      { id: 'devOpen2', text: 'Góp ý giúp team Developer làm việc hiệu quả hơn?', answer: '' },
    ]
  },
  qaTeamEvaluation: {
    ratings: [
      { id: 'qa1', text: 'Tester kiểm thử kỹ và phát hiện lỗi kịp thời', rating: null },
      { id: 'qa2', text: 'Phối hợp tốt để cải thiện chất lượng sản phẩm', rating: null },
      { id: 'qa3', text: 'Giao tiếp rõ ràng và báo cáo lỗi có giá trị', rating: null },
      { id: 'qa4', text: 'Thời gian kiểm thử hợp lý, hỗ trợ tiến độ chung', rating: null },
      { id: 'qa5', text: 'Mức độ hài lòng với team Tester', rating: null },
    ],
    openQuestions: [
      { id: 'qaOpen1', text: 'Điều bạn thấy tốt nhất ở team Tester?', answer: '' },
      { id: 'qaOpen2', text: 'Góp ý giúp team Tester nâng cao hiệu quả kiểm thử?', answer: '' },
    ]
  },
  baTeamEvaluation: {
    ratings: [
      { id: 'ba1', text: 'Team BA truyền đạt yêu cầu rõ ràng, dễ hiểu', rating: null },
      { id: 'ba2', text: 'Phối hợp hiệu quả với team bạn trong quá trình triển khai', rating: null },
      { id: 'ba3', text: 'Phản hồi nhanh và đầy đủ khi có yêu cầu/góp ý', rating: null },
      { id: 'ba4', text: 'Tài liệu và backlog hỗ trợ tốt cho công việc', rating: null },
      { id: 'ba5', text: 'Mức độ hài lòng tổng thể với team BA', rating: null },
    ],
    openQuestions: [
      { id: 'baOpen1', text: 'Bạn đánh giá cao điểm nào của team BA?', answer: '' },
      { id: 'baOpen2', text: 'Góp ý giúp team BA phối hợp hiệu quả hơn?', answer: '' },
    ]
  },
  designTeamEvaluation: {
    ratings: [
      { id: 'design1', text: 'Thiết kế đáp ứng đúng yêu cầu và mục tiêu', rating: null },
      { id: 'design2', text: 'Giao tiếp giữa team Design và team bạn hiệu quả', rating: null },
      { id: 'design3', text: 'Thiết kế được bàn giao đúng thời hạn, đúng chuẩn và đầy đủ', rating: null },
      { id: 'design4', text: 'Thiết kế đẹp và sáng tạo', rating: null },
      { id: 'design5', text: 'Mức độ hài lòng tổng thể với team Design', rating: null },
    ],
    openQuestions: [
      { id: 'designOpen1', text: 'Điều bạn hài lòng nhất về team Design?', answer: '' },
      { id: 'designOpen2', text: 'Góp ý giúp team Design làm việc hiệu quả hơn?', answer: '' },
    ]
  },
  contentSeoTeamEvaluation: {
    ratings: [
      { id: 'contentSeo1', text: 'Nội dung đúng chủ đề và chất lượng', rating: null },
      { id: 'contentSeo2', text: 'Phối hợp tốt với team bạn để đạt mục tiêu sản phẩm', rating: null },
      { id: 'contentSeo3', text: 'Phản hồi nhanh khi cần chỉnh sửa nội dung', rating: null },
      { id: 'contentSeo4', text: 'Mức độ hài lòng tổng thể với team CONTENT - SEO', rating: null },
    ],
    openQuestions: [
      { id: 'contentSeoOpen1', text: 'Nhận xét tích cực dành cho team CONTENT - SEO?', answer: '' },
      { id: 'contentSeoOpen2', text: 'Góp ý giúp team CONTENT - SEO cải thiện hiệu quả?', answer: '' },
    ]
  },
  wszTeamEvaluation: {
    ratings: [
      { id: 'wsz1', text: 'Bạn đánh giá ntn về quy trình làm việc của team', rating: null },
      { id: 'wsz2', text: 'Các buổi họp (Daily, Planning, Review…) có hiệu quả không', rating: null },
      { id: 'wsz3', text: 'Bạn có hiểu rõ về mục tiêu trong quý này không', rating: null },
      { id: 'wsz4', text: 'Bạn đánh giá mức độ hiểu sản phẩm WSZ của mình ở mức nào?', rating: null },
      { id: 'wsz5', text: 'Mức độ hài lòng tổng thể với team WSZ', rating: null },
    ],
    openQuestions: [
      { id: 'wszOpen1', text: 'Bạn có đề xuất gì để cải thiện quy trình làm việc giữa các team và cả team WSZ?', answer: '' },
      { id: 'wszOpen2', text: 'Bạn mong muốn điều gì được thay đổi trong quý tiếp theo?', answer: '' },
    ]
  }
};

export const SurveyContext = createContext<SurveyContextProps | null>(null);

export const SurveyProvider = ({ children }: { children: ReactNode }) => {
  const [surveyData, setSurveyData] = useState<SurveyData>(initialSurveyData);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const submitSurvey = () => {
    console.log('Survey submitted:', surveyData);
    setIsSubmitted(true);
  };

  return (
    <SurveyContext.Provider
      value={{
        surveyData,
        currentStep,
        setSurveyData,
        setCurrentStep,
        nextStep,
        prevStep,
        submitSurvey,
        isSubmitted
      }}
    >
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
