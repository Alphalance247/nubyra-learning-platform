import Image from "next/image";
import Button from "./buttons";
import Link from "next/link";
import { environment } from "@/app/env/env.local";

const PremiumCourseCard = ({
  title,
  type,
  link,
  btnName,
  onClickWatch,
  subcribeText,
  image,
}: {
  title: string;
  type: string;
  link: string;
  btnName: string;
  subcribeText?: string;
  image: string;
  onClickWatch: () => void;
}) => {
  return (
    <div className="w-full">
      {/* Course Image */}
      <Image
        width={378}
        height={170}
        src={`${environment?.imageUrl}/media/${image}`}
        className="rounded-lg w-full h-auto object-cover"
        alt="course"
      />

      {/* Course Info */}
      <p className="mt-4 font-montserrat text-lg font-semibold">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-[#120A02]">{type}</p>
      {subcribeText && (
        <p className="mt-2 text-base text-[#413B35]">{subcribeText}</p>
      )}

      {/* Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 items-stretch">
        <Button
          variant="primary"
          onClick={onClickWatch}
          className="w-full sm:w-auto flex-1"
        >
          {btnName}
        </Button>

        <Link href={link || "/learning"} className="w-full sm:w-auto flex-1">
          <Button variant="secondary" className="w-full">
            More Info
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PremiumCourseCard;
