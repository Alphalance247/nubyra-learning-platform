import Button from "../common/buttons";
import Container from "../common/container";
import HeadingSubhead from "../common/headingSubhead";

const GetInTouch = () => {
  return (
    <section className="bg-[#FBFAF9]">
      <Container>
        <div className="bg-[url('/assets/home/getInTouch.png')] bg-cover bg-center bg-no-repeat rounded-2xl">
          <div className="py-16 sm:py-20 md:py-24 lg:py-30">
            <HeadingSubhead
              heading="Learn, Build, and Transform Your Future"
              subheading="Join Nubyira to master process engineering, connect with experts, and turn your ideas into real-world projects — all in one place."
              headingClassName="
                text-white 
                w-full  px-4 md:px-0 text-start md:text-center md:w-[75%] lg:w-[55%] 
                md:mx-auto mx-0
                text-2xl sm:text-3xl md:text-4xl lg:text-[44px]
              "
              subheadingClassName="
                text-white
                text-sm sm:text-base md:text-lg
                w-full  px-4 md:px-0 text-start md:text-center md:w-[75%] lg:w-[55%] 
                md:mx-auto mx-0
              "
            />

            <div className="mt-8 sm:mt-10 flex  justify-center ">
              <a
                href="https://wa.me/message/WABZJFRNPMNYL1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="secondary"
                  className="!w-[289px]  text-sm sm:text-base"
                >
                  Contact Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default GetInTouch;
