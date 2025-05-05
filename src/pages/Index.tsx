
import React from 'react';
import { SurveyProvider } from '@/contexts/SurveyContext';
import SurveyContainer from '@/components/SurveyContainer';
import Header from '@/components/Header';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 container mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-6">
          <h2 className="text-2xl font-bold text-survey-primary mb-2">
            Đánh giá hiệu quả và sự hài lòng với team trong quý 1/2025
          </h2>
          <p className="text-gray-600">
            Cảm ơn bạn đã dành thời gian tham gia khảo sát. Các phần đánh dấu * là bắt buộc.
          </p>
        </div>
        
        <SurveyProvider>
          <SurveyContainer />
        </SurveyProvider>
      </main>
      
      <footer className="py-4 bg-gray-100 text-center text-sm text-gray-600">
        <div className="container mx-auto">
          Team Harmony Survey &copy; 2025
        </div>
      </footer>
    </div>
  );
};

export default Index;
