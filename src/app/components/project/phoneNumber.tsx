'use client';

import { useEffect, useState } from 'react';

interface Country {
  name: string;
  code: string;
  shortCode: string;
}

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;

  label?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  selectClassName?: string;
  labelClassName?: string;
  required?: boolean;
}

const fetchCountries = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    return data
      .map((country: any) => ({
        name: country.name.common,
        code: country.idd?.root + (country.idd?.suffixes?.[0] || ''),
        shortCode: country.cca2,
      }))
      .filter((c:Country) => c.code && c.shortCode);
  };

export default function PhoneInput({
  value,
  onChange,
  label = 'Phone Number',
  placeholder = '9012345678',
  className = '',
  inputClassName = '',
  selectClassName = '',
  labelClassName = '',
  required = false,
}: PhoneInputProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCode, setSelectedCode] = useState('+234'); // Default NG
  const [number, setNumber] = useState(value);

  useEffect(() => {
    fetchCountries().then(setCountries);
  }, []);

  useEffect(() => {
    onChange(`${selectedCode}${number}`);
  }, [selectedCode, number]);

  return (

    <div className={`w-[318px] h-[82px] flex flex-col gap-2 ${className}`}>
    <label
        className={`inline-block font-inter font-medium text-[16px] leading-[24px] text-[#120A02] capitalize ${labelClassName}`}
    >
        {label}
        {required && <span className="text-red-500">*</span>}
    </label>

    <div className="flex w-full h-[50px] bg-[#FEFEFD] rounded-[12px] overflow-hidden border border-[#D1D1D1] focus-within:border-[#FEFEFD]">
        <select
        value={selectedCode}
        onChange={(e) => setSelectedCode(e.target.value)}
        className={`w-[100px] px-3 bg-[#F2EDE9] text-[#120A02] font-medium text-[14px] leading-[22px] tracking-normal font-inter outline-none appearance-none ${selectClassName}`}
        >
        {countries.map((country) => (
            <option key={country.shortCode} value={country.code}>
            {country.shortCode} {country.code}
            </option>
        ))}
        </select>

        <input
        type="tel"
        placeholder={placeholder}
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        className={`flex-1 px-3 py-2 bg-[#FEFEFD] text-[#120A02] text-[14px] font-inter outline-none ${inputClassName}`}
        />
    </div>
    </div>

  );
}