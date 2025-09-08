"use client";
import Button from "../common/buttons";
import Container from "../common/container";
import HeadingSubhead from "../common/headingSubhead";
import ProjectCard from "../common/projectCard";
import { FaChevronDown } from "react-icons/fa6";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Spinner from "../common/spinner/spinner";
import { environment } from "@/app/env/env.local";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const errrMesaage =
    "An error occurred while fetching the projects. Please try again later.";

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${environment?.baseUrl}/project-list/`, {
        page: 1,
      });
      if (res.status === 200 && Array.isArray(res.data.projects)) {
        setProjects(res.data.projects);
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

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section className="bg-[#FBFAF9] py-12 sm:py-16 lg:py-20">
      <Container>
        <HeadingSubhead
          heading="Explore all projects"
          subheading="Explore our process engineering innovations, hands-on research, and most effective engineering solutions, all available in this hub."
        />

        <div className="mt-10 sm:mt-12 lg:mt-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <h4 className="text-xl sm:text-2xl font-semibold text-[#120A02]">
              All Projects ({projects.length})
            </h4>
            <Button variant="secondary" className="flex items-center gap-x-2">
              Most Recent
              <FaChevronDown className="text-[#7B4C1F]" />
            </Button>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {projects.map((project, i) => (
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
          )}
        </div>
      </Container>
    </section>
  );
};

export default Explore;
