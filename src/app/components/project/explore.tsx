import Button from "../common/buttons";
import Container from "../common/container";
import HeadingSubhead from "../common/headingSubhead";
import ProjectCard from "../common/projectCard";
import { FaChevronDown } from "react-icons/fa6";

const Explore = () => {
  const projects = [
    {
      image: "/assets/home/proj1.png",
      title: "Combined Cycle Power Plant P&ID Development",
      projectType:
        "AutoCAD Plant 3D, P&ID development, P&ID modification, Line",
      clientLocation: "Spain",
      projectScope: "Detailed Design",
      projectDuration: "3 weeks",
    },
    {
      image: "/assets/home/proj2.png",
      title: "Combined Cycle Power Plant P&ID Development",
      projectType:
        "AutoCAD Plant 3D, P&ID development, P&ID modification, Line",
      clientLocation: "Spain",
      projectScope: "Detailed Design",
      projectDuration: "3 weeks",
    },
    {
      image: "/assets/home/proj3.png",
      title: "Combined Cycle Power Plant P&ID Development",
      projectType:
        "AutoCAD Plant 3D, P&ID development, P&ID modification, Line",
      clientLocation: "Spain",
      projectScope: "Detailed Design",
      projectDuration: "3 weeks",
    },
    {
      image: "/assets/home/proj3.png",
      title: "Combined Cycle Power Plant P&ID Development",
      projectType:
        "AutoCAD Plant 3D, P&ID development, P&ID modification, Line",
      clientLocation: "Spain",
      projectScope: "Detailed Design",
      projectDuration: "3 weeks",
    },
    {
      image: "/assets/home/proj3.png",
      title: "Combined Cycle Power Plant P&ID Development",
      projectType:
        "AutoCAD Plant 3D, P&ID development, P&ID modification, Line",
      clientLocation: "Spain",
      projectScope: "Detailed Design",
      projectDuration: "3 weeks",
    },
    {
      image: "/assets/home/proj3.png",
      title: "Combined Cycle Power Plant P&ID Development",
      projectType:
        "AutoCAD Plant 3D, P&ID development, P&ID modification, Line",
      clientLocation: "Spain",
      projectScope: "Detailed Design",
      projectDuration: "3 weeks",
    },
    {
      image: "/assets/home/proj3.png",
      title: "Combined Cycle Power Plant P&ID Development",
      projectType:
        "AutoCAD Plant 3D, P&ID development, P&ID modification, Line",
      clientLocation: "Spain",
      projectScope: "Detailed Design",
      projectDuration: "3 weeks",
    },
    {
      image: "/assets/home/proj3.png",
      title: "Combined Cycle Power Plant P&ID Development",
      projectType:
        "AutoCAD Plant 3D, P&ID development, P&ID modification, Line",
      clientLocation: "Spain",
      projectScope: "Detailed Design",
      projectDuration: "3 weeks",
    },
  ];
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
              All Projects (32)
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
        </div>
      </Container>
    </section>
  );
};

export default Explore;
