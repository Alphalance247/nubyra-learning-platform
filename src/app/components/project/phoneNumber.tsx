"use client";

import { useEffect, useState } from "react";

interface Country {
  name: string;
  code: string;
  shortCode: string;
}

interface CountryAPI {
  name: {
    common: string;
  };
  cca2: string;
  idd: {
    root?: string;
    suffixes?: string[];
  };
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

const fetchCountries = async (): Promise<Country[]> => {
  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,cca2,idd"
    );
    const data: CountryAPI[] = await res.json();

    return data
      .map((c): Country | null => {
        const root = c?.idd?.root;
        const suffix = c?.idd?.suffixes?.[0];
        if (!root || !suffix || !c.cca2 || !c.name?.common) return null;

        return {
          name: c.name.common,
          code: root + suffix,
          shortCode: c.cca2,
        };
      })
      .filter((c): c is Country => c !== null);
  } catch (error) {
    console.error("Failed to fetch countries:", error);
    return [
      { name: "Nigeria", code: "+234", shortCode: "NG" },
      { name: "United States", code: "+1", shortCode: "US" },
    ]; // fallback list
  }
};

export default function PhoneInput({
  value,
  onChange,
  label = "Phone Number",
  placeholder = "9012345678",
  className = "",
  inputClassName = "",
  selectClassName = "",
  labelClassName = "",
  required = false,
}: PhoneInputProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCode, setSelectedCode] = useState("+234"); // Default to Nigeria
  const [number, setNumber] = useState(value.replace(/^\+\d+/, ""));

  useEffect(() => {
    fetchCountries().then(setCountries);
  }, []);

  useEffect(() => {
    onChange(`${selectedCode}${number}`);
  }, [selectedCode, number, onChange]);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label
          className={`font-inter font-medium text-[16px] leading-[24px] text-[#120A02] capitalize ${labelClassName}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

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
          required={required}
          onChange={(e) => setNumber(e.target.value)}
          className={`flex-1 px-3 py-2 bg-[#FEFEFD] text-[#120A02] text-[14px] font-inter outline-none ${inputClassName}`}
        />
      </div>
    </div>
  );
}
