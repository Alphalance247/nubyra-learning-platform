
  

import React from "react";
import { GoChevronRight } from "react-icons/go";

interface BreadcrumbProps {
  previousStep: string;
  currentStep: string;
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ className = '', previousStep, currentStep }) => {
  return (
    <p className={`flex items-center space-x-2 text-sm text-gray-500 ${className}`}>
      <span className="font-poppins font-normal text-[18px] leading-[26px] text-[#928E8B]">
        {previousStep}
      </span>
      <span className="text-[#928E8B]">
        <GoChevronRight size={18} />
      </span>
      <span className="font-poppins font-normal text-[18px] leading-[26px] text-[#928E8B]">
        {currentStep}
      </span>
    </p>
  );
}

export default Breadcrumb;
