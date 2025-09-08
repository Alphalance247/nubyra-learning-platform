import Container from "../common/container";
import MoreBlogCards from "./moreCards";

interface morePostProps {
  moreBlogs: {
    title: string;
    id: number;
    blog_images: { image: string }[];
    post_meta: { author_name: string[]; date: string; img_alt: string };
  }[];
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
    .replace(/(^-|-$)+/g, ""); // Remove leading/trailing hyphens
}

const RelatedBlog = ({ moreBlogs }: morePostProps) => {
  return (
    <section className="bg-[#FBFAF9] py-10 sm:py-16">
      <Container>
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold text-[#120A02] capitalize font-montserrat mb-6 sm:mb-10">
          More from Nubyira Blog
        </h3>

        <div className="grid grid-cols-1  lg:grid-cols-2 gap-4 sm:gap-6">
          {moreBlogs?.map((el, i) => (
            <MoreBlogCards
              key={i}
              heading={el?.title}
              author={el?.post_meta?.author_name[0]}
              datePosted={el?.post_meta?.date}
              image={el?.blog_images[0]?.image}
              alt={el?.post_meta?.img_alt}
              url={`/blogs/${el?.id}-${slugify(el?.title)}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default RelatedBlog;
