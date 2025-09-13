import React from "react";
import { GoChevronRight } from "react-icons/go";

interface BreadcrumbProps {
  previousStep: string;
  currentStep: string;
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  className = "",
  previousStep,
  currentStep,
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center flex-wrap gap-1 md:gap-2 ${className}`}
    >
      {/* Previous Step */}
      <span className="font-poppins text-xs sm:text-sm md:text-base lg:text-lg leading-tight text-[#928E8B]">
        {previousStep}
      </span>

      {/* Chevron */}
      <GoChevronRight
        size={18}
        className="text-[#928E8B] flex-shrink-0"
      />

      {/* Current Step */}
      <span className="font-poppins text-xs sm:text-sm md:text-base lg:text-lg leading-tight text-[#928E8B] font-medium">
        {currentStep}
      </span>
    </nav>
  );
};

export default Breadcrumb;
