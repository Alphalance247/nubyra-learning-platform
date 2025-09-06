"use client";
import Container from "../common/container";
import HeadingSubhead from "../common/headingSubhead";
import TestimonialCard from "../common/testimonialCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PrevArrow from "../common/prevBtn";
import NextArrow from "../common/nextBtn";
import Button from "../common/buttons";

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="bg-[#FEFEFD]">
      <Container>
        <HeadingSubhead
          heading="What they are saying about us"
          subheading="Real stories from learners, engineers, and innovators who’ve transformed their journeys with Nubyira."
          headingClassName="text-[#120A02]"
          subheadingClassName="text-[#413B35]"
        />
        {/* grid grid-cols-2 gap-x-6  */}
        <div className="mt-14 slider-container mb-[13rem]">
          <Slider {...settings}>
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
          </Slider>
        </div>

        {/* <div className="flex justify-center mt-30">
          <Button variant="secondary" className="w-[298px] ">
            View all Reviews
          </Button>
        </div> */}
      </Container>
    </section>
  );
};

export default Testimonial;
