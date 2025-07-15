import Image from "next/image";
import Button from "../common/buttons";
import { GoChevronRight } from "react-icons/go";

const AboutAuthor = () => {
  return (
    <section className="mt-15">
      <div className=" items-center grid grid-cols-2 gap-x-3">
        <Image
          width={528}
          height={516}
          src="/assets/blogs/author.png"
          alt="Author"
        />

        <div>
          <h2 className="text-xl font-bold font-montserrat text-[#120A02] mb-6 ">
            About the author
          </h2>
          <p className="text-[#413B35] font-inter font-normal text-lg">
            {`Fellow Earthlings! I'm called Babatunde Rahim Popoola. During my
          on-duty shifts, I often work on designing efficient chemical processes
          and their integrations so we can all live in the world we designed.
          From conceptual basic designs to detailed manufacturing systems, I've
          got hands-on experience in tutoring bright minds and executing
          projects. Oh, did I mention I also lead the team at Nubyira Process
          Designers? It's our digital portal where we help aspiring engineers
          tackle research projects and whip up top-notch process plant designs
          for colleagues around the globe. So, in keeping this knowledge
          retentive in my noggins, I write about it on this blog. Therefore,
          whether you're here to geek out over process optimization or looking
          for some sage engineering advice, stick around!`}
          </p>
        </div>
      </div>

      <div className="mt-10">
        <Button
          className="w-[298px] flex gap-x-3 justify-center items-center mx-auto"
          variant="primary"
        >
          Next Post
          <span>
            <GoChevronRight />
          </span>
        </Button>
      </div>
    </section>
  );
};

export default AboutAuthor;
