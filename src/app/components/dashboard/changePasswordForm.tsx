'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import Button from '../common/buttons';
import InputField from '../project/InputField';
import axiosInstance from '@/app/utils/axios';
import toast from "react-hot-toast";
import { AxiosError } from 'axios';

export default function ChangePasswordForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New password and confirmation do not match.');
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.post('/update-password/', {
        old_password: formData.currentPassword,
        new_password: formData.newPassword,
      });

      if (res.status === 200) {
        toast.success('Password updated successfully.');
        router.push('/sign-in');
      } else {
        toast.error('Something went wrong while updating the password.');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.detail || err.message || 'Request failed');
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow flex flex-col gap-5 w-full max-w-xl"
      >
        <InputField
          label="Current Password"
          name="currentPassword"
          placeholder="Enter current password"
          value={formData.currentPassword}
          onChange={handleChange}
          required
          isPassword
          className="w-full"
        />
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

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <div className="flex justify-end">
          <Button type="submit" variant="primary" className="max-w-[299px]" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
