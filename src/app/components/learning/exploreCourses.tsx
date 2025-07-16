"use client";
import Image from "next/image";
import Container from "../common/container";
import HeadingSubhead from "../common/headingSubhead";
import { useState } from "react";
import Button from "../common/buttons";
import { FaChevronDown } from "react-icons/fa";
import { BsFilterLeft } from "react-icons/bs";
import CourseCard from "../common/coursesCard";


// export interface Course {
//   id: number;
//   title: string;
//   image: string; // backend full URL
//   price: string;
//   time: string;
//   duration: string;
// }
const ExploreCourses = () => {
  const courses = [
    {
      image: "/assets/home/vid1.png",
      title: "Aspen HYSYS Basic course webinar",
      price: "$50.00",
      time: "3 hours a day",
      duration: "5 days",
    },
    {
      image: "/assets/home/vid2.png",
      title: "Aspen HYSYS Basic course webinar",
      price: "$50.00",
      time: "3 hours a day",
      duration: "5 days",
    },
    {
      image: "/assets/home/vid1.png",
      title: "Aspen HYSYS Basic course webinar",
      price: "$50.00",
      time: "3 hours a day",
      duration: "5 days",
    },
    {
      image: "/assets/home/vid1.png",
      title: "Aspen HYSYS Basic course webinar",
      price: "$50.00",
      time: "3 hours a day",
      duration: "5 days",
    },
    {
      image: "/assets/home/vid1.png",
      title: "Aspen HYSYS Basic course webinar",
      price: "$50.00",
      time: "3 hours a day",
      duration: "5 days",
    },
    {
      image: "/assets/home/vid1.png",
      title: "Aspen HYSYS Basic course webinar",
      price: "$50.00",
      time: "3 hours a day",
      duration: "5 days",
    },
  ];


  const [activeBtn, setActiveBtn] = useState<string>("All");
  const tabs: { id: number; name: string }[] = [
    { id: 1, name: "All" },
    { id: 2, name: "Webinars" },
    { id: 3, name: "Premium Couses" },
    { id: 4, name: "Free Courses" },
  ]
  // const [courses, setCourses] = useState<Course[]>([]);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   apiRequest<{ pid: string; courses: Course[] }>('courses/')
  //     .then((data) => {
  //       console.log('Fetched courses:', data.courses);
  //       setCourses(data.courses); 
  //     })
  //     .catch((err) => {
  //       console.error('Error fetching courses:', err);
  //       setError(err.message);
  //     });
  // }, []);
  ;
  return (
    <section className="bg-[#FBFAF9] relative">
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

        <div className="flex items-center justify-between mt-14">
          <h4 className="text-2xl font-semibold text-[#120A02]">
            All Courses (32)
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

        <div className="grid md:grid-cols-3 gap-8 mt-6">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              image={course?.image}
              // image={`http://127.0.0.1:8000${course.image}`}
              title={course?.title}
              price={course?.price}
              time={course?.time}
              duration={course?.duration}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ExploreCourses;
