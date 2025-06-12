import Button from "../common/buttons";
import Container from "../common/container";
import HeadingSubhead from "../common/headingSubhead";

const WhyChooseUs = () => {
  const industries = [
    {
      id: 1,
      title: "Trusted Excellence",
      description:
        "Our reputation for trusted excellence is built on consistently high-quality services that have earned the confidence of our clients.",
    },
    {
      id: 2,
      title: "Affordable Pricing",
      description:
        "We made engineering excellence accessible to everyone through transparent, fair pricing.",
    },
    {
      id: 3,
      title: "Global Research",
      description:
        "We deliver engineering solutions to clients across continents, anytime, anywhere.",
    },
  ];
  return (
    <section className="bg-[linear-gradient(270deg,#1D1003_0%,#573616_100%)]">
      <Container>
        <div className="mb-16">
          <HeadingSubhead
            heading="Industries"
            subheading="We offer a wide range of services to meet your needs. From web design to web development, we have you covered."
            headingClassName="text-white"
            subheadingClassName="text-[#E7E7E6]"
            withSubhead={false}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-x-6">
          {industries.slice(0, 3).map((industry) => (
            <div
              key={industry.id}
              className="p-6 bg-[#F2EDE9] rounded-lg border-amber-900 border"
            >
              <h3 className="text-[#70451C] text-2xl font-semibold mb-3">
                {industry.title}
              </h3>
              <p className="text-[#5E5A64] text-lg">{industry.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-15 flex flex-col justify-center items-center">
          <Button variant="primary" className="w-[298px]">
            Contact Us
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
