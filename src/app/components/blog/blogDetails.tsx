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
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import axiosInstance from "@/app/utils/axios";
import toast from "react-hot-toast";
import { useAuth } from "@/app/context/authContext";
import { useRouter } from "next/navigation";

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
  const [loadingSaveBlog, setLoadingSavBlog] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState(blogTitle);
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const errrMesaage =
    "An error occurred while fetching the projects. Please try again later.";

  useEffect(() => {
    const fetchBlogDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.post(`${environment?.baseUrl}/blog-detail/`, {
          bid: currentBlogId,
        });
        if (res.status === 200) {
          setBlogDetailsData(res?.data);
          setLoading(false);

          // Find current blog index in more_posts (which has full blog data)
          const morePosts = res?.data?.more_posts || [];
          const currentIndex = morePosts.findIndex(
            (post: { id: number }) => post.id.toString() === currentBlogId
          );
          setCurrentBlogIndex(currentIndex >= 0 ? currentIndex : 0);
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
  }, [currentBlogId]);

  // Update currentBlogId when blogTitle prop changes (from URL navigation)
  useEffect(() => {
    if (blogTitle !== currentBlogId) {
      setCurrentBlogId(blogTitle);
    }
  }, [blogTitle, currentBlogId]);

  function slugify(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
      .replace(/(^-|-$)+/g, ""); // Remove leading/trailing hyphens
  }

  const baseUrl = environment?.imageUrl;
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

  const handleSaveBlog = async () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Redirect to login page with current page as redirect parameter
      const redirectUrl = encodeURIComponent(pathname);
      router.push(`/sign-in?redirect=${redirectUrl}`);
      toast.error("Please log in to save this blog");
      return;
    }
    try {
      setLoadingSavBlog(true);
      const res = await axiosInstance.post(
        `${environment?.baseUrl}/dashboard/`,
        {
          bid: currentBlogId,
        }
      );

      if (res.status === 200) {
        toast.success(res.data?.success || "Blog saved successfully");
      }

      setLoadingSavBlog(false);
    } catch (err) {
      // Extract the error message from the response
      let errorMessage = "";
      if (err instanceof AxiosError) {
        // Check if err is an instance of AxiosError
        errorMessage = err.response?.data?.detail || errorMessage;
      }

      toast.error(errorMessage);
      setLoadingSavBlog(false);
    }
  };

  const handleNextPost = () => {
    const morePosts = blogDetailsData?.more_posts || [];
    const nextIndex = currentBlogIndex + 1;

    if (nextIndex < morePosts.length) {
      const nextPost = morePosts[nextIndex];
      setCurrentBlogId(nextPost.id.toString());
      setCurrentBlogIndex(nextIndex);

      // Update URL without page reload
      const newSlug = `${nextPost.id}-${slugify(nextPost.title)}`;
      router.push(`/blogs/${newSlug}`, { scroll: false });
    }
  };

  const handlePreviousPost = () => {
    const morePosts = blogDetailsData?.more_posts || [];
    const prevIndex = currentBlogIndex - 1;

    if (prevIndex >= 0) {
      const prevPost = morePosts[prevIndex];
      setCurrentBlogId(prevPost.id.toString());
      setCurrentBlogIndex(prevIndex);

      // Update URL without page reload
      const newSlug = `${prevPost.id}-${slugify(prevPost.title)}`;
      router.push(`/blogs/${newSlug}`, { scroll: false });
    }
  };

  const fullUrl = `https://www.nubyira.com${pathname}`;
  return (
    <Layout>
      <section className="bg-white">
        <Container>
          {loading ? (
            <div className="flex flex-col justify-center items-center">
              <Spinner />
              <p className="text-lg text-[#95704C] font-medium mt-4">
                Loading blog details...
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col justify-center items-center">
              <p className="text-red-500">Error fetching blog details</p>
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
              <div className="flex flex-col lg:flex-row items-start justify-between gap-4 lg:gap-0">
                {/* Blog Title */}
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold text-[#120A02] mb-4 lg:mb-8 w-full lg:w-3/5 capitalize font-montserrat">
                  {blogDetailsData?.response?.title}
                </h3>

                {/* Social Share Icons */}
                <div className="flex flex-wrap gap-3 sm:gap-4">
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
                      key={i}
                      href={`${el.url}${encodeURIComponent(fullUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={el.name}
                    >
                      <Image
                        src={el.img}
                        alt={el.name}
                        width={40}
                        height={40}
                        className="w-8 h-8 sm:w-10 sm:h-10"
                      />
                    </a>
                  ))}
                </div>
              </div>

              <div className="text-lg mt-2 italic text-[#413B35] font-inter font-medium">
                <p>by {blogDetailsData?.response?.post_meta?.author_name}</p>
                <p>Posted on - {blogDetailsData?.response?.post_meta?.date}.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <div>
                  <Image
                    src={`${environment?.imageUrl}${blogDetailsData?.response?.blog_images[0]?.image}`}
                    width={584}
                    height={565}
                    alt="imageHeading"
                    className="lg:w-[584px] w-full lg:h-[565px] rounded-lg"
                  />
                </div>

                <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md flex flex-col gap-4 sm:gap-y-4">
                  <p className="text-lg sm:text-xl font-semibold text-[#0F0918] pb-3 sm:pb-5 border-b-[1.5px] border-[#B6979133]">
                    Recommended Posts
                  </p>

                  {blogDetailsData?.recommend
                    ?.slice(0, 5)
                    .map((post, index) => (
                      <Link
                        key={index}
                        href={`/blogs/${post?.id}-${slugify(post?.title)}`}
                      >
                        <p className="text-[#413B35] text-sm sm:text-base hover:bg-[#A78769] hover:text-white font-normal cursor-pointer p-3 sm:p-6 bg-[#FBFAF9] rounded-lg transition">
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
                className="my-20 text-amber-800 w-full lg:w-[60%] blog-content rounded-xl"
              />

              <div className="my-10 text-center">
                <Button
                  className="w-[298px] flex gap-x-3 justify-center items-center mx-auto"
                  variant="primary"
                  onClick={handleSaveBlog}
                >
                  {loadingSaveBlog ? "saving...." : "Save Blog"}
                </Button>
              </div>

              {response && <AboutAuthor response={response} />}

              {/* Navigation Buttons */}
              <div className="my-10">
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    className="w-[298px] flex gap-x-3 justify-center items-center"
                    variant="secondary"
                    onClick={handlePreviousPost}
                    disabled={currentBlogIndex <= 0}
                  >
                    <span>
                      <GoChevronLeft />
                    </span>
                    Previous Post
                  </Button>

                  <Button
                    className="w-[298px] flex gap-x-3 justify-center items-center"
                    variant="primary"
                    onClick={handleNextPost}
                    disabled={
                      currentBlogIndex >=
                      (blogDetailsData?.more_posts?.length || 0) - 1
                    }
                  >
                    Next Post
                    <span>
                      <GoChevronRight />
                    </span>
                  </Button>
                </div>
              </div>

              {morePost && <RelatedBlog moreBlogs={morePost} />}
            </div>
          )}
        </Container>
      </section>
    </Layout>
  );
};

export default BlogsDetails;
