"use client";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import PhoneInput from "@/app/components/project/phoneNumber";
import InputField from "@/app/components/project/InputField";
import HeroImageSection from "@/app/components/auth/authImageSection";
import Button from "@/app/components/common/buttons";
import { environment } from "../env/env.local";
import { toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { useAuth } from "../context/authContext";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [phone_number, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const { password, confirmPassword } = formData;

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        environment.baseUrl + environment.registerUrl,
        { ...formData, phone_number }
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success(
          "Registration successful, kindly check your mailbox for confirmation"
        );
        setFormData({
          first_name: "",
          middle_name: "",
          last_name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setPhoneNumber("");
      } else {
        toast.error("Registration failed");
      }
    } catch (err) {
      let errorMessage = "An error occurred please try again or contact Admin";
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.email || errorMessage;
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
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


      if (!res.ok) {
        const errorText = await res.text();
        console.error("Non-OK response:", res.status, errorText);
        throw new Error(`Backend error: ${res.status}`);
      }

      const data = await res.json();
      const { token, user, new_user } = data;
      const { first_name, last_name, email } = user;

      // Store token
      localStorage.setItem("token", token);
      Cookies.set("token", token, {path: "/", seecure: true, sameSite: "lax"})
      localStorage.setItem("user_email_checkout", email);

      if (new_user) {
        toast.success(
          "Registration successful, kindly check your mailbox for confirmation"
        );
      } else {
        toast.success(`Welcome back ${first_name}!`);
      }

      login({
        first_name,
        middle_name: "",
        last_name,
        image: user.image || "",
      });

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error("Google login failed. Please try again or contact Admin.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white">
      {/* Left Section (Hero) */}
      <div className="w-full lg:w-1/2">
        <HeroImageSection
          imageSrc="/assets/general/sign-up.png"
          title="🌟 Discover Process Engineering! Create the Innovations of Tomorrow Together"
          description="Dive into real-world projects and collaborate on innovative solutions that will shape the future of our industry."
        />
      </div>

      {/* Right Section (Form) */}
      <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col items-center justify-center">
        {/* Heading */}
        <div className="w-full max-w-[450px]">
          <h2 className="text-2xl font-bold text-center text-[#1D1D1F] mb-1">
            Let’s Get Started! 🚀
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Create an account to get started
          </p>
        </div>

        {/* Google Login */}
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => console.log("signup Failed")}
          type="standard"
          theme="outline"
          size="large"
          shape="rectangular"
          text="signup_with"
          logo_alignment="left"
        />

        {/* Divider */}
        <div className="flex items-center justify-center w-full max-w-[550px] h-[36px] gap-6 my-4">
          <div className="w-full h-px bg-gradient-to-r from-[#F2F2F3] to-[#B3BABF]" />
          <span className="min-w-[57px] px-2 text-[#34474E] text-sm">Or</span>
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
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full sm:w-1/2"
              required
            />
            <InputField
              label="Middle Name (Optional)"
              name="middle_name"
              value={formData.middle_name}
              onChange={handleChange}
              placeholder="Enter middle name"
              className="w-full sm:w-1/2"
            />
          </div>

          {/* Last Name */}
          <InputField
            label="Last Name"
            name="last_name"
            value={formData.last_name}
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
            <PhoneInput value={phone_number} onChange={setPhoneNumber} />
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
          <Button
            variant="secondary"
            type="submit"
            className="text-[#413B35] w-full mt-3 hover:bg-[#95704C] hover:text-white hover:border-[#A78769]"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        {/* Footer Text */}
        <div className="w-full max-w-[550px] flex justify-center gap-1 mt-5">
          <p className="text-sm text-[#413B35]">Already have an account?</p>
          <span
            className="font-semibold text-sm text-[#7B4C1F] hover:underline cursor-pointer"
            onClick={() => router.push("sign-in")}
          >
            Login
          </span>
        </div>

        <p className="w-full max-w-[550px] text-center text-[#413B35] text-sm mt-4 px-4 sm:px-0">
          By clicking Submit, you agree to the Nubyira{" "}
          <span className="underline text-[#7B4C1F] cursor-pointer">
            Terms and Conditions
          </span>
          ,{" "}
          <span className="underline text-[#7B4C1F] cursor-pointer">
            Privacy Policy
          </span>
          , and{" "}
          <span className="underline text-[#7B4C1F] cursor-pointer">
            Cookie Policy
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
