"use client";
import { useState } from "react";
import Overlay from "../components/common/overlay";
import Button from "../components/common/buttons";
import Link from "next/link";
import Image from "next/image";
import ModalOverlay from "../components/common/modal";
import { GoChevronRight } from "react-icons/go";
import { AxiosError } from "axios";
import { environment } from "../env/env.local";
import axios from "axios";
import toast from "react-hot-toast";

const ResendVerificationLink = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sending reset link

    try {
      setLoading(true);
      const res = await axios.post(
        `${environment?.baseUrl}${environment?.resendVerificationLink}`,
        {
          email,
        }
      );

      if (res.status === 200) {
        setVerificationSent(true);
      }

      setLoading(false);
    } catch (err) {
      // Extract the error message from the response
      let errorMessage = "An error occurred please try again or contact Admin";
      if (err instanceof AxiosError) {
        // Check if err is an instance of AxiosError
        errorMessage = err.response?.data?.response || errorMessage;
      }

      toast.error(errorMessage);
      setLoading(false);
    }
  };
  return (
    <Overlay>
      {verificationSent && (
        <ModalOverlay
          onClose={() => {
            setVerificationSent(false);
          }}
        >
          <div className="max-w-[594px] gap-4 relative bg-[white] rounded-xl z-50 p-10 border-[0.5px] border-[#F3F0EC]">
            <div className="flex justify-center mb-5">
              <div className="bg-orange-100 p-4 rounded-full">
                <Image
                  src="/assets/general/mail.png"
                  alt="Mail Icon"
                  className="w-20 h-20"
                  width={80}
                  height={80}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-[Montserrat] font-semibold capitalize text-[#0B222A]">
                We have sent you a verification link
              </h2>

              <p className="font-[Inter] text-[#5C6C71] font-400 mb-6 text-base">
                We sent a verification link to the email address you provided.
                If you didn’t get the email, check your spam folder or try
                again.
              </p>
              <Link href={""}>
                <Button
                  variant="primary"
                  className="w-full flex justify-center items-center gap-x-2"
                >
                  <span>Go to Mail</span>
                  <GoChevronRight size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </ModalOverlay>
      )}
      <div className="relative z-0">
        <Image src="/assets/general/check.png" width={51} height={51} alt="" />

        <div className="mt-6">
          <h2 className="text-[30px] font-[600] font-[Montserrat] capitalize text-[#0B222A] mb-4">
            Resend account activation Link
          </h2>
          <p className="max-w-[554px] max-h-[52px] font-[Inter] text-[18px] text-[#413B35] mb-6">
            Enter your registered email address to receive activation link
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
            {loading ? "Sending..." : "Submit"}
          </Button>
        </form>

        <div className="text-center mt-3">
          <Link href={"/sign-in"}>
            <p className="text-center text-sm text-gray-600 mt-6">
              Back to{" "}
              <span className="font-inter font-semibold text-[14px] leading-[22px] tracking-normal text-center capitalize text-[#7B4C1F] hover:underline transition-none cursor-pointer">
                Login
              </span>
            </p>
          </Link>
        </div>
      </div>
    </Overlay>
  );
};

export default ResendVerificationLink;
