import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  className = "",
}) => (
  <div
    className={`text-center max-w-3xl mx-auto mt-10 mb-20 px-4 flex flex-col gap-6 items-center justify-center ${className}`}
  >
    <h2 className="text-[#120A02] font-montserrat font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight capitalize">
      {title}
    </h2>

    {subtitle && (
      <p className="font-inter font-normal text-sm sm:text-base md:text-lg leading-relaxed text-[#413B35] max-w-xl">
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeader;
