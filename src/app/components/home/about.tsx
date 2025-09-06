"use client";
import Container from "../common/container";
import Link from "next/link";
import Button from "../common/buttons";
import Image from "next/image";
import { useAuth } from "@/app/context/authContext";

const AboutUs = () => {
  const { isAuthenticated } = useAuth();
  return (
    <section>
      <Container>
        <div className="grid gap-y-8 items-center justify-between lg:grid-cols-2 lg:gap-x-10">
          <div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-montserrat font-bold leading-tight text-[#120A02] mb-6">
              🌟 About Nubyira
            </h3>

            <p className="text-base sm:text-lg text-[#413B35] mb-8 sm:mb-10">
              Nubyira Process Designers is an online consulting and training
              firm specializing in process and plant design. We offer services
              in process R&D, simulation, optimization, safety analysis, CAD
              modeling, plant rating, and technical training to support
              operational efficiency and profitability across process and allied
              industries.
            </p>

            <div className="flex items-center gap-x-4">
              {isAuthenticated ? (
                <Link href={"/dashboard"}>
                  <Button className=" w-fit" variant="primary">
                    Go To Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href={"/sign-up"}>
                  <Button className=" w-fit" variant="primary">
                    Enrol for free
                  </Button>
                </Link>
              )}

              <Link href={"/about-us"}>
                <Button className="w-full sm:w-fit" variant="secondary">
                  Know More about us
                </Button>
              </Link> */}
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <Image
              src="/assets/home/about.png"
              alt="about-us"
              width={570}
              height={516}
              className="w-full lg:max-w-[570px] h-auto object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutUs;
