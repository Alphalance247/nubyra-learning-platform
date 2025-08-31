import { useRouter } from "next/navigation";

// Define the course type for better type safety
export interface CourseData {
  title?: string;
  price?: string | number;
  duration?: string;
  cid?: string;
  id: string;
}

// Reusable checkout function
export const useCheckout = () => {
  const router = useRouter();

  const handleCheckOut = (
    course: CourseData,
    redirectPath: string = "/learning/enroll"
  ) => {
    // Store course data in localStorage
    localStorage.setItem("courseTitle", course?.title || "");
    localStorage.setItem("courseDuration", course?.duration || "");
    localStorage.setItem("coursePrice", course?.price?.toString() || "");
    localStorage.setItem("courseId", course?.id || "");

    // Navigate to the specified path
    router?.push(redirectPath);
  };

  return { handleCheckOut };
};
