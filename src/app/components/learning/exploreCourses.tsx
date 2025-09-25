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
import { useCheckout } from "@/app/utils/checkoutUtility";
import FilterModal from "../common/filterModal";
import SortDropdown from "../common/sortDropdown";
import Pagination from "../common/pagination";
import { useFilterSortStore } from "@/stores/courses/filterSortStore";

type WebinarCourse =
  import("@/stores/courses/getAllCourses").webinarCourseData["courses"][number];
type PremiumCourse =
  import("@/stores/courses/getAllCourses").premiumCourseData["courses"][number];
type FreeCourse =
  import("@/stores/courses/getAllCourses").freeCourseData["courses"][number];

const ExploreCourses = () => {
  const { fetchCourseList } = getCourseListStore();
  const { fetchFilterOptions } = useFilterSortStore();
  const {
    data: fetchAllCoursedata,
    fetchAllCourses,
    filterCourses,
    error,
    loading,
  } = getAllCourses();
  const { data: subStatus, fetchSubscriptionStatus } =
    getSubscriotionStatusStore();

  const router = useRouter();
  const { handleCheckOut } = useCheckout();

  useEffect(() => {
    fetchSubscriptionStatus();
    fetchCourseList();
    fetchAllCourses();
    fetchFilterOptions();
  }, []);

  const [activeBtn, setActiveBtn] = useState<string>("Webinars");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [currentSort, setCurrentSort] = useState<string>("");
  const [appliedFilters, setAppliedFilters] = useState<
    Record<string, string[]>
  >({});

  const webinars: WebinarCourse[] = fetchAllCoursedata?.Webinar?.courses ?? [];
  const premium: PremiumCourse[] = fetchAllCoursedata?.Premium?.courses ?? [];
  const free: FreeCourse[] = fetchAllCoursedata?.Free?.courses ?? [];
  const totalCoursesCount = webinars.length + premium.length + free.length;

  return (
    <section className="bg-[#FBFAF9] relative overflow-hidden">
      <div className="absolute top-0 left-0 z-0 w-full h-full md:h-[600px]">
        <Image
          src="/assets/home/img.png"
          alt="courses-bg"
          fill
          className="object-cover opacity-20 md:opacity-100"
        />
      </div>

      <Container className="relative z-10">
        <HeadingSubhead withSubhead={false} heading="Explore Our Courses" />
        <div className="mt-6 w-full md:w-[750px] mx-auto">
          <div className="flex gap-2 px-3 py-2 border bg-[#FEFEFD] border-[#F2EDE9] rounded-2xl overflow-x-auto md:overflow-x-visible scrollbar-hide">
            {[
              { id: 2, name: "Webinars" },
              { id: 3, name: "Premium Courses" },
              { id: 4, name: "Free Courses" },
            ].map((el) => (
              <button
                key={el.id}
                className={`${
                  activeBtn === el.name
                    ? "text-white bg-[#7B4C1F]"
                    : "text-[#5E5A64] border border-[#E7E7E6] bg-[#FBFAF9]"
                } font-medium text-sm sm:text-lg px-3 py-2 sm:py-4 cursor-pointer rounded-2xl flex-shrink-0 md:flex-1 text-center`}
                onClick={() => setActiveBtn(el.name)}
              >
                {el.name}
              </button>
            ))}
          </div>
        </div>
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <Spinner />
            <p className="text-lg text-[#95704C] font-medium mt-4">Loading courses...</p>
          </div>
        ) : error ? (
          <div className="mt-8 text-center text-red-600 text-lg font-semibold flex flex-col items-center justify-center">
            <p>{error}</p>
            <Button
              variant="primary"
              className="mt-4"
              onClick={() => fetchAllCourses()}
            >
              <span className="text-white">Retry</span>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row mt-4 md:mt-10 justify-between md:items-center gap-4 md:gap-0">
              <h4 className="text-xl md:text-2xl font-semibold text-[#120A02] text-left">
                All Courses ({totalCoursesCount})
              </h4>
              <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                <SortDropdown
                  currentSort={currentSort}
                  onSortChange={(sort) => {
                    const mapSort = (s: string) => {
                      if (!s) return "newest-first";
                      if (s === "recent") return "newest-first";
                      if (s === "newest") return "newest-first";
                      if (s === "oldest") return "oldest-first";
                      return s;
                    };
                    const apiSort = mapSort(sort);
                    setCurrentSort(apiSort);
                    const flatFilters = Object.values(appliedFilters).flat();
                    filterCourses(flatFilters, apiSort);
                  }}
                />
                <Button
                  variant="secondary"
                  className="flex items-center w-full justify-center md:w-auto gap-2"
                  onClick={() => setShowFilterModal(true)}
                >
                  <BsFilterLeft className="text-[#7B4C1F]" />
                  Filter by
                  <FaChevronDown className="text-[#7B4C1F]" />
                </Button>
              </div>
            </div>
            {activeBtn === "Webinars" && fetchAllCoursedata?.Webinar && (
              <>
                {webinars?.length === 0 ? (
                  <p className="text-center mt-8">
                    No results
                    <br />
                    You may want to try adjusting your filters.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                    {webinars.map((course) => (
                      <CourseCard
                        key={course.cid}
                        image={course.image}
                        title={course.title}
                        price={course.price}
                        time={course.duration}
                        duration={course.number_of_days}
                        link={`/learning/${course.cid}`}
                        onClickEnroll={() => handleCheckOut(course)}
                      />
                    ))}
                  </div>
                )}
                {fetchAllCoursedata.Webinar.total_pages > 1 && (
                  <div className="mt-10 flex justify-center">
                    <Pagination
                      currentPage={fetchAllCoursedata.Webinar.current_page}
                      totalPages={fetchAllCoursedata.Webinar.total_pages}
                      onPageChange={(page) => {
                        const flatFilters =
                          Object.values(appliedFilters).flat();
                        filterCourses(flatFilters, currentSort, page);
                      }}
                    />
                  </div>
                )}
              </>
            )}

            {activeBtn === "Premium Courses" && fetchAllCoursedata?.Premium && (
              <>
                {premium?.length === 0 ? (
                  <p className="text-center mt-8">
                    No results
                    <br />
                    You may want to try adjusting your filters.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                    {premium.map((course) => (
                      <PremiumCourseCard
                        key={course.cid}
                        image={course.image}
                        title={course.title}
                        type={course.course_tab}
                        link={`/learning/${course.cid}`}
                        onClickWatch={() => {
                          if (subStatus?.sub_status) {
                            router.push(`/learning/${course.cid}`);
                          } else {
                            router.push("/learning/premium-subscription");
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
                {fetchAllCoursedata.Premium.total_pages > 1 && (
                  <div className="mt-10 flex justify-center">
                    <Pagination
                      currentPage={fetchAllCoursedata.Premium.current_page}
                      totalPages={fetchAllCoursedata.Premium.total_pages}
                      onPageChange={(page) => {
                        const flatFilters =
                          Object.values(appliedFilters).flat();
                        filterCourses(flatFilters, currentSort, page);
                      }}
                    />
                  </div>
                )}
              </>
            )}

            {activeBtn === "Free Courses" && fetchAllCoursedata?.Free && (
              <>
                {free?.length === 0 ? (
                  <p className="text-center mt-8">
                    No results
                    <br />
                    You may want to try adjusting your filters.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                    {free.map((course) => (
                      <PremiumCourseCard
                        key={course.cid}
                        image={course.image}
                        title={course.title}
                        type={course.course_tab}
                        link={`/learning/${course.cid}`}
                        onClickWatch={() =>
                          router.push(`/learning/${course.cid}`)
                        }
                        subcribeText="Watch for free"
                        btnName="Watch Now"
                      />
                    ))}
                  </div>
                )}
                {fetchAllCoursedata.Free.total_pages > 1 && (
                  <div className="mt-10 flex justify-center">
                    <Pagination
                      currentPage={fetchAllCoursedata.Free.current_page}
                      totalPages={fetchAllCoursedata.Free.total_pages}
                      onPageChange={(page) => {
                        const flatFilters =
                          Object.values(appliedFilters).flat();
                        filterCourses(flatFilters, currentSort, page);
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </Container>

      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onChange={(filters) => {
          const prevFlat = Object.values(appliedFilters).flat().join(",");
          const nextFlat = Object.values(filters).flat().join(",");
          if (prevFlat === nextFlat) return;

          setAppliedFilters(filters);
          const flatFilters = Object.values(filters).flat();
          filterCourses(flatFilters, currentSort || "newest-first");
        }}
      />
    </section>
  );
};

export default ExploreCourses;
