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
    <div>
      <Image
        width={378}
        height={170}
        src={`${environment?.imageUrl}/media/${image}`}
        className="rounded-lg w-[378px] h-[170px]"
        alt="course "
      />
      <p className="mt-[1rem] font-montserrat text-lg font-semibold">{title}</p>
      <p className="mt-2 text-2xl font-semibold  text-[#120A02]">{type}</p>
      <p className="mt-2 text-base text-[#413B35] ">{subcribeText}</p>

      <div className="mt-8 flex gap-3 items-center">
        <div className="w-full">
          <Button variant="primary" onClick={onClickWatch}>
            {" "}
            {btnName}
          </Button>
        </div>

        <Link href={link || "/learning"} className="w-full">
          <Button variant="secondary">More Info</Button>
        </Link>
      </div>
    </div>
  );
};

export default PremiumCourseCard;
