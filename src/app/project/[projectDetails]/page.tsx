import React from "react";
import Container from "@/app/components/common/container";
import Layout from "@/app/components/common/layout";
import Image from "next/image";
import ProjectCard from "@/app/components/common/projectCard";
import Button from "@/app/components/common/buttons";

const projects = [
  {
    image: "/assets/home/proj1.png",
    title: "Combined Cycle Power Plant P&ID Development",
    projectType: "AutoCAD Plant 3D, P&ID development, P&ID modification, Line",
    clientLocation: "Spain",
    projectScope: "Detailed Design",
    projectDuration: "3 weeks",
  },
  {
    image: "/assets/home/proj2.png",
    title: "Combined Cycle Power Plant P&ID Development",
    projectType: "AutoCAD Plant 3D, P&ID development, P&ID modification, Line",
    clientLocation: "Spain",
    projectScope: "Detailed Design",
    projectDuration: "3 weeks",
  },
  {
    image: "/assets/home/proj3.png",
    title: "Combined Cycle Power Plant P&ID Development",
    projectType: "AutoCAD Plant 3D, P&ID development, P&ID modification, Line",
    clientLocation: "Spain",
    projectScope: "Detailed Design",
    projectDuration: "3 weeks",
  },
];

const ProjectDetailsPage = ({}) => {
  return (
    <section className="bg-[#FEFEFD]">
      <Layout>
        <Container>
          <h3 className="text-[44px] w-[60%] font-bold text-[#120A02] mb-8 capitalize font-montserrat">
            All about thermal power generation cycles
          </h3>

          <div className="mb-8">
            <Image
              width={801}
              height={413}
              src="/assets/projects/image.png"
              alt="IMAGES"
              className="mx-auto"
            />
          </div>

          <div className="bg-[#FBFAF9] border border-[#F2EDE9] rounded-md p-6 w-[65%] flex flex-col gap-y-6 mx-auto mb-3">
            {[
              {
                name: "Project Name:",
                title: " Combined Cycle Power Plant Design",
              },
              {
                name: "Client Location:",
                title: "Madrid, Spain",
              },
              {
                name: "Project Nature:",
                title: "Full execution",
              },
              {
                name: "Project Scope:",
                title: "Detailed Design",
              },
              {
                name: "Project Duration:",
                title: "3 weeks",
              },
              {
                name: "Completion date:",
                title: "June 2, 2024.",
              },
            ].map((el, i) => (
              <div
                className="pb-6 border-b-[1.5px] border-[#B6979133] text-lg font-normal font-inter text-[#413B35] flex gap-x-10"
                key={i}
              >
                <p>{el?.name}</p>
                <p className="font-semibold">{el?.title || "not specified"}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#FBFAF9] rounded-md p-6 w-[65%] mx-auto mb-15">
            <h5 className="font-semibold font-montserrat text-xl text-[#0F0918] mb-3">
              Project Type:
            </h5>
            <p className="text-lg font-normal font-inter text-[#413B35]">
              Aspen HYSYS simulation, Heat and material balance, Plant operating
              modes, Case study analysis, Process design, Process worksheet,
              energy and exergy analysis, Power and heat cogeneration plant, Gas
              turbine Generator GTG, Steam Turbine Generator STG, Heat Recovery
              Steam Generator HRSG, Waste Heat Recovery Unit WHRU
            </p>
          </div>

          <div className="border-t-[1.5px] border-[#B6979133] pt-15">
            <h4 className="text-3xl font-semibold text-[#120A02] mb-8">
              Explore other projects
            </h4>
            <div className="grid grid-cols-3 gap-y-4 gap-x-4 mt-10">
              {projects.map((project, i) => (
                <ProjectCard
                  image={project.image}
                  title={project.title}
                  type={project.projectType}
                  clientLocation={project.clientLocation}
                  projectScope={project.projectScope}
                  projectDuration={project.projectDuration}
                  buttonText="View Project"
                  key={i}
                />
              ))}
            </div>

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
