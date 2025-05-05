
import { SurveyData } from '@/types/survey';

// Initial data for the survey
export const initialSurveyData: SurveyData = {
  name: '',
  team: '',
  isSingleMember: false,
  
  // Self evaluation (for single members)
  selfEvaluation: {
    ratings: [
      { id: 'self_proactive', text: 'Tôi chủ động và bám sát mục tiêu công việc', rating: null, required: true },
      { id: 'self_collaboration', text: 'Tôi phối hợp hiệu quả với các team khác', rating: null, required: true },
      { id: 'self_timely_response', text: 'Tôi phản hồi và xử lý yêu cầu đúng thời hạn', rating: null, required: true },
      { id: 'self_improvement', text: 'Tôi tìm cách cải thiện hiệu quả công việc', rating: null, required: true },
      { id: 'self_satisfaction', text: 'Tôi hài lòng với hiệu suất làm việc của mình trong quý này', rating: null, required: true },
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
  
  // OKR evaluation
  okrEvaluation: {
    ratings: [
      { id: 'okr_understanding', text: 'Tôi hiểu rõ về phương pháp OKR', rating: null, required: true },
      { id: 'okr_team_awareness', text: 'Tôi nắm được OKR của team trong quý vừa rồi', rating: null, required: true },
      { id: 'okr_personal', text: 'Tôi hiểu OKR cá nhân của mình và cách nó liên kết với team', rating: null, required: true },
      { id: 'okr_process', text: 'Tôi thấy quy trình thiết lập và review OKR trong team rõ ràng, dễ hiểu', rating: null, required: true },
      { id: 'okr_implementation', text: 'Tôi thấy việc triển khai OKR phù hợp với cách team đang vận hành', rating: null, required: true },
    ],
    openQuestions: []
  },
  
  // WSZ team evaluation
  wszTeamEvaluation: {
    ratings: [
      { id: 'wsz_process', text: 'Bạn đánh giá ntn về quy trình làm việc của team', rating: null, required: true },
      { id: 'wsz_meetings', text: 'Các buổi họp (Daily, Planning, Review…) có hiệu quả không', rating: null, required: true },
      { id: 'wsz_goals', text: 'Bạn có hiểu rõ về mục tiêu trong quý này không', rating: null, required: true },
      { id: 'wsz_product_understanding', text: 'Bạn đánh giá mức độ hiểu sản phẩm WSZ của mình ở mức nào?', rating: null, required: true },
      { id: 'wsz_satisfaction', text: 'Mức độ hài lòng tổng thể với team WSZ', rating: null, required: true },
    ],
    openQuestions: [
      { id: 'wsz_process_improvements', text: 'Bạn có đề xuất gì để cải thiện quy trình làm việc giữa các team và cả team WSZ?', answer: '', required: true },
      { id: 'wsz_next_quarter_changes', text: 'Bạn mong muốn điều gì được thay đổi trong quý tiếp theo?', answer: '', required: true },
    ]
  }
};
