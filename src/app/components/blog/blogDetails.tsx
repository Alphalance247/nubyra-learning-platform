"use client";
import AboutAuthor from "@/app/components/blog/aboutAuthor";
import RelatedBlog from "@/app/components/blog/relatedBlog";
import Container from "@/app/components/common/container";
import Layout from "@/app/components/common/layout";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Spinner from "../common/spinner/spinner";
import Button from "../common/buttons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { environment } from "@/app/env/env.local";

interface blogDetailsProp {
  more_posts: {
    title: string;
    id: number;
    blog_images: {
      image: string;
    }[];
    post_meta: {
      author_name: string[];
      date: string;
      img_alt: string;
    };
  }[];

  recommend: {
    title: string;
    id: string;
  }[];

  response: {
    author: {
      id: string;
      author_meta: {
        author_desc: string;
        author_img: string;
        author_img_alt: string;
      };
    }[];
    full_content: string;
    blog_images: {
      image: string;
    }[];
    title: string;
    post_meta: {
      author_name: string[];
      date: string;
    };
  };
}

const BlogsDetails = ({ blogTitle }: { blogTitle: string }) => {
  const [blogDetailsData, setBlogDetailsData] =
    useState<blogDetailsProp | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const morePost = blogDetailsData?.more_posts;
  const response = blogDetailsData?.response;

  const errrMesaage =
    "An error occurred while fetching the projects. Please try again later.";

  useEffect(() => {
    const fetchBlogDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.post(`${environment?.baseUrl}/blog-detail/`, {
          bid: blogTitle,
        });
        if (res.status === 200) {
          setBlogDetailsData(res?.data);
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

    fetchBlogDetails();
  }, [blogTitle]);

  function slugify(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
      .replace(/(^-|-$)+/g, ""); // Remove leading/trailing hyphens
  }

  const baseUrl = "https://stage-backend.nubyira.com/";
  function addBaseUrlToImages(html: string, baseUrl: string) {
    return html.replace(
      /<img\s+([^>]*?)src=["'](\/[^"']*)["']/gi,
      (match, pre, src) => {
        // Only add baseUrl if src starts with /
        return `<img ${pre}src="${baseUrl}${src}"`;
      }
    );
  }
  const fullContentWithBaseUrl = addBaseUrlToImages(
    blogDetailsData?.response?.full_content || "",
    baseUrl
  );

  const pathname = usePathname();
  const fullUrl = `https://www.nubyira.com${pathname}`;
  return (
    <Layout>
      <section className="bg-white">
        <Container>
          {loading ? (
            <div className="flex flex-col justify-center items-center">
              <Spinner />
              <p className="text-lg font-medium mt-4">Loading courses...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col justify-center items-center">
              <p className="text-red-500">Error fetching courses</p>
              <Button
                variant="secondary"
                className="w-[289px]"
                // onClick={() => fetchCourseList()}
              >
                Try Again
              </Button>
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between">
                <h3 className="text-[44px] w-[60%] font-bold text-[#120A02] mb-8 capitalize font-montserrat">
                  {blogDetailsData?.response?.title}
                </h3>

                <div className="flex gap-x-4">
                  {[
                    {
                      name: "Telegram",
                      img: "/assets/blogs/tel.svg",
                      url: "https://t.me/share/url?url=",
                    },
                    {
                      name: "Facebook",
                      img: "/assets/blogs/facebook.svg",
                      url: "https://www.facebook.com/sharer/sharer.php?u=",
                    },
                    {
                      name: "LinkedIn",
                      img: "/assets/blogs/linkedIn.svg",
                      url: "https://www.linkedin.com/sharing/share-offsite/?url=",
                    },
                    {
                      name: "WhatsApp",
                      img: "/assets/blogs/whatsapp.svg",
                      url: "https://wa.me/?text=",
                    },
                  ].map((el, i) => (
                    <a
                      href={`${el?.url}${encodeURIComponent(fullUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={i}
                      title={el?.name}
                    >
                      <Image
                        src={el?.img || ""}
                        alt={el?.name}
                        width={46}
                        height={46}
                      />
                    </a>
                  ))}
                </div>
              </div>

              <div className="text-lg italic text-[#413B35] font-inter font-medium">
                <p>by {blogDetailsData?.response?.post_meta?.author_name}</p>
                <p>Posted on - {blogDetailsData?.response?.post_meta?.date}.</p>
              </div>

              <div className="grid grid-cols-2 gap-x-6 mt-8">
                <div>
                  <Image
                    src={`https://stage-backend.nubyira.com/${blogDetailsData?.response?.blog_images[0]?.image}`}
                    width={584}
                    height={565}
                    alt="imageHeading"
                    className="w-[584px] h-[565px] rounded-lg"
                  />
                </div>

                <div className="p-6 bg-[#FFFFFF] rounded-xl shadow-md flex flex-col gap-y-4">
                  <p className="text-xl font-semibold text-[#0F0918] pb-5 border-b-[1.5px] border-[#B6979133]">
                    Recommended Posts
                  </p>
                  {blogDetailsData?.recommend
                    ?.slice(0, 5)
                    .map((post, index) => (
                      <Link
                        key={index}
                        href={`/blogs/${post?.id}-${slugify(post?.title)}`}
                      >
                        <p className="text-[#413B35] text-base hover:bg-[#A78769] transform hover:text-white font-normal cursor-pointer p-6 bg-[#FBFAF9] rounded-lg">
                          {post?.title}
                        </p>
                      </Link>
                    ))}
                </div>
              </div>

              <div
                dangerouslySetInnerHTML={{
                  __html: fullContentWithBaseUrl,
                }}
                className="my-20 text-amber-800 w-[60%] blog-content rounded-xl"
              />

              {response && <AboutAuthor response={response} />}
              {morePost && <RelatedBlog moreBlogs={morePost} />}
            </div>
          )}
        </Container>
      </section>
    </Layout>
  );
};

export default BlogsDetails;
