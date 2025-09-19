import { environment } from "@/app/env/env.local";
import Button from "./buttons";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({
  blogTitle,
  datePosted,
  author_name,
  image,
  blogUrl,
}: {
  blogTitle: string;
  datePosted: string;
  author_name: string;
  image: string;
  blogUrl: string;
}) => {
  return (
    <div className="">
      {/* <h5 className="text-[44px] leading-12 font-bold text-[#120A02] mb-8 w-[50%] capitalize">
        {blogTitle || "............."}
      </h5> */}

      <div className="flex flex-col">
        <Image
          src={`${environment?.imageUrl}${image}` || "/assets/my-farms/2.png"}
          alt="blog-1"
          width={584}
          height={402}
          className="w-[378px] h-[178px] rounded-lg mb-4"
        />

        <div>
          <p className="text-base font-semibold text-[#120A02] mb-3">
            {`${blogTitle}`}
          </p>

          <div className=" italic text-[#413B35] text-lg mb-5">
            <p className="font-medium">
              {author_name || " by Babatunde Rahim Popoola"}
            </p>
            <p className="font-normal">
              {datePosted || "Posted on-July 22, 2024."}
            </p>
          </div>
          <Link href={blogUrl || "/"}>
            <Button variant="secondary" className="w-full md:w-fit">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
