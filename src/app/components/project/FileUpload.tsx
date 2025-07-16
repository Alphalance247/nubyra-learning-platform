import React, { useRef, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  label: string;
  name: string;
  accept?: string;
  onChange?: (file: File | null) => void;
  className?: string;
  required?: boolean;
}

const MAX_FILE_SIZE_MB = 10;

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  name,
  accept = ".pdf,.zip,.png,.jpg",
  onChange,
  className = "",
  required,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      const isValidSize = selectedFile.size <= MAX_FILE_SIZE_MB * 1024 * 1024;
      const isValidType = accept
        .split(",")
        .some((type) =>
          selectedFile.name.toLowerCase().endsWith(type.trim().toLowerCase())
        );

      if (!isValidSize) {
        setError("File size exceeds 10 MB limit.");
        setFile(null);
        onChange?.(null);
        return;
      }

      if (!isValidType) {
        setError(`Invalid file type. Allowed types: ${accept}`);
        setFile(null);
        onChange?.(null);
        return;
      }

      setError(null);
      setFile(selectedFile);
      onChange?.(selectedFile);
    } else {
      setFile(null);
      setError(null);
      onChange?.(null);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
    onChange?.(null);
  };

  return (
    <div className={`w-full max-w-md flex flex-col gap-2 ${className}`}>
      <label
        htmlFor={name}
        className="font-inter font-medium text-[16px] leading-[24px] text-[#120A02]"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {!file ? (
        <div
          onClick={() => inputRef.current?.click()}
          className="w-full cursor-pointer h-[51px] px-3 py-2 rounded-[12px] border border-[#D1D1D1] bg-[#FEFEFD] text-[#120A02] flex items-center justify-between"
        >
          <span className="text-sm text-gray-400">Choose a file</span>
          <input
            type="file"
            id={name}
            name={name}
            accept={accept}
            required={required}
            onChange={handleFileChange}
            ref={inputRef}
            className="hidden"
          />
        </div>
      ) : (
        <div className="flex items-center justify-between px-4 py-2 bg-[#FEFEFD] rounded-[12px] border border-[#D1D1D1]">
          <div className="flex items-center gap-3">
            <Image
              width={24}
              height={24}
              src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
              alt="File icon"
              className="w-6 h-6"
            />
            <span className="text-sm text-[#120A02] truncate max-w-[180px]">
              {file.name}
            </span>
          </div>
          <button
            onClick={handleRemove}
            className="flex items-center text-sm text-red-600 hover:text-red-800"
          >
            Remove <X size={14} className="ml-1" />
          </button>
        </div>
      )}

      <small className="text-gray-500">
        Choose compressed or zip files less than 10 MB
      </small>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default FileUpload;
