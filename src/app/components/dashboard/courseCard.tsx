import toast from "react-hot-toast";
import { CourseTag } from "./courseTag";
import { ProgressBar } from "./progressBar";
import { Download } from "lucide-react";
import axiosInstance from "@/app/utils/axios"; 
import axios from "axios";

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
    <div className="w-full h-fit px-[30px] py-[19px] bg-[#FEFEFD] border border-[#F3F0EC] rounded-[12px] flex flex-col justify-between ">
      <div className="space-y-[16px]">
        <CourseTag imageUrl={course.imageUrl} status={course.status} />
        <div>
          <h3 className="w-full font-semibold text-[20px] leading-[28px] capitalize text-[#120A02] font-montserrat mb-2">
            {course.title}
          </h3>

          {!isCompleted && <ProgressBar percent={course.progress} />}

          {isCompleted && (
            <>
              <ProgressBar percent={100} />
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 w-full max-w-md py-3 rounded-full bg-[#F6F0E9] text-[#8B5E3C] font-semibold border border-[#F6F0E9] shadow-sm hover:bg-[#E9DCCF] transition cursor-pointer"
              >
                <span>Download</span>
                <Download size={18} />
              </button>
            </>
          )}
        </div>
      </div>

      {!isCompleted && (
        <button className="w-[185px] h-[56px] px-[32px] py-[16px] bg-[#F2EDE9] border border-[#D6C8BA] rounded-[16px] text-sm font-medium text-black cursor-pointer">
          Continue Learning
        </button>
      )}
    </div>
  );
};
