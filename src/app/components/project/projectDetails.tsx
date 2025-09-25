"use client";
import React, { useEffect, useState } from "react";
import Container from "@/app/components/common/container";
import Layout from "@/app/components/common/layout";
import Image from "next/image";
import ProjectCard from "@/app/components/common/projectCard";
import Button from "@/app/components/common/buttons";
import axios, { AxiosError } from "axios";
import Spinner from "../common/spinner/spinner";
import { getProjectListStore } from "@/stores/projects/getProjectList";
import { environment } from "@/app/env/env.local";
import Link from "next/link";

interface projectDetailsProps {
  response: {
    country: string;
    images: { image: string }[];
    meta: string;
    project_completion_date: string;
    project_duration: string;
    project_full_name: string;
    project_nature: string;
    project_scope: string;
    project_title: string;
    type_project: string;
    introduction: string;
    field: string;
  };
}

const ProjectDetailsPage = ({ projectTitle }: { projectTitle: string }) => {
  const [projectDetailsData, setBProjectDetailsData] =
    useState<projectDetailsProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const projectDetails = projectDetailsData?.response;
  const {
    data: projects,
    loading: loadingProject,
    error: errorProjectList,
    fetchProjectList,
  } = getProjectListStore();

  useEffect(() => {
    fetchProjectList();
  }, [fetchProjectList]);

  const errrMesaage =
    "An error occurred while fetching the projects. Please try again later.";

  useEffect(() => {
    const fetchProjectDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.post(`${environment?.baseUrl}/get-project/`, {
          prid: projectTitle,
        });
        if (res.status === 200) {
          setBProjectDetailsData(res?.data);
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
    };
    fetchProjectDetails();
  }, [projectTitle]);

  return (
    <section className="bg-[#FEFEFD] py-10 sm:py-12 lg:py-16">
      <Layout>
        <Container>
          {loading ? (
            <div className="flex flex-col justify-center items-center">
              <Spinner />
              <p className="text-lg text-[#95704C] font-medium mt-4">
                Loading project details...
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col justify-center items-center">
              <p className="text-red-500 mb-4">Error fetching project</p>
              <Button variant="secondary" className="w-full sm:w-[300px]">
                Try Again
              </Button>
            </div>
          ) : (
            <>
              {/* Project Title */}
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#120A02] mb-8 capitalize w-full sm:w-4/5 lg:w-2/3  font-montserrat leading-snug">
                {projectDetails?.project_title}
              </h3>

              {/* Image Grid */}
              <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Image
                  width={584}
                  height={413}
                  src={
                    `${environment?.imageUrl}${projectDetails?.images[0]?.image}` ||
                    ""
                  }
                  alt="Project Image"
                  className="w-full h-auto rounded-lg mx-auto"
                />
                <div className="grid grid-cols-2 gap-4">
                  {projectDetails?.images?.slice(1, 5).map((img, i) => (
                    <Image
                      key={i}
                      width={280}
                      height={194}
                      src={`${environment?.imageUrl}${img?.image}` || ""}
                      alt={`Project Image ${i + 1}`}
                      className="w-full h-auto rounded-lg"
                    />
                  ))}
                </div>
              </div>

              {/* Project Details */}
              <div className="bg-[#FBFAF9] border border-[#F2EDE9] rounded-md p-4 sm:p-6 md:p-8 w-full sm:w-4/5 lg:w-2/3 mx-auto flex flex-col gap-4 sm:gap-6 mb-6">
                {[
                  {
                    name: "Project Name:",
                    title: projectDetails?.project_title || "N/A",
                  },
                  {
                    name: "Client Location:",
                    title: projectDetails?.country || "N/A",
                  },
                  {
                    name: "Project Field:",
                    title: projectDetails?.field || "N/A",
                  },
                  {
                    name: "Project Scope:",
                    title: projectDetails?.project_scope || "N/A",
                  },
                  {
                    name: "Project Duration:",
                    title: projectDetails?.project_duration || "N/A",
                  },
                  {
                    name: "Completion date:",
                    title: projectDetails?.project_completion_date || "N/A",
                  },
                ].map((el, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-start gap-y-1 sm:gap-y-0 gap-x-0 sm:gap-x-4 text-[#413B35] text-base sm:text-lg border-b border-[#B6979133] pb-3"
                  >
                    <p className="font-medium w-full sm:w-1/3">{el.name}</p>
                    <p className="flex-1 font-semibold">
                      {el.name === "Project Scope:" ? (
                        <span
                          className="font-medium text-[#120A02]"
                          dangerouslySetInnerHTML={{
                            __html: `${projectDetails?.project_scope}`,
                          }}
                        />
                      ) : (
                        el.title
                      )}
                    </p>
                  </div>
                ))}
              </div>

              {/* Introduction */}
              <div className="bg-[#FBFAF9] rounded-md p-4 sm:p-6 md:p-8 w-full sm:w-4/5 lg:w-2/3 mx-auto mb-6">
                <h5 className="font-semibold font-montserrat text-lg sm:text-xl text-[#0F0918] mb-2 sm:mb-3">
                  Introduction:
                </h5>
                <p className="text-base sm:text-lg text-[#413B35]">
                  <span
                    className="font-medium text-[#120A02]"
                    dangerouslySetInnerHTML={{
                      __html: `${projectDetails?.introduction}`,
                    }}
                  />
                </p>
              </div>

              {/* Project Type */}
              <div className="bg-[#FBFAF9] rounded-md p-4 sm:p-6 md:p-8 w-full sm:w-4/5 lg:w-2/3 mx-auto mb-10">
                <h5 className="font-semibold font-montserrat text-lg sm:text-xl text-[#0F0918] mb-2 sm:mb-3">
                  Project Type:
                </h5>
                <p className="text-base sm:text-lg text-[#413B35]">
                  {projectDetails?.type_project}
                </p>
              </div>
            </>
          )}

          {/* Other Projects */}
          <div className="border-t border-[#B6979133] pt-10 sm:pt-12">
            <h4 className="text-2xl sm:text-3xl font-semibold text-[#120A02] mb-6 sm:mb-8">
              Explore other projects
            </h4>

            {errorProjectList && (
              <div className="mt-4 text-center text-red-600 text-lg font-semibold flex flex-col items-center">
                <p>{errorProjectList}</p>
                <Button
                  variant="primary"
                  className="mt-4 w-full sm:w-[300px]"
                  onClick={() => setError("")}
                >
                  <span className="text-white">Retry</span>
                </Button>
              </div>
            )}

            {loadingProject ? (
              <div className="flex flex-col items-center mt-4">
                <Spinner />
                <p className="text-lg text-gray-800 mt-4">
                  Loading projects...
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {projects?.response?.slice(0, 3).map((project, i) => (
                  <ProjectCard
                    key={i}
                    image={project.images[0].image}
                    title={project.project_title}
                    type={project?.type_project}
                    clientLocation={project.country}
                    projectScope={project.project_scope}
                    projectDuration={project.project_duration}
                    buttonText="View Project"
                    url={`/project/${project.prid}`}
                  />
                ))}
              </div>
            )}

            <div className="mt-8 flex flex-col items-center">
              <Link href={"/project"}>
                <Button variant="secondary" className="w-full sm:w-[300px]">
                  Explore More
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Layout>
    </section>
  );
};

export default ProjectDetailsPage;
