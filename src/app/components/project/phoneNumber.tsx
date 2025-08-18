"use client";

import { useEffect, useState } from "react";

interface Country {
  name: string;
  code: string; // e.g. "+234"
  shortCode: string; // e.g. "NG"
}

interface CountryAPI {
  name: { common: string };
  cca2: string;
  idd: { root?: string; suffixes?: string[] };
}

interface PhoneInputProps {
  value: string; // e.g. "+2348134757902"
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

    return (
      data
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
        .filter((c): c is Country => c !== null)
        // keep unique codes and stable order
        .sort((a, b) => a.name.localeCompare(b.name))
    );
  } catch (error) {
    console.error("Failed to fetch countries:", error);
    return [
      { name: "Nigeria", code: "+234", shortCode: "NG" },
      { name: "United States", code: "+1", shortCode: "US" },
    ];
  }
};

export default function PhoneInput({
  value = "",
  onChange,
  label = "WhatsApp/Telegram Number",
  placeholder = "9012345678",
  className = "",
  inputClassName = "",
  selectClassName = "",
  labelClassName = "",
  required = false,
}: PhoneInputProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCode, setSelectedCode] = useState<string>("+234"); // initial fallback
  const [number, setNumber] = useState<string>("");

  // Fetch countries once
  useEffect(() => {
    let mounted = true;
    fetchCountries().then((list) => {
      if (!mounted) return;
      setCountries(list);

      // If we already have a value, try to initialize states
      if (value) {
        // find longest matching code prefix
        const sorted = [...list].sort((a, b) => b.code.length - a.code.length);
        const matched = sorted.find((c) => value.startsWith(c.code));
        if (matched) {
          setSelectedCode(matched.code);
          setNumber(value.slice(matched.code.length));
          return;
        }
      }

      // if no value or no match, pick Nigeria if present or the first country
      const nigeria = list.find((c) => c.shortCode === "NG");
      setSelectedCode(nigeria?.code ?? list[0]?.code ?? "+234");
    });
    return () => {
      mounted = false;
    };
  }, [value]); // run only once

  // If `value` changes (after countries loaded), update selectedCode & number
  useEffect(() => {
    if (!value) {
      setNumber("");
      return;
    }
    if (countries.length === 0) {
      // countries not loaded yet — try simple regex until countries arrive
      const match = value.match(/^(\+\d{1,4})(\d*)$/);
      if (match) {
        setSelectedCode(match[1]);
        setNumber(match[2]);
      }
      return;
    }

    // with countries: prefer longest prefix match to avoid incorrect short matches
    const sorted = [...countries].sort((a, b) => b.code.length - a.code.length);
    const matched = sorted.find((c) => value.startsWith(c.code));
    if (matched) {
      setSelectedCode(matched.code);
      setNumber(value.slice(matched.code.length));
    } else {
      // final fallback: take first +NNN from value
      const match = value.match(/^(\+\d{1,4})(\d*)$/);
      if (match) {
        setSelectedCode(match[1]);
        setNumber(match[2]);
      } else {
        setNumber(value);
      }
    }
  }, [value, countries]);

  // Emit combined value whenever selectedCode or number changes
  useEffect(() => {
    const combined = selectedCode + number;
    onChange(combined);
  }, [selectedCode, number, onChange]);

  // Helper: if selectedCode is not in countries, render a leading option so the select doesn't go blank
  const codeInList = countries.some((c) => c.code === selectedCode);

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
          {/* If current selectedCode isn't part of fetched countries, show it first */}
          {!codeInList && <option value={selectedCode}>{selectedCode}</option>}

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
          onChange={(e) => {
            // optional: keep only digits in the number portion
            const digitsOnly = e.target.value.replace(/\D/g, "");
            setNumber(digitsOnly);
          }}
          className={`flex-1 px-3 py-2 bg-[#FEFEFD] text-[#120A02] text-[14px] font-inter outline-none ${inputClassName}`}
        />
      </div>
    </div>
  );
}
