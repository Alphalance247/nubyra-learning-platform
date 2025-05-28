import { FaChevronRight } from "react-icons/fa6";

export default function NextArrow({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className={`absolute cursor-pointer top-[130%] bg-[#DDDAD7] p-3 rounded-full right-[30rem] z-10 active:bg-[#7B4C1F] hover:bg-[#7B4C1F] `}
      onClick={onClick}
      style={{ transform: "translateY(-50%)" }}
    >
      <FaChevronRight size={24} color="#FFFFFF" />
    </div>
  );
}
