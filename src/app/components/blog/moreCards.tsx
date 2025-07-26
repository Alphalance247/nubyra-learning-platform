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
      <div className="p-4 bg-[#F2EDE9] border-b border-amber-600 flex gap-x-6 rounded-xl">
        <Image
          width={156}
          height={114}
          src={
            `https://api.nubyira.com/${image}` || "/assets/blogs/blog-card.png"
          }
          alt={alt}
          className="w-[156px] h-[114px] rounded-lg"
        />
        <div>
          <h4 className="text-lg font-semibold font-montserrat text-[#70451C] mb-3">
            {heading}
          </h4>
          <p className="text-base italic font-inter font-semibold text-[#413B35] mb-1.5">
            by {author}
          </p>
          <p className="text-base italic font-inter text-[#413B35]">
            Posted on-July 22, 2024. {datePosted}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MoreBlogCards;
