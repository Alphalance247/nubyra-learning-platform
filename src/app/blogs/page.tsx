"use client";
import BlogCard from "../components/common/blogCard";
import Container from "../components/common/container";
import HeroCommon from "../components/common/heroCommon";
import Layout from "../components/common/layout";
import GetInTouch from "../components/home/getInTouch";
import { useEffect, useState } from "react";
import Button from "../components/common/buttons";
import Spinner from "../components/common/spinner/spinner";
import BlogFilterModal from "../components/common/blogFilterModal";
import SortDropdown from "../components/common/sortDropdown";
import { FaChevronDown } from "react-icons/fa";
import { BsFilterLeft } from "react-icons/bs";
import { useFilterSortStore } from "@/stores/courses/filterSortStore";
import { getAllBlogs } from "@/stores/blogs/getAllBlogs";
import Pagination from "../components/common/pagination";
import Head from "next/head";

const Blogs = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [currentSort, setCurrentSort] = useState<string>("");
  const [appliedFilters, setAppliedFilters] = useState<
    Record<string, string[]>
  >({});

  const { fetchFilterOptions } = useFilterSortStore();
  const {
    data: blogData,
    fetchAllBlogs,
    filterBlogs,
    error,
    loading,
  } = getAllBlogs();

  useEffect(() => {
    fetchAllBlogs();
    fetchFilterOptions();
  }, [fetchAllBlogs, fetchFilterOptions]);

  function slugify(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
      .replace(/(^-|-$)+/g, ""); // Remove leading/trailing hyphens
  }

  const handlePageChange = (page: number) => {
    const flatFilters = Object.values(appliedFilters).flat();
    filterBlogs(flatFilters, currentSort || "newest-first", page);
  };

  return (
    <>
      <Head>
        <title>Nubyira Blog - Nubyira Process Designer</title>
        <meta
          name="description"
          content="Nubyira Blog is an online information platform that serves as means of communication and sharing engineering information with students and engineers all over the world."
        />
        <meta
          name="keywords"
          content="Nubyira, blog, learning, process design, education"
        />
      </Head>
      <Layout>
        <HeroCommon
          heading="Nubyira "
          span="Blog"
          description="Explore how Nubyira Blog transforms ideas into impactful learning!"
          bgUrl="bg-[url(/assets/blogs/blog-hero.png)]"
          btnText="Submit Project Request"
          btnLink="/project/submit"
        />

        <Container>
          <div className="flex flex-col gap-y-10">
            {/* Header + Filters */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-14 gap-4 md:gap-0">
              <h4 className="text-xl md:text-2xl font-semibold text-[#120A02]">
                All Blogs ({blogData?.blogs?.length || 0})
              </h4>
              <div className="flex flex-wrap gap-2">
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
                    filterBlogs(flatFilters, apiSort);
                  }}
                />
                <Button
                  variant="secondary"
                  className="flex items-center gap-2"
                  onClick={() => setShowFilterModal(true)}
                >
                  <BsFilterLeft className="text-[#7B4C1F]" />
                  Filter by
                  <FaChevronDown className="text-[#7B4C1F]" />
                </Button>
              </div>
            </div>

            <div>
              {error && (
                <div className="mt-8 text-center text-red-600 text-lg font-semibold flex flex-col items-center justify-center">
                  <p> {error}</p>
                  <Button
                    variant="primary"
                    className="mt-4"
                    onClick={() => fetchAllBlogs()}
                  >
                    <span className="text-white">Retry</span>
                  </Button>
                </div>
              )}

              {loading ? (
                <div className="flex flex-col items-center">
                  <Spinner />
                  <p className="text-lg text-gray-500 mt-4">Loading blogs...</p>
                </div>
              ) : (
                <>
                  {blogData?.blogs?.length === 0 ? (
                    <p className="text-center">
                      No results
                      <br />
                      You may want to try adjusting your filters.
                    </p>
                  ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {blogData?.blogs?.map((blog, i) => (
                        <BlogCard
                          key={i}
                          image={blog?.blog_images[0]?.image}
                          blogTitle={blog?.title}
                          author_name={blog?.post_meta?.author_name[0]}
                          datePosted={blog?.post_meta?.date}
                          blogUrl={`/blogs/${blog.id}-${slugify(blog.title)}`}
                        />
                      ))}
                    </div>
                  )}

                  {blogData && blogData.total_pages > 1 && (
                    <div className="mt-10 flex justify-center">
                      <Pagination
                        currentPage={blogData.current_page}
                        totalPages={blogData.total_pages}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </Container>
        <GetInTouch />

        {/* Blog Filter Modal */}
        <BlogFilterModal
          isOpen={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          onChange={(filters) => {
            const prevFlat = Object.values(appliedFilters).flat().join(",");
            const nextFlat = Object.values(filters).flat().join(",");
            if (prevFlat === nextFlat) return;

            setAppliedFilters(filters);
            const flatFilters = Object.values(filters).flat();
            filterBlogs(flatFilters, currentSort || "newest-first");
          }}
        />
      </Layout>
    </>
  );
};

export default Blogs;
