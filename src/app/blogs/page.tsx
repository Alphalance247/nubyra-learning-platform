import BlogCard from "../components/common/blogCard";
import Container from "../components/common/container";
import HeroCommon from "../components/common/heroCommon";
import Layout from "../components/common/layout";
import Image from "next/image";
import GetInTouch from "../components/home/getInTouch";

const Blogs = () => {
  return (
    <Layout>
      <HeroCommon
        heading="Nubyira "
        span="Blog"
        description="Explore how Nubyira Blog transforms ideas into impactful learning!"
        bgUrl="bg-[url(/assets/blogs/blog-hero.png)]"
        btnText="Contact us"
        btnLink="/"
      />

      <Container>
        <div className="flex flex-col gap-y-10">
          <div>
            <BlogCard />
            <div className="text-center py-15 border-y-[1.5px] border-[#B6979133]">
              <p className="text-[#120A02] text-2xl font-bold mb-6">
                Advertisement
              </p>

              <Image
                src="/assets/blogs/advertisement.png"
                alt="ad"
                width={1200}
                height={291}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <BlogCard />
            <div className="text-center py-15 border-y-[1.5px] border-[#B6979133]">
              <p className="text-[#120A02] text-2xl font-bold mb-6">
                Advertisement
              </p>

              <Image
                src="/assets/blogs/advertisement.png"
                alt="ad"
                width={1200}
                height={291}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </Container>
      <GetInTouch />
    </Layout>
  );
};

export default Blogs;
