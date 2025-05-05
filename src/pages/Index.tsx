
import React from 'react';
import { SurveyProvider } from '@/contexts/SurveyContext';
import SurveyContainer from '@/components/SurveyContainer';
import Header from '@/components/Header';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 container mx-auto">
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
