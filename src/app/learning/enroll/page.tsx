"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import InputField from "@/app/components/project/InputField";
import Button from "@/app/components/common/buttons";
import Layout from "@/app/components/common/layout";
import Container from "@/app/components/common/container";
import NavigateArrow from "@/app/components/common/navigate";
import { ArrowLeft } from "lucide-react";
import Breadcrumb from "@/app/components/checkout/Breadcrumb";
import SectionHeader from "@/app/components/common/sectionHeader";
import SuccessOverlay from "@/app/components/checkout/SuccessOverlay";
import PhoneInput from "@/app/components/project/phoneNumber";
import CountryStateSelect from "../../components/project/countryState";
import axiosInstance from "@/app/utils/axios";
import ProtectedRoute from "@/app/components/common/protectedRoute";
import { AxiosError } from "axios";

const EnrollmentForm: React.FC = () => {
  const [location, setLocation] = useState({ country: "", state: "" });
  const [loading, setLoading] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [formData, setFormData] = useState({
    // course_id: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    company_institution: "",
    phone_number: "",
    email: "",
    zip_number: "",
    professional_academic_field: "",
    address: "",
  });
  const [showOverlay, setShowOverlay] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [phone, setPhone] = useState("");
  const [courseId, setCourseId] = useState("");
  const router = useRouter();

  const termsAndConditions = [
    {
      id: 1,
      title: "Access to Course Materials",
      text: "Participants will receive access to recorded sessions for personal and future reference only. The content is intended solely for private individual use. Copying, recording, reproduction, distribution, resale, public display, or commercial use of the recordings is strictly prohibited without written permission.",
    },
    {
      id: 2,
      title: "Intellectual Property",
      text: "All course content, including videos, slides, handouts, and supporting materials, remains the intellectual property of the company or its licensors. Nothing in these terms grants you any rights to use the content except for personal, and non-commercial purposes.",
    },
    {
      id: 3,
      title: "Internet Connectivity and Technical Requirements",
      text: "Participants must ensure they have access to a stable internet connection and compatible device (PC/laptop/tablet) with necessary software (e.g. Google Meet, Zoom, Microsoft Team, Team Viewer, Anydesk). Participants must also ensure they have a quiet, and distraction-free environment suitable for learning while attending the course. The company will not be held liable for any disruptions or missed sessions caused by the participant’s failure to meet these conditions, and no compensation will be provided.",
    },
    {
      id: 4,
      title: "Cancellation and Refund Policy",
      text: "Before Course Commencement: Full refunds are available for cancellations made prior to the start of the course. After Course Commencement: Participants who cancel after the course has started may receive a 70% refund. A 30% cancellation fee will be retained. Non-attendance: No refunds will be issued for failure to attend without prior notice.",
    },
    {
      id: 5,
      title: "Course Cancellation by the Company",
      text: "In the event that a course is canceled by the company for any reason, participants will have the option to receive: A full refund of all fees paid, or a credit toward a future course (valid for 3 months from the original registration date).",
    },
    {
      id: 6,
      title: "Course Validity and Expiry",
      text: "Course sessions must be completed within one (1) month of registration. Failure to participate within this period will result in forfeiture of the course fee. No extensions will be granted unless under exceptional, pre-approved circumstances.",
    },
    {
      id: 7,
      title: "Pricing and Payment",
      text: "Course fees are subject to change at any time without prior notice. It is the participant’s responsibility to retain proof of payment (including transaction ID and receipt). The company is not liable for disputes arising from undocumented transactions.",
    },
    {
      id: 8,
      title: "Code of Conduct",
      text: "Participants are expected to maintain respectful and professional behavior throughout the course. Disruptive behavior, harassment, abuse, or inappropriate conduct toward instructors or other participants may result in immediate removal from the course without refund.",
    },
    {
      id: 9,
      title: "Privacy and Data Protection",
      text: "By registering, you consent to the collection and use of your personal data for course administration, communication, and support. We are committed to protecting your privacy and will not share your information with third parties without your consent, except as required by law.",
    },
    {
      id: 10,
      title: "Certification",
      text: "Certificates of completion will be issued only to participants who complete the course in full and meet all assessment or attendance requirements specified during registration.",
    },
    {
      id: 11,
      title: "Amendments to Terms",
      text: "We reserve the right to update or modify these terms at any time without prior notice. Continued participation in the course after such changes will constitute your acceptance of the revised terms.",
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTitle = localStorage.getItem("courseTitle");
      const storedId = localStorage.getItem("courseId");

      if (storedTitle && storedId) {
        setCourseTitle(storedTitle);
        setCourseId(storedId);
      }
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
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
        "You must agree to the terms and conditions before proceeding."
      );
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      // data.append("course_id", course.id) send course id from props
      data.append("first_name", formData.first_name);
      data.append("middle_name", formData.middle_name);
      data.append("last_name", formData.last_name);
      data.append("company_institution", formData.company_institution);
      data.append("phone_number", phone);
      data.append("email", formData.email);
      data.append("zip_number", formData.zip_number);
      data.append(
        "professional_academic_field",
        formData.professional_academic_field
      );
      data.append("address", formData.address);
      data.append("country", location.country);
      data?.append("course_id", courseId);

      const response = await axiosInstance.post("/course-register/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response?.status === 201 || response?.status === 200) {
        toast.success(
          response.data?.message || "Enrollment submitted successfully!"
        );
        router.push("/checkout");
      }
      setLoading(false);

      // reset state etc...
      setAcceptedTerms(false);
    } catch (err) {
      // Extract the error message from the response
      let errorMessage = "An error occurred please try again or contact Admin";
      if (err instanceof AxiosError) {
        // Check if err is an instance of AxiosError
        errorMessage = err.response?.data?.error || errorMessage;
      }
      toast.error(errorMessage);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ProtectedRoute>
      <Layout>
        <section className="bg-[#FEFEFD] w-full overflow-x-hidden">
          <Container>
            <div className="flex flex-col gap-8">
              <NavigateArrow
                className="w-[74px] h-[32px] flex gap-2"
                icon={<ArrowLeft size={16} />}
                label={<span className="text-sm font-medium">Back</span>}
              />

              <Breadcrumb
                previousStep={courseTitle || "Not Available"}
                currentStep="Enrollment Form"
              />
            </div>
            <div className="w-full max-w-screen-xl mx-auto flex flex-col gap-8">
              <div className="w-full max-w-3xl mx-auto gap-8">
                <div className="relative max-w-[1200px] w-full mx-auto gap-8">
                  <SectionHeader
                    title={courseTitle + " Registration" || "Not Available"}
                    subtitle="Please ensure that all fields in the form are completed to register for this webinar."
                    className=""
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

                      {/* Middle Name */}
                      <InputField
                        label="Middle Name"
                        name="middle_name"
                        value={formData.middle_name}
                        onChange={handleChange}
                        placeholder="Enter middle name"
                        className="w-full"
                      />

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

                      {/* Company */}
                      <InputField
                        label="Company/Institution"
                        name="company_institution"
                        value={formData.company_institution}
                        onChange={handleChange}
                        required
                        placeholder="Enter company or institution"
                        className="w-full"
                      />

                      {/* Address */}
                      <InputField
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        placeholder="Enter your address"
                        className="w-full"
                      />

                      {/* Country + State */}
                      <CountryStateSelect
                        value={location}
                        onChange={setLocation}
                      />

                      {/* Zip + Academic Field */}
                      <div className="flex flex-col sm:flex-row gap-3 w-full">
                        <InputField
                          label="Zip/Postal Code"
                          name="zip_number"
                          value={formData.zip_number}
                          onChange={handleChange}
                          required
                          placeholder="Enter zip/Postal Code"
                          className="w-full"
                        />
                        <InputField
                          label="Professional/Academic Field"
                          name="professional_academic_field"
                          value={formData.professional_academic_field}
                          onChange={handleChange}
                          required
                          placeholder="Enter professional/academic field"
                          className="w-full"
                        />
                      </div>

                      {/* Terms */}
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

                        <ul className="list-disc pl-5 font-[Inter] text-sm sm:text-base flex flex-col gap-2">
                          {termsAndConditions.map((term) => (
                            <li key={term.id}>
                              <strong>{term.title}:</strong> {term.text}
                            </li>
                          ))}

                          <div className="mr-2 my-5 text-[#7B4C1F] flex items-center">
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

                      {/* Button */}
                      <Button
                        type="submit"
                        variant="primary"
                        className="w-full mt-4"
                        disabled={loading}
                      >
                        {loading ? "Submitting..." : "Proceed to Payment"}
                      </Button>
                    </form>

                    {showOverlay && (
                      <SuccessOverlay
                        onClose={() => setShowOverlay(false)}
                        heading="Enrollment Submitted Successfully!"
                        description="Thank you enrollment! Our team will contact you within 24 hours."
                        primaryButtonText="Go To HomePage"
                        secondaryButtonText="Go To Courses"
                        onPrimaryClick={() => router.push("/")}
                        onSecondaryClick={() => router.push("/learning")}
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

export default EnrollmentForm;
