import Button from "./buttons";
import Link from "next/link";
import { GoChevronRight } from "react-icons/go";
const HeroCommon = ({
  heading,
  span,
  description,
  bgUrl,
  btnText,
  btnLink,
}: {
  heading: string;
  span: string;
  description: string;
  bgUrl: string;
  btnText: string;
  btnLink: string;
}) => {
  //
  return (
    <section className={`bg-cover bg-center bg-no-repeat ${bgUrl}`}>
      <div className="max-w-[1300px] mx-auto px-8 pt-[7rem] pb-[8rem]">
        <div className="w-[55%]">
          <h1 className="text-white text-6xl font-bold mb-6">
            {heading} <span className="text-[#120A02] bg-white">{span}</span>
          </h1>
          <p className="text-lg font-medium mb-10 text-white w-[60%]">
            {description}
          </p>

          <div className="flex items-center gap-x-4">
            <Link href={btnLink || "/"}>
              <Button
                className="w-fit flex items-center gap-x-2"
                variant="primary"
              >
                {btnText}
                <GoChevronRight className="text-white" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCommon;
