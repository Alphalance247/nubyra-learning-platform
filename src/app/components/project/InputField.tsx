import React from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;

}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  placeholder = '',
  type = 'text',
  value,
  onChange,
  className = '',
  required,
}) => (
  <div className={`w-[318px] h-[82px] flex flex-col gap-2 ${className}`}>
    <label htmlFor={name} className="inline-block font-inter font-medium text-[16px] leading-[24px] align-middle text-[#120A02] capitalize">{label} {required && <span className="text-red-500">*</span> }</label>
    <input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-[318px] h-[50px] px-3 py-2 rounded-[12px] border border-[#D1D1D1] bg-[#FEFEFD] focus:border-[#7B4C1F] text-[#120A02] focus:outline-none ${className}`}
    />
  </div>
);

export default InputField;
