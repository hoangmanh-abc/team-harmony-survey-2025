import React from 'react';
import { useSurvey } from '@/contexts/SurveyContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const ThankYouStep = () => {
  const { resetSurvey, existingResponseId } = useSurvey();

  const handleRestartSurvey = () => {
    // Use the resetSurvey function which will keep the existingResponseId
    resetSurvey();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border border-survey-accent shadow-lg text-center">
        <CardHeader className="bg-gradient-to-r from-survey-primary to-survey-secondary text-white rounded-t-lg">
          <CardTitle className="text-2xl">Cảm ơn bạn đã hoàn thành khảo sát!</CardTitle>
        </CardHeader>
        
        <CardContent className="pt-10 pb-10 flex flex-col items-center">
          <div className="mb-6">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>
          
          <h2 className="text-xl font-bold text-survey-primary mb-2">
            {existingResponseId 
              ? "Khảo sát đã được cập nhật thành công"
              : "Khảo sát đã được ghi nhận"}
          </h2>
          
          <p className="text-gray-600 mb-6">
            Cảm ơn bạn đã dành thời gian chia sẻ phản hồi. Những đánh giá của bạn sẽ giúp chúng tôi cải thiện hiệu quả làm việc của team.
          </p>
          
          <div className="p-4 bg-survey-light border border-survey-accent rounded-lg max-w-md">
            <p className="text-sm text-gray-700">
              Nếu bạn có bất kỳ câu hỏi hoặc đóng góp thêm, vui lòng liên hệ với quản lý team của bạn.
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <Button 
            onClick={handleRestartSurvey}
            variant="outline"
            className="border-survey-primary text-survey-primary hover:bg-survey-light"
          >
            {existingResponseId ? 'Chỉnh sửa khảo sát' : 'Làm lại khảo sát'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ThankYouStep;
