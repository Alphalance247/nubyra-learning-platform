"use client";
import Button from "../common/buttons";
import Container from "../common/container";
import HeadingSubhead from "../common/headingSubhead";
import ProjectCard from "../common/projectCard";
import { FaChevronDown } from "react-icons/fa";
import { BsFilterLeft } from "react-icons/bs";
import axios, { AxiosError } from "axios";
import { useEffect, useState, useCallback } from "react";
import Spinner from "../common/spinner/spinner";
import { environment } from "@/app/env/env.local";
import Pagination from "../common/pagination";
import ProjectFilterModal from "../common/projectFilterModal";
import SortDropdown from "../common/sortDropdown";
import { useFilterSortStore } from "@/stores/courses/filterSortStore";

interface Project {
  images: { image: string }[];
  project_title: string;
  project_type: string;
  country: string;
  project_scope: string;
  project_duration: string;
  prid: string;
}

const Explore = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [currentSort, setCurrentSort] = useState<string>("");
  const [appliedFilters, setAppliedFilters] = useState<
    Record<string, string[]>
  >({});

  const { fetchFilterOptions } = useFilterSortStore();
  console.log(projects);

  const errrMesaage =
    "An error occurred while fetching the projects. Please try again later.";

  const fetchProjects = useCallback(
    async (page: number = currentPage) => {
      setLoading(true);
      try {
        const res = await axios.post(`${environment?.baseUrl}/project-list/`, {
          page,
        });

        if (res.status === 200 && Array.isArray(res.data.projects)) {
          setProjects(res.data.projects);
          setFilteredProjects(res.data.projects);

          // backend pagination values
          setTotalPages(res.data.total_pages || 1);
          setCurrentPage(res.data.current_page || 1);

          // if backend doesn't send total_items, use current page length
          // setTotalItems(res.data.total_items ?? res.data.projects.length);
        } else {
          setError(errrMesaage);
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err.message || errrMesaage);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    },
    [currentPage]
  );

  useEffect(() => {
    fetchProjects();
    fetchFilterOptions();
  }, [fetchFilterOptions, fetchProjects]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchProjects(page);
  };

  const filterProjects = (filters: string[], sort: string) => {
    let filtered = [...projects];

    // Apply filters
    if (filters.length > 0) {
      filtered = filtered.filter((project) => {
        return filters.some((filter) => {
          // Check if filter matches project type (for Type field)
          // and project scope (for Engineering Field)
          return (
            project.project_type.toLowerCase().includes(filter.toLowerCase()) ||
            project.project_scope.toLowerCase().includes(filter.toLowerCase())
          );
        });
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sort) {
        case "newest-first":
          return (
            new Date(b.project_duration).getTime() -
            new Date(a.project_duration).getTime()
          );
        case "oldest-first":
          return (
            new Date(a.project_duration).getTime() -
            new Date(b.project_duration).getTime()
          );
        default:
          return (
            new Date(b.project_duration).getTime() -
            new Date(a.project_duration).getTime()
          );
      }
    });

    setFilteredProjects(filtered);
  };

  return (
    <section className="bg-[#FBFAF9] py-12 sm:py-16 lg:py-20">
      <Container>
        <HeadingSubhead
          heading="Explore all projects"
          subheading="Explore our process engineering innovations, hands-on research, and most effective engineering solutions, all available in this hub."
        />

        <div className="mt-10 sm:mt-12 lg:mt-16">
          {/* Header + Filters - Exact copy from explore courses */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
            <h4 className="text-xl md:text-2xl font-semibold text-[#120A02]">
              All Projects ({filteredProjects.length})
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
                  filterProjects(flatFilters, apiSort);
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

          {error && (
            <div className="mt-8 text-center text-red-600 text-lg font-semibold flex flex-col items-center justify-center">
              <p>{error}</p>
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
            <div className="flex flex-col items-center mt-8">
              <Spinner />
              <p className="text-lg text-gray-500 mt-4">Loading projects...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-y-4 gap-x-4 mt-10 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project, i) => (
                  <ProjectCard
                    image={project?.images[0]?.image}
                    title={project.project_title}
                    type={project.project_type}
                    clientLocation={project.country}
                    projectScope={project.project_scope}
                    projectDuration={project.project_duration}
                    buttonText="View Project"
                    key={i}
                    url={`/project/${project?.prid}`}
                  />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </Container>

      {/* Project Filter Modal */}
      <ProjectFilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onChange={(filters) => {
          // only refetch when filters actually change
          const prevFlat = Object.values(appliedFilters).flat().join(",");
          const nextFlat = Object.values(filters).flat().join(",");
          if (prevFlat === nextFlat) return;

          setAppliedFilters(filters);
          const flatFilters = Object.values(filters).flat();
          filterProjects(flatFilters, currentSort || "newest-first");
        }}
      />
    </section>
  );
};

export default Explore;
