
export type TeamType = 'DEV' | 'BA' | 'CONTENT' | 'SEO' | 'DESIGN' | 'QA' | 'MKT' | 'OTHER' | '';

export interface RatingQuestion {
  id: string;
  text: string;
  rating: number | null;
  required?: boolean;
}

export interface OpenQuestion {
  id: string;
  text: string;
  answer: string;
  required?: boolean;
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
  okrEvaluation: TeamEvaluation;
}

export interface SurveyContextType {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  surveyData: SurveyData;
  setSurveyData: React.Dispatch<React.SetStateAction<SurveyData>>;
  nextStep: () => void;
  prevStep: () => void;
  isSubmitted: boolean;
  submitSurvey: () => Promise<void>;
  validateCurrentStep: () => { isValid: boolean; message?: string };
}
