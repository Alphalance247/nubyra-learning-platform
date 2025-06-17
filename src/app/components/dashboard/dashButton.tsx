
// 'use client';

// import React from 'react';
// import { useRouter } from 'next/navigation';

// interface PrimaryButtonProps {
//   text?: string;
//   href?: string;
//   onClick?: () => void;
//   className?: string;
//   type?: 'button' | 'submit' | 'reset';
//   variant?: 'default' | 'brown';
// }

// const PrimaryButton: React.FC<PrimaryButtonProps> = ({
//   text = '',
//   href = '',
//   onClick,
//   className = '',
//   type = 'button',
//   variant = 'default',
// }) => {
//   const router = useRouter();

//   const handleClick = () => {
//     if (onClick) {
//       onClick();
//     } else if (href) {
//       router.push(href);
//     }
//   };

//   const variantStyles = {
//     default: 'bg-[#F2EDE9] text-[#8C6239]',
//     brown: 'bg-[#95704C] text-white',
//   };

//   return (
//     <button
//       type={type}
//       onClick={handleClick}
//       className={`px-4 py-2 rounded-[8px] font-medium shadow cursor-pointer ${variantStyles[variant]} ${className}`}
//     >
//       {text}
//     </button>
//   );
// };

// export default PrimaryButton;


'use client';

import React from 'react';
import Link from 'next/link';

interface PrimaryButtonProps {
  text?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'default' | 'brown';
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text = '',
  href,
  onClick,
  className = '',
  type = 'button',
  variant = 'default',
}) => {
  const variantStyles = {
    default: 'bg-[#F2EDE9] text-[#8C6239]',
    brown: 'bg-[#95704C] text-white',
  };

  const baseClass = `px-4 py-2 rounded-[8px] font-medium shadow cursor-pointer ${variantStyles[variant]} ${className}`;

  // Render a Link if href is provided and there's no onClick handler
  if (href && !onClick) {
    return (
      <Link href={href} className={baseClass}>
        {text}
      </Link>
    );
  }

  // Otherwise, render a button
  return (
    <button type={type} onClick={onClick} className={baseClass}>
      {text}
    </button>
  );
};

export default PrimaryButton;
