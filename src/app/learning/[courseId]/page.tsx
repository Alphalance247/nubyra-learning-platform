import CourseDetails from "@/app/components/learning/cousrseDetails";
import { JSX } from "react";

export default async function CourseId({
  params,
}: {
  params: Promise<{ courseId: string }>;
}): Promise<JSX.Element> {
  const { courseId } = await params;

  return <CourseDetails id={courseId} />;
}
