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
  const [isOpen, setIsOpen] = useState<number>(0);

  const handleToggle = (i: number) => {
    if (isOpen === i) {
      setIsOpen(0);
    } else {
      setIsOpen(i);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-[52%] mx-auto ">
      {results.map((el, i) => {
        return (
          <div key={i} className="pb-3 border-b border-[#E9E7E7]">
            <div
              className={`flex justify-between items-center mb-3 hover:transition-all hover:duration-700 hover:scale-[1.01] cursor-pointer`}
              onClick={() => handleToggle(i)}
            >
              <p className="text-xl font-semibold text-[#120A02]">
                {el?.question}
              </p>

              <div className="text-2xl">
                {isOpen === i ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>
            </div>

            {isOpen === i && (
              <div className="">
                <p className="text-lg text-[#413B35]">{el?.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FaqComponent;
