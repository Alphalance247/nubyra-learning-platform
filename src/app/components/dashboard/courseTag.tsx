import Image from "next/image";

type CourseTagProps = {
  status: string;
  imageUrl: string;
};

export const CourseTag: React.FC<CourseTagProps> = ({ status, imageUrl }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Completed Course":
        return "bg-[#E6FAEE] text-[#005423]";
      case "Postponed Course":
        return "bg-[#F2EDE9] text-[#080401]";
      case "Ongoing Course":
        return "bg-[#FFFAE6] text-[#695700]";
      case "Registered Course":
        return "bg-[#FFFAE6] text-[#695700]";
      default:
        return "bg-[#FFFAE6] text-[#695700]";
    }
  };

  return (
    <div className="flex items-center gap-[10px] px-[10px] py-[5px] rounded-[12px] w-fit h-fit">
      <Image
        src={imageUrl || ""}
        width={59}
        height={59}
        alt="Course Icon"
        className="w-[59px] h-[59px] rounded-full border-[2.77px] border-[#D6C8BA] object-cover"
      />
      <span
        className={`h-[30px] text-xs font-semibold px-[10px] py-[5px] rounded-[8px] ${getStatusStyles(
          status
        )}`}
      >
        {status}
      </span>
    </div>
  );
};
