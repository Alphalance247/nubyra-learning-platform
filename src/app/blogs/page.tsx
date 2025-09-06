"use client";
import BlogCard from "../components/common/blogCard";
import Container from "../components/common/container";
import HeroCommon from "../components/common/heroCommon";
import Layout from "../components/common/layout";
import Image from "next/image";
import GetInTouch from "../components/home/getInTouch";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Button from "../components/common/buttons";
import Spinner from "../components/common/spinner/spinner";
import { environment } from "../env/env.local";

interface BlogsProps {
  id: string;
  title: string;
  blog_images: {
    image: string;
  }[];
  post_meta: {
    author_name: string[];
    date: string;
  };
}

const Blogs = () => {
  const [blogsData, setBlogsData] = useState<BlogsProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const errrMesaage =
    "An error occurred while fetching the projects. Please try again later.";

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${environment?.baseUrl}/blogs/`, {
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
        btnText="Submit Project Request"
        btnLink="/project/submit"
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
                    image={blog?.blog_images[0]?.image}
                    blogTitle={blog?.title}
                    author_name={blog?.post_meta?.author_name[0]}
                    datePosted={blog?.post_meta?.date}
                    blogUrl={`/blogs/${blog.id}-${slugify(blog.title)}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
      <GetInTouch />
    </Layout>
  );
};

export default Blogs;
