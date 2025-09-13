// 'use client';

// import React from 'react';

// interface EmptyCourseStateProps {
//   title: string;
//   description: string;
//   badgeText?: string;
// }

// const EmptyCourseState: React.FC<EmptyCourseStateProps> = ({
//   title,
//   description,
//   badgeText,
// }) => {
//   return (
//     <div className="flex flex-col items-center justify-center h-fit py-[60px] px-[24px] space-y-4 gap-[22px]">
//       <p className="max-w-[800px] max-h-[56px] text-center text-[20px] leading-[28px] font-bold font-[Montserrat] text-[#120A02] capitalize tracking-normal">
//         {title}
//       </p>

//       <div className="flex items-center space-x-2">
//         <p className="font-inter font-normal text-[18px] text-[#413B35] leading-[26px] tracking-[0%] text-center">
//           {description}
//         </p>
//         {badgeText && (
//           <span className="inline-block px-2 py-[2px] bg-[#FFEEEC] rounded-full text-[#940B00] text-sm font-[Inter] font-semibold text-center leading-[22px] align-middle capitalize">
//             {badgeText}
//           </span>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EmptyCourseState;


'use client';

import React from 'react';

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
    <div className="flex flex-col items-center justify-center h-fit py-10 px-4 md:py-16 md:px-8 lg:py-20 lg:px-12 space-y-6">
      {/* Title */}
      <p className="w-full max-w-3xl text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-[Montserrat] text-[#120A02] capitalize leading-snug">
        {title}
      </p>

      {/* Description + Badge */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center">
        <p className="font-inter font-normal text-base sm:text-lg md:text-xl text-[#413B35] leading-relaxed">
          {description}
        </p>
        {badgeText && (
          <span className="inline-block px-3 py-1 bg-[#FFEEEC] rounded-full text-[#940B00] text-xs sm:text-sm md:text-base font-[Inter] font-semibold capitalize">
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
};

export default EmptyCourseState;
