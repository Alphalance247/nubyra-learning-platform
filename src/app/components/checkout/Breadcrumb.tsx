// const Breadcrumb = () => {
//     return (
//       <p className="text-sm text-gray-500">
//         <span className="h-[297px] text-[18px] px-[8px] py-[16px] text-[#928E8B] font-[400]">Aspen plus basic webinar course</span> &gt; Enrollment Checkout
//       </p>
//     );
//   };
  
//   export default Breadcrumb;
  

import React from "react";

interface BreadcrumbProps {
  previousStep: string;
  currentStep: string;
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ className, previousStep, currentStep }) => {
  return (
    <p className="text-sm text-gray-500">
      <span className={`inline-block h-[26px] font-poppins font-normal text-[18px] leading-[26px] align-middle text-[#928E8B] ${className}`}>
        {previousStep}
      </span>{"   "}
      <span className="{`inline-block h-[26px]  font-poppins font-normal text-[18px] leading-[26px] align-middle text-[#928E8B] ${className}">
        &gt; 
      </span>{"  "}
      <span className={`inline-block h-[26px] font-poppins font-normal text-[18px] leading-[26px] align-middle text-[#928E8B] ${className}`}>
      {currentStep}
      </span>
    </p>
  );
};

export default Breadcrumb;
