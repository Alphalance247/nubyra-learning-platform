import { IoMdTime } from "react-icons/io";
import Image from "next/image";
import { FaRegCalendar } from "react-icons/fa6";
import Button from "./buttons";
import Link from "next/link";
import { environment } from "@/app/env/env.local";

const CourseCard = ({
  image,
  title,
  price,
  time,
  duration,
  onClickEnroll,
  link,
}: {
  image: string;
  title: string;
  price: string;
  time: string;
  duration: number;
  link: string;
  onClickEnroll: () => void;
}) => {
  return (
    <div className="w-full  bg-white rounded-xl shadow-sm p-4 flex flex-col">
      <div className="w-full h-[180px] sm:h-[200px] xl:h-[220px] relative">
        <Image
          fill
          src={`${environment?.imageUrl}${image}`}
          className="rounded-lg object-cover"
          alt="course"
        />
      </div>
      <p className="mt-4 text-lg font-semibold line-clamp-2">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-[#120A02]">${price}</p>
      <p className="mt-2 text-base text-[#413B35] flex items-center gap-2">
        <FaRegCalendar size={20} className="text-[#413B35]" />
        <span>
          Time: <span className="font-medium">{time} hours a day</span>
        </span>
      </p>
      <p className="mt-2 text-base text-[#413B35] flex items-center gap-2">
        <IoMdTime size={20} className="text-[#413B35]" />
        <span>
          Course Duration: <span className="font-medium">{duration} days</span>
        </span>
      </p>
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <div onClick={onClickEnroll} className="w-full sm:w-1/2">
          <Button variant="primary" className="w-full">
            Enrol Now
          </Button>
        </div>

        <Link href={link || "/learning"} className="w-full sm:w-1/2">
          <Button variant="secondary" className="w-full">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
