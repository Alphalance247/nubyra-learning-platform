"use client";
import CourseCard from "../common/coursesCard";
import { useEffect } from "react";
import { getAllCourses } from "@/stores/courses/getAllCourses";

const RelatedCourses = () => {
  const { data, fetchAllCourses } = getAllCourses();

  useEffect(() => {
    fetchAllCourses();
  }, [fetchAllCourses]);

  return (
    <div className="pt-15 border-t-[1.5px] border-[#B6979133]">
      <h5 className="text-3xl font-bold text-[#120A02] mb-8">
        Other Courses to learn
      </h5>

      <div className="grid md:grid-cols-3 gap-8">
        {data?.Webinar?.courses.map((course, index) => (
          <CourseCard
            link={`/learning/${course?.cid}`}
            key={index}
            image={course?.image}
            title={course?.title}
            price={course?.price}
            time={course?.number_of_days}
            duration={course?.duration}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedCourses;
