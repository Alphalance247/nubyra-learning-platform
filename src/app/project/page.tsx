import HeroCommon from "../components/common/heroCommon";
import Layout from "../components/common/layout";
import GetInTouch from "../components/home/getInTouch";
import Explore from "../components/project/explore";
const Project = () => {
  return (
    <Layout>
      <HeroCommon
        heading="Our"
        span="projects"
        description="A comprehensive list of completed process engineering projects"
        bgUrl="bg-[url(/assets/projects/hero.png)]"
        btnText="Submit Project Request"
        btnLink="/project/submit"
      />
      <Explore />
      <GetInTouch />
    </Layout>
  );
};

export default Project;
