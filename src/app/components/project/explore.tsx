"use client";
import Button from "../common/buttons";
import Container from "../common/container";
import HeadingSubhead from "../common/headingSubhead";
import ProjectCard from "../common/projectCard";
import { FaChevronDown } from "react-icons/fa6";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Spinner from "../common/spinner/spinner";

// Define the Project type based on the properties used in ProjectCard
interface Project {
  image: string;
  project_title: string;
  project_type: string;
  country: string;
  project_scope: string;
  project_duration: string;
}

const Explore = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const errrMesaage =
    "An error occurred while fetching the projects. Please try again later.";

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(`/project-list/`, {
        page: 2,
      });
      if (res.status === 200 && Array.isArray(res.data.projects)) {
        setProjects(res.data.projects);
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
  }, []);

  return (
    <section className="bg-[#FBFAF9]">
      <Container>
        <HeadingSubhead
          heading="Explore all projects"
          subheading="Explore our process engineering innovations, hands-on research, and most effective engineering solutions, all available in this hub."
        />

        <div className="mt-16">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-semibold text-[#120A02]">
              All Projects ({projects.length})
            </h4>
            <div className="">
              <Button variant="secondary" className="flex items-center gap-x-2">
                Most Recent
                <span>
                  {" "}
                  <FaChevronDown className="text-[#7B4C1F]" />
                </span>
              </Button>
            </div>
          </div>

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
              <p className="text-lg text-gray-500 mt-4">Loading projects...</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-y-4 gap-x-4 mt-10">
              {projects.map((project, i) => (
                <ProjectCard
                  image={project.image}
                  title={project.project_title}
                  type={project.project_type}
                  clientLocation={project.country}
                  projectScope={project.project_scope}
                  projectDuration={project.project_duration}
                  buttonText="View Project"
                  key={i}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Explore;
