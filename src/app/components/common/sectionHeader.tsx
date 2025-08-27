import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  className = '',
}) => (
  <div className={`text-center w-[696px] h-[104px] mt-10 mb-20 flex flex-col gap-12 items-center justify-center ${className}`}>
    <h2 className="w-[696px] h-[54px] text-[#120A02] font-montserrat font-bold text-[44px] leading-[44px] tracking-normal text-center capitalize">{title}</h2>
    {subtitle && <p className="w-[412px] h-[52px] font-inter font-normal text-[18px] leading-[26px] tracking-normal text-[#413B35]">{subtitle}</p>}
  </div>
);

export default SectionHeader;
