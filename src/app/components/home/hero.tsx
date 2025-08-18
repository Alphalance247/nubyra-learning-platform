"use client";
import Button from "../common/buttons";
import Link from "next/link";
import { IoCheckmark } from "react-icons/io5";
import Slider from "react-slick";

const Hero = () => {
  const backgroundImages = [
    "/assets/home/hero-bg-0.png",
    "/assets/home/hero-bg-1.png", // Add more background images as needed
    "/assets/home/hero-bg-2.png",
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    arrows: false,
  };

  return (
    <section className="relative h-[700px]">
      <div className="absolute inset-0 z-0 ">
        <Slider {...settings}>
          {backgroundImages.map((bgImage, index) => (
            <div key={index} className="h-[700px]">
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${bgImage})` }}
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="max-w-[1300px] mx-auto px-8 pt-[7rem] pb-[8rem] relative top-0 left-0 z-50">
        <div className=" w-[90%] xl:w-[55%]">
          <h1 className="text-white text-6xl font-bold mb-6 font-montserrat leading-18">
            Hire Top Process Design{" "}
            <span className="text-[#442A11] bg-white">Talent </span>{" "}
          </h1>
          <p className="text-lg font-medium mb-10 text-white w-[60%] font-inter">
            Explore streamlined training and discover most effective engineering
            solutions
          </p>

          <div className="flex items-center gap-x-4">
            <Link href={"/sign-up"}>
              <Button className=" w-fit" variant="primary">
                Enrol for free
              </Button>
            </Link>

            <Link href={"/project/submit"}>
              <Button className="w-fit" variant="secondary">
                Contact Us
              </Button>
            </Link>
          </div>

          <div className="mt-10 flex flex-col gap-y-3">
            {["Trusted Excellence", "Affordable Pricing", "Global Reach"].map(
              (item, index) => (
                <div className="flex items-center gap-x-2" key={index}>
                  <span className="rounded-full bg-[#F2EDE9] p-2">
                    <IoCheckmark className="text-[#7B4C1F] text-lg font-medium" />
                  </span>
                  <p className="text-white text-lg font-medium">{item}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
