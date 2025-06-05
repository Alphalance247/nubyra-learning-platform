import { ReactNode } from "react";

type buttonVariant = "primary" | "secondary" | "tertiary";

// type buttonSize = "small" | "medium" | "large" | "switch";

interface buttonProps {
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: buttonVariant;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<buttonProps> = ({
  children,
  onClick,
  variant = "primary",
  className,
  disabled,
}) => {
  const buttonColor = {
    primary:
      "bg-[#95704C] text-white border border-[#A78769] hover:opacity-[0.8] hover:transition-all hover:duration-500",
    secondary:
      "border border-[#D6C8BA] text-base text-[#7B4C1F] bg-[#F2EDE9] hover:opacity-[0.8] hover:transition-all hover:duration-500",
    tertiary:
      "bg-[linear-gradient(1.54deg,#4379FF_-179.29%,#51F4A6_88.65%)] rounded-[2.5rem] text-[#282a03] hover:opacity-[0.8] hover:transition-all hover:duration-500 md:w-full",
  };

  //   const buttonSize = {
  //     small: "text-base py-3 px-8 md:px-4",
  //     medium: "px-8 py-4 md:px-4",
  //     large: "bg-[#282a03] text-white",
  //     switch: "",
  //   };

  return (
    <button
      onClick={onClick}
      className={`py-4 px-8 text-base font-semibold rounded-2xl cursor-pointer ${buttonColor[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
