"use client";
import Button from "../common/buttons";
import Container from "../common/container";
import HeadingSubhead from "../common/headingSubhead";
import ProjectCard from "../common/projectCard";
import { FaChevronDown } from "react-icons/fa";
import { BsFilterLeft } from "react-icons/bs";
import { useEffect, useState } from "react";
import Spinner from "../common/spinner/spinner";
import Pagination from "../common/pagination";
import ProjectFilterModal from "../common/projectFilterModal";
import SortDropdown from "../common/sortDropdown";
import { useFilterSortStore } from "@/stores/courses/filterSortStore";
import { getAllProjects } from "@/stores/projects/getAllProjects";

const Explore = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [currentSort, setCurrentSort] = useState<string>("");
  const [appliedFilters, setAppliedFilters] = useState<
    Record<string, string[]>
  >({});

  const { fetchFilterOptions } = useFilterSortStore();
  const {
    data: projectData,
    fetchAllProjects,
    filterProjects,
    error,
    loading,
  } = getAllProjects();

  useEffect(() => {
    fetchAllProjects();
    fetchFilterOptions();
  }, [fetchAllProjects, fetchFilterOptions]);

  const handlePageChange = (page: number) => {
    const flatFilters = Object.values(appliedFilters).flat();
    filterProjects(flatFilters, currentSort || "newest-first", page);
  };

  return (
    <section className="bg-[#FBFAF9] py-12 sm:py-16 lg:py-20">
      <Container>
        <HeadingSubhead
          heading="Explore all projects"
          subheading="Explore our process engineering innovations, hands-on research, and most effective engineering solutions, all available in this hub."
        />

        <div className="mt-10 sm:mt-12 lg:mt-16">
          {/* Header + Filters */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
            <h4 className="text-xl md:text-2xl font-semibold text-[#120A02]">
              All Projects ({projectData?.projects?.length || 0})
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
                className="flex items-center  w-full justify-center md:w-auto gap-2"
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
                onClick={() => fetchAllProjects()}
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
                {projectData?.projects?.map((project, i) => (
                  <ProjectCard
                    image={project?.images[0]?.image}
                    title={project.project_title}
                    type={project.type_project}
                    clientLocation={project.country}
                    projectScope={project.project_scope}
                    projectDuration={project.project_duration}
                    buttonText="View Project"
                    key={i}
                    url={`/project/${project?.prid}`}
                  />
                ))}
              </div>

              {projectData && projectData.total_pages > 1 && (
                <Pagination
                  currentPage={projectData.current_page}
                  totalPages={projectData.total_pages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </Container>

      {/* Project Filter Modal */}
      <ProjectFilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onChange={(filters) => {
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
