'use client';

import React from 'react';

interface SectionHeaderProps {
  icon?: React.ReactNode;
  title: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title, className = '' }) => {
  return (
    <div
      className={`w-full h-[64px] flex items-center gap-6 text-[#120A02] border-b-[1.5px] border-[#B6979133] ${className}`}
    >
      {icon}
      <h2 className="h-7 text-xl font-bold">{title}</h2>
    </div>
  );
};

export default SectionHeader;
