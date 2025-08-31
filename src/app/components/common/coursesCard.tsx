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
    <div>
      <Image
        width={378}
        height={170}
        src={`${environment?.imageUrl}/media/${image}`}
        className="rounded-lg w-[378px] h-[170px]"
        alt="course"
      />
      <p className="mt-[1rem] text-lg font-semibold">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-[#120A02]">${price}</p>
      <p className="mt-2 text-base text-[#413B35] flex items-center gap-2">
        <span>
          <FaRegCalendar size={24} color="#413B35" />
        </span>
        Time: <span className="font-medium">{time} hours a day</span>
      </p>
      <p className="mt-2 text-base text-[#413B35] flex items-center gap-2">
        <span>
          <IoMdTime size={24} color="#413B35" />
        </span>
        Course Duration: <span className="font-medium">{duration} days</span>
      </p>

      <div className="mt-8 flex gap-3 items-center">
        <div onClick={onClickEnroll}>
          <Button variant="primary" className="w-full">
            Enroll Now
          </Button>
        </div>

        <Link href={link || "/learning"}>
          <Button variant="secondary" className="w-full">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
