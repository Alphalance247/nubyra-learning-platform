"use client";
import BlogCard from "../components/common/blogCard";
import Container from "../components/common/container";
import HeroCommon from "../components/common/heroCommon";
import Layout from "../components/common/layout";
import Image from "next/image";
import GetInTouch from "../components/home/getInTouch";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import { AxiosError } from "axios";
import Button from "../components/common/buttons";
import Spinner from "../components/common/spinner/spinner";

interface BlogsProps {
  id: string;
  title: string;
  image: string;
  post_meta: {
    author_name: string[];
    date: string;
  };
}

const Blogs = () => {
  const [blogsData, setBlogsData] = useState<BlogsProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  console.log(blogsData);

  const errrMesaage =
    "An error occurred while fetching the projects. Please try again later.";

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(`/blogs/`, {
        page: 1,
      });
      if (res.status === 200 && Array.isArray(res.data.response?.blogs)) {
        setBlogsData(res?.data?.response?.blogs);
        setLoading(false);
      } else {
        setError(errrMesaage);
        setLoading(false);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.message || errrMesaage);
        setLoading(false);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  function slugify(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
      .replace(/(^-|-$)+/g, ""); // Remove leading/trailing hyphens
  }

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
            {error && (
              <div className="mt-8 text-center text-red-600 text-lg font-semibold flex flex-col items-center justify-center">
                <p> {error}</p>
                <Button
                  variant="primary"
                  className="mt-4"
                  onClick={() => {
                    setError("");
                    fetchProjects();
                  }}
                >
                  <span className="text-white">Retry</span>
                </Button>
              </div>
            )}

            {loading ? (
              <div className="flex flex-col items-center">
                <Spinner />
                <p className="text-lg text-gray-500 mt-4">
                  Loading projects...
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {blogsData?.map((blog, i) => (
                  <BlogCard
                    key={i}
                    image={blog?.image}
                    blogTitle={blog?.title}
                    author_name={blog?.post_meta?.author_name[0]}
                    datePosted={blog?.post_meta?.date}
                    blogUrl={`/blogs/${blog.id}-${slugify(blog.title)}`}
                  />
                ))}
              </div>
            )}

            <div className="text-center py-15">
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
