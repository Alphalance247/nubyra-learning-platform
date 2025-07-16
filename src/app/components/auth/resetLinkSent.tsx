'use client';

import React from 'react';
import Overlay from '@/app/components/common/overlay';
import { useRouter } from 'next/navigation';
import Button from '../common/buttons';
import { GoChevronRight } from 'react-icons/go';
import Image from 'next/image';

export default function ResetLinkSent() {
  const router = useRouter();

  const handleGoToMail = () => {
    // Optionally open user's mail provider or redirect
    window.open('https://mail.google.com', '_blank');
  };

  const handleRetry = () => {
    router.push('forget-password');
  };

  return (
    <Overlay>
      <div className="max-w-[594px] gap-4">
        <div className="flex justify-center mb-5">
          <div className="bg-orange-100 p-4 rounded-full">
            <Image
              src="/assets/general/mail.png"
              alt="Mail Icon"
              width={80}
              height={80}
              className="w-20 h-20"
            />
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <h2 className="text-[30px] font-[Montserrat] font-[600] capitalize text-[#0B222A]">We Have Sent You A Reset Link</h2>

          <p className="max-w-[590px] leading-[26px] text-[16px] font-[Inter] text-[#5C6C71] font-400  mt-2 px-2">
            We sent a reset password link to the email address you provided. If you didn’t get the email,
            check your spam folder or{' '}
            <span onClick={handleRetry} className="font-inter font-semibold text-[18px] leading-[22px] tracking-normal text-center capitalize text-[#7B4C1F] hover:underline transition-none cursor-pointer">
              Try Again
            </span>
            .
          </p>
          <Button
            variant="primary"
            onClick={handleGoToMail}
            className="w-full flex justify-center items-center gap-x-2"
          >
            <span>Go To Mail</span>
            <GoChevronRight size={18} />
          </Button>
        </div>
      </div>
    </Overlay>
  );
}
