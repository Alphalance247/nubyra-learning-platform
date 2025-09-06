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
        <div className="mb-10">
          <HeadingSubhead
            heading="Services we provide"
            subheading="Engineering innovation, learning, and hands-on reseach support. all in one place."
            headingClassName="text-[#120A02]"
            subheadingClassName="text-[#413B35]"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-x-16">
          <div className="flex flex-col gap-y-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-[#F2EDE9] p-6 rounded-xl border-b border-b-[#7B4C1F] border-image-source-gradient"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={40}
                    height={40}
                  />
                  <h3 className="text-[#70451C] text-2xl font-semibold font-montserrat">
                    {service?.title}
                  </h3>
                </div>
                <p className="text-[#5E5A64] text-lg font-inter">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div>
            <Image
              src="/assets/home/services.png"
              width={570}
              height={646}
              alt="service-3"
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-center items-center">
          <Link href={"/project/submit"}>
            <Button variant="primary" className="w-[298px]">
              Submit Project Request
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default Services;
