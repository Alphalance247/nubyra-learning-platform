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
import { getSubscriotionStatusStore } from "@/stores/courses/getSubscribeStatus";
import { useRouter } from "next/navigation";
import Spinner from "../common/spinner/spinner";

const ExploreCourses = () => {
  const { data, fetchCourseList } = getCourseListStore();
  const {
    data: fetchAllCoursedata,
    fetchAllCourses,
    error,
    loading,
  } = getAllCourses();
  const { data: subStatus, fetchSubscriptionStatus } =
    getSubscriotionStatusStore();
  const router = useRouter();

  useEffect(() => {
    fetchCourseList();
    fetchAllCourses();
    fetchSubscriptionStatus();
  }, [fetchCourseList, fetchAllCourses, fetchSubscriptionStatus]);

  const handleCheckOut = (course: {
    title?: string;
    price?: number;
    duration?: string;
    cid?: string;
  }) => {
    localStorage.setItem("courseTitle", course?.title || "");
    localStorage.setItem("courseDuration", course?.duration || "");
    router?.push("/checkout");
  };

  const [activeBtn, setActiveBtn] = useState<string>("Webinars");
  const tabs: { id: number; name: string }[] = [
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

        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="mt-8 text-center text-red-600 text-lg font-semibold flex flex-col items-center justify-center">
            <p> {error}</p>
            <Button
              variant="primary"
              className="mt-4"
              onClick={() => {
                fetchAllCourses();
              }}
            >
              <span className="text-white">Retry</span>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mt-14">
              <h4 className="text-2xl font-semibold text-[#120A02]">
                All Courses ({data?.courses?.length})
              </h4>
              <div className=" flex gap-x-2">
                <Button
                  variant="secondary"
                  className="flex items-center gap-x-2"
                >
                  <span>
                    <BsFilterLeft className="text-[#7B4C1F]" />
                  </span>
                  Filter by
                  <span>
                    {" "}
                    <FaChevronDown className="text-[#7B4C1F]" />
                  </span>
                </Button>

                <Button
                  variant="secondary"
                  className="flex items-center gap-x-2"
                >
                  Sort by
                  <span>
                    {" "}
                    <FaChevronDown className="text-[#7B4C1F]" />
                  </span>
                </Button>
              </div>
            </div>

            {activeBtn === "Webinars" && (
              <div className="grid md:grid-cols-3 gap-8 mt-6">
                {fetchAllCoursedata?.Webinar?.courses?.map((course, index) => (
                  <CourseCard
                    key={index}
                    image={course?.image}
                    title={course?.title}
                    price={course?.price}
                    time={course?.number_of_days}
                    duration={course?.duration}
                    link={`/learning/${course?.cid}`}
                  />
                ))}
              </div>
            )}

            {activeBtn === "Premium Courses" && (
              <div className="grid md:grid-cols-3 gap-8 mt-6">
                {fetchAllCoursedata?.Premium?.courses?.map((el, i) => (
                  <PremiumCourseCard
                    image={el?.image}
                    key={i}
                    title={el?.title}
                    type={el?.course_tab}
                    link={`/learning/${el?.cid}`}
                    onClickWatch={() => {
                      if (subStatus?.sub_status) {
                        router.push(`/learning/${el?.cid}`);
                      } else {
                        handleCheckOut(el);
                      }
                    }}
                    subcribeText={
                      subStatus?.sub_status ? "Watch" : "Subscribe to watch"
                    }
                    btnName={
                      subStatus?.sub_status ? "Watch Now" : "Subscribe Now"
                    }
                  />
                ))}
              </div>
            )}

            {activeBtn === "Free Courses" && (
              <div className="grid md:grid-cols-3 gap-8 mt-6">
                {fetchAllCoursedata?.Free?.courses?.map((el, i) => (
                  <PremiumCourseCard
                    key={i}
                    image={el?.image}
                    title={el?.title}
                    type={el?.course_tab}
                    link={`/learning/${el?.cid}`}
                    onClickWatch={() => router.push(`/learning/${el?.cid}`)}
                    subcribeText="Watch for free"
                    btnName="Watch Now"
                  />
                ))}
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
};

export default ExploreCourses;
