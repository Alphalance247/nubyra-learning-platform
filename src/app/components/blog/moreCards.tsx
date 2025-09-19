import { environment } from "@/app/env/env.local";
import Image from "next/image";
import Link from "next/link";

const MoreBlogCards = ({
  heading,
  author,
  datePosted,
  image,
  alt,
  url,
}: {
  heading: string;
  author: string;
  datePosted: string;
  image: string;
  alt: string;
  url: string;
}) => {
  return (
    <Link href={url || "/"}>
      <div className="p-4 bg-[#F2EDE9] border-b border-amber-600 flex flex-col sm:flex-row gap-4 sm:gap-x-6 rounded-xl hover:shadow-md transition">
        <div className="flex-shrink-0 w-full sm:w-[156px] h-auto sm:h-[114px]">
          <Image
            src={
              `${environment?.imageUrl}${image}` ||
              "/assets/blogs/blog-card.png"
            }
            alt={alt}
            width={156}
            height={114}
            className="w-full h-auto sm:h-[114px] rounded-lg object-cover"
          />
        </div>

        <div className="flex flex-col justify-between">
          <h4 className="text-base sm:text-lg font-semibold font-montserrat text-[#70451C] mb-2 sm:mb-3">
            {heading}
          </h4>
          <p className="text-sm sm:text-base italic font-inter font-semibold text-[#413B35] mb-1">
            by {author}
          </p>
          <p className="text-sm sm:text-base italic font-inter text-[#413B35]">
            Posted on {datePosted}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MoreBlogCards;
