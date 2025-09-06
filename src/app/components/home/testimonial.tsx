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
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-[#FEFEFD] py-12 md:py-20">
      <Container>
        <HeadingSubhead
          heading="What they are saying about us"
          subheading="Real stories from learners, engineers, and innovators who’ve transformed their journeys with Nubyira."
          headingClassName="text-[#120A02]"
          subheadingClassName="text-[#413B35]"
        />

        <div className="mt-10 md:mt-14">
          <Slider {...settings}>
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
          </Slider>
        </div>

        <div className="flex justify-center mt-12 md:mt-16">
          <Button variant="secondary" className="w-full max-w-xs sm:w-72">
            View all Reviews
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default Testimonial;
