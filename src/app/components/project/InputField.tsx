"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
  isPassword?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  placeholder = "",
  type = "text",
  value,
  onChange,
  className = "",
  required,
  isPassword = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`flex flex-col gap-2 relative ${className}`}>
      <label
        htmlFor={name}
        className="font-inter font-medium text-[16px] leading-[24px] text-[#120A02] capitalize"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={inputType}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={onChange}
        className="w-full h-[50px] px-3 py-2 rounded-[12px] border border-[#D1D1D1] bg-[#FEFEFD] focus:border-[#7B4C1F] text-[#120A02] focus:outline-none pr-10"
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 bottom-[14px] text-gray-500"
        >
          {showPassword ? (
            <FaEyeSlash className="h-5 w-5 text-[#442A11]" />
          ) : (
            <FaEye className="h-5 w-5 text-[#442A11]" />
          )}
        </button>
      )}
    </div>
  );
};

export default InputField;
