//

"use client";
import toast from "react-hot-toast";
import SuccessOverlay from "../../components/checkout/SuccessOverlay";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { environment } from "../../env/env.local";
import { AxiosError } from "axios";
import Layout from "../../components/common/layout";
import axiosInstance from "@/app/utils/axios";

const WebinarPaymentConfirmation = () => {
  const PaymentInfo = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [connfirmPayment, setConfirmPayment] = useState(false);
    // Extract token from URL parameters

    const handlePaymentConfirmation = async (token: string) => {
      try {
        setLoading(true);
        const res = await axiosInstance.post(
          `${environment?.baseUrl}${environment?.webinarVerication}`,
          {
            reference: token,
          }
        );

        if (res.status === 200) {
          toast.success("Password reset successfully");
          setConfirmPayment(true);
        }

        setLoading(false);
      } catch (err) {
        // Extract the error message from the response
        let errorMessage = "";
        if (err instanceof AxiosError) {
          // Check if err is an instance of AxiosError
          errorMessage = err.response?.data?.error || errorMessage;
        }

        toast.error(errorMessage);
        setLoading(false);
      }
    };

    useEffect(() => {
      const urlToken = searchParams.get("reference");
      if (urlToken) {
        handlePaymentConfirmation(urlToken);
      } else {
        // If no token, redirect to forgot password page
        toast.error("Payment Invalid redirecting...");
        router.push("/checkout");
      }
    }, [searchParams, router]);

    return (
      <Layout>
        <div>
          {loading && (
            <div className="w-full flex justify-center items-center min-h-screen">
              <p className="text-lg font-semibold">Loading...</p>
            </div>
          )}
          {connfirmPayment && (
            <SuccessOverlay
              onClose={() => {}}
              heading="Enrollment Successful!"
              description="You have successfully enrolled in the course"
              // // courseTitle={courseData.title}
              // courseTitle="Nil"
              primaryButtonText="Go To Dashboard"
              secondaryButtonText="Go To Course"
              onPrimaryClick={() => router.push("/dashboard")}
              onSecondaryClick={() => router.push("/learning")}
            />
          )}
        </div>
      </Layout>
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentInfo />
    </Suspense>
  );
};

export default WebinarPaymentConfirmation;
