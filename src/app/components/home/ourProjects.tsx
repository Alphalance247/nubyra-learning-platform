"use client";
import Button from "../common/buttons";
import Container from "../common/container";
import HeadingSubhead from "../common/headingSubhead";
import ProjectCard from "../common/projectCard";
import { getProjectListStore } from "@/stores/projects/getProjectList";
import { useEffect } from "react";
import Spinner from "../common/spinner/spinner";
import Link from "next/link";

const OurProjects = () => {
  const { data, loading, error, fetchProjectList } = getProjectListStore();

  useEffect(() => {
    fetchProjectList();
  }, [fetchProjectList]);

  return (
    <section className="bg-[#FBFAF9] py-12 md:py-20">
      <Container>
        <HeadingSubhead
          heading="Explore Our Projects"
          subheading="See how we turn ideas into reality — from student innovations to real-world process solutions."
          headingClassName="text-[#120A02] text-center"
          subheadingClassName="text-[#413B35] text-center "
        />

        {loading ? (
          <div className="mt-6 flex flex-col items-center">
            <Spinner />
            <p className="text-lg font-medium mt-4">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="mt-12 flex flex-col justify-center items-center gap-4">
            <p className="text-red-500 text-center">Error fetching projects</p>
            <Button
              variant="secondary"
              className="w-full sm:w-72"
              onClick={() => fetchProjectList()}
            >
              Try Again
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {data?.response?.slice(0, 6).map((project, index) => (
              <ProjectCard
                key={index}
                image={project?.images[0]?.image}
                title={project?.field?.label}
                type={project?.project_type}
                clientLocation={project?.country}
                projectScope={project?.project_scope}
                projectDuration={project?.project_duration}
                buttonText="View Full Details"
                url={`/project/${project?.prid}`}
              />
            ))}
          </div>
        )}

        <div className="mt-12 flex items-center justify-center">
          <Link href="/project">
            <Button variant="primary" className="w-full sm:w-72">
              Explore More Projects
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default OurProjects;
