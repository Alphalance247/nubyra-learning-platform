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
    <div className="relative w-full h-auto md:h-[217px] rounded-lg overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/dashboard/banner.png')" }}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center md:items-start p-6 md:px-6 md:py-10 h-full gap-4">
        {/* Profile Info */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
          <div className="relative w-[80px] h-[80px] md:w-[137px] md:h-[137px]">
            <Image
              src={avatarUrl}
              alt="Profile Picture"
              layout="fill"
              objectFit="cover"
              className="rounded-full border-[2px] border-white bg-white text-black"
            />
            <span className="w-[18px] h-[18px] md:w-[34.5px] md:h-[34.5px] absolute bottom-0 right-0 md:bottom-1 md:right-0 bg-green-500 border-2 border-white rounded-full" />
          </div>
          <div className="text-white text-center md:text-left flex flex-col gap-2 md:gap-6">
            <p className="text-lg md:text-[30px] font-Montserrat font-bold capitalize">{fullName}</p>
            <p className="text-sm md:text-[18px] font-inter">{email}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto mt-4 md:mt-0">
          <Button
            onClick={handleEditProfile}
            variant="primary"
            className="w-full md:w-[148px] h-[48px] md:h-[56px] text-center"
          >
            Edit Profile
          </Button>
          <Button
            onClick={handleChangePassword}
            variant="secondary"
            className="w-full md:w-[200px] h-[48px] md:h-[56px] text-center"
          >
            Change Password
          </Button>
        </div>
      </div>
    </div>
  );
}