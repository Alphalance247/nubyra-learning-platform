"use client";
import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

interface FaqComponentProps {
  results: {
    id: string;
    question: string;
    answer: string;
    option: string;
  }[];
}

const FaqComponent = ({ results }: FaqComponentProps) => {
  const [isOpen, setIsOpen] = useState<number | null>(null);

  const handleToggle = (i: number) => {
    setIsOpen(isOpen === i ? null : i);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      {results.map((el, i) => (
        <div key={i} className="pb-3 border-b border-[#E9E7E7]">
          <div
            className="flex justify-between items-center mb-3 cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
            onClick={() => handleToggle(i)}
          >
            <p className="text-base sm:text-lg md:text-xl font-semibold text-[#120A02]">
              {el?.question}
            </p>
            <div className="text-xl sm:text-2xl text-[#7B4C1F]">
              {isOpen === i ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
          </div>
          {isOpen === i && (
            <div className="pl-1 sm:pl-2">
              <p className="text-sm sm:text-base md:text-lg text-[#413B35] leading-relaxed">
                {el?.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FaqComponent;
