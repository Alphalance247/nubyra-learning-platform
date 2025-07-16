import Image from "next/image";

const MoreBlogCards = () => {
  return (
    <div className="p-4 bg-[#F2EDE9] border-b border-amber-600 flex gap-x-6 rounded-xl">
      <Image
        width={156}
        height={114}
        src="/assets/blogs/blog-card.png"
        alt="blogcard"
      />
      <div>
        <h4 className="text-lg font-semibold font-montserrat text-[#70451C] mb-3">
          Process simulation in chemical engineeering
        </h4>
        <p className="text-base italic font-inter font-semibold text-[#413B35] mb-1.5">
          by Babatunde Rahim Popoola
        </p>
        <p className="text-base italic font-inter text-[#413B35]">
          Posted on-July 22, 2024.
        </p>
      </div>
    </div>
  );
};

export default MoreBlogCards;
