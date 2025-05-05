
import React, { createContext, useContext, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SurveyContextType, SurveyData } from '@/types/survey';
import { initialSurveyData } from '@/data/initialSurveyData';
import { validateCurrentStep as validateStep, prepareSurveyData } from '@/utils/surveyHelpers';

const SurveyContext = createContext<SurveyContextType>({} as SurveyContextType);

export const SurveyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [surveyData, setSurveyData] = useState<SurveyData>(initialSurveyData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Function to validate the current step based on the extracted helper
  const validateCurrentStep = () => {
    return validateStep(currentStep, surveyData);
  };

  const nextStep = () => {
    const validation = validateCurrentStep();
    if (validation.isValid) {
      setCurrentStep(prev => prev + 1);
    } else {
      toast.error(validation.message || 'Vui lòng hoàn thành tất cả trường bắt buộc');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Function to submit survey data to Supabase
  const submitSurvey = async () => {
    try {
      // Validate WSZ step first before submission
      const validation = validateCurrentStep();
      if (!validation.isValid) {
        toast.error(validation.message || 'Vui lòng hoàn thành tất cả trường bắt buộc');
        return;
      }
      
      const surveyDataForDb = prepareSurveyData(surveyData);
      
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
      submitSurvey,
      validateCurrentStep
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

// Re-export types for easier imports
export type { TeamType } from '@/types/survey';
