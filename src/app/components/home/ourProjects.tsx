import Button from "../common/buttons";
import Container from "../common/container";
import HeadingSubhead from "../common/headingSubhead";
import ProjectCard from "../common/projectCard";

const OurProjects = () => {
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
  ];

  return (
    <section className="bg-[#FBFAF9]">
      <Container>
        <HeadingSubhead
          heading="Explore Our Projects"
          subheading="See how we turn ideas into reality — from student innovations to real-world process solutions."
          headingClassName="text-[#120A02]"
          subheadingClassName="text-[#413B35]"
        />

        <div className="grid md:grid-cols-3 gap-8 mt-15">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              image={project?.image}
              title={project?.title}
              type={project?.projectType}
              clientLocation={project?.clientLocation}
              projectScope={project?.projectScope}
              projectDuration={project?.projectDuration}
              buttonText="View Full Details"
            />
          ))}
        </div>
        <div className="mt-15 flex flex-col items-center justify-center">
          <Button variant="primary" className="w-[289px]">
            Explore More Projects
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default OurProjects;
