"use client";
import Container from "../common/container";
import HeadingSubhead from "../common/headingSubhead";
import Image from "next/image";
import Button from "../common/buttons";
import CourseCard from "../common/coursesCard";
import Spinner from "../common/spinner/spinner";
import { useEffect } from "react";
import Link from "next/link";
import { getAllCourses } from "@/stores/courses/getAllCourses";
import { useCheckout } from "@/app/utils/checkoutUtility";

const OurCourses = () => {
  const { data, fetchAllCourses, error, loading } = getAllCourses();

  useEffect(() => {
    fetchAllCourses();
  }, [fetchAllCourses]);

  const { handleCheckOut } = useCheckout();

  return (
    <section className="bg-[#FEFEFD] relative overflow-hidden">
      <div className="absolute top-0 left-0 z-0 opacity-20 md:opacity-100">
        <Image
          src="/assets/home/img.png"
          alt="courses-bg"
          width={500}
          height={600}
          className="w-40 md:w-72 lg:w-[500px] h-auto"
        />
      </div>

      <Container>
        <div className="relative z-10">
          <HeadingSubhead
            heading="Explore Our Courses"
            subheading="Learn practical process engineering skills, master tools, and build real-world projects — at your own pace."
            headingClassName="text-[#120A02]"
            subheadingClassName="text-[#413B35]"
          />
          {loading ? (
            <div className="flex flex-col justify-center items-center">
              <Spinner />
              <p className="text-lg text-[#95704C] font-medium mt-4">Loading courses...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col justify-center items-center">
              <p className="text-red-500">Error fetching courses</p>
              <Button
                variant="secondary"
                className="w-full sm:w-[289px] mt-4"
                onClick={() => fetchAllCourses()}
              >
                Try Again
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 xl:gap-8 mt-10">
              {data?.Webinar?.courses?.slice(0, 6).map((course, index) => (
                <CourseCard
                  key={index}
                  image={course?.image}
                  title={course?.title}
                  price={course?.price}
                  time={course?.duration}
                  duration={course?.number_of_days}
                  link={`/learning/${course?.cid}`}
                  onClickEnroll={() => handleCheckOut(course)}
                />
              ))}
            </div>
          )}
          <div className="mt-10 flex flex-col items-center justify-center">
            <Link href="/learning">
              <Button variant="secondary" className="w-full sm:w-[289px]">
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OurCourses;
