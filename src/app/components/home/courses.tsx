"use client";
import Container from "../common/container";
import HeadingSubhead from "../common/headingSubhead";
import Image from "next/image";
import Button from "../common/buttons";
import CourseCard from "../common/coursesCard";
import { getCourseListStore } from "@/stores/courses/getCourseList";
import Spinner from "../common/spinner/spinner";
import { useEffect } from "react";
import Link from "next/link";

const OurCourses = () => {
  const { data, loading, error, fetchCourseList } = getCourseListStore();

  useEffect(() => {
    fetchCourseList();
  }, [fetchCourseList]);

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
        <HeadingSubhead
          heading="Explore Our Courses "
          subheading="Learn practical process engineering skills, master tools, and build real-world projects — at your own pace."
          headingClassName="text-[#120A02]"
          subheadingClassName="text-[#413B35]"
        />

        {loading ? (
          <div className="flex flex-col justify-center items-center">
            <Spinner />
            <p className="text-lg font-medium mt-4">Loading courses...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col justify-center items-center">
            <p className="text-red-500">Error fetching courses</p>
            <Button
              variant="secondary"
              className="w-[289px]"
              onClick={() => fetchCourseList()}
            >
              Try Again
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 mt-15">
            {data?.courses?.slice(0, 3).map((course, index) => (
              <CourseCard
                key={index}
                image={course?.image}
                title={course?.title}
                price={course?.price.toString()}
                time={course?.number_of_days}
                duration={course?.duration.toString()}
              />
            ))}
          </div>
        )}

        <div className="mt-15 flex flex-col items-center justify-center">
          <Link href="/learning">
            <Button variant="secondary" className="w-[289px]">
              View All Courses
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default OurCourses;
