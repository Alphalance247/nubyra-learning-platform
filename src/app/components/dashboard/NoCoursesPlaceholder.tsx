"use client";

import React from "react";

interface EmptyCourseStateProps {
  title: string;
  description: string;
  badgeText?: string;
}

const EmptyCourseState: React.FC<EmptyCourseStateProps> = ({
  title,
  description,
  badgeText,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-fit py-8 px-4 sm:py-12 sm:px-6 md:py-16 md:px-8 lg:py-20 lg:px-12 space-y-5 sm:space-y-6">
      {/* Title */}
      <p
        className="w-full max-w-4xl text-center font-bold font-[Montserrat] text-[#120A02] capitalize leading-snug 
        text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl"
      >
        {title}
      </p>

      {/* Description + Badge */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 text-center">
        <p className="font-inter font-normal text-sm sm:text-base md:text-lg lg:text-xl text-[#413B35] leading-relaxed max-w-2xl">
          {description}
        </p>
        {badgeText && (
          <span
            className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-[#FFEEEC] rounded-full text-[#940B00] 
            text-xs sm:text-sm md:text-base font-[Inter] font-semibold capitalize"
          >
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
};

export default EmptyCourseState;
