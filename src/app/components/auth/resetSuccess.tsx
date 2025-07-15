"use client";

import React from "react";
import Overlay from "@/app/components/common/overlay";
import { useRouter } from "next/navigation";
import Button from "../common/buttons";
import { GoChevronRight } from "react-icons/go";
import Image from "next/image";

export default function ResetSucceessful() {
  const router = useRouter();

  const handleGoToLogin = () => {
    router.push("sign-in");
  };

  // const handleRetry = () => {
  //   router.push("forget-password");
  // };

  return (
    <Overlay>
      <div className="max-w-[594px] gap-4">
        <div className="flex justify-center mb-5">
          <div className="bg-orange-100 p-4 rounded-full">
            <Image
              src="/assets/general/mail.png"
              alt="Mail Icon"
              className="w-20 h-20"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-[30px] font-[Montserrat] font-[600] capitalize text-[#0B222A]">
            Password Reset successfully
          </h2>

          <p className="max-w-[590px] leading-[26px] text-[16px] font-[Inter] text-[#5C6C71] font-400  mt-2 px-2">
            Your password has been reset successfully. Please click the button
            below to login.
          </p>
          <Button
            variant="primary"
            onClick={handleGoToLogin}
            className="w-full flex justify-center items-center gap-x-2"
          >
            <span>Go To Login</span>
            <GoChevronRight size={18} />
          </Button>
        </div>
      </div>
    </Overlay>
  );
}
