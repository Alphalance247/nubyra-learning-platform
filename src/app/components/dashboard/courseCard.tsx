import { CourseTag } from "./courseTag";
import { ProgressBar } from "./progressBar";

export type Course = {
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
  const isPostponed = course.status === "Postponed Course";

  return (
    <div className="w-full h-fit px-[30px] py-[19px] bg-[#FEFEFD] border border-[#F3F0EC] rounded-[12px] flex flex-col justify-between ">
      <div className="space-y-[16px]">
        <CourseTag imageUrl={course.imageUrl} status={course.status} />
        <div>
          <h3 className="w-full font-semibold text-[20px] leading-[28px] capitalize text-[#120A02] font-montserrat mb-2">
            {course.title}
          </h3>

          {!isCompleted && !isPostponed && (
            <ProgressBar percent={course.progress} />
          )}
          {isCompleted && (
            <>
              <ProgressBar percent={100} />
              <p className="text-[#6D5C4F] text-sm mt-[8px]">Completed</p>
            </>
          )}
        </div>
      </div>

      {/* Button only visible for ongoing/registered courses */}
      {!isCompleted && !isPostponed && (
        <button className="w-[185px] h-[56px] px-[32px] py-[16px] bg-[#F2EDE9] border border-[#D6C8BA] rounded-[16px] text-sm font-medium text-black cursor-pointer">
          Continue Learning
        </button>
      )}
    </div>
  );
};
