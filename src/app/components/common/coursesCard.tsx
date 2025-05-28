import { IoMdTime } from "react-icons/io";

import { FaRegCalendar } from "react-icons/fa6";
import Button from "./buttons";
import Image from "next/image";

const CourseCard = ({
  image,
  title,
  price,
  time,
  duration,
}: {
  image: string;
  title: string;
  price: string;
  time: string;
  duration: string;
}) => {
  return (
    <div>
      <Image width={378} height={170} src={image} alt="course" />
      <p className="mt-[-3rem] text-lg font-semibold">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-[#120A02]">{price}</p>
      <p className="mt-2 text-base text-[#413B35] flex items-center gap-2">
        <span>
          <FaRegCalendar size={24} color="#413B35" />
        </span>
        Time: <span className="font-medium">{time}</span>
      </p>
      <p className="mt-2 text-base text-[#413B35] flex items-center gap-2">
        <span>
          <IoMdTime size={24} color="#413B35" />
        </span>
        Course Duration: <span className="font-medium">{duration}</span>
      </p>

      <div className="mt-8 flex gap-3 items-center">
        <Button variant="primary" className="w-full">
          Enroll Now
        </Button>
        <Button variant="secondary" className="w-full">
          View Details
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
