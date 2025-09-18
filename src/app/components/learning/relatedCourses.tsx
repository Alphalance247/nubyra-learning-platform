"use client";
import CourseCard from "../common/coursesCard";
import { useEffect } from "react";
import { getAllCourses } from "@/stores/courses/getAllCourses";
import { useCheckout } from "@/app/utils/checkoutUtility";

const RelatedCourses = () => {
  const { data, fetchAllCourses } = getAllCourses();

  useEffect(() => {
    fetchAllCourses();
  }, [fetchAllCourses]);

  const { handleCheckOut } = useCheckout();

  return (
    <div className="pt-15 border-t-[1.5px] border-[#B6979133]">
      <h5 className="text-3xl font-bold text-[#120A02] mb-8">
        Other Courses to learn
      </h5>

      <div className="grid md:grid-cols-3 gap-8">
        {data?.Webinar?.courses?.slice(0, 3).map((course, index) => (
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
    </div>
  );
};

export default RelatedCourses;
