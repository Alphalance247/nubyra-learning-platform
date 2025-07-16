"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';
import InputField from "@/app/components/project/InputField";
import Button from "@/app/components/common/buttons";
import HeroImageSection from "@/app/components/auth/authImageSection";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [savePassword, setSavePassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", formData, savePassword);

    router.push("/dashboard");
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential;

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/v1/auth/social/google/",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            access_token: idToken,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`Backend error: ${res.status}`);
      }

      const data = await res.json();

      // Store your custom DRF token
      localStorage.setItem('authToken', data.token);

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Google login failed:', error);
      // alert('Something went wrong logging in with Google.');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white">
      {/* Left Side: Image + Welcome */}
      <HeroImageSection
        imageSrc="/assets/general/sign-up.png"
        altText="Process Engineer"
        title="👋 Hey There! We're So Glad To See You Again!"
        description="Log in to continue learning, building, and transforming your ideas into real-world impact."
        />

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col items-center justify-center">
        <div className="w-full max-w-[450px]">
          <h2 className="text-2xl font-bold text-center text-[#1D1D1F] mb-1">
            Welcome Back! <span role="img" aria-label="rocket">🚀</span>
          </h2>
          <p className="text-center text-gray-500 mb-6">We&apos;re so glad to see you again <span>😊</span></p>

          {/* <button className="w-full h-[44px] mb-4 flex items-center justify-center gap-2 rounded-lg border border-[#E4E4E7] bg-[#F3F0EC] text-[14px] font-[500] font-[Onset] leading-[135%] tracking-[-0.02em] text-[#5C6C71] cursor-pointer">
            <Image src="/assets/general/google-logo.svg" alt="Google" width={18} height={18} />
            Continue with Google
          </button> */}

          {/* <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log('Login Failed')}
            useOneTap
          /> */}
          
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log('Login Failed')}
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

            <div className="flex justify-between items-center text-sm text-[#34474E] m-3">
              <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={savePassword}
                    onChange={() => setSavePassword(!savePassword)}
                    className="w-[16px] h-[16px] rounded-[2px] border border-[#7B4C1F] bg-white accent-[#7B4C1F]"
                />
                <span className="font-inter font-normal text-[14px] leading-[22px] tracking-normal align-middle text-[#413B35]">
                    Save Password
                </span>
              </label>
              <span
                onClick={() => router.push("forget-password")}
                className="font-inter font-semibold text-[14px] leading-[22px] tracking-normal text-center capitalize text-[#7B4C1F] hover:underline transition-none cursor-pointer"
              >
                Forgot Password?
              </span>
            </div>

            <Button
              type="submit"
              variant="secondary"
              className="text-[#413B35] hover:bg-[#95704C] hover:text-white hover:border-[#A78769]"
            >
              Login
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
              Don&apos;t have an account?{" "}
            <span
              onClick={() => router.push("sign-up")}
              className="font-[inter] font-semibold text-[14px] leading-[22px] tracking-normal text-center capitalize text-[#7B4C1F] hover:underline transition-none cursor-pointer"
            >
              Create Account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
