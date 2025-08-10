"use client";
import React, { useEffect, useState } from "react";
import Container from "@/app/components/common/container";
import Layout from "@/app/components/common/layout";
import Image from "next/image";
import ProjectCard from "@/app/components/common/projectCard";
import Button from "@/app/components/common/buttons";
import { AxiosError } from "axios";
import axiosInstance from "@/app/utils/axios";
import Spinner from "../common/spinner/spinner";
import { getProjectListStore } from "@/stores/projects/getProjectList";

interface projectDetailsProps {
  response: {
    country: string;
    detail_image: string;
    meta: string;
    project_completion_date: string;
    project_duration: string;
    project_full_name: string;
    project_nature: string;
    project_scope: string;
    project_title: string;
    project_type: string;
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
    const fetchBlogDetails = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.post(`/get-project/`, {
          prid: projectTitle,
        });
        if (res.status === 200) {
          setBProjectDetailsData(res?.data);
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

    fetchBlogDetails();
  }, [projectTitle]);

  return (
    <section className="bg-[#FEFEFD]">
      <Layout>
        <Container>
          {loading ? (
            <div className="flex flex-col justify-center items-center">
              <Spinner />
              <p className="text-lg font-medium mt-4">
                Loading projects details...
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col justify-center items-center">
              <p className="text-red-500">Error fetching courses</p>
              <Button
                variant="secondary"
                className="w-[289px]"
                // onClick={() => fetchCourseList()}
              >
                Try Again
              </Button>
            </div>
          ) : (
            <>
              <h3 className="text-[44px] w-[60%] font-bold text-[#120A02] mb-8 capitalize font-montserrat">
                {projectDetails?.project_title}
              </h3>

              <div className="mb-8">
                <Image
                  width={801}
                  height={413}
                  src={
                    `https://api.nubyira.com/${projectDetails?.detail_image}` ||
                    ""
                  }
                  alt="IMAGES"
                  className="w-[801px] h-[413px] rounded-lg mx-auto"
                />
              </div>

              <div className="bg-[#FBFAF9] border border-[#F2EDE9] rounded-md p-6 w-[65%] flex flex-col gap-y-6 mx-auto mb-3">
                {[
                  {
                    name: "Project Name:",
                    title: projectDetails?.project_full_name || "",
                  },
                  {
                    name: "Client Location:",
                    title: projectDetails?.country || "Madrid, Spain",
                  },
                  {
                    name: "Project Nature:",
                    title: projectDetails?.project_nature || "Full execution",
                  },
                  {
                    name: "Project Scope:",
                    title: projectDetails?.project_scope || "Detailed Design",
                  },
                  {
                    name: "Project Duration:",
                    title: projectDetails?.project_duration || "3 weeks",
                  },
                  {
                    name: "Completion date:",
                    title:
                      projectDetails?.project_completion_date ||
                      "June 2, 2024.",
                  },
                ].map((el, i) => (
                  <div
                    className="pb-6 border-b-[1.5px] border-[#B6979133] text-lg font-normal font-inter text-[#413B35] flex gap-x-10"
                    key={i}
                  >
                    <p>{el?.name}</p>
                    <p className="font-semibold">
                      {el?.title || "not specified"}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-[#FBFAF9] rounded-md p-6 w-[65%] mx-auto mb-15">
                <h5 className="font-semibold font-montserrat text-xl text-[#0F0918] mb-3">
                  Project Type:
                </h5>
                <p className="text-lg font-normal font-inter text-[#413B35]">
                  {projectDetails?.meta}
                </p>
              </div>
            </>
          )}

          <div className="border-t-[1.5px] border-[#B6979133] pt-15">
            <h4 className="text-3xl font-semibold text-[#120A02] mb-8">
              Explore other projects
            </h4>
            {errorProjectList && (
              <div className="mt-8 text-center text-red-600 text-lg font-semibold flex flex-col items-center justify-center">
                <p> {error}</p>
                <Button
                  variant="primary"
                  className="mt-4"
                  onClick={() => {
                    setError("");
                  }}
                >
                  <span className="text-white">Retry</span>
                </Button>
              </div>
            )}

            {loadingProject ? (
              <div className="flex flex-col items-center">
                <Spinner />
                <p className="text-lg text-gray-500 mt-4">
                  Loading projects...
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-y-4 gap-x-4 mt-10">
                {projects?.response?.slice(0, 3).map((project, i) => (
                  <ProjectCard
                    image={project.image}
                    title={project?.project_title}
                    type={project?.project_type}
                    clientLocation={project?.country}
                    projectScope={project?.project_scope}
                    projectDuration={project?.project_duration}
                    buttonText="View Project"
                    key={i}
                    url={`/project/${project?.prid}`}
                  />
                ))}
              </div>
            )}

            <div className="mt-15 flex flex-col items-center justify-center">
              <Button variant="secondary" className="w-[289px]">
                Explore More
              </Button>
            </div>
          </div>
        </Container>
      </Layout>
    </section>
  );
};

export default ProjectDetailsPage;
