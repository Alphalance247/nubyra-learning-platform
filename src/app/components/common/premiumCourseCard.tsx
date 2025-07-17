import Image from "next/image";
import Button from "./buttons";

const PremiumCourseCard = ({
  title,
  type,
}: {
  title: string;
  type: string;
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
      <p className="mt-2 text-base text-[#413B35] ">Subscribe to watch</p>

      <div className="mt-8 flex gap-3 items-center">
        <Button variant="primary" className="w-full">
          Subscribe
        </Button>
        <Button variant="secondary" className="w-full">
          More Info
        </Button>
      </div>
    </div>
  );
};

export default PremiumCourseCard;
