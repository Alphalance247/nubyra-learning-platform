import Container from "../common/container";
import HeadingSubhead from "../common/headingSubhead";
import Image from "next/image";
import Button from "../common/buttons";
import Link from "next/link";
const Industries = () => {
  const industries = [
    {
      id: 1,
      title: "Chemical",
      description: "Production of chemicals, plastics, fertilizers, and fuels.",
    },
    {
      id: 2,
      title: "Power & Energy",
      description:
        "Power plant, renewable energy systems, energy storage systems.",
    },
    {
      id: 3,
      title: "Water Treatment",
      description:
        "Water treatment, waste management, pollution control, and sustainability.",
    },
    {
      id: 4,
      title: "Petroleum",
      description: "Petroleum refining, gas processing and alternative energy.",
    },
    {
      id: 5,
      title: "Manufacturing",
      description:
        "Automotive, aerospace, electronics, semiconductors, and battery production.",
    },
    {
      id: 6,
      title: "Food & Beverage",
      description:
        "Industrial-scale food processing, safety, and quality control.",
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
          />
        </div>

        <div className="grid md:grid-cols-3 gap-x-6">
          <div className="flex flex-col gap-y-4">
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

          <div>
            <Image
              src="/assets/home/industryengineer.png"
              alt="industries"
              width={384}
              height={453}
            />
          </div>

          <div className="flex flex-col gap-y-4">
            {industries.slice(3, 6).map((industry) => (
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
        </div>
        <div className="grid items-center justify-center w-[400px] mx-auto">
          <div className="p-6 bg-[#F2EDE9] rounded-lg border-amber-900 border">
            <h3 className="text-[#70451C] text-2xl font-semibold mb-3">
              Pharmaceuticals
            </h3>
            <p className="text-[#5E5A64] text-lg">
              Drug development, bio processing, and large-scale pharmaceutical
              manufacturing.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-center items-center">
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

export default Industries;
