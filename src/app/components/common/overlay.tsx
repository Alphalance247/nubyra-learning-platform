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
        backgroundImage: "url('/assets/general/auth.png')",
      }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 z-0 [background:linear-gradient(180deg,_rgba(254,254,253,0.85)_0%,_rgba(254,254,253,1)_100%)] backdrop-blur-sm" />

      {/* Logo at top-left */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
        <Image
          src="/assets/general/logo.png"
          alt="Logo"
          width={100}
          height={35}
          className="object-contain sm:w-[120px] sm:h-[40px] w-[90px] h-auto"
        />
      </div>

      {/* Modal content container */}
      <div className="relative z-30 w-full max-w-[600px] bg-[#FEFEFD] rounded-xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 mx-3 sm:mx-4">
        {children}
      </div>
    </div>
  );
};

export default Overlay;
