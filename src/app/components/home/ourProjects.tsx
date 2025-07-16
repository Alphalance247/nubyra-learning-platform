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

  // const projects = [
  //   {
  //     image: "/assets/home/proj1.png",
  //     title: "Combined Cycle Power Plant P&ID Development",
  //     projectType:
  //       "AutoCAD Plant 3D, P&ID development, P&ID modification, Line",
  //     clientLocation: "Spain",
  //     projectScope: "Detailed Design",
  //     projectDuration: "3 weeks",
  //   },
  //   {
  //     image: "/assets/home/proj2.png",
  //     title: "Combined Cycle Power Plant P&ID Development",
  //     projectType:
  //       "AutoCAD Plant 3D, P&ID development, P&ID modification, Line",
  //     clientLocation: "Spain",
  //     projectScope: "Detailed Design",
  //     projectDuration: "3 weeks",
  //   },
  //   {
  //     image: "/assets/home/proj3.png",
  //     title: "Combined Cycle Power Plant P&ID Development",
  //     projectType:
  //       "AutoCAD Plant 3D, P&ID development, P&ID modification, Line",
  //     clientLocation: "Spain",
  //     projectScope: "Detailed Design",
  //     projectDuration: "3 weeks",
  //   },
  // ];

  return (
    <section className="bg-[#FBFAF9]">
      <Container>
        <HeadingSubhead
          heading="Explore Our Projects"
          subheading="See how we turn ideas into reality — from student innovations to real-world process solutions."
          headingClassName="text-[#120A02]"
          subheadingClassName="text-[#413B35]"
        />

        {loading ? (
          <div className="mt-4">
            <Spinner />
            <p className="text-lg font-medium mt-4">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="mt-15 flex flex-col justify-center items-center">
            <p className="text-red-500">Error fetching projects</p>
            <Button
              variant="secondary"
              className="w-[289px]"
              onClick={() => fetchProjectList()}
            >
              Try Again
            </Button>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-8 mt-15">
              {data?.response?.slice(0, 3).map((project, index) => (
                <ProjectCard
                  key={index}
                  image={project?.image}
                  title={project?.project_title}
                  type={project?.project_type}
                  clientLocation={project?.country}
                  projectScope={project?.project_scope}
                  projectDuration={project?.project_duration}
                  buttonText="View Full Details"
                />
              ))}
            </div>
          </>
        )}

        <div className="mt-15 flex flex-col items-center justify-center">
          <Link href="/project">
            <Button variant="primary" className="w-[289px]">
              Explore More Projects
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default OurProjects;
