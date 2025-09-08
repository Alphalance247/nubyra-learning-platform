"use client";
import Container from "../common/container";
import HeadingSubhead from "../common/headingSubhead";
import TestimonialCard from "../common/testimonialCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PrevArrow from "../common/prevBtn";
import NextArrow from "../common/nextBtn";

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-[#FEFEFD] py-12 md:py-20">
      <Container>
        <HeadingSubhead
          heading="What they are saying about us"
          subheading="Real stories from learners, engineers, and innovators who’ve transformed their journeys with Nubyira."
          headingClassName="text-[#120A02]"
          subheadingClassName="text-[#413B35]"
        />

        <div className="mt-10 md:mt-14">
          <Slider {...settings}>
            <TestimonialCard
              name="Milton Avili"
              profession="Principal Process Engineer"
              stars="4/5"
              arr={["", "", "", ""]}
              withEmptyStar={true}
              country="UK"
              description="Babatunde is highly committed and consistently delivers quality designs as an engineer. He will always try his best to fulfil the client's requirements. I’ve had a great experience working with his team at Nubyira Process Designers—highly recommended."
            />
            <TestimonialCard
              name="Djafer Nasr Eddine"
              profession="Chemical Process Engineer"
              country="USA"
              stars="5/5"
              withEmptyStar={false}
              arr={["", "", "", "", ""]}
              description="Rahim is a highly skilled and efficient chemical process design engineer with deep expertise in process integration. His ability to solve complex challenges, combined with strong professionalism, attention to detail, and team spirit, makes him a valuable asset. I highly recommend him for his outstanding dedication and results-driven approach chemical plant design projects."
            />
            <TestimonialCard
              name="Gbemisola Ojo"
              country="USA"
              profession="Integration Engineer"
              stars="5/5"
              withEmptyStar={false}
              arr={["", "", "", "", ""]}
              description="It’s been a pleasure working with Nubyira Process Designers. They foster strong, collaborative relationships with clients and consistently demonstrate perseverance in tackling complex challenges. They also demonstrate impressive expertise in integrated process technologies—particularly in green hydrogen systems, dynamic alkaline electrolysis, ammonia production, and ammonia-based energy storage."
            />
            <TestimonialCard
              name="Levy Mukopeka"
              country="Zambia"
              profession="Chemical Engineering Student"
              stars="4/5"
              withEmptyStar={true}
              arr={["", "", "", ""]}
              description="I learned a great deal from Rahim Popoola as my Aspen Plus tutor. His guidance was instrumental in helping me understand process modeling, biomass gasification, and core chemical engineering principles, particularly in solid handling systems. With his expertise, I successfully simulated a coal dryer for my academic project, which significantly improved my technical skills. Rahim is knowledgeable, patient, and adept at breaking down complex concepts. Highly recommended for anyone seeking practical Aspen Plus training."
            />

            <TestimonialCard
              name="Sulli Pop"
              country="Ecuador"
              profession="Chemist"
              stars="3/5"
              withOneMore={true}
              withEmptyStar={true}
              arr={["", "", ""]}
              description="My instructor, Rahim Popoola, demonstrates a solid understanding of problem-solving within the chemical sciences, particularly when working on complex formulation research. His creativity is instrumental in designing 3D models of traditional chemical lab apparatuses using OpenSCAD, which effectively enables the fast, economical, and precise development of these tools through modern 3D printing technology. Though his team's processes are efficient and well-organized, there is still room for refinement in their scientific expertise."
            />
            <TestimonialCard
              name="Dr. Waheed Zeb"
              country="Belguim"
              profession="Academic Researcher"
              stars="5/5"
              withEmptyStar={false}
              arr={["", "", "", "", ""]}
              description="Rahim and I worked together on a refining process simulation project using Aspen Plus. Throughout the project, he was a valuable partner, demonstrating a deep understanding of process engineering and the technical capabilities of Aspen Plus. Together, we developed and optimized a detailed model that accurately represented real-world bio-pyrolysis oil refining operations. Working with him was both technically enriching and professionally rewarding."
            />
            <TestimonialCard
              name="Ervin Dwi Saputro"
              country="Indonesia"
              profession=""
              stars="4/5"
              withEmptyStar={true}
              arr={["", "", "", ""]}
              description="Working with Nubyira Process Designers has been a great experience. The team maintains a strong, collaborative relationship with clients and approaches problem-solving with professionalism and creativity. I was particularly impressed by their research capabilities in green hydrogen technology and their expertise in advanced electrolysis systems modeling and design. Their technical depth and commitment to delivering results make them a reliable partner in sustainable process engineering projects."
            />
            <TestimonialCard
              name="Emir"
              country="Turkey"
              profession="Chemical Engineering Student"
              stars="4/5"
              withEmptyStar={true}
              arr={["", "", "", ""]}
              description="It was a great experience working with Babatunde Rahim Popoola. His deep knowledge in the field was invaluable in delivering a personalized approach to teaching chemical engineering design. I’m truly grateful for his insightful tutorials. Over the course of a month, I was able to develop a design project for a hydrogen production electrolyser, which included an Aspen simulation model to examine the effects of various operating conditions on hydrogen output."
            />

            <TestimonialCard
              name="Dr. Nour Mubarak"
              country="Egypt"
              profession="Academic Researcher"
              stars="4/5"
              withEmptyStar={true}
              arr={["", "", "", ""]}
              description="Rahim is a highly committed and technically proficient engineer with deep expertise in water desalination and cogeneration systems. He excels in using Aspen HYSYS for simulation and optimization, particularly in water treatment and power generation processes. His strong grasp of advanced thermodynamics, especially supercritical water systems, highlights his innovative and research-driven approach. In addition to his engineering skills, Rahim is an exceptional educator, because of his clear and engaging teaching style, his dedication, integrity, and forward-thinking mindset."
            />

            <TestimonialCard
              name="Jameen Hans"
              country="Norway"
              profession=""
              stars="5/5"
              withEmptyStar={false}
              arr={["", "", "", "", ""]}
              description="I worked with Nubyira Process Designers on the simulation of adsorptive refrigeration cycles using UniSim Design. The team maintained strong and professional relationships throughout our collaboration, ensuring clear communication and dependable support at every stage. Despite language and other barriers, their competence and teamwork made them a valuable asset to my project."
            />
          </Slider>
        </div>
      </Container>
    </section>
  );
};

export default Testimonial;
