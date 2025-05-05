import React from 'react';
import { useSurvey, TeamType } from '@/contexts/SurveyContext';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
const GeneralInfoStep = () => {
  const {
    surveyData,
    setSurveyData,
    nextStep
  } = useSurvey();
  const handleTeamChange = (value: string) => {
    setSurveyData(prev => ({
      ...prev,
      team: value as TeamType
    }));
  };
  const handleSingleMemberChange = (checked: boolean) => {
    setSurveyData(prev => ({
      ...prev,
      isSingleMember: checked
    }));
  };
  const handleContinue = () => {
    // Validate required team selection
    if (!surveyData.team) {
      alert("Vui lòng chọn team của bạn");
      return;
    }
    nextStep();
  };
  return <div className="w-full max-w-4xl mx-auto">
      <Card className="border border-survey-accent shadow-lg">
        <CardHeader className="bg-gradient-to-r from-survey-primary to-survey-secondary text-white rounded-t-lg">
          <CardTitle className="text-2xl">Đánh giá hiệu quả và sự hài lòng với team</CardTitle>
          <CardDescription className="text-white/80">Quý 1/2025</CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4 text-survey-dark">I. Thông tin chung</h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Họ và tên <span className="text-gray-500 text-sm">(Không bắt buộc – bạn có thể chọn ẩn danh)</span></Label>
              <Input id="name" placeholder="Nhập họ và tên (không bắt buộc)" value={surveyData.name} onChange={e => setSurveyData(prev => ({
              ...prev,
              name: e.target.value
            }))} className="border-gray-300" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="team" className="font-medium">
                Bạn đang thuộc team nào? <span className="text-red-500">*</span>
              </Label>
              <Select value={surveyData.team} onValueChange={handleTeamChange}>
                <SelectTrigger id="team" className="w-full">
                  <SelectValue placeholder="Chọn team của bạn" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DEV">Developer (DEV)</SelectItem>
                  <SelectItem value="BA">Business Analyst (BA)</SelectItem>
                  <SelectItem value="CONTENT">Content - SEO</SelectItem>
                  <SelectItem value="SEO">SEO</SelectItem>
                  <SelectItem value="DESIGN">Design</SelectItem>
                  <SelectItem value="QA">Tester (QA)</SelectItem> 
                </SelectContent>
              </Select>
            </div>
            
            
            
            <div className="p-4 bg-survey-light border border-survey-accent rounded-lg">
              <p className="text-sm">
                <span className="font-medium text-survey-primary">📝 Ghi chú:</span>
                <br /> 
                - Khi đánh giá các team khác, dù team đó chỉ có 1 người, hãy đánh giá dựa trên trải nghiệm làm việc thực tế.
              </p>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <Button onClick={handleContinue} className="bg-survey-primary hover:bg-survey-dark text-white px-8">
              Tiếp theo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default GeneralInfoStep;