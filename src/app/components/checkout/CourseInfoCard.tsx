import { getSubsriptionPriceListStore } from "@/stores/courses/getSubcriptionPrice";

type CourseDetails = {
  title: string;
  // price: number;
  duration: string;
  venue: string;
};

const CourseInfoCard = ({ course }: { course: CourseDetails }) => {
  const { data, loading, error } = getSubsriptionPriceListStore();
  return (
    <div className="w-[580px] rounded-[8px] border border-[#F2EDE9] bg-[#FBFAF9] p-6 flex flex-col gap-6 h-fit">
      <div className="w-[532px] h-[80px] gap-3 flex justify-between pb-4 border-b border-[#F2EDE9]">
        <p className="w-[176px] h-[26px] font-inter font-normal text-[18px] leading-[26px] tracking-normal text-[#413B35]">
          Course
        </p>
        <p className="w-[344px] h-[26px] font-inter font-semibold text-[18px] leading-[26px] capitalize text-[#120A02]">
          {course.title}
        </p>
      </div>
      <div className="w-[532px] h-[26px] gap-3 flex justify-between items-center">
        <p className="w-[176px] h-[26px] font-inter font-normal text-[18px] leading-[26px] tracking-normal text-[#413B35]">
          Total Amount
        </p>
        <p className="not-first:w-[344px] h-[26px] font-inter font-semibold text-[18px] leading-[26px] capitalize text-[#120A02]">
          $
          {loading
            ? "loading...."
            : error
            ? "Error fetching price please reload"
            : data?.sub_price}
        </p>
      </div>
      {/* <div className="w-[532px] border-t-[1.5px] border-t-[#B69791]/20"></div>
      <div className="w-[532px] h-[26px] flex justify-between">
        <span className="w-[176px] h-[26px] font-inter font-normal text-[18px] leading-[26px] tracking-normal text-[#413B35]">
          Course Duration
        </span>
        <span className="w-[344px] h-[26px] font-inter font-semibold text-[18px] leading-[26px] capitalize text-[#120A02]">
          {course.duration}
        </span>
      </div> */}
      <div className="w-[532px] border-t-[1.5px] border-t-[#B69791]/20"></div>
      <div className="w-[532px] h-[26px] flex gap-[14px]">
        <span className="w-[176px] h-[26px] font-inter font-normal text-[18px] leading-[26px] tracking-normal text-[#413B35]">
          Course Venue
        </span>
        <span className="w-[344px] h-[26px] font-inter font-semibold text-[18px] leading-[26px] capitalize text-[#120A02]">
          {course.venue}
        </span>
      </div>
    </div>
  );
};

export default CourseInfoCard;
