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
  const { handleCheckOut } = useCheckout();

  useEffect(() => {
    fetchCourseList();
    fetchAllCourses();
    fetchSubscriptionStatus();
  }, [fetchCourseList, fetchAllCourses, fetchSubscriptionStatus]);

  const [activeBtn, setActiveBtn] = useState<string>("Webinars");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [currentSort, setCurrentSort] = useState<string>("");

  const itemsPerPage = 10;
  const { applyFiltersAndSort } = useFilterSortStore();

  const tabs: { id: number; name: string }[] = [
    { id: 2, name: "Webinars" },
    { id: 3, name: "Premium Courses" },
    { id: 4, name: "Free Courses" },
  ];

  useEffect(() => {
    const applyFilters = async () => {
      const courses = await applyFiltersAndSort();
      if (courses) {
        setTotalItems(courses.length);
        setTotalPages(Math.ceil(courses.length / itemsPerPage));
        setCurrentPage(1);
      }
    };

    applyFilters();
  }, [applyFiltersAndSort, itemsPerPage]);

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
            {tabs.map((el) => (
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
          <Spinner />
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
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-14 gap-4 md:gap-0">
              <h4 className="text-xl md:text-2xl font-semibold text-[#120A02]">
                All Courses ({totalItems || data?.courses?.length || 0})
              </h4>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="secondary"
                  className="flex items-center gap-2"
                  onClick={() => setShowFilterModal(true)}
                >
                  <BsFilterLeft className="text-[#7B4C1F]" />
                  Filter by
                  <FaChevronDown className="text-[#7B4C1F]" />
                </Button>

                <SortDropdown
                  currentSort={currentSort}
                  onSortChange={setCurrentSort}
                />
              </div>
            </div>
            {activeBtn === "Webinars" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                {fetchAllCoursedata?.Webinar?.courses?.map((course, index) => (
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
            {activeBtn === "Premium Courses" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                {fetchAllCoursedata?.Premium?.courses?.map((el, i) => (
                  <PremiumCourseCard
                    key={i}
                    image={el?.image}
                    title={el?.title}
                    type={el?.course_tab}
                    link={`/learning/${el?.cid}`}
                    onClickWatch={() => {
                      if (subStatus?.sub_status) {
                        router.push(`/learning/${el?.cid}`);
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
            {activeBtn === "Free Courses" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
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
            {totalPages > 1 && (
              <div className="mt-10 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </Container>
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
      />
    </section>
  );
};

export default ExploreCourses;
