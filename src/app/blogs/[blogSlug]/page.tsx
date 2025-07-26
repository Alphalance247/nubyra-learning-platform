import BlogsDetails from "@/app/components/blog/blogDetails";

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ blogSlug: string }>;
}) {
  const { blogSlug } = await params;
  const [id] = blogSlug.split("-");

  return <BlogsDetails blogTitle={id} />;
}
