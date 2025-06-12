import Container from "../common/container";
import Image from "next/image";

const MissionVision = () => {
  return (
    <section>
      <Container>
        <div className="flex flex-col gap-y-8">
          <div className="grid gap-y-10 md:grid-cols-2 items-center gap-x-22">
            <div>
              <h5 className="text-[#120A02] font-bold text-[44px] leading-12 mb-6">
                Our Mission
              </h5>
              <p className="text-lg text-[#413B35]">
                Our mission is to deliver reliable, high-quality products and
                services that support our clients in identifying opportunities,
                achieving growth, and enhancing their essential values.
              </p>
            </div>
            <div>
              <Image
                src="/assets/about/1.png"
                width={564}
                height={516}
                alt=""
              />
            </div>
          </div>

          <div className="grid gap-y-10 md:grid-cols-2 items-center gap-x-22">
            <div>
              <Image
                src="/assets/about/2.png"
                width={564}
                height={516}
                alt=""
              />
            </div>

            <div>
              <h5 className="text-[#120A02] font-bold text-[44px] leading-12 mb-6">
                Value & Vision
              </h5>
              <p className="text-lg text-[#413B35]">
                Our company is built on the principles of honesty, integrity,
                understanding, and a relentless drive for innovation. We
                envision a future where industries thrive through our
                unparalleled design solutions, driving efficiency,
                sustainability, and profitability.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MissionVision;
