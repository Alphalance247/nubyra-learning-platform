import Container from "../common/container";
import MoreBlogCards from "./moreCards";

interface morePostProps {
  moreBlogs: {
    title: string;
    id: number;
    image: string;
    post_meta: {
      author_name: string[];
      date: string;
      img_alt: string;
    };
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
    <section className="bg-[#FBFAF9]">
      <Container>
        <h3 className="text-[44px] font-bold text-[#120A02] capitalize font-montserrat mb-15">
          More from Nubyira Blog
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {moreBlogs?.map((el, i) => (
            <MoreBlogCards
              heading={el?.title}
              author={el?.post_meta?.author_name[0]}
              datePosted={el?.post_meta?.date}
              image={el?.image}
              key={i}
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
