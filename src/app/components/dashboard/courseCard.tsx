import { CourseTag } from "./courseTag";
import { ProgressBar } from "./progressBar";

export type Course = {
    title: string;
    progress: number;
    status: string;
    imageUrl: string
  };
  
  type CourseCardProps = {
    course: Course;
  };
  
  export const CourseCard: React.FC<CourseCardProps> = ({ course }) => (
    <div
      className="w-full h-[288px] px-[30px] py-[19px] bg-[#FEFEFD] border border-[#F3F0EC] rounded-[12px] flex flex-col justify-between"
    >
      <div className="space-y-[16px]">
        <CourseTag imageUrl="assets/dashboard/courseimage.png" status={course.status} />
        <div>
          <h3 className="w-[347px] h-[28px] font-semibold text-[20px] leading-[28px] capitalize text-[#120A02] font-montserrat mb-2">{course.title}</h3>
          {/* <p className="text-sm mt-1 font-medium">{course.progress}% Complete</p> */}
          <ProgressBar percent={course.progress} />
        </div>
      </div>
      <button className="w-[185px] h-[56px] px-[32px] py-[16px] bg-[#F2EDE9] border border-[#D6C8BA] rounded-[16px] text-sm font-medium text-black cursor-pointer">
        Continue Learning
      </button>
    </div>
  );