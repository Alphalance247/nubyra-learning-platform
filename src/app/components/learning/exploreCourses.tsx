"use client";
import Image from "next/image";
import Container from "../common/container";
import HeadingSubhead from "../common/headingSubhead";
import { useState } from "react";

const ExploreCourses = () => {
  const [activeBtn, setActiveBtn] = useState<string>("All");
  const tabs: { id: number; name: string }[] = [
    { id: 1, name: "All" },
    { id: 2, name: "Webinars" },
    { id: 3, name: "Premium Couses" },
    { id: 4, name: "Free Courses" },
  ];
  return (
    <section className="bg-[#FEFEFD] relative">
      <div className="absolute top-0 left-0 z-20">
        <Image
          src="/assets/home/img.png"
          alt="courses-bg"
          width={500}
          height={600}
        />
      </div>

      <Container>
        <HeadingSubhead withSubhead={false} heading="Explore Our Courses" />

        <div className="flex gap-x-3 items-center justify-center px-3 py-2 border bg-[#FEFEFD] border-[#F2EDE9] rounded-2xl w-[750px] mx-auto">
          {tabs.map((el, i) => (
            <button
              className={`${
                activeBtn === el.name
                  ? "text-[white] bg-[#7B4C1F]"
                  : "text-[#5E5A64] border border-[#E7E7E6] bg-[#FBFAF9]"
              }   font-medium text-lg px-3 py-4 border-b-[1px] cursor-pointer rounded-2xl w-full`}
              onClick={() => setActiveBtn(el.name)}
              key={i}
            >
              {el.name}
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ExploreCourses;
