import Button from "../common/buttons";
import Container from "../common/container";
import HeadingSubhead from "../common/headingSubhead";

const GetInTouch = () => {
  return (
    <section className="bg-[#FBFAF9]">
      <Container>
        <div className="bg-[url('/assets/home/getInTouch.png')] bg-cover bg-center bg-no-repeat rounded-2xl">
          <div className="py-30">
            <HeadingSubhead
              heading="Learn, Build, and Transform Your Future"
              subheading="Join Nubyira to master process engineering, connect with experts, and turn your ideas into real-world projects — all in one place."
              headingClassName="text-[#FFFFFF] w-[55%] mx-auto"
              subheadingClassName="text-[#FFFFFF]"
            />

            <div className="mt-10 flex justify-center">
              <Button variant="secondary" className="w-[289px]">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default GetInTouch;
