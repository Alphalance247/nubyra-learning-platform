import { GoChevronRight } from "react-icons/go";
import Layout from "../components/common/layout";
import GetInTouch from "../components/home/getInTouch";
import Explore from "../components/project/explore";
import Link from "next/link";
import Button from "../components/common/buttons";
const Project = () => {
  return (
    <Layout>
      <section className={`bg-cover bg-center bg-no-repeat`}>
        <video
          muted
          loop
          autoPlay
          id="myVideo"
          height={100}
          className="absolute inset-0 z-10 w-full h-[400px] xl:h-full object-cover"
        >
          <source src="/assets/projects/nubyra.mp4" type="video/mp4" />
        </video>

        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 pt-10 sm:pt-16 xl:pt-32 pb-10 sm:pb-16 xl:pb-32 relative z-20">
          <div className="w-full lg:w-[60%] text-center lg:text-left">
            <h1 className="text-white text-left text-3xl sm:text-4xl md:text-5xl  lg:text-6xl font-bold mb-6 font-montserrat leading-tight">
              Our{" "}
              <span className="text-[#120A02] bg-white px-1"> projects</span>
            </h1>
            <p className="text-base text-left sm:text-lg md:text-xl font-medium mb-10 text-white w-full sm:w-[80%] lg:w-[70%] mx-auto lg:mx-0">
              A comprehensive list of completed process engineering projects
            </p>
            <div className="flex justify-start lg:justify-start items-center gap-x-4">
              <Link href={"/project/submit"}>
                <Button
                  className="w-fit flex items-center gap-x-2"
                  variant="primary"
                >
                  Submit Project Request
                  <GoChevronRight className="text-white" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Explore />
      <GetInTouch />
    </Layout>
  );
};

export default Project;
