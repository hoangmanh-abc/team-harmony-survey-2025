import React from 'react';
import { CheckSquare } from 'lucide-react';
const Header = () => {
  return <header className="bg-survey-primary text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-center md:justify-start">
        <CheckSquare className="mr-2 h-6 w-6" />
        <h1 className="text-xl font-bold">WSZ Survey 1-2025</h1>
      </div>
    </header>;
};
export default Header;