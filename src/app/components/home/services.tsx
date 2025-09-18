import Link from "next/link";
import Button from "../common/buttons";
import Container from "../common/container";
import HeadingSubhead from "../common/headingSubhead";
import Image from "next/image";

interface servcesProps {
  id: number;
  image: string;
  title: string;
  description: string;
}

const services: servcesProps[] = [
  {
    id: 1,
    image: "/assets/home/engineer.svg",
    title: "Engineering Services",
    description:
      "We provide remote technical support and project execution services to clients worldwide, covering areas such as basic and product design, R&D, feasibility studies, front-end engineering design, and detailed design within the field of process design engineering.",
  },
  {
    id: 2,
    image: "/assets/home/learn.svg",
    title: "Learning & Training",
    description:
      "Our learning programs teach the fundamentals of process design engineering, equipping you with the skills and knowledge to succeed in today’s engineering landscape.",
  },
  {
    id: 3,
    image: "/assets/home/academic.svg",
    title: "Academic Research",
    description:
      "Get personalized guidance, technical support, and hands-on help to transform your academic projects into outstanding achievements.",
  },
];

const Services = () => {
  return (
    <section className="bg-[#FEFEFD]">
      <Container>
        <div className="mb-10 text-center md:text-start">
          <HeadingSubhead
            heading="Services we provide"
            subheading="Engineering innovation, learning, and hands-on research support. All in one place."
            headingClassName="text-[#120A02]"
            subheadingClassName="text-[#413B35]"
          />
        </div>
        <div className="grid gap-y-10 xl:grid-cols-2 xl:gap-x-16 xl:gap-y-0 items-center">
          <div className="flex flex-col gap-y-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-[#F2EDE9] p-6 rounded-xl border-b border-b-[#7B4C1F]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain"
                  />
                  <h3 className="text-[#70451C] text-lg sm:text-xl md:text-2xl font-semibold font-montserrat">
                    {service?.title}
                  </h3>
                </div>
                <p className="text-[#5E5A64] text-sm sm:text-base md:text-lg font-inter">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-center md:justify-end">
            <Image
              src="/assets/home/services.png"
              width={570}
              height={646}
              alt="service-3"
              className="w-full xl:max-w-[570px] h-auto object-contain"
            />
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-center items-center">
          <Link href={"/project/submit"}>
            <Button variant="primary" className="w-full sm:w-[298px]">
              Submit Project Request
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default Services;
