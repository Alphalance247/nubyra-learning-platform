"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ProfilePhotoCard from "./profilePhotoUploader";
import ProfileForm from "./profileForm";
import ChangePasswordForm from "./changePasswordForm";
import { useAuthStore } from "@/stores/dashboard/profileData";
import Button from "../common/buttons";
import Alert from "../common/alert";
import axiosInstance from "@/app/utils/axios";
import { environment } from "@/app/env/env.local";


interface UserData {
  primary_info: {
    first_name: string;
    last_name: string;
    middle_name: string;
    email: string;
    phone?: string;
    image?: string;
  };
}

export default function EditProfileSection() {
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [formData, setFormData] = useState({
    firstName: userData?.primary_info?.first_name ?? "",
    middleName: userData?.primary_info?.middle_name ?? "",
    lastName: userData?.primary_info?.last_name ?? "",
    email: userData?.primary_info?.email ?? "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/dashboard/");
        setUserData(response.data);
      } catch (err: unknown) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
  if (userData?.primary_info) {
    setFormData({
      firstName: userData.primary_info.first_name ?? "",
      middleName: userData.primary_info.middle_name ?? "",
      lastName: userData.primary_info.last_name ?? "",
      email: userData.primary_info.email ?? "",
    });
    setPhone(userData.primary_info.phone ?? "");
  }
}, [userData]);


  const { updateUserData } = useAuthStore(); 
  const handleSubmitAll = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  const formDataToSend = new FormData();
  formDataToSend.append("first_name", formData.firstName);
  formDataToSend.append("middle_name", formData.middleName);
  formDataToSend.append("last_name", formData.lastName);
  formDataToSend.append("phone_number", phone);
  formDataToSend.append("email", formData.email);

  if (imageFile) {
    formDataToSend.append("image", imageFile);
    setLoading(false);
  }

  try {
    await updateUserData(formDataToSend);
    toast.success('Your profile has been updated successfully!');
    setShowAlert(true);
    
    router.push("/dashboard/");
  } catch (error) {
    console.error("Update failed", error);
    toast.error('An unexpected error occurred')
  }
};

  

  return (
    <div
      className={`relative mx-auto mt-10 bg-[#FEFEFD] items-center ${
        activeTab === "password" ? "max-w-[615px]" : "max-w-[996px]"
      }`}
    >
      <Alert
        message="Your profile has been updated successfully!"
        variant="success"
        show={showAlert}
        onClose={() => setShowAlert(false)}
        autoDismiss={3000}
      />

      <div className="w-full flex flex-col gap-3 items-center">
        <div className="w-full mb-3 border-b-2 border-[#E4E7EC]">
          <div className="flex justify-center">
            <h1 className="font-[Montserrat] text-2xl text-[#5F5F5F] font-bold text-center mb-2 leading-[38px] capitalize">
              Edit Profile
            </h1>
          </div>
        </div>

        <div className="w-full border-b-2 border-[#E4E7EC] mb-3 flex justify-center">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2 ${
                activeTab === "profile"
                  ? "border-b-2 border-[#7B4C1F] text-[#7B4C1F]"
                  : "text-[#413B35]"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("password")}
              className={`px-4 py-2 ${
                activeTab === "password"
                  ? "border-b-2 border-[#7B4C1F] text-[#7B4C1F]"
                  : "text-[#413B35]"
              }`}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* MAIN FORM */}
      {activeTab === "profile" ? (
        <form onSubmit={handleSubmitAll} >
          <div className="w-full flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex-1 flex flex-col items-center">
                <ProfilePhotoCard
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                  setImageFile={setImageFile}
                  defaultImage={
                    userData?.primary_info?.image ? 
                    `${environment.imageUrl}${userData.primary_info.image}`   
                    : "/assets/dashboard/icon.png"
                    }
                  />
              </div>
              <div className="flex-1">
                <ProfileForm
                  formData={formData}
                  setFormData={setFormData}
                  phone= {phone}
                  setPhone={setPhone}
                />
              </div>
            </div>
          </div>

          <div className="flex mt-6 mb-10 sm:justify-center md:justify-end">
            {/* <Button type="submit" variant="primary" className="max-w-[299px]">
              Save All Changes
            </Button> */}
            <Button type="submit" variant="primary" className="w-full md:w-[299px]" disabled={loading}>
            {loading ? 'Saving...' : 'Save All Changes'}
          </Button>
          </div>
        </form>
      ) : (
        <ChangePasswordForm />
      )}
    </div>
  );
}
