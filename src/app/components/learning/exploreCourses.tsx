"use client";
import Image from "next/image";
import Container from "../common/container";
import HeadingSubhead from "../common/headingSubhead";
import { useEffect, useState } from "react";
import Button from "../common/buttons";
import { FaChevronDown } from "react-icons/fa";
import { BsFilterLeft } from "react-icons/bs";
import CourseCard from "../common/coursesCard";
import { getCourseListStore } from "@/stores/courses/getCourseList";
import { getAllCourses } from "@/stores/courses/getAllCourses";
import PremiumCourseCard from "../common/premiumCourseCard";


// export interface Course {
//   id: number;
//   title: string;
//   image: string; // backend full URL
//   price: string;
//   time: string;
//   duration: string;
// }
const ExploreCourses = () => {
  const { data, fetchCourseList } = getCourseListStore();
  const { data: fetchAllCoursedata, fetchAllCourses } = getAllCourses();

  useEffect(() => {
    fetchCourseList();
    fetchAllCourses();
  }, [fetchCourseList, fetchAllCourses]);


  const [activeBtn, setActiveBtn] = useState<string>("All");
  const tabs: { id: number; name: string }[] = [
    { id: 1, name: "All" },
    { id: 2, name: "Webinars" },
    { id: 3, name: "Premium Courses" },
    { id: 4, name: "Free Courses" },
  ];

  return (
    <section className="bg-[#FBFAF9] relative">
      <div className="absolute top-0 left-0 z-10">
        <Image
          src="/assets/home/img.png"
          alt="courses-bg"
          width={500}
          height={600}
        />
      </div>

      <Container>
        <HeadingSubhead withSubhead={false} heading="Explore Our Courses" />

        <div className="flex gap-x-3 items-center justify-center px-3 py-2 border bg-[#FEFEFD] border-[#F2EDE9] rounded-2xl w-[750px] mx-auto relative z-30">
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

        <div className="flex items-center justify-between mt-14">
          <h4 className="text-2xl font-semibold text-[#120A02]">
            All Courses ({data?.courses?.length})
          </h4>
          <div className=" flex gap-x-2">
            <Button variant="secondary" className="flex items-center gap-x-2">
              <span>
                <BsFilterLeft className="text-[#7B4C1F]" />
              </span>
              Filter by
              <span>
                {" "}
                <FaChevronDown className="text-[#7B4C1F]" />
              </span>
            </Button>

            <Button variant="secondary" className="flex items-center gap-x-2">
              Sort by
              <span>
                {" "}
                <FaChevronDown className="text-[#7B4C1F]" />
              </span>
            </Button>
          </div>
        </div>

        <h1></h1>

        {activeBtn === "All" && (
          <div className="grid md:grid-cols-3 gap-8 mt-6">
            {data?.courses.map((course, index) => (
              <CourseCard
                key={index}
                image={course?.image}
                title={course?.title}
                price={course?.price?.toString()}
                time={course?.number_of_days}
                duration={course?.duration?.toString()}
              />
            ))}
          </div>
        )}
        {activeBtn === "Webinars" && (
          <div className="grid md:grid-cols-3 gap-8 mt-6">
            {data?.courses.map((course, index) => (
              <CourseCard
                key={index}
                image={course?.image}
                title={course?.title}
                price={course?.price?.toString()}
                time={course?.number_of_days}
                duration={course?.duration?.toString()}
              />
            ))}
          </div>
        )}

        {activeBtn === "Premium Courses" && (
          <div className="grid md:grid-cols-3 gap-8 mt-6">
            {fetchAllCoursedata?.Premium?.courses?.map((el, i) => (
              <PremiumCourseCard
                key={i}
                title={el?.title}
                type={el?.course_tab}
              />
            ))}
          </div>
        )}

        {activeBtn === "Free Courses" && (
          <div className="grid md:grid-cols-3 gap-8 mt-6">
            {fetchAllCoursedata?.Free?.courses?.map((el, i) => (
              <PremiumCourseCard
                key={i}
                title={el?.title}
                type={el?.course_tab}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default ExploreCourses;
