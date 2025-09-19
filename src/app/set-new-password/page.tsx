"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Overlay from "@/app/components/common/overlay";
import InputField from "@/app/components/project/InputField";
import Button from "@/app/components/common/buttons";
import Alert from "@/app/components/common/alert";
import axios from "axios";
import { AxiosError } from "axios";
import { environment } from "../env/env.local";
import toast from "react-hot-toast";
import Image from "next/image";

export default function SetNewPasswordPage() {
  const SetPassworDetails = () => {
    const [formData, setFormData] = useState({
      newPassword: "",
      confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{
      message: string;
      variant: "success" | "error";
      show: boolean;
    }>({ message: "", variant: "success", show: false });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const { newPassword, confirmPassword } = formData;
    const route = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState("");

    useEffect(() => {
      const urlEmail = searchParams.get("email");
      if (urlEmail) {
        setEmail(urlEmail);
      } else {
        // If no token, redirect to forgot password page
        toast.error("Invalid or missing email");
        route.push("/forget-password");
      }
    }, [searchParams, route]);

    const passwordRules = {
      minLength: newPassword.length >= 8,
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
      uppercase: /[A-Z]/.test(newPassword),
      lowercase: /[a-z]/.test(newPassword),
      number: /[0-9]/.test(newPassword),
    };

    const isFormValid =
      Object.values(passwordRules).every(Boolean) &&
      newPassword === confirmPassword;

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!passwordRules.minLength) {
        return setAlert({
          message: "Password must be at least 8 characters long.",
          variant: "error",
          show: true,
        });
      }

      if (!passwordRules.uppercase) {
        return setAlert({
          message: "Password must contain at least one uppercase letter.",
          variant: "error",
          show: true,
        });
      }

      if (!passwordRules.lowercase) {
        return setAlert({
          message: "Password must contain at least one lowercase letter.",
          variant: "error",
          show: true,
        });
      }

      if (!passwordRules.number) {
        return setAlert({
          message: "Password must include at least one number.",
          variant: "error",
          show: true,
        });
      }

      if (!passwordRules.specialChar) {
        return setAlert({
          message: "Password must include at least one special character.",
          variant: "error",
          show: true,
        });
      }

      if (newPassword !== confirmPassword) {
        return setAlert({
          message: "Passwords do not match.",
          variant: "error",
          show: true,
        });
      }

      try {
        setLoading(true);
        const res = await axios.post(
          `${environment?.baseUrl}${environment?.password__reset}`,
          {
            new_password: newPassword,
            // token: token,
            email: email,
            confirm_new_password: newPassword,
          }
        );

        if (res.status === 200) {
          toast.success("Password reset successfully");
          route.push("/sign-in");
        }

        setLoading(false);
      } catch (err) {
        // Extract the error message from the response
        let errorMessage = "Error reseting password";
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
        <Alert
          message={alert.message}
          variant={alert.variant}
          show={alert.show}
          onClose={() => setAlert((prev) => ({ ...prev, show: false }))}
          autoDismiss={2000}
        />

        <div className=" mb-6">
          <div className="flex gap-4 mb-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <Image
                src="/assets/general/lock.png"
                alt="lock"
                className="w-10 h-10"
                width={40}
                height={40}
              />
            </div>
          </div>
          <h2 className="text-[30px] font-[Montserrat] font-[600] capitalize text-[#0B222A]">
            Set New Password
          </h2>
          <p className="max-w-[590px] leading-[26px] text-[16px] font-[Inter] text-[#5C6C71] font-400  mt-2 px-2">
            Make sure it is something you won’t forget.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="New Password"
            name="newPassword"
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={handleChange}
            required
            isPassword
            className="w-full"
          />

          <InputField
            label="Confirm New Password"
            name="confirmPassword"
            placeholder="Re-enter new password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            isPassword
            className="w-full"
          />
          <Button
            type="submit"
            variant="secondary"
            className={`w-full py-3 rounded-md font-semibold text-[#413B35] hover:bg-[#95704C] hover:text-white hover:border-[#A78769] ${
              isFormValid ? "" : "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? "reseting..." : "Set New Password"}
          </Button>
        </form>
      </Overlay>
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SetPassworDetails />
    </Suspense>
  );
}
