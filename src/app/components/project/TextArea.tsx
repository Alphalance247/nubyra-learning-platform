interface TextAreaProps {
    label: string;
    name: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    className?: string;
    required?: boolean;
  }
  
  const TextArea: React.FC<TextAreaProps> = ({
    label,
    name,
    placeholder = '',
    value,
    onChange,
    className = '',
    required

  }) => (
    <div className={`w-[646px] h-[180px] flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="h-[24px] inline-block font-inter font-medium text-[16px] leading-[24px] align-middle text-[#120A02] capitalize">{label} {required && <span className="text-red-500">*</span> }</label>
      <textarea
        id={name}
        name={name}
        rows={4}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={onChange}
        className={`w-[318px] h-[50px] px-3 py-2 rounded-[12px] border border-[#D1D1D1] bg-[#FEFEFD] focus:border-[#7B4C1F] text-[#120A02] focus:outline-none ${className}`}
        />
    </div>
  );
  
  export default TextArea;
  