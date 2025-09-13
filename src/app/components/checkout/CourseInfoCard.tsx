type CourseDetails = {
  title: string;
  price: number;
  duration: string;
  venue: string;
};

const CourseInfoCard = ({ course }: { course: CourseDetails }) => {
  return (
    <div className="w-full max-w-[580px] rounded-lg border border-[#F2EDE9] bg-[#FBFAF9] p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
      {/* Row: Course */}
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <span className="font-inter text-base sm:text-lg text-[#413B35]">
          Course
        </span>
        <span className="font-inter font-semibold text-base sm:text-lg text-[#120A02] capitalize">
          {course.title}
        </span>
      </div>

      <div className="border-t border-[#B69791]/20" />

      {/* Row: Total Amount */}
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <span className="font-inter text-base sm:text-lg text-[#413B35]">
          Total Amount
        </span>
        <span className="font-inter font-semibold text-base sm:text-lg text-[#120A02]">
          ${course.price}
        </span>
      </div>

      <div className="border-t border-[#B69791]/20" />

      {/* Row: Duration */}
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <span className="font-inter text-base sm:text-lg text-[#413B35]">
          Course Duration
        </span>
        <span className="font-inter font-semibold text-base sm:text-lg text-[#120A02] capitalize">
          {course.duration}
        </span>
      </div>

      <div className="border-t border-[#B69791]/20" />

      {/* Row: Venue */}
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <span className="font-inter text-base sm:text-lg text-[#413B35]">
          Course Venue
        </span>
        <span className="font-inter font-semibold text-base sm:text-lg text-[#120A02] capitalize">
          {course.venue}
        </span>
      </div>
    </div>
  );
};

export default CourseInfoCard;
