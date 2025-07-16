"use client";

import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import PhoneInput from '@/app/components/project/phoneNumber';
import InputField from '@/app/components/project/InputField';

interface SignUpFormProps {
  onSubmit: (data: SignUpFormData) => void;
  onGoogleSignUp?: () => void;
  onLoginClick?: () => void;
}

interface SignUpFormData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}


const SignUpForm: React.FC<SignUpFormProps> = ({
  onSubmit,
  onGoogleSignUp,
  onLoginClick,
}) => {
  const [formData, setFormData] = React.useState<SignUpFormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (phone: string) => {
    setFormData(prev => ({ ...prev, phone }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">NUBYIRA</h1>
        <p className="text-gray-600 mt-1">Projects Designers</p>
        
        <h2 className="text-2xl font-semibold mt-6">Let&apos;s Get Started!</h2>
        <p className="text-gray-600 mt-2">Create an account to get started</p>
      </div>

      {/* Google Sign Up */}
      {onGoogleSignUp && (
        <>
          <button
            onClick={onGoogleSignUp}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-50 transition-colors"
          >
            <FcGoogle className="text-xl" />
            <span>Sign Up with Google</span>
          </button>
          
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">Or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
        </>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <InputField
          label="Full Name*"
          name="firstName"
          placeholder="Enter first name"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="w-full"
        />

        {/* Middle Name */}
        <InputField
          label="Middle Name (Optional)"
          name="middleName"
          placeholder="Enter middle name"
          value={formData.middleName}
          onChange={handleChange}
          className="w-full"
        />

        {/* Last Name */}
        <InputField
          label="Last Name*"
          name="lastName"
          placeholder="Enter last name"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="w-full"
        />

        {/* Email */}
        <InputField
          label="Email*"
          name="email"
          type="email"
          placeholder="Enter email address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full"
        />

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number*
          </label>
          <PhoneInput 
            value={formData.phone} 
            onChange={handlePhoneChange} 
            className="w-full"
          />
        </div>

        {/* Password */}
        <InputField
          label="Password*"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
          isPassword
          className="w-full"
        />

        {/* Confirm Password */}
        <InputField
          label="Confirm Password*"
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          isPassword
          className="w-full"
        />

        {/* Promo Section */}
        <div className="bg-blue-50 p-4 rounded-lg mt-6">
          <h3 className="text-lg font-semibold text-blue-800">Discover Process Engineering!</h3>
          <p className="text-blue-700 mt-2">
            Create The Innovations Of Tomorrow Together
          </p>
          <p className="text-blue-600 mt-2 text-sm">
            Dive Into Real-World Projects And Collaborate On Innovative Solutions That Will Shape The Future Of Our Industry
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors mt-6"
        >
          Create Account
        </button>

        {/* Login Link */}
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onLoginClick}
              className="text-blue-600 hover:underline focus:outline-none"
            >
              Login
            </button>
          </p>
        </div>

        {/* Terms */}
        <p className="text-xs text-gray-500 mt-4 text-center">
          By clicking Submit, you agree to the Nubyira Terms And Conditions, Privacy Policy, and Cookie Policy.
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;