// import React from 'react';

// interface OverlayProps {
//   children: React.ReactNode;
// }

// const Overlay: React.FC<OverlayProps> = ({ children }) => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 relative">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Overlay;


// 'use client';

// import Image from 'next/image';
// import React from 'react';

// interface OverlayProps {
//   children: React.ReactNode;
// }

// const Overlay: React.FC<OverlayProps> = ({ children }) => {
//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center z-50 bg-cover bg-center"
//       style={{
//         backgroundImage: "url('/assets/general/auth.png')"
//       }}
//     >
//       <div className="absolute inset-0 z-0 [background:linear-gradient(180deg,_rgba(254,254,253,0.8)_0%,_rgba(254,254,253,1)_100%)] backdrop-blur-[11.9px]" />
//       <div className="absolute top-6 left-6 z-10">
//         <Image
//           src="/assets/general/logo.png"
//           alt="Logo"
//           width={120}
//           height={40}
//           className="object-contain"
//         />
//       </div>
//       <div className="absolute inset-0 bg-opacity-11.5 z-0" />

//       {/* Modal Content */}
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-[url('/assets/bg/auth-bg.jpg')] bg-cover bg-center backdrop-blur-[12px]">
//       <div className="bg-[#FEFEFD] rounded-xl shadow-lg w-full max-w-[600px] md:p-10 p-6 mx-4">
//         {children}
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Overlay;


'use client';

import Image from 'next/image';
import React from 'react';

interface OverlayProps {
  children: React.ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({ children }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/general/auth.png')"
      }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 z-0 [background:linear-gradient(180deg,_rgba(254,254,253,0.8)_0%,_rgba(254,254,253,1)_100%)] backdrop-blur-[11.9px]" />

      {/* Logo at top-left */}
      <div className="absolute top-6 left-6 z-20">
        <Image
          src="/assets/general/logo.png"
          alt="Logo"
          width={120}
          height={40}
          className="object-contain"
        />
      </div>

      {/* Modal content container */}
      <div className="relative z-30 w-full max-w-[600px] bg-[#FEFEFD] rounded-xl top-15 shadow-lg p-6 md:p-10 mx-4">
        {children}
      </div>
    </div>
  );
};

export default Overlay;
