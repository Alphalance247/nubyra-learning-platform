import { FaChevronLeft } from "react-icons/fa6";

export default function PrevArrow({ onClick }: { onClick?: () => void }) {
  //   const { onClick } = props;
  return (
    <div
      className={`absolute cursor-pointer top-[130%] bg-[#DDDAD7] active:bg-[#7B4C1F] hover:bg-[#7B4C1F] p-3 rounded-full left-[30rem] z-10`}
      onClick={onClick}
      style={{ transform: "translateY(-50%)" }}
    >
      <FaChevronLeft size={24} color="#FFFFFF" />
    </div>
  );
}
