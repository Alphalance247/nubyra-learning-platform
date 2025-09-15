"use client";
import NavigateArrow from "../../components/common/navigate";
import Breadcrumb from "../../components/checkout/Breadcrumb";
// import CoursePreview from "../components/checkout/CoursePreview";
import Layout from "../../components/common/layout";
import Container from "../../components/common/container";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import ProtectedRoute from "../../components/common/protectedRoute";
import { getSubsriptionPriceListStore } from "@/stores/courses/getSubcriptionPrice";
import PremiumCourseInfo from "@/app/components/premium-checkout/premiumCourseInfo";
import PaymentMethodPremium from "@/app/components/premium-checkout/paymentSeletor";

// Define the course data interface
interface CourseData {
  title: string;
  price: string;
  duration: string;
  venue: string;
}

export default function CheckoutPage() {
  const [courseData, setCourseData] = useState<CourseData>({
    title: "Apen Plus Basic Course Webinar",
    price: "50",
    duration: "5 Days",
    venue: "Online Class",
  });

  const { fetchSubscribePrice } = getSubsriptionPriceListStore();

  useEffect(() => {
    fetchSubscribePrice();
  }, [fetchSubscribePrice]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTitle = localStorage.getItem("courseTitle");
      const storedPrice = localStorage.getItem("coursePrice");
      const storedDuration = localStorage.getItem("courseDuration");

      // Update the state with stored values if they exist
      if (storedTitle || storedDuration || storedPrice) {
        setCourseData({
          title: storedTitle || courseData.title,
          price: storedPrice?.toString() || courseData.price,
          duration: `${storedDuration} days` || courseData.duration,
          venue: "Online Class",
        });
      }
    }
  }, [courseData?.duration, courseData.title, courseData?.price]);

  return (
    <ProtectedRoute>
      <Layout>
        <div className="bg-[#FEFEFD] pb-6">
          <Container>
            <div className=" bg-[#FEFEFD] max-w-full md:max-w-[1200px] w-full mx-auto gap-8 lg:px-4 py-6 space-y-6">
              <NavigateArrow
                icon={<ArrowLeft size={16} />}
                label={<span className="text-sm font-medium">Back</span>}
              />
              <Breadcrumb
                previousStep="Dashboard"
                currentStep="Premium Subscription"
              />
              <h1 className="lg:text-3xl text-2xl text-left lg:text-center text-[#5F5F5F] font-bold px-2 py-4">
                Premium Subscription
              </h1>
              <div className="grid grid-cols-1  gap-6">
                <div className="space-y-4">
                  <PremiumCourseInfo />
                </div>
                <PaymentMethodPremium />
              </div>
            </div>
          </Container>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
