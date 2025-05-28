import Footer from "./components/common/footer";
import Header from "./components/common/header";
import AboutUs from "./components/home/about";
import OurCourses from "./components/home/courses";
import GetInTouch from "./components/home/getInTouch";
import Hero from "./components/home/hero";
import Industries from "./components/home/industries";
import OurProjects from "./components/home/ourProjects";
import Services from "./components/home/services";
import StayInTouch from "./components/home/stayInTouch";
import FAQ from "./components/home/faq";
import Testimonial from "./components/home/testimonial";

const Home = () => {
  return (
    <div className="bg-[#FBFAF9]">
      <Header />
      <Hero />
      <AboutUs />
      <Services />
      <Industries />
      <OurCourses />
      <OurProjects />
      <Testimonial />
      <FAQ />
      <GetInTouch />
      <StayInTouch />
      <Footer />
    </div>
  );
};

export default Home;
