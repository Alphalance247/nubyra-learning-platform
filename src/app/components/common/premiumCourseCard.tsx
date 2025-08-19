import Image from "next/image";
import Button from "./buttons";
import Link from "next/link";

const PremiumCourseCard = ({
  title,
  type,
  link,
  btnName,
  onClickWatch,
  subcribeText,
}: {
  title: string;
  type: string;
  link: string;
  btnName: string;
  subcribeText?: string;
  onClickWatch: () => void;
}) => {
  return (
    <div>
      <Image
        width={378}
        height={170}
        src={`/assets/home/vid2.png`}
        className="rounded-lg"
        alt="course"
      />
      <p className="mt-[-4rem] font-montserrat text-lg font-semibold">
        {title}
      </p>
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
