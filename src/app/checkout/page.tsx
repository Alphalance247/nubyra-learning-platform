"use client";
import NavigateArrow from "../components/common/navigate";
import Breadcrumb from "../components/checkout/Breadcrumb";
import CoursePreview from "../components/checkout/CoursePreview";
import CourseInfoCard from "../components/checkout/CourseInfoCard";
import PaymentMethodSelector from "../components/checkout/PaymentMethod";
import Layout from "../components/common/layout";
import Container from "../components/common/container";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import ProtectedRoute from "../components/common/protectedRoute";

// Define the course data interface
interface CourseData {
  title: string;
  price: number;
  duration: string;
  venue: string;
}

export default function CheckoutPage() {
  // Create state to store the course data
  const [courseData, setCourseData] = useState<CourseData>({
    title: "Apen Plus Basic Course Webinar",
    price: 50,
    duration: "5 Days",
    venue: "Online Class",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTitle = localStorage.getItem("courseTitle");
      const storedPrice = localStorage.getItem("coursePrice");
      const storedDuration = localStorage.getItem("courseDuration");

      // Update the state with stored values if they exist
      if (storedTitle || storedPrice || storedDuration) {
        setCourseData({
          title: storedTitle || courseData.title,
          price: storedPrice ? parseInt(storedPrice, 10) : courseData.price,
          duration: `${storedDuration} days` || courseData.duration,
          venue: "Online Class",
        });
      }
    }
  }, [courseData?.duration, courseData.price, courseData.title]);

  return (
    <ProtectedRoute>
      <Layout>
        <div className="bg-[#FEFEFD] pb-6">
          <Container>
            <div className=" bg-[#FEFEFD] max-w-full md:max-w-[1200px] w-full mx-auto gap-8 px-4 py-6 space-y-6">
              {/* Back navigation */}
              <NavigateArrow
                icon={<ArrowLeft size={16} />}
                label={<span className="text-sm font-medium">Back</span>}
              />

              {/* Breadcrumb trail */}
              <Breadcrumb
                previousStep="Aspen plus basic webinar course"
                currentStep="Enrollment Checkout"
              />

              {/* Page heading */}
              <h1 className="text-3xl md:text-[44px] text-[#120A02] font-bold px-2 py-4">
                Checkout
              </h1>

              {/* Two-column layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column: Preview + course info */}
                <div className="space-y-4">
                  <CoursePreview />
                  <CourseInfoCard course={courseData} />
                </div>

                {/* Right column: Payment options */}
                <PaymentMethodSelector />
              </div>
            </div>
          </Container>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
