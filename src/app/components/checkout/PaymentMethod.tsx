"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "../common/buttons";
import { AxiosError } from "axios";
import axiosInstance from "@/app/utils/axios";
import toast from "react-hot-toast";
import SuccessOverlay from "./SuccessOverlay";

type PaymentMethod = "paystack" | "paypal";

const logos = {
  paystack: "/assets/general/paystack.svg",
  paypal: "assets/general/paypal.svg",
};

const PaymentMethodSelector = () => {
  const [selected, setSelected] = useState<PaymentMethod>("paystack");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [userEmail, setUserEmail] = useState("");
  const [courseId, setCourseId] = useState("");

  // Extract token from URL parameters

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== "undefined") {
      // Get email from localStorage
      const storedEmail = localStorage.getItem("user_email_checkout");
      const storedId = localStorage.getItem("courseId");
      if (storedEmail && storedId) {
        setUserEmail(storedEmail);
        setCourseId(storedId);
      }
    }
  }, []);

  const handlePayStackIntegration = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post(`/course/payment/initiate/`, {
        email: userEmail,
        course_id: courseId,
      });

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
        errorMessage = err.response?.data?.error || errorMessage;
      }
      setLoading(false);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto p-6 border border-[#E4E7EC] rounded-[10px] bg-[#F3F0EC] flex flex-col gap-6">
      {/* Title */}
      <h2 className="font-montserrat font-bold text-lg sm:text-xl md:text-2xl text-[#120A02] capitalize">
        Choose Payment Method
      </h2>

      <div className="flex flex-col sm:flex-row gap-3 w-full">
        {(["paystack"] as PaymentMethod[]).map((method) => (
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
          onClick={
            selected === "paystack" ? handlePayStackIntegration : () => {}
          }
          variant="primary"
          className="w-full h-14 flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          {loading
            ? "Processing....."
            : selected === "paystack"
            ? `Pay with paystack`
            : "Pay with paypal"}
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
