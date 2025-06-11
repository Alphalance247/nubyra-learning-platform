type CourseTagProps = {
    status: string;
  };
  
  export const CourseTag: React.FC<CourseTagProps> = ({ status }) => (
    <span className="text-xs text-green-600 font-semibold">{status}</span>
  );
  