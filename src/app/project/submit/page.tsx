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
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const today = new Date();
  const fullDate =
    today.getUTCFullYear() +
    "-" +
    String(today.getUTCMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getUTCDate()).padStart(2, "0");

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
    submissionData.append("first_name", formData.first_name);
    submissionData.append("middle_name", formData.middle_name);
    submissionData.append("last_name", formData.last_name);
    submissionData.append("email", formData.email);
    submissionData.append("company_university", formData.company_university);
    submissionData.append("phone_number", phone);
    submissionData.append("zip_number", ""); // optional
    submissionData.append(
      "professional_academic_field",
      formData.professional_academic_field
    );
    submissionData.append("address", formData.address);
    submissionData.append("country", location.country);
    submissionData.append("project_type", formData.project_type);
    submissionData.append("project_title", formData.project_title);
    submissionData.append("comment", formData.comment || "");
    submissionData.append("date_submitted", fullDate);

    if (formData.project_file) {
      submissionData.append("project_file", formData.project_file);
    }

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
      if (axiosErr.response?.data?.detail) {
        toast.error(axiosErr.response.data.detail);
      } else {
        toast.error("Something went wrong while submitting your project.");
      }
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <section className="bg-[#FEFEFD] w-full overflow-x-hidden px-0 md:py-8 md:px-4 lg:px-8">
          <Container>
            <div className="flex flex-col gap-4 sm:gap-6">
              <NavigateArrow
                className="flex items-center gap-2 w-max"
                icon={<ArrowLeft size={16} />}
                label={<span className="text-sm font-medium">Back</span>}
              />

              <Breadcrumb
                previousStep="Home"
                currentStep="Project Request Submission"
              />
            </div>
            <div className="w-full mx-auto flex flex-col gap-8">
              <div className="w-full mx-auto gap-8">
                <div className="relative max-w-[1200px] w-full mx-auto gap-8">
                  <SectionHeader
                    title="Project Request Submission"
                    subtitle="Please fill out the form below to submit your project request"
                    className="mb-0"
                  />
                  <div className="w-full max-w-3xl mx-auto gap-6 rounded-[12px] border border-[#D6C8BA] p-4 sm:p-6 bg-[#FBFAF9] flex flex-col">
                    <form
                      onSubmit={handleSubmit}
                      className="w-full flex flex-col gap-4"
                    >
                      {/* First + Last Name */}
                      <div className="flex flex-col sm:flex-row gap-3 w-full">
                        <InputField
                          label="First Name"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          required
                          placeholder="Enter first name"
                          className="w-full"
                        />
                        <InputField
                          label="Last Name"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          required
                          placeholder="Enter last name"
                          className="w-full"
                        />
                      </div>

                      {/* Email + Phone */}
                      <div className="flex flex-col sm:flex-row gap-3 w-full">
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

                      {/* Company/University */}
                      <div className="w-full">
                        <InputField
                          label="Company/University"
                          name="company_university"
                          value={formData.company_university}
                          onChange={handleChange}
                          required
                          placeholder="Enter name"
                          className="w-full"
                        />
                      </div>

                      {/* Project Nature  + Engineering Field*/}
                      <div className="flex flex-col sm:flex-row gap-3 w-full">
                        <SelectField
                          label="Project Nature"
                          name="project_type"
                          value={formData.project_type}
                          onChange={handleChange}
                          required
                          options={[
                            { label: "Select", value: "" },
                            { label: "Full Execution", value: "full" },
                            {
                              label: "Project Assistance",
                              value: "assistance",
                            },
                          ]}
                          className="w-full"
                        />

                        <InputField
                          label="Engineering Field"
                          name="professional_academic_field"
                          value={formData.professional_academic_field}
                          onChange={handleChange}
                          required
                          placeholder="Enter engineering field"
                          className="w-full"
                        />
                      </div>

                      {/* Address */}
                      <div className="w-full">
                        <InputField
                          label="Address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          placeholder="Enter address"
                          className="w-full"
                        />
                      </div>

                      {/* Country + State */}
                      <CountryStateSelect
                        value={location}
                        onChange={setLocation}
                      />

                      {/* Project Title */}
                      <div className="w-full">
                        <InputField
                          label="Project Title"
                          name="project_title"
                          value={formData.project_title}
                          onChange={handleChange}
                          required
                          placeholder="Enter project title"
                          className="w-full"
                        />
                      </div>
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
                        className="w-full"
                        required
                        onChange={(file) =>
                          setFormData({ ...formData, project_file: file })
                        }
                      />

                      {/* Project Description */}
                      <div className="w-full">
                        <TextArea
                          label="Project Description"
                          name="comment"
                          value={formData.comment}
                          onChange={handleChange}
                          placeholder="Describe your project"
                          className="w-full min-h-[120px]"
                        />
                      </div>

                      {/* Terms & Conditions */}
                      <div className="w-full text-[#413B35]">
                        <h3 className="text-[#0F0918] p-3 font-[Montserrat] font-bold text-lg sm:text-xl capitalize">
                          Term and Condition
                        </h3>

                        <div className="flex flex-col sm:flex-row sm:items-center text-sm sm:text-base">
                          <h4 className="text-[#0F0918] px-3 pb-2 font-[Montserrat] font-semibold capitalize">
                            Effective Date:{" "}
                            <span className="font-normal">2025-09-18</span>
                          </h4>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center text-sm sm:text-base">
                          <h4 className="text-[#0F0918] px-3 pb-4 font-[Montserrat] font-semibold capitalize">
                            Company Name:{" "}
                            <span className="font-normal">Nubyira LTD</span>
                          </h4>
                        </div>

                        <ul className="pl-5 font-[Inter] text-sm sm:text-base flex flex-col gap-2">
                          {termsAndConditions.map((term, i) => (
                            <li key={term.id} className="mb-3">
                              <strong>
                                {i + 1}. {term.title}
                              </strong>
                              <ul className="pl-5 mt-2 space-y-1">
                                {term.clauses.map((clause, j) => (
                                  <li key={`${term.id}-${j}`}>
                                    {i + 1}.{j + 1} {clause}
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ))}

                          <div className="my-5 text-[#7B4C1F] flex items-center">
                            <input
                              type="checkbox"
                              checked={acceptedTerms}
                              onChange={(e) =>
                                setAcceptedTerms(e.target.checked)
                              }
                            />
                            <span className="pl-2">
                              I agree to the terms and conditions.
                            </span>
                          </div>
                        </ul>
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
    </ProtectedRoute>
  );
};

export default ContactForm;
