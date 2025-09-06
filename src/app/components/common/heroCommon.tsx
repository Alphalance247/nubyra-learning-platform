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
  return (
    <section className={`bg-cover bg-center bg-no-repeat ${bgUrl} relative`}>
      <div className="bg-[linear-gradient(270.01deg,rgba(132,132,132,0)_21.08%,_#180C00_99.99%)] absolute inset-0 z-10"></div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 pt-10 sm:pt-16 xl:pt-32 pb-10 sm:pb-16 xl:pb-32 relative z-20">
        <div className="w-full lg:w-[60%] text-center lg:text-left">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-montserrat leading-tight">
            {heading}{" "}
            <span className="text-[#120A02] bg-white px-1">{span}</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-medium mb-10 text-white w-full sm:w-[80%] lg:w-[70%] mx-auto lg:mx-0">
            {description}
          </p>
          <div className="flex justify-center lg:justify-start items-center gap-x-4">
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
