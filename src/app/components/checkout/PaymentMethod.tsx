"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SuccessOverlay from "./SuccessOverlay";
import Button from "../common/buttons";

type PaymentMethod = "paystack" | "paypal";

const logos = {
  paystack: "/assets/general/paystack.svg",
  paypal: "assets/general/paypal.svg",
};

const courseData = {
  title: "Apen Plus Basic Course Webinar",
  price: 50,
  duration: "5 Days",
  venue: "Online Class",
};
const PaymentMethodSelector = () => {
  const [selected, setSelected] = useState<PaymentMethod>("paystack");
  const [showOverlay, setShowOverlay] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (showOverlay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showOverlay]);

  return (
    <div className="w-[580px] h-[444px] p-6 border border-[#E4E7EC] rounded-[10px] bg-[#F3F0EC] flex flex-col gap-4">
      <div className="w-[322px] h-[36px] font-montserrat font-bold text-[20px] leading-[28px] text-[#120A02] capitalize align-middle">
        Choose Payment Method
      </div>
      <div className="w-[360px] h-[24px] font-inter font-semibold text-[16px] leading-[24px] tracking-normal align-middle capitalize text-[#413B35]">
        Pay with
      </div>

      <div className="w-[532px] h-[44px] gap-3 flex">
        {(["paystack", "paypal"] as PaymentMethod[]).map((method) => (
          <button
            key={method}
            onClick={() => setSelected(method)}
            className={`
                flex items-center justify-center gap-2
                w-[260px] h-[44px] p-[6px]
                rounded-lg border bg-[#FEFEFD]
                ${selected === method ? "border-blue-500" : "border-[#E7E7E6]"}
            `}
          >
            <Image
              src={logos[method]}
              alt={`${method} logo`}
              className="w-[16px] h-[16px]"
              width={16}
              height={16}
            />
            {/* Text */}
            <span className="font-semibold text-[14px] leading-[22px] capitalize text-[#413B35] font-inter">
              {method}
            </span>
          </button>
        ))}
      </div>
      <div className="w-[532px] border-t my-6 border-[#D6C8BA]" />
      <div className="w-[532px] h-[192px] flex flex-col gap-[48px]">
        <p className="w-[532px] h-[88px] font-inter font-normal text-[14px] leading-[22px] text-[#413B35] align-middle">
          This is a one-time payment for your course enrollment. You will be
          redirected to the payment service website. After payment, you’ll
          access the course from your dashboard.
        </p>

        {/* <button onClick={() => setShowOverlay(true)}
      className="w-[532px] h-[56px] flex items-center justify-center gap-[6px] rounded-[16px] border border-[#A78769] bg-[#95704C] pt-[16px] pr-[32px] pb-[16px] pl-[32px] transition-opacity duration-300 ease-out">
        Choose Payment
      </button> */}
        <Button
          onClick={() => setShowOverlay(true)}
          variant="primary"
          className="w-[532px] h-[56px] flex items-center justify-center gap-[6px]"
        >
          Choose Payment
        </Button>
        {showOverlay && (
          <SuccessOverlay
            onClose={() => setShowOverlay(false)}
            heading="Enrollment Successful!"
            description="You are now enrolled in"
            courseTitle={courseData.title}
            primaryButtonText="Go To Dashboard"
            secondaryButtonText="Go To Course"
            onPrimaryClick={() => router.push("/dashboard")}
            onSecondaryClick={() => router.push("/learning")}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
