import Container from "../common/container";
import Button from "../common/buttons";

const StayInTouch = () => {
  return (
    <section>
      <Container>
        <h4 className="text-center text-[#413B35] font-medium text-xl sm:text-2xl mb-4 sm:mb-6">
          Let’s Stay in Touch
        </h4>
        <p className="text-center text-[#413B35] font-normal text-base sm:text-lg mb-6 sm:mb-10">
          Be the first to know about new updates and offers.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-0">
          <input
            type="email"
            placeholder="example@gmail.com"
            className="w-full sm:max-w-[533px] rounded-[20px] border border-[#D6C8BA] p-4 outline-amber-200"
          />
          <Button
            variant="primary"
            className="w-full sm:w-auto sm:ml-[-8rem] md:ml-[-9rem] lg:ml-[-8rem]"
          >
            Subscribe
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default StayInTouch;
