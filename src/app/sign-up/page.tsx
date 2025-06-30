"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from '@/app/components/project/phoneNumber';
import InputField from '@/app/components/project/InputField';
import HeroImageSection from "@/app/components/auth/authImageSection";
import Button from "@/app/components/common/buttons";
import Image from "next/image";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter()

  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setError(null); // reset previous error
    
      const { password, confirmPassword } = formData;
    
      if (password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
      }
    
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      console.log("Submitted:", { ...formData, phone });

      router.push("/dashboard");

  };
  

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white">
        <HeroImageSection
          imageSrc="/assets/general/sign-up.png"
          altText="Process Engineer"
          title="🌟 Discover Process Engineering! Create the Innovations of Tomorrow Together"
          description="Dive into real-world projects and collaborate on innovative solutions that will shape the future of our industry."
        />

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col items-center justify-center">
          {/* Heading */}
          <div className="w-full max-w-[450px]">
            <h2 className="text-2xl font-bold text-center text-[#1D1D1F] mb-1">
            Let’s Get Started! <span role="img" aria-label="rocket">🚀</span>
            </h2>
            <p className="text-center text-gray-500 mb-6">Create an account to get started</p>
          </div>

          {/* Google Sign Up */}
          <button className="w-full h-[44px] mb-4 flex items-center justify-center gap-2 rounded-lg border border-[#E4E4E7] bg-[#F3F0EC] text-[14px] font-[500] font-[Onset] leading-[135%] tracking-[-0.02em] text-[#5C6C71] cursor-pointer">
            <Image src="/assets/general/google-logo.svg" alt="Google" width={18} height={18} />
            Sign Up with Google
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center w-full max-w-[550px] h-[36px] gap-6 my-4">
            <div className="w-full h-px bg-gradient-to-r from-[#F2F2F3] to-[#B3BABF]" />
            <span className="min-w-[57px] h-[36px] px-[10px] py-[5px] text-[#34474E] text-sm flex items-center justify-center">
              Or
            </span>
            <div className="w-full h-px bg-gradient-to-r from-[#B3BABF] to-[#F2F2F3]" />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[550px] flex flex-col gap-5"
          >
            {/* First Row */}
            <div className="flex flex-col sm:flex-row gap-4">
              <InputField
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full sm:w-1/2"
                required
              />
              <InputField
                label="Middle Name (Optional)"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                placeholder="Enter middle name"
                className="w-full sm:w-1/2"
              />
            </div>

            {/* Last Name */}
            <InputField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              required
            />

            {/* Email & Phone */}
            <div className="flex flex-col sm:flex-row gap-4">
              <InputField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
                className="w-full sm:w-1/2"
              />
              <PhoneInput value={phone} onChange={setPhone} />
            </div>

            {/* Password */}
            <InputField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              isPassword
            />

            {/* Confirm Password */}
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
              isPassword
            />

            {/* Error Message */}
            {error && (
              <div className="text-red-600 text-sm mt-1 font-medium text-center">
                {error}
              </div>
            )}
            {/* Submit Button */}
            <Button variant="secondary" type="submit" className="text-[#413B35] m-5 hover:bg-[#95704C] hover:text-white hover:border-[#A78769]">
              Create Account
            </Button>
          </form>

          {/* Footer Text */}
          <div className="w-full max-w-[550px] h-[22px] m-5 justify-center flex flex-row gap-1">
            <p className="w-[171px] h-[22px] text-center font-inter font-normal text-[14px] leading-[22px] tracking-normal text-[#413B35]">
              Already have an account?{" "}
            </p>
            <span
              className="w-[38px] h-[22px] font-inter font-semibold text-[14px] leading-[22px] tracking-normal text-center capitalize text-[#7B4C1F] hover:underline transition-none cursor-pointer"
              onClick={() => router.push("sign-in")}
              >
              Login
            </span>
          </div>

          <div className="w-[550px] h-[44px] gap-1"> 
          <p className="w-full max-w-[550px] h-auto text-center text-[#413B35] font-inter font-normal text-[14px] leading-[22px] px-4 sm:px-0">
            By clicking Submit, you agree to the Nubyira{" "}
            <span className="underline text-[#7B4C1F] cursor-pointer">Terms and Conditions</span>,{" "}
            <span className="underline text-[#7B4C1F] cursor-pointer">Privacy Policy</span>, and{" "}
            <span className="underline text-[#7B4C1F] cursor-pointer">Cookie Policy</span>.
          </p>
          </div>
        </div>
    </div>
  );
};

export default SignUpPage;
