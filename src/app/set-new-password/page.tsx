'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Overlay from '@/app/components/common/overlay';
import { Check, X } from 'lucide-react';
import InputField from '@/app/components/project/InputField';
import Button from '@/app/components/common/buttons';
import Alert from '@/app/components/common/alert';

export default function SetNewPasswordPage() {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [alert, setAlert] = useState<{
    message: string;
    variant: 'success' | 'error';
    show: boolean;
  }>({ message: '', variant: 'success', show: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { newPassword, confirmPassword } = formData;
  const route = useRouter()

  const passwordRules = {
    minLength: newPassword.length >= 8,
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
  };

  const isFormValid =
    Object.values(passwordRules).every(Boolean) && newPassword === confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordRules.minLength) {
      return setAlert({
        message: 'Password must be at least 8 characters long.',
        variant: 'error',
        show: true,
      });
    }

    if (!passwordRules.uppercase) {
      return setAlert({
        message: 'Password must contain at least one uppercase letter.',
        variant: 'error',
        show: true,
      });
    }

    if (!passwordRules.lowercase) {
      return setAlert({
        message: 'Password must contain at least one lowercase letter.',
        variant: 'error',
        show: true,
      });
    }

    if (!passwordRules.number) {
      return setAlert({
        message: 'Password must include at least one number.',
        variant: 'error',
        show: true,
      });
    }

    if (!passwordRules.specialChar) {
      return setAlert({
        message: 'Password must include at least one special character.',
        variant: 'error',
        show: true,
      });
    }

    if (newPassword !== confirmPassword) {
      return setAlert({
        message: 'Passwords do not match.',
        variant: 'error',
        show: true,
      });
    }

    setAlert({
      message: 'Your password has been successfully updated!',
      variant: 'success',
      show: true,
    });

    console.log('Password successfully set!');
    route.push('reset-successful')
  };

  const RuleItem = ({ isValid, label }: { isValid: boolean; label: string }) => (
    <li className={`flex items-center text-sm ${isValid ? 'text-green-600' : 'text-red-500'}`}>
      {isValid ? <Check size={16} className="mr-2" /> : <X size={16} className="mr-2" />}
      {label}
    </li>
  );

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
            <img src="/assets/general/lock.png" alt="lock" className="w-10 h-10" />
          </div>
        </div>
        <h2 className="text-[30px] font-[Montserrat] font-[600] capitalize text-[#0B222A]">Set New Password</h2>
        <p className="max-w-[590px] leading-[26px] text-[16px] font-[Inter] text-[#5C6C71] font-400  mt-2 px-2">Make sure it is something you won’t forget.</p>
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

        {/* <div className="border border-orange-100 p-5 rounded-lg shadow-sm transition-all duration-300">
          <h4 className="text-sm font-semibold text-orange-700 mb-3">Your password must include:</h4>
          <hr  className='p-3'/>
          <ul className="space-y-2">
            <RuleItem isValid={passwordRules.minLength} label="At least 8 characters" />
            <RuleItem isValid={passwordRules.specialChar} label="1 special character (e.g. @ # $)" />
            <RuleItem isValid={passwordRules.uppercase} label="1 uppercase letter (A–Z)" />
            <RuleItem isValid={passwordRules.lowercase} label="1 lowercase letter (a–z)" />
            <RuleItem isValid={passwordRules.number} label="1 number (0–9)" />
          </ul>
        </div> */}

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
            isFormValid ? '' : 'opacity-50 cursor-not-allowed'
          }`}
        >
          Set New Password
        </Button>
      </form>
    </Overlay>
  );
}
