import ProjectDetailsPage from "@/app/components/project/projectDetails";
import { JSX } from "react";

export default async function MyFarmsDetails({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}): Promise<JSX.Element> {
  const { projectSlug } = await params;

  return <ProjectDetailsPage projectTitle={projectSlug} />;
}
