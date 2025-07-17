import Container from "../common/container";
import MoreBlogCards from "./moreCards";

const RelatedBlog = () => {
  return (
    <section className="bg-[#FBFAF9]">
      <Container>
        <h3 className="text-[44px] font-bold text-[#120A02] capitalize font-montserrat mb-15">
          More from Nubyira Blog
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MoreBlogCards />
          <MoreBlogCards />
          <MoreBlogCards />
          <MoreBlogCards />
          <MoreBlogCards />
        </div>
      </Container>
    </section>
  );
};

export default RelatedBlog;
