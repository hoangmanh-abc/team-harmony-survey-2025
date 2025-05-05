
import React from 'react';
import { cn } from '@/lib/utils';

interface RatingScaleProps {
  id: string;
  value: number | null;
  onChange: (value: number) => void;
  hasError?: boolean;
}

const RatingScale: React.FC<RatingScaleProps> = ({ id, value, onChange, hasError = false }) => {
  return (
    <div className="flex justify-between items-center w-full gap-1 md:gap-2">
      {[1, 2, 3, 4, 5].map((rating) => (
        <div key={`${id}-${rating}`} className="flex flex-col items-center">
          <button
            type="button"
            onClick={() => onChange(rating)}
            className={cn(
              "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all",
              value === rating
                ? "bg-survey-primary text-white"
                : hasError 
                  ? "bg-red-50 hover:bg-survey-accent hover:text-survey-primary border border-red-300" 
                  : "bg-gray-100 hover:bg-survey-accent hover:text-survey-primary"
            )}
          >
            {rating}
          </button>
          {rating === 1 && <span className="text-[10px] md:text-xs mt-1 text-gray-500">Rất không hài lòng</span>}
          {rating === 5 && <span className="text-[10px] md:text-xs mt-1 text-gray-500">Rất hài lòng</span>}
        </div>
      ))}
    </div>
  );
};

export default RatingScale;
