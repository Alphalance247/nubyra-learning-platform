import MissionVision from "../components/about/missionVision";
import WhyChooseUs from "../components/about/whyChooseUs";
import HeroCommon from "../components/common/heroCommon";
import Layout from "../components/common/layout";
import About from "../components/home/about";
import GetInTouch from "../components/home/getInTouch";

const AboutUs = () => {
  return (
    <Layout>
      <HeroCommon
        heading="About "
        span="Us"
        description="Learn more about the Nubyira team, driven by passion and grounded in real-world industry experience"
        bgUrl="bg-[url(/assets/about/hero.png)]"
        btnText="Contact us"
        btnLink="/"
      />
      <About />
      <WhyChooseUs />
      <MissionVision />
      <GetInTouch />
    </Layout>
  );
};

export default AboutUs;
