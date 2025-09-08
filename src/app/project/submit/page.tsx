"use client";
import React, { useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
import CountryStateSelect from "@/app/components/project/countryState";
import axiosInstance from "@/app/utils/axios";
import ProtectedRoute from "@/app/components/common/protectedRoute";

const ContactForm: React.FC = () => {
  const [location, setLocation] = useState({ country: "", state: "" });
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    company_university: "",
    project_type: "",
    address: "",
    project_title: "",
    professional_academic_field: "",
    comment: "",
    project_file: null as File | null,
  });
  const [showOverlay, setShowOverlay] = useState(false);
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const today = new Date();
  const fullDate =
    today.getUTCFullYear() +
    "-" +
    String(today.getUTCMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getUTCDate()).padStart(2, "0");

  const termsAndConditions = [
    {
      id: 1,
      title: "Project Integrity and Original Work",
      clauses: [
        "The Company guarantees that all deliverables will be the original work of its internal team and not outsourced to third parties unless previously and explicitly approved in writing by the Client.",
        "Projects submitted to the Client will be developed with professional integrity and a commitment to quality.",
        "If any third-party resources are used (e.g., stock images, open-source libraries), they will be properly licensed and disclosed.",
      ],
    },
    {
      id: 2,
      title: "Project Privacy and Confidentiality",
      clauses: [
        "All project briefs, communications, assets, and related information shared by the Client are treated as strictly confidential.",
        "The Company agrees not to disclose, share, or use any client information outside the scope of the project without written consent.",
        "Similarly, the Client agrees not to share confidential materials, strategies, or proprietary methods used by the Company without prior authorization.",
      ],
    },
    {
      id: 3,
      title: "Ownership of Deliverables",
      clauses: [
        "Upon full payment, all final deliverables submitted to the Client become the sole property of the Client.",
        "Until full payment is received, all submitted work remains the intellectual property of the Company.",
        "The Company reserves the right to retain copies of work for references, portfolio and marketing purposes unless a non-disclosure agreement (NDA) prohibits it.",
      ],
    },
    {
      id: 4,
      title: "Prohibition of Third-Party Submissions by Clients",
      clauses: [
        "The Client must submit original project briefs and materials.",
        "Submissions made on behalf of third parties without disclosure or authorization are prohibited.",
        "The Company reserves the right to decline or cancel projects that are misrepresented or submitted under false pretenses.",
      ],
    },
    {
      id: 5,
      title: "Abandoned Project Policy",
      clauses: [
        "A project is considered abandoned if the Client becomes unresponsive for 20 consecutive business days after a milestone or feedback request.",
        "In such cases: The project may be placed on hold or terminated at the Company’s discretion. Any prior payments will be retained as compensation for work completed. Reactivation may incur additional fees or require a new agreement.",
      ],
    },
    {
      id: 6,
      title: "Submission Review and Rejection",
      clauses: [
        "Clients are encouraged to review all submissions promptly and provide clear feedback.",
        "If the Client fails to approve or request changes within 7 days of delivery, the submission will be considered accepted.",
        "The Company reserves the right to reject revision requests that fall outside the original project scope or are based on speculative or previously unapproved changes.",
      ],
    },
    {
      id: 7,
      title: "Limitation of Liability",
      clauses: [
        "The Company is not responsible for any indirect, incidental, or consequential damages arising from the use of deliverables.",
        "Responsibility for proper use, licensing, and distribution of final materials lies solely with the Client after delivery.",
      ],
    },
    {
      id: 8,
      title: "Amendments and Updates",
      clauses: [
        "These Terms may be updated from time to time.",
        "Clients will be notified of any material changes, and continued engagement implies acceptance of the revised Terms.",
      ],
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;
    if (
      target instanceof HTMLInputElement &&
      target.type === "file" &&
      target.files
    ) {
      setFormData({ ...formData, [target.name]: target.files[0] });
    } else {
      setFormData({ ...formData, [target.name]: target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      toast.error(
        "You must accept the terms and conditions before submitting."
      );
      return;
    }

    const submissionData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) submissionData.append(key, value as string | Blob);
    });
    submissionData.append("phone_number", phone);
    submissionData.append("country", location.country);
    submissionData.append("date_submitted", fullDate);

    try {
      const response = await axiosInstance.post(
        "/project/submit/",
        submissionData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(
        response.data?.message || "Project submitted successfully!"
      );
      setShowOverlay(true);
    } catch (err: unknown) {
      const axiosErr = err as AxiosError<{ detail?: string }>;
      toast.error(
        axiosErr.response?.data?.detail ||
          "Something went wrong while submitting your project."
      );
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <section className="bg-[#FEFEFD] w-full overflow-x-hidden py-8 px-4 sm:px-6 lg:px-8">
          <Container>
            <div className="flex flex-col gap-4 sm:gap-6">
              <NavigateArrow
                className="flex items-center gap-2 w-max"
                icon={<ArrowLeft size={16} />}
                label={<span className="text-sm font-medium">Back</span>}
              />
              <Breadcrumb
                previousStep="Home"
                currentStep="Project submission"
              />
            </div>

            <div className="w-full max-w-screen-xl mx-auto flex flex-col gap-8 mt-6">
              <SectionHeader
                title="Submit Project"
                subtitle="Please fill out the form below to submit your project"
                className="mb-4"
              />

              <div className="w-full max-w-3xl mx-auto p-6 bg-[#FBFAF9] border border-[#D6C8BA] rounded-lg flex flex-col gap-6">
                <form
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col gap-4"
                >
                  {/* Name Fields */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <InputField
                      label="First Name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      placeholder="Enter first name"
                      className="flex-1"
                    />
                    <InputField
                      label="Last Name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                      placeholder="Enter last name"
                      className="flex-1"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <InputField
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter email"
                      className="flex-1"
                    />
                    <PhoneInput
                      value={phone}
                      onChange={setPhone}
                      className="flex-1"
                    />
                  </div>

                  {/* Company/University */}
                  <InputField
                    label="Company/University"
                    name="company_university"
                    value={formData.company_university}
                    onChange={handleChange}
                    required
                    placeholder="Enter name"
                  />

                  {/* Project Type */}
                  <SelectField
                    label="Project Nature"
                    name="project_type"
                    value={formData.project_type}
                    onChange={handleChange}
                    required
                    options={[
                      { label: "Select", value: "" },
                      { label: "Full Execution", value: "full" },
                      { label: "Project Assistance", value: "assistance" },
                    ]}
                  />

                  {/* Address */}
                  <InputField
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Enter address"
                  />

                  {/* Country/State */}
                  <CountryStateSelect value={location} onChange={setLocation} />

                  {/* Engineering Field & Project Title */}
                  <InputField
                    label="Engineering Field"
                    name="professional_academic_field"
                    value={formData.professional_academic_field}
                    onChange={handleChange}
                    required
                    placeholder="Enter engineering field"
                  />
                  <InputField
                    label="Project Title"
                    name="project_title"
                    value={formData.project_title}
                    onChange={handleChange}
                    required
                    placeholder="Enter project title"
                  />

                  {/* File Upload */}
                  <FileUpload
                    label="Project Document"
                    name="file"
                    required
                    onChange={(file) =>
                      setFormData({ ...formData, project_file: file })
                    }
                  />

                  {/* Project Description */}
                  <TextArea
                    label="Project Description"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder="Describe your project"
                  />

                  {/* Terms & Conditions */}
                  <div className="text-[#413B35]">
                    <h3 className="text-[#0F0918] font-bold text-lg sm:text-xl mb-2">
                      Terms and Conditions
                    </h3>
                    <div className="overflow-y-auto max-h-64 p-2 border rounded-md mb-3">
                      <ul className="pl-2 space-y-2 text-sm sm:text-base">
                        {termsAndConditions.map((term, i) => (
                          <li key={term.id}>
                            <strong>
                              {i + 1}. {term.title}
                            </strong>
                            <ul className="pl-4 mt-1 space-y-1 list-disc">
                              {term.clauses.map((clause, j) => (
                                <li key={`${term.id}-${j}`}>{clause}</li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                      />
                      <span className="text-sm sm:text-base">
                        I agree to the terms and conditions.
                      </span>
                    </label>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full mt-4"
                  >
                    Submit Project
                  </Button>
                </form>

                {/* Success Overlay */}
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
          </Container>
        </section>
      </Layout>
    </ProtectedRoute>
  );
};

export default ContactForm;
