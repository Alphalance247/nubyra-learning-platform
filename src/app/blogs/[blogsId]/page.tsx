import AboutAuthor from "@/app/components/blog/aboutAuthor";
import RelatedBlog from "@/app/components/blog/relatedBlog";
import Container from "@/app/components/common/container";
import Layout from "@/app/components/common/layout";
import Image from "next/image";

const BlogsId = () => {
  return (
    <Layout>
      <Container>
        <div className="flex items-start justify-between">
          <h3 className="text-[44px] w-[60%] font-bold text-[#120A02] mb-8 capitalize font-montserrat">
            All about thermal power generation cycles
          </h3>

          <div className="flex gap-x-4">
            {["", "", "", "", ""].map((el, i) => (
              <Image
                width={46}
                height={46}
                src="/assets/blogs/tel.svg"
                alt=""
                key={i}
              />
            ))}
          </div>
        </div>

        <div className="text-lg italic text-[#413B35] font-inter font-medium">
          <p>by Babatunde Rahim Popoola</p>
          <p>Posted on-July 22, 2024.</p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 mt-8">
          <div>
            <Image
              src="/assets/blogs/holder.png"
              width={584}
              height={565}
              alt=""
            />
          </div>

          <div className="p-6 bg-[#FFFFFF] rounded-xl shadow-md flex flex-col gap-y-4">
            <p className="text-xl font-semibold text-[#0F0918] pb-5 border-b-[1.5px] border-[#B6979133]">
              Recommended Posts
            </p>
            {[
              "Thermal Power Generation",
              "Hydroelectric Power",
              "Solar Energy",
              "Wind Energy",
            ].map((post, index) => (
              <p
                key={index}
                className="text-[#413B35] text-base hover:bg-[#A78769] transform hover:text-white font-normal cursor-pointer p-6 bg-[#FBFAF9] rounded-lg"
              >
                It entails background introductions to computer aided drafting
                software, history and current challenges.
              </p>
            ))}
          </div>
        </div>

        <AboutAuthor />

        <RelatedBlog />
      </Container>
    </Layout>
  );
};

export default BlogsId;
