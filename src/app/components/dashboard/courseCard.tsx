import { CourseTag } from "./courseTag";
import { ProgressBar } from "./progressBar";

export type Course = {
  title: string;
  progress: number;
  status: string;
};

type CourseCardProps = {
  course: Course;
};

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => (
  <div className="p-4 border rounded-xl shadow-sm bg-white">
    <div className="mb-2">
      <CourseTag status={course.status} />
    </div>
    <h3 className="text-md font-semibold">{course.title}</h3>
    <p className="text-sm mt-1 font-medium">{course.progress}% Complete</p>
    <ProgressBar percent={course.progress} />
    <button className="mt-3 px-4 py-2 bg-yellow-700 text-white rounded hover:bg-yellow-800">
      Continue Learning
    </button>
  </div>
);
