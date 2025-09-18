"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../common/buttons";
import { useEffect } from "react";
import { getSubscriotionStatusStore } from "@/stores/courses/getSubscribeStatus";
import { MdVerifiedUser } from "react-icons/md";

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
    router.push("/dashboard/edit-profile");
  };

  const { data, fetchSubscriptionStatus } = getSubscriotionStatusStore();

  useEffect(() => {
    fetchSubscriptionStatus();
  }, [fetchSubscriptionStatus]);

  const handleChangePassword = () => {
    router.push("/dashboard/edit-profile");
  };

  return (
    <div
      className="relative w-full h-auto md:h-auto rounded-lg overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/dashboard/banner.png')" }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex flex-col md:flex-col justify-between items-center md:items-center p-4 md:p-8 h-full gap-4 md:gap- lg:flex-row">
        {/* Profile Info */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
          <div className="relative w-[80px] h-[80px] md:w-[137px] md:h-[137px]">
            <Image
              src={avatarUrl}
              alt="Profile Picture"
              fill
              className="rounded-full border-2 border-white bg-white object-cover"
            />
            {/* <span className="absolute bottom-0 right-0 w-[18px] h-[18px] md:w-[34px] md:h-[34px] lg:w-[40px] lg:h-[40px] bg-green-500 border-2 border-white rounded-full" /> */}
          </div>
          <div className="text-white text-center md:text-left flex flex-col gap-2 md:gap-6">
            <p
              className={`text-lg md:text-[30px] font-Montserrat font-bold capitalize    ${
                data?.sub_status && "flex gap-x-2 items-center"
              }`}
            >
              {fullName}{" "}
              {data?.sub_status && <MdVerifiedUser size={25} fill="#D6C8BA" />}
            </p>
            <p className="text-sm md:text-[18px] font-inter">{email}</p>
            {data?.sub_status && (
              <div>
                <button className="border border-[#D6C8BA] w-fit text-base px-3 py-2 rounded-[20px] text-[white] bg-transparent flex gap-x-2 items-center hover:opacity-[0.8] hover:transition-all hover:duration-500">
                  <MdVerifiedUser size={16} fill="#D6C8BA" />
                  Premium
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto mt-4 md:mt-0 lg:flex-row">
          <Button
            onClick={handleEditProfile}
            variant="primary"
            className="w-full md:w-[200px] h-[48px] md:h-[56px] text-center"
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
