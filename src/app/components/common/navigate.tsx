'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

type NavigateArrowProps = {
    label?: ReactNode;
    icon?: ReactNode;
    className?: string;
  };

const NavigateArrow = ({ label = "Back", icon, className = "" }: NavigateArrowProps) => {
    const router = useRouter();
  
    return (
      <button
        onClick={() => router.back()}
        className={`flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-black p-2 rounded-lg transition-colors ${className}`}
      >
        {icon && <div className="p-[10px] gap-2 rounded-full border border-[#D6C8BA] bg-[#F2EDE9]">{icon}</div>}
        {label && <span className='inline-block h-[22px] font-poppins font-normal text-[14px] leading-[22px] align-middle capitalize text-[#928E8B] px-2'>{label}</span>}
      </button>
    );
  };

export default NavigateArrow;
