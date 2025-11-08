"use client";
import { Suspense, useState } from "react";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import InputField from "@/app/components/project/InputField";
import Button from "@/app/components/common/buttons";
import HeroImageSection from "@/app/components/auth/authImageSection";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import axios from "axios";
import { useAuth } from "../context/authContext";
import Link from "next/link";
import { environment } from "../env/env.local";

const LoginPage = () => {
  const LoginForm = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [savePassword, setSavePassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { login } = useAuth();
    const searchParams = useSearchParams();

    const redirectTo = searchParams.get("redirect") || "/dashboard";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      await axios
        .post("/api/login", { ...formData })
        .then((response) => {
          setLoading(false);

          if (response.status >= 200 && response.status < 300) {
            const { first_name, middle_name, last_name, image } =
              response?.data;
            toast.success(`Login Successful Welcome back ${first_name}`);
            login({ first_name, middle_name, last_name, image });
            setFormData({ email: "", password: "" });
            // Clear the stored redirect path after successful login
            localStorage.setItem("user_email_checkout", formData?.email);

            // Instead of router.push(redirectTo)
            window.location.href = redirectTo;
          } else {
            toast.error("Error login please try again or contact Admin");
          }
        })
        .catch((err) => {
          setLoading(false);
          let errorMessage =
            "An error occurred please try again or contact Admin";
          if (err instanceof AxiosError) {
            errorMessage = err.response?.data?.message || errorMessage;
          }
          toast.error(errorMessage);
        });
    };

   
    const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
      const idToken = credentialResponse.credential;
      setLoading(true);

      try {
        const res = await fetch(`${environment.baseUrl}/auth/social/google/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ access_token: idToken }),
        });

        if (!res.ok) throw new Error(`Backend error: ${res.status}`);
        const data = await res.json();
        const { token, user } = data;
        const { first_name, last_name, email } = user;

  
        const middle_name = "";
        const image = user?.image || "";

        // Save token and email
        localStorage.setItem("token", token);
        Cookies.set("token", token, {path: "/", seecure: true, sameSite: "lax"})
        localStorage.setItem("user_email_checkout", email);                                                                              


        toast.success(`Login Successful! Welcome back ${first_name}`);
        login({ first_name, middle_name, last_name, image });

        router.push(redirectTo);
      } catch (error) {
        console.error("Google login failed:", error);
        toast.error("Google login failed. Please try again or contact Admin.");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white">
        {/* Left Side: Image */}
        <div className="w-full lg:w-1/2">
          <HeroImageSection
            imageSrc="/assets/general/sign-up.png"
            title="👋 Hey There! We're So Glad To See You Again!"
            description="Log in to continue learning, building, and transforming your ideas into real-world impact."
          />
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col items-center justify-center">
          <div className="w-full max-w-[450px]">
            <h2 className="text-2xl font-bold text-center text-[#1D1D1F] mb-1">
              Welcome Back! 🚀
            </h2>
            <p className="text-center text-gray-500 mb-6">
              We&apos;re so glad to see you again <span>😊</span>
            </p>

            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Login Failed")}
              type="standard"
              theme="outline"
              size="large"
              shape="rectangular"
              text="signin_with"
              logo_alignment="left"
            />

            {/* Divider */}
            <div className="flex items-center gap-4 mb-4">
              <hr className="flex-grow border-gray-300" />
              <span className="text-gray-400 text-sm">Or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <InputField
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
              <InputField
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                isPassword
              />

              {/* Save password + Forgot */}
              <div className="flex justify-between items-center text-sm text-[#34474E] m-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={savePassword}
                    onChange={() => setSavePassword(!savePassword)}
                    className="w-4 h-4 rounded border border-[#7B4C1F] bg-white accent-[#7B4C1F]"
                  />
                  <span className="text-[#413B35]">Save Password</span>
                </label>
                <span
                  onClick={() => router.push("forget-password")}
                  className="text-[#7B4C1F] font-semibold hover:underline cursor-pointer"
                >
                  Forgot Password?
                </span>
              </div>

              <Button
                type="submit"
                variant="secondary"
                className="text-[#413B35] hover:bg-[#95704C] hover:text-white hover:border-[#A78769]"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>

            {/* Footer links */}
            <div>
              <p className="text-center text-sm text-gray-600 mt-6 w-full">
                Don&apos;t have an account?{" "}
                <span
                  onClick={() => router.push("sign-up")}
                  className="text-[#7B4C1F] font-semibold hover:underline cursor-pointer"
                >
                  Create Account
                </span>
              </p>
              <div className="text-center">
                <Link
                  href={"/resend-verification-link"}
                  className="text-sm text-[#7B4C1F] font-semibold hover:underline"
                >
                  Resend verification link
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
