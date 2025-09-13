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
    document.body.style.overflow = showOverlay ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showOverlay]);

  return (
    <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto p-6 border border-[#E4E7EC] rounded-[10px] bg-[#F3F0EC] flex flex-col gap-6">
      {/* Title */}
      <h2 className="font-montserrat font-bold text-lg sm:text-xl md:text-2xl text-[#120A02] capitalize">
        Choose Payment Method
      </h2>

      {/* Subtitle */}
      <p className="font-inter font-semibold text-sm sm:text-base text-[#413B35] capitalize">
        Pay with
      </p>

      {/* Payment buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        {(["paystack", "paypal"] as PaymentMethod[]).map((method) => (
          <button
            key={method}
            onClick={() => setSelected(method)}
            className={`
              flex items-center justify-center gap-2
              flex-1 h-11 p-2 rounded-lg border bg-[#FEFEFD]
              ${selected === method ? "border-blue-500" : "border-[#E7E7E6]"}
            `}
          >
            <Image
              src={logos[method]}
              alt={`${method} logo`}
              width={18}
              height={18}
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
            <span className="font-inter font-semibold text-sm sm:text-base capitalize text-[#413B35]">
              {method}
            </span>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-[#D6C8BA] my-4" />

      {/* Description + Button */}
      <div className="flex flex-col gap-6">
        <p className="font-inter text-sm sm:text-base text-[#413B35]">
          This is a one-time payment for your course enrollment. You will be
          redirected to the payment service website. After payment, you’ll
          access the course from your dashboard.
        </p>

        <Button
          onClick={() => setShowOverlay(true)}
          variant="primary"
          className="w-full h-14 flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          Choose Payment
        </Button>
      </div>

      {/* Success overlay */}
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
  );
};

export default PaymentMethodSelector;
