// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// const ForgotPasswordOverlay = () => {
//   const router = useRouter();
//   const [email, setEmail] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Reset link sent to:", email);
//     // TODO: trigger email reset logic
//   };

//   return (
//     <div className="min-h-screen w-full bg-[#FAFAFA] flex flex-col items-center justify-center relative">
//       {/* Logo top-left */}
//       <div className="absolute top-6 left-6">
//         <Image src="/assets/logo/nubyira-logo.png" alt="Nubyira Logo" width={120} height={40} />
//       </div>

//       {/* Background pattern (optional) */}
//       <div className="absolute inset-0 z-0 opacity-10">
//         <Image
//           src="/assets/general/bg-pattern.png" // optional faded image/pattern
//           alt="Background"
//           layout="fill"
//           objectFit="cover"
//         />
//       </div>

//       {/* Modal / Overlay Card */}
//       <div className="relative z-10 bg-white rounded-xl shadow-lg px-6 py-8 w-full max-w-md text-center">
//         <div className="flex justify-center mb-4">
//           <Image src="/assets/icons/lock-icon.svg" alt="Lock Icon" width={30} height={30} />
//         </div>

//         <h2 className="text-xl font-semibold text-[#1D1D1F] mb-2">Forgot Password?</h2>
//         <p className="text-sm text-gray-500 mb-6 px-2">
//           Enter your registered email address to receive password reset link.
//         </p>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <input
//             type="email"
//             required
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full h-[44px] px-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#7B4C1F]"
//           />

//           <button
//             type="submit"
//             className="w-full h-[44px] rounded-lg bg-[#F2EDE9] text-[#7B4C1F] font-medium hover:opacity-90"
//           >
//             Send Reset Link
//           </button>
//         </form>

//         <button
//           onClick={() => router.push("/login")}
//           className="text-sm text-gray-600 mt-6 hover:underline"
//         >
//           Back to Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ForgotPasswordOverlay;




'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Overlay from '@/app/components/common/overlay';
import Button from '@/app/components/common/buttons';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sending reset link
    console.log('Send reset link to:', email);
    router.push('sent-reset-link')
  };

  return (
    <Overlay>
      <div className="mb-6">
        <div className="flex mb-4">
          <div className="bg-orange-100 rounded-full">
            <img src="/assets/general/lock.png" alt="lock" className="w-18 h-18" />
          </div>
        </div>
        <h2 className="text-[30px] font-[600] font-[Montserrat] capitalize text-[#0B222A]">Forgot Password?</h2>
        <p className="max-w-[554px] max-h-[52px] font-[Inter] text-[18px] text-[#413B35] mt-1">
        Enter your registered email address to receive password reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-[554px] space-y-5">
        <div className=''>
          <label htmlFor="email" className="block text-[16px] font-[Inter] font-[500] text-[#120A02] mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="w-full h-[50px] px-3 py-2 rounded-[12px] border border-[#D1D1D1] bg-[#FEFEFD] focus:border-[#7B4C1F] text-[#120A02] focus:outline-none pr-10"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          variant="secondary"
          className="w-full text-[#413B35] hover:bg-[#95704C] hover:text-white hover:border-[#A78769]"
          >
          Send Reset Link
        </Button>
      </form>

      <div className="text-center mt-3">
        <p className="text-center text-sm text-gray-600 mt-6">
            Back to{" "}
            <span
              onClick={() => router.push("sign-in")}
              className="font-inter font-semibold text-[14px] leading-[22px] tracking-normal text-center capitalize text-[#7B4C1F] hover:underline transition-none cursor-pointer"
            >
              Login
            </span>
          </p>
      </div>
    </Overlay>
  );
}
