// // import React from 'react';
// // import Image from 'next/image';

// // type HeroImageSectionProps = {
// //   imageSrc: string;
// //   altText: string;
// //   title: string;
// //   description: string;
// // };

// // const HeroImageSection: React.FC<HeroImageSectionProps> = ({
// //   imageSrc,
// //   altText,
// //   title,
// //   description,
// // }) => {
// //   return (
// //     <div
// //       className="relative hidden lg:block overflow-hidden"
// //       style={{
// //         width: '720px',
// //         height: '1161px',
// //         padding: '80px 60px',
// //       }}
// //     >
// //       {/* Background Image */}
// //       <Image
// //         src={imageSrc}
// //         alt={altText}
// //         layout="fill"
// //         objectFit="cover"
// //         className="object-cover"
// //         priority
// //       />

// //       {/* Deep bottom-up gradient overlay */}
// //       <div className="absolute inset-0 bg-gradient-to-t from-[#291A0B] to-[#A7876908] z-10" />

// //       {/* Text content on top of gradient */}
// //       <div className="absolute bottom-0 z-20 text-white px-8 py-6 w-full">
// //         <h2 className="text-xl font-bold mb-2">{title}</h2>
// //         <p className="text-sm">{description}</p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default HeroImageSection;

// import Image from 'next/image';
// import React from 'react';

// type HeroImageSectionProps = {
//   imageSrc: string;
//   altText: string; // kept for accessibility but not used directly in background
//   title: string;
//   description: string;
// };

// const HeroImageSection: React.FC<HeroImageSectionProps> = ({
//   imageSrc,
//   altText,
//   title,
//   description,
// }) => {
//   return (
//     <div
//       className="max-w-[720px] py-20 px-15 relative hidden overflow-hidden bg-cover bg-center rotate-[-360deg]"
//       style={{
//         width: '720px',
//         height: '1161px',
//         padding: '80px 60px',
//         backgroundImage: `url(${imageSrc})`,
//       }}
//       role="img"
//       aria-label={altText}
//     >
//       {/* Deep bottom-up gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-[#291A0B] to-[#A7876908] z-10" />
//       <div className="relative z-20 w-[130px] h-[121px] mb-6">
//         <Image
//           src="/assets/general/logo.png"
//           alt="logo"
//           fill
//           className="object-contain"
//           priority
//         />
//       </div>

//       {/* Text content on top of gradient */}
//       <div className="absolute bottom-0 z-20 text-[] px- py-6 w-full">
//         <h2 className="text-xl font-bold mb-2">{title}</h2>
//         <p className="max-w-[600px] text-[28px] font-[400] font-[Inter]">{description}</p>
//       </div>
//     </div>
//   );
// };

// export default HeroImageSection;

import Image from "next/image";
import Link from "next/link";
import React from "react";

type HeroImageSectionProps = {
  imageSrc: string;
  title: string;
  description: string;
};

const HeroImageSection: React.FC<HeroImageSectionProps> = ({
  imageSrc,
  title,
  description,
}) => {
  return (
    <div className="relative w-[720px] h-[1161px] overflow-hidden">
      {/* Flipped Background */}
      <div
        className="absolute inset-0 scale-x-[-1] brightness-[0.75] bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#291A0B] to-[#A7876908] z-10" />

      {/* Logo */}
      <Link href="/" className="absolute top-6 left-6 z-20 w-[130px] h-[121px]">
        <Image
          src="/assets/general/logo.png"
          alt="logo"
          fill
          className="object-contain"
          priority
        />
      </Link>

      {/* Text content */}
      <div className="absolute bottom-0 z-20 text-white px-10 py-6 mb-10 w-full bg-gradient-to-t from-[#291A0B] via-[#291A0Bcc] to-transparent">
        <div className="max-w-[600px] h-[194px] flex flex-col gap-6">
          <h2 className="w-[600px] h-[114px] font-[700] text-[30px] leading-[38px] tracking-[0%] capitalize text-[#FEFEFE] font-[Montserrat] mb-2">
            {title}
          </h2>
          <p className="w-[600px] h-[56px] font-[400] text-[20px] leading-[28px] tracking-normal capitalize text-[#FEFEFE] font-['Inter']">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroImageSection;
