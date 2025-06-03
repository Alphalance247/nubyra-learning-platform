interface SelectOption {
    label: string;
    value: string;
  }
  
  interface SelectFieldProps {
    label: string;
    name: string;
    options: SelectOption[];
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
    required?: boolean;

  }
  
  const SelectField: React.FC<SelectFieldProps> = ({
    label,
    name,
    options,
    value,
    onChange,
    className = '',
    required,
  }) => (
    <div className={`w-[318px] h-[82px] flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="inline-block font-inter font-medium text-[16px] leading-[24px] align-middle text-[#120A02] capitalize">{label} {required && <span className="text-red-500">*</span> }</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-[318px] h-[50px] px-3 py-2 rounded-[12px] border border-[#D1D1D1] bg-[#FEFEFD] focus:border-[#7B4C1F] text-[#120A02] focus:outline-none ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
  
  export default SelectField;
  