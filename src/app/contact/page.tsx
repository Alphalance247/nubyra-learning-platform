"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import InputField from "@/app/components/project/InputField";
import SelectField from "@/app/components/project/SelectField";
import TextArea from "@/app/components/project/TextArea";
import FileUpload from "@/app/components/project/FileUpload";
import Button from "@/app/components/common/buttons";
import Layout from "@/app/components/common/layout";
import Container from "@/app/components/common/container";
import NavigateArrow from "@/app/components/common/navigate";
import { ArrowLeft } from "lucide-react";
import Breadcrumb from "@/app/components/checkout/Breadcrumb";
import SectionHeader from "@/app/components/common/sectionHeader";
import SuccessOverlay from "@/app/components/checkout/SuccessOverlay";
import PhoneInput from "@/app/components/project/phoneNumber";
import CountryStateSelect from "../components/project/countryState";

const ContactForm: React.FC = () => {
  const [location, setLocation] = useState({ country: '', state: '' });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    // state: "",
    // country: "",
    academicField: "",
    messageDetail: "",
    file: null as File | null,
  });
  const [showOverlay, setShowOverlay] = useState(false);
  const [phone, setPhone] = useState("");
  const router = useRouter();


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
  
    if (target instanceof HTMLInputElement && target.type === 'file' && target.files) {
      setFormData({ ...formData, [target.name]: target.files[0] });
    } else {
      setFormData({ ...formData, [target.name]: target.value });
    }
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowOverlay(true);
    console.log(formData);
  };

  return (
    <Layout>
      <section className="bg-[#FEFEFD] w-full overflow-x-hidden">
        <Container>
          <div className="flex flex-col gap-8">
            <NavigateArrow
              className="w-[74px] h-[32px] flex gap-2"
              icon={<ArrowLeft size={16} />}
              label={<span className="text-sm font-medium">Back</span>}
            />

            <Breadcrumb previousStep="Home" currentStep="contact us" />
          </div>
          <div className="w-full max-w-screen-xl mx-auto px-4 py-8 flex flex-col gap-8">
            <div className="w-full max-w-3xl mx-auto gap-8">
              <div className="relative max-w-[1200px] w-full mx-auto gap-8 pt-[20px] px-[24px]">
                <SectionHeader
                  title="Contact Us"
                  subtitle="Please fill out the form below to submit your message"
                  className="mb-4"
                />
                <div className="w-full max-w-3xl mx-auto gap-6 rounded-[12px] border border-[#D6C8BA] p-6 bg-[#FBFAF9] flex flex-col">
                  <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col gap-4"
                  >
                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[648px] h-[82px]">
                      <InputField
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="Enter first name"
                        className="w-full"
                      />
                      <InputField
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Enter last name"
                        className="w-full"
                      />
                    </div>

                    <div className="w-full max-w-[648px] h-[82px] flex gap-3">
                      <InputField
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter email"
                        className="w-full"
                      />
                      <PhoneInput
                        value={phone}
                        onChange={setPhone}
                        className="w-full"
                      />
                    </div>

                    {/* <div className="w-[648px] h-[82px] flex gap-2">
                      <InputField
                        label="Company/University"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required={true}
                        placeholder="Enter name"
                        className="w-[648px]"
                      />
                    </div>

                    <div className="w-[648px] h-[82px] flex gap-2">
                      <InputField
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required={true}
                        placeholder="Enter address"
                        className="w-[648px]"
                      />
                    </div> */}

                    {/* <div className="w-[648px] h-[82px] flex gap-3">
                      <SelectField
                        label="Country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required={true}
                        options={[
                          { label: "Select", value: "" },
                          { label: "Nigeria", value: "NG" },
                          { label: "Canada", value: "CA" },
                        ]}
                      />
                      <SelectField
                        label="State"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required={true}
                        options={[
                          { label: "Select", value: "" },
                          { label: "Osun", value: "OS" },
                          { label: "Texas", value: "TX" },
                        ]}
                      />
                    </div> */}
                    <CountryStateSelect value={location} onChange={setLocation} />

                    {/* <FileUpload
                      label="Project Document"
                      name="file"
                      className="w-[648px]"
                      required={true}
                      onChange={(file) => setFormData({ ...formData, file })}
                    /> */}

                    <div className="w-full">
                      <TextArea
                        label="Message"
                        name="messageDetail"
                        value={formData.messageDetail}
                        onChange={handleChange}
                        placeholder="Enter your message"
                        className="w-[646px] h-[150px]"
                      />
                    </div>

                    {/* <Button onClick={() => setShowOverlay(true)}
                type="submit"
                variant="primary"
                className='w-full mt-4 h-[56px] flex items-center justify-center gap-1.5 rounded-[16px] border border-[#A78769] pt-4 pr-8 pb-4 pl-8 bg-[#95704C] transition-opacity duration-300 ease-out'>
                    Submit Project
                </Button> */}
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full mt-4"
                    >
                      Submit
                    </Button>
                  </form>
                  {showOverlay && (
                    <SuccessOverlay
                      onClose={() => setShowOverlay(false)}
                      heading="Project Submitted Successfully!"
                      description="Thank you for reaching out! Our team will review your project details and contact you within 24 hours."
                      primaryButtonText="Go To HomePage"
                      secondaryButtonText="Submit another project"
                      onPrimaryClick={() => router.push("/")}
                      onSecondaryClick={() => setShowOverlay(false)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default ContactForm;
