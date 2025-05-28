import Container from "../common/container";
import Button from "../common/buttons";

const StayInTouch = () => {
  return (
    <section>
      <Container>
        <h4 className="text-center text-[#413B35] font-medium text-2xl mb-6">
          Let’s Stay in Touch
        </h4>
        <p className="text-center text-[#413B35] font-normal text-lg mb-10">
          Be the first to know about new updates and offers.
        </p>
        <div className="flex justify-center items-center relative">
          <input
            type="text"
            placeholder="example@gmail.com"
            className="w-[533px] h-[66px] rounded-[20px] border border-[#D6C8BA] p-4 outline-amber-200"
          />
          <Button variant="primary" className="w-fit absolute right-[22.5rem]">
            Subscribe
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default StayInTouch;
