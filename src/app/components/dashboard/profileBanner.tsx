'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '../common/buttons';

export default function ProfileBanner({
  fullName,
  email,
  avatarUrl,
  
}: {
  fullName: string;
  email: string;
  avatarUrl: string;
}) {
  const router = useRouter();

  const handleEditProfile = () => {
    router.push('/dashboard/edit-profile');
  };

  const handleChangePassword = () => {
    router.push('/dashboard/edit-profile');
  };

  return (
    <div className="relative w-full h-[217px] gap-2 rounded-lg overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/dashboard/banner.png')" }}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex justify-between px-6 py-10 h-full">
        <div className="flex gap-6 items-center space-x-4">
          <div className="relative w-[137px] h-[137px]">
            <Image
              src={avatarUrl}
              alt="Profile Picture"
              width={137}
              height={137}
              className="w-full h-full rounded-full object-cover border-[2px] bg-white text-black border-white"
            />
            <span className="w-[34.5px] h-[34.5px] absolute bottom-1 right-0 bg-green-500 border-2 border-white rounded-full" />
          </div>
          <div className="h-[88px] text-white flex flex-col gap-6">
            <p className="text-[30px] font-Montserrat font-bold capitalize">{fullName}</p>
            <p className="text-[18px] font-inter">{email}</p>
          </div>
        </div>

        <div className="h-[58px] flex gap-2 space-x-4">
          <Button
            onClick={handleEditProfile}
            variant="primary"
            className="w-[148px] h-[56px] pt-4 pr-8"
          >
            Edit Profile
          </Button>
          <Button
            onClick={handleChangePassword}
            variant="secondary"
            className="w-[200px] h-[56px] pt-4 pr-8"
          >
            Change Password
          </Button>
        </div>
      </div>
    </div>
  );
}
