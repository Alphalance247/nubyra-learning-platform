"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProfilePhotoCard from "./profilePhotoUploader";
import ProfileForm from "./profileForm";
import ChangePasswordForm from "./changePasswordForm";
import Button from "../common/buttons";
import Alert from "../common/alert";

export default function EditProfileSection() {
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
  const router = useRouter();

  const [image, setImage] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [formData, setFormData] = useState({
    firstName: "John",
    middleName: "Adeyemo",
    lastName: "Doe",
    email: "johndoe@gmail.com",
  });

  const [showAlert, setShowAlert] = useState(false);

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  const handleSubmitAll = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form Data:", formData);
    console.log("Phone:", phone);
    console.log("Image:", image);

    setShowAlert(true);

    router.push("/dashboard/edit-profile");
  };

  return (
    <div
      className={`relative mx-auto mt-10 p-6 bg-[#FEFEFD] items-center ${
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
        <form onSubmit={handleSubmitAll} className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1 flex flex-col items-center">
              <ProfilePhotoCard image={image} setImage={setImage} />
            </div>
            <div className="flex-1">
              <ProfileForm
                formData={formData}
                setFormData={setFormData}
                phone={phone}
                setPhone={setPhone}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="primary" className="max-w-[299px]">
              Save All Changes
            </Button>
          </div>
        </form>
      ) : (
        <ChangePasswordForm />
      )}
    </div>
  );
}
