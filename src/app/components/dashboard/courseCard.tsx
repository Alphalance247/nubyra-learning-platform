import toast from "react-hot-toast";
import { CourseTag } from "./courseTag";
import { ProgressBar } from "./progressBar";
import { Download } from "lucide-react";
import axiosInstance from "@/app/utils/axios";
import axios from "axios";
import { environment } from "@/app/env/env.local";

export type Course = {
  id: number;
  title: string;
  progress: number;
  status: string;
  imageUrl: string;
};

type CourseCardProps = {
  course: Course;
};

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const isCompleted = course.status === "Completed Course";
  console.log("Course image:", course.imageUrl);
  console.log(
    "Full URL:",
    course?.imageUrl
      ? `${environment.imageUrl}${course.imageUrl}`
      : "/assets/dashboard/icon.png"
  );

  

  const handleDownload = async () => {
    try {
      const response = await axiosInstance.get(
        `/certificates/download/${course.id}/`,
        { responseType: "blob" }
      );

      if (!response.data || response.data.size === 0) {
        toast.error("Certificate Not Available. Please try again later.");
        return;
      }

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `certificate-${course.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Certificate downloaded successfully!");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          toast.error("Certificate not available for this course.");
        } else {
          toast.error("An error occurred while downloading the certificate.");
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-6 lg:p-8 flex flex-col justify-between">
      <div className="space-y-4">
        <CourseTag imageUrl={`https://stage-backend.nubyira.com/${course.imageUrl}`} status={course.status} />
        <div>
          <h3 className="mb-2 w-full font-montserrat text-lg font-semibold capitalize leading-snug text-gray-900 md:text-xl">
            {course.title}
          </h3>

          {!isCompleted && <ProgressBar percent={course.progress} />}

          {isCompleted && (
            <>
              <ProgressBar percent={100} />
              <button
                onClick={handleDownload}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-gray-100 py-3 font-semibold text-gray-700 shadow-sm transition hover:bg-gray-200"
              >
                <span>Download</span>
                <Download size={18} />
              </button>
            </>
          )}
        </div>
      </div>

      {!isCompleted && (
        <button className="mt-4 w-full rounded-2xl border border-gray-300 bg-gray-100 px-8 py-4 text-sm font-medium text-black transition hover:bg-gray-200 md:w-auto">
          Continue Learning
        </button>
      )}
    </div>
  );
};
