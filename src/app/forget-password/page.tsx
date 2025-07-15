"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Overlay from "@/app/components/common/overlay";
import Button from "@/app/components/common/buttons";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import axios from "axios";
import { environment } from "../env/env.local";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sending reset link

    try {
      setLoading(true);
      const res = await axios.post(
        `${environment.baseUrl}${environment.forgotPassword}`,
        {
          email,
        }
      );

      if (res.status === 200) {
        toast.success("Reset link sent successfully");
        router.push("sent-reset-link");
        localStorage.setItem("password_reset_email", email);
      }

      setLoading(false);
    } catch (err) {
      // Extract the error message from the response
      let errorMessage = "An error occurred please try again or contact Admin";
      if (err instanceof AxiosError) {
        // Check if err is an instance of AxiosError
        errorMessage = err.response?.data?.message || errorMessage;
      }

      toast.error(errorMessage);
      setLoading(false);
    }
  };

  return (
    <Overlay>
      <div className="mb-6">
        <div className="flex mb-4">
          <div className="bg-orange-100 rounded-full">
            <Image
              src="/assets/general/lock.png"
              alt="lock"
              className="w-18 h-18"
              width={51}
              height={51}
            />
          </div>
        </div>
        <h2 className="text-[30px] font-[600] font-[Montserrat] capitalize text-[#0B222A]">
          Forgot Password?
        </h2>
        <p className="max-w-[554px] max-h-[52px] font-[Inter] text-[18px] text-[#413B35] mt-1">
          Enter your registered email address to receive password reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-[554px] space-y-5">
        <div className="">
          <label
            htmlFor="email"
            className="block text-[16px] font-[Inter] font-[500] text-[#120A02] mb-1"
          >
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
          {loading ? "Sending..." : "Send Reset Link"}
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
