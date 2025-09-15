"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "../common/buttons";
import { AxiosError } from "axios";
import axiosInstance from "@/app/utils/axios";
import toast from "react-hot-toast";

type PaymentMethod = "paystack" | "paypal";

const logos = {
  paystack: "/assets/general/paystack.svg",
  paypal: "assets/general/paypal.svg",
};

const PaymentMethodPremium = () => {
  const [selected, setSelected] = useState<PaymentMethod>("paystack");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePayPalIntegration = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post(`/subscription/paypal/initiate/`);

      if (res.status === 200) {
        toast.success("Payment Initiated successfully Redirecting....");
      }
      setLoading(false);
    } catch (err) {
      // Extract the error message from the response
      let errorMessage = "An error occurred please try again or contact Admin";
      if (err instanceof AxiosError) {
        // Check if err is an instance of AxiosError
        errorMessage = err.response?.data?.detail || errorMessage;
      }
      setLoading(false);
      toast.error(errorMessage);
    }
  };

  const handlePayStackIntegration = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post(`/subscription/paystack/initiate/`);

      if (res.status === 200) {
        router.push(res?.data?.authorization_url);
        toast.success("Payment Initiated successfully Redirecting....");
      }
      setLoading(false);
    } catch (err) {
      // Extract the error message from the response
      let errorMessage = "An error occurred please try again or contact Admin";
      if (err instanceof AxiosError) {
        // Check if err is an instance of AxiosError
        errorMessage = err.response?.data?.detail || errorMessage;
      }
      setLoading(false);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full md:w-[694px] mx-auto h-auto md:h-[444px] p-6 border border-[#E4E7EC] rounded-[10px] bg-[#F3F0EC] flex flex-col gap-4">
      <div className="font-montserrat font-bold text-lg md:text-[20px] leading-[28px] text-[#120A02] capitalize">
        Choose Payment Method
      </div>

      <div className="font-inter font-semibold text-base md:text-[16px] leading-[24px] capitalize text-[#413B35]">
        Pay with
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {(["paystack"] as PaymentMethod[]).map((method) => (
          <button
            key={method}
            onClick={() => setSelected(method)}
            className={`flex items-center justify-center gap-2 cursor-pointer
          w-full sm:w-[260px] h-[44px] p-[6px]
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
            <span className="font-semibold text-[14px] leading-[22px] capitalize text-[#413B35] font-inter">
              {method}
            </span>
          </button>
        ))}
      </div>

      <div className="border-t my-6 border-[#D6C8BA]" />

      <div className="flex flex-col gap-6">
        <p className="text-sm md:text-[14px] leading-[22px] text-[#413B35]">
          This is a one-time payment for premium subscription. You will be
          redirected to the payment service website to make your payment. Once
          complete, you’ll be taken to your dashboard with course access.
        </p>

        <Button
          onClick={
            selected === "paystack"
              ? handlePayStackIntegration
              : handlePayPalIntegration
          }
          variant="primary"
          className="w-full h-[56px] flex items-center justify-center gap-[6px]"
        >
          {loading
            ? "Processing....."
            : selected === "paystack"
            ? "Pay with Paystack"
            : "Pay with PayPal"}
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethodPremium;
