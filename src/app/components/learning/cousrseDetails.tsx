"use client";
import Button from "@/app/components/common/buttons";
import Container from "@/app/components/common/container";
import Layout from "@/app/components/common/layout";
import RelatedCourses from "@/app/components/learning/relatedCourses";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import { useEffect, useState, useCallback, useMemo } from "react";
import { IoMdTime } from "react-icons/io";
import Spinner from "../common/spinner/spinner";
import { getSubscriotionStatusStore } from "@/stores/courses/getSubscribeStatus";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface courseDetailsProps {
  meta_tag: string;
  overview: string;
  title: string;
  course_objective: string;
  video_link: string;
  audience: string;
  category: string;
  certificate_available: boolean;
  course_tab: string;
  deliverables: string;
  duration: string;
  id: number;
  number_of_days: number;
  objectives: number;
  prerequisite: string;
  prerequisites: string;
  price: number;
  rating_number: number;
  rating_star: number;
  timeline: string;
  training_software: {
    name: string;
  }[];
}

const CourseDetails = ({ id }: { id: string }) => {
  const [courseData, setCourseData] = useState<courseDetailsProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const errrMesaage =
    "An error occurred while fetching the projects. Please try again later.";
  const { data, fetchSubscriptionStatus } = getSubscriotionStatusStore();

  useEffect(() => {
    if (courseData?.course_tab === "Webinar") {
      fetchSubscriptionStatus();
    }
  }, [fetchSubscriptionStatus, courseData?.course_tab]);

  const [activeBtn, setActiveBtn] = useState<string>("Overview");
  const tabs: { id: number; name: string }[] = [
    { id: 1, name: "Overview" },
    { id: 2, name: "Objectives" },

    {
      id: 3,
      name: "Training Software",
    },

    { id: 4, name: "Timeline" },
    { id: 5, name: "Deliverables" },
    { id: 6, name: "Target Audience" },
    { id: 7, name: "Prerequisite" },
  ];

  const premiumFreeTab = [
    { id: 1, name: "Overview" },

    {
      id: 3,
      name: "Training Software",
    },
  ];

  const handleCheckOut = () => {
    router?.push("/checkout");

    localStorage.setItem("courseTitle", courseData?.title || "");
    localStorage.setItem("coursePrice", courseData?.price?.toString() || "");
    localStorage.setItem("courseDuration", courseData?.duration || "");
  };

  const fetchBlogDetails = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(`/single-course/`, {
        cid: id,
      });
      if (res.status === 200) {
        setCourseData(res?.data);
        setLoading(false);
      } else {
        setError(errrMesaage);
        setLoading(false);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.message || errrMesaage);
        setLoading(false);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [id, errrMesaage]);

  useEffect(() => {
    fetchBlogDetails();
  }, [fetchBlogDetails]);

  const outline = useMemo(
    () => [
      {
        icon: "",
        head: "Training Software:",
        subhead: `${
          courseData?.training_software?.find((el) => el?.name)?.name || "N/A"
        } `,
      },
      {
        icon: "",
        head: "Course Duration: ",
        subhead: `${courseData?.number_of_days} days` || "N/A",
      },
      {
        icon: "",
        head: "Time: ",
        subhead: `${courseData?.duration} hours a day.`,
      },
      {
        icon: "",
        head: "Course Venue:",
        subhead: " Online Class",
      },
      {
        icon: "",
        head: "Course Certificate: ",
        subhead:
          `${
            courseData?.certificate_available
              ? "Available after Completion"
              : "Not Available"
          } ` || " N/A",
      },
    ],
    [
      courseData?.number_of_days,
      courseData?.duration,
      courseData?.certificate_available,
      courseData?.training_software,
    ]
  );

  const courseTabData =
    courseData?.course_tab === "Webinar" ? outline : outline?.slice(0, 1);

  return (
    <Layout>
      <Container>
        {loading ? (
          <div className="flex flex-col justify-center items-center">
            <Spinner />
          </div>
        ) : error ? (
          <div className="flex flex-col justify-center items-center">
            <p className="text-red-500">Error fetching courses</p>
            <Button
              variant="secondary"
              className="w-[289px]"
              onClick={() => fetchBlogDetails()}
            >
              Try Again
            </Button>
          </div>
        ) : (
          <>
            <h3 className="text-[44px] font-bold text-[#120A02] mb-8 w-[60%]">
              {courseData?.title}
            </h3>

            <div className="grid md:grid-cols-2 gap-20 mb-14">
              {courseData?.course_tab === "Premium" ? (
                <>
                  {data?.sub_status ? (
                    <div
                      key={`video-${courseData?.id}`}
                      dangerouslySetInnerHTML={{
                        __html: courseData?.video_link || "",
                      }}
                      className="w-[333px] h-[567px] rounded-2xl"
                    />
                  ) : (
                    <div onClick={handleCheckOut} className=" cursor-pointer">
                      <Image
                        src="/assets/learning/youtube-image.webp"
                        width={333}
                        height={567}
                        className="w-[679px] h-[467px] rounded-xl"
                        alt="youtube"
                      />
                    </div>
                  )}
                </>
              ) : (
                <div
                  key={`video-${courseData?.id}`}
                  dangerouslySetInnerHTML={{
                    __html: courseData?.video_link || "",
                  }}
                  className="w-[333px] h-[467px] rounded-2xl"
                />
              )}

              <div className=" shadow-2xl rounded-xl p-6 bg-[#FFFFFF] h-fit">
                <div className="flex items-center gap-x-5 mb-5">
                  <p className="text-xl font-semibold text-[#0F0918]">
                    Course Overview
                  </p>
                  <p className="px-4 py-1.5 bg-[#98EEAF] border-[0.5px] border-[#55FF83] rounded-2xl text-xs text-[#00260A] font-normal">
                    Available
                  </p>
                </div>

                <div className="bg-[#FBFAF9] p-6 rounded-b-md flex flex-col gap-y-6">
                  {courseTabData.map((el, i) => (
                    <div className="flex items-center gap-1" key={i}>
                      <span>
                        <IoMdTime size={24} color="#413B35" />
                      </span>{" "}
                      <p className="text-[#413B35] text-base font-normal">
                        {el?.head}{" "}
                        <span className="font-semibold">{el?.subhead}</span>
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-col gap-y-5">
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={handleCheckOut}
                  >
                    Enrol Now
                  </Button>
                  <Link href={"/project/submit"}>
                    <Button variant="secondary" className="w-full">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-14">
              {courseData?.course_tab === "Webinar" ? (
                <div className="flex gap-x-3 items-center justify-between border-b border-[#E4E7EC]">
                  {tabs.map((el, i) => (
                    <button
                      className={`${
                        activeBtn === el.name
                          ? "text-[#7B4C1F] border-b-[2px] border-[#7B4C1F] bg-[#F2EDE9]"
                          : "text-[#413B35] border-b-[1px] border-transparent "
                      }   font-normal text-base p-4  cursor-pointer`}
                      onClick={() => setActiveBtn(el.name)}
                      key={i}
                    >
                      {el.name}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex gap-x-3 items-center border-b border-[#E4E7EC]">
                  {premiumFreeTab.map((el, i) => (
                    <button
                      className={`${
                        activeBtn === el.name
                          ? "text-[#7B4C1F] border-b-[2px] border-[#7B4C1F] bg-[#F2EDE9]"
                          : "text-[#413B35] border-b-[1px] border-transparent "
                      }   font-normal text-base p-4  cursor-pointer`}
                      onClick={() => setActiveBtn(el.name)}
                      key={i}
                    >
                      {el.name}
                    </button>
                  ))}
                </div>
              )}

              <>
                {activeBtn === "Overview" && (
                  <div className="p-6 boroder border-[#D6C8BA] rounded-xl my-12 w-[60%] mx-auto bg-[white]">
                    <p className="mb-5 text-xl font-semibold font-montserrat">
                      Overview
                    </p>
                    <div className="p-6 rounded-lg bg-[rgb(251,250,249)]">
                      <p
                        className="text-[#413B35] text-base font-inter font-normal"
                        dangerouslySetInnerHTML={{
                          __html: `${courseData?.overview}` || " N/A",
                        }}
                      />
                    </div>
                  </div>
                )}

                {activeBtn === "Training Software" && (
                  <div className="p-6 boroder border-[#D6C8BA] rounded-xl my-12 w-[60%] mx-auto bg-[white]">
                    <p className="mb-5 text-xl font-semibold font-montserrat">
                      Training Software
                    </p>
                    <div className="p-6 rounded-lg bg-[rgb(251,250,249)]">
                      {courseData?.training_software?.map((el, i) => {
                        return (
                          <p
                            className="text-[#413B35] text-base font-inter font-normal"
                            key={i}
                          >
                            {el?.name}
                          </p>
                        );
                      }) || " N/A"}
                    </div>
                  </div>
                )}

                {activeBtn === "Objectives" && (
                  <div className="p-6 boroder border-[#D6C8BA] rounded-xl my-12 w-[60%] mx-auto bg-[white]">
                    <p className="mb-5 text-xl font-semibold font-montserrat">
                      Objectives
                    </p>
                    <div className="p-6 rounded-lg bg-[rgb(251,250,249)]">
                      <p
                        className="text-[#413B35] text-base font-inter font-normal"
                        dangerouslySetInnerHTML={{
                          __html: `${courseData?.course_objective}` || " N/A",
                        }}
                      />
                    </div>
                  </div>
                )}

                {activeBtn === "Timeline" && (
                  <div className="p-6 boroder border-[#D6C8BA] rounded-xl my-12 w-[60%] mx-auto bg-[white]">
                    <p className="mb-5 text-xl font-semibold font-montserrat">
                      Timeline
                    </p>
                    <div className="p-6 rounded-lg bg-[rgb(251,250,249)]">
                      <p
                        className="text-[#413B35] text-base font-inter font-normal"
                        dangerouslySetInnerHTML={{
                          __html: `${courseData?.timeline}` || " N/A",
                        }}
                      />
                    </div>
                  </div>
                )}

                {activeBtn === "Deliverables" && (
                  <div className="p-6 boroder border-[#D6C8BA] rounded-xl my-12 w-[60%] mx-auto bg-[white]">
                    <p className="mb-5 text-xl font-semibold font-montserrat">
                      Deliverables
                    </p>
                    <div className="p-6 rounded-lg bg-[rgb(251,250,249)]">
                      <p
                        className="text-[#413B35] text-base font-inter font-normal"
                        dangerouslySetInnerHTML={{
                          __html: `${courseData?.deliverables}` || " N/A",
                        }}
                      />
                    </div>
                  </div>
                )}

                {activeBtn === "Target Audience" && (
                  <div className="p-6 boroder border-[#D6C8BA] rounded-xl my-12 w-[60%] mx-auto bg-[white]">
                    <p className="mb-5 text-xl font-semibold font-montserrat">
                      Target Audience
                    </p>
                    <div className="p-6 rounded-lg bg-[rgb(251,250,249)]">
                      <div
                        className="text-[#413B35]  font-inter font-normal"
                        dangerouslySetInnerHTML={{
                          __html: `${courseData?.audience} ` || " N/A",
                        }}
                      />
                    </div>
                  </div>
                )}

                {activeBtn === "Prerequisite" && (
                  <div className="p-6 boroder border-[#D6C8BA] rounded-xl my-12 w-[60%] mx-auto bg-[white]">
                    <p className="mb-5 text-xl font-semibold font-montserrat">
                      Prerequisite
                    </p>
                    <div className="p-6 rounded-lg bg-[rgb(251,250,249)]">
                      <div
                        className="text-[#413B35]  font-inter font-normal"
                        dangerouslySetInnerHTML={{
                          __html: `${courseData?.prerequisite}` || " N/A",
                        }}
                      />
                    </div>
                  </div>
                )}
              </>
            </div>
          </>
        )}

        <RelatedCourses />
      </Container>
    </Layout>
  );
};

export default CourseDetails;
