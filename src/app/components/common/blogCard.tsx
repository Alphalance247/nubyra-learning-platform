import Button from "./buttons";
import Image from "next/image";

const BlogCard = () => {
  return (
    <div className="pb-14 border-b-[1.5px] border-[#B6979133]">
      <h5 className="text-[44px] leading-12 font-bold text-[#120A02] mb-8 w-[50%] capitalize">
        All about thermal power generation cycles
      </h5>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        <Image
          src="/assets/blogs/card.png"
          alt="blog-1"
          width={584}
          height={402}
        />

        <div>
          <p className="text-lg font-normal text-[#413B35] mb-6">
            Power cycles are thermodynamic cycle that represents the path a
            working fluid takes through a series of processes to convert thermal
            energy into mechanical work. Understanding the intricacies of
            thermal power generation cycles is crucial for grasping the
            fundamental processes that convert heat into electricity
          </p>

          <div className=" italic text-[#413B35] text-lg mb-10">
            <p className="font-medium">by Babatunde Rahim Popoola</p>
            <p className="font-normal">Posted on-July 22, 2024.</p>
          </div>

          <Button variant="secondary" className="w-fit">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
