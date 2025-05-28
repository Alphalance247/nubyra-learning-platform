import HeroCommon from "../components/common/heroCommon";
import Layout from "../components/common/layout";
import GetInTouch from "../components/home/getInTouch";
import ExploreCourses from "../components/learning/exploreCourses";

const Learning = () => {
  return (
    <Layout>
      <HeroCommon
        heading="Nubyira"
        span="Learning"
        description="Explore how Nubyira Learning turns innovative ideas into effective learning experiences, showcasing our dedication to excellence!"
        bgUrl="bg-[url(/assets/learning/hero.png)]"
        btnText="Enrol now"
        btnLink="/"
      />
      <ExploreCourses />
      <GetInTouch />
    </Layout>
  );
};

export default Learning;
