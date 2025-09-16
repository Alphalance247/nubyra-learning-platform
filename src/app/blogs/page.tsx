"use client";
import BlogCard from "../components/common/blogCard";
import Container from "../components/common/container";
import HeroCommon from "../components/common/heroCommon";
import Layout from "../components/common/layout";
import GetInTouch from "../components/home/getInTouch";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Button from "../components/common/buttons";
import Spinner from "../components/common/spinner/spinner";
import { environment } from "../env/env.local";
import BlogFilterModal from "../components/common/blogFilterModal";
import SortDropdown from "../components/common/sortDropdown";
import { FaChevronDown } from "react-icons/fa";
import { BsFilterLeft } from "react-icons/bs";
import { useFilterSortStore } from "@/stores/courses/filterSortStore";

interface BlogsProps {
  id: string;
  title: string;
  blog_images: {
    image: string;
  }[];
  post_meta: {
    author_name: string[];
    date: string;
  };
}

const Blogs = () => {
  const [blogsData, setBlogsData] = useState<BlogsProps[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogsProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [currentSort, setCurrentSort] = useState<string>("");
  const [appliedFilters, setAppliedFilters] = useState<
    Record<string, string[]>
  >({});

  const { fetchFilterOptions } = useFilterSortStore();

  const errrMesaage =
    "An error occurred while fetching the projects. Please try again later.";

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${environment?.baseUrl}/blogs/`, {
        page: 1,
      });
      if (res.status === 200 && Array.isArray(res.data.response?.blogs)) {
        setBlogsData(res?.data?.response?.blogs);
        setFilteredBlogs(res?.data?.response?.blogs);
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
  };

  useEffect(() => {
    fetchProjects();
    fetchFilterOptions();
  }, [fetchFilterOptions]);

  function slugify(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
      .replace(/(^-|-$)+/g, ""); // Remove leading/trailing hyphens
  }

  const filterBlogs = (filters: string[], sort: string) => {
    let filtered = [...blogsData];

    // Apply filters
    if (filters.length > 0) {
      filtered = filtered.filter((blog) => {
        return filters.some((filter) => {
          // Check if filter matches author
          return blog.post_meta.author_name.some((name) =>
            name.toLowerCase().includes(filter.toLowerCase())
          );
        });
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sort) {
        case "newest-first":
          return (
            new Date(b.post_meta.date).getTime() -
            new Date(a.post_meta.date).getTime()
          );
        case "oldest-first":
          return (
            new Date(a.post_meta.date).getTime() -
            new Date(b.post_meta.date).getTime()
          );
        default:
          return (
            new Date(b.post_meta.date).getTime() -
            new Date(a.post_meta.date).getTime()
          );
      }
    });

    setFilteredBlogs(filtered);
  };

  return (
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
          {/* Header + Filters - Exact copy from explore courses */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-14 gap-4 md:gap-0">
            <h4 className="text-xl md:text-2xl font-semibold text-[#120A02]">
              All Blogs ({filteredBlogs.length})
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
                  onClick={() => {
                    setError("");
                    fetchProjects();
                  }}
                >
                  <span className="text-white">Retry</span>
                </Button>
              </div>
            )}

            {loading ? (
              <div className="flex flex-col items-center">
                <Spinner />
                <p className="text-lg text-gray-500 mt-4">
                  Loading projects...
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredBlogs?.map((blog, i) => (
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
          </div>
        </div>
      </Container>
      <GetInTouch />

      {/* Blog Filter Modal */}
      <BlogFilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onChange={(filters) => {
          // only refetch when filters actually change
          const prevFlat = Object.values(appliedFilters).flat().join(",");
          const nextFlat = Object.values(filters).flat().join(",");
          if (prevFlat === nextFlat) return;

          setAppliedFilters(filters);
          const flatFilters = Object.values(filters).flat();
          filterBlogs(flatFilters, currentSort || "newest-first");
        }}
      />
    </Layout>
  );
};

export default Blogs;
