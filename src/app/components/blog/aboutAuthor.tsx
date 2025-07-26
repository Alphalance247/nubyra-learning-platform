import Image from "next/image";
import Button from "../common/buttons";
import { GoChevronRight } from "react-icons/go";

interface authorResponseProps {
  response: {
    author: {
      id: string;
      author_meta: {
        author_desc: string;
        author_img: string;
        author_img_alt: string;
      };
    }[];
    full_content: string;
    image: string;
    title: string;
    post_meta: {
      author_name: string[];
      date: string;
    };
  };
}

const AboutAuthor = ({ response }: authorResponseProps) => {
  console.log(response);
  return (
    <section className="mt-15">
      <div className=" items-start flex gap-x-18">
        <Image
          width={508}
          height={506}
          className="w-[508px] h-[406px] rounded-xl"
          src={`https://api.nubyira.com${response?.author[0]?.author_meta?.author_img}`}
          alt={response?.author[0]?.author_meta?.author_img_alt}
        />

        <div>
          <h2 className="text-xl font-bold font-montserrat text-[#120A02] mb-6 ">
            About the author
          </h2>
          <p className="text-[#413B35] font-inter font-normal text-lg">
            {response?.author[0]?.author_meta?.author_desc}
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
