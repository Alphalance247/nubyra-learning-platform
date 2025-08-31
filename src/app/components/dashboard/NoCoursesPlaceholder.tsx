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
    <div className="flex flex-col items-center justify-center h-fit py-[60px] px-[24px] space-y-4 gap-[22px]">
      <p className="max-w-[80%] max-h-[86px] text-center text-[20px] leading-[28px] font-bold font-[Montserrat] text-[#120A02] capitalize tracking-normal">
        {title}
      </p>

      <div className="flex items-center space-x-2">
        <p className="font-inter font-normal text-[18px] text-[#413B35] leading-[26px] tracking-[0%] text-center">
          {description}
        </p>
        {badgeText && (
          <span className="inline-block px-2 py-[2px] bg-[#FFEEEC] rounded-full text-[#940B00] text-sm font-[Inter] font-semibold text-center leading-[22px] align-middle capitalize">
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
};

export default EmptyCourseState;
