type CourseTagProps = {
    status: string;
    imageUrl: string;
  };
  
  export const CourseTag: React.FC<CourseTagProps> = ({ status, imageUrl }) => (
    <div className="flex items-center gap-[10px] px-[10px] py-[5px] rounded-[12px] w-fit h-fit">
      <img
        src={imageUrl}
        alt="Course Icon"
        className="w-[59px] h-[59px] rounded-full border-[2.77px]  border-[#D6C8BA] object-cover"
      />
      <span className="w-full h-[30px] text-xs font-semibold px-[10px] py-[5px] bg-[#FFFAE6] text-yellow-800">{status}</span>
    </div>
  );
  