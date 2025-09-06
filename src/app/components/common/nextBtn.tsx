import { FaChevronRight } from "react-icons/fa6";

export default function NextArrow({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className={`absolute cursor-pointer hidden md:block md:top-[133%]   bg-[#DDDAD7] p-3 rounded-full right-[30rem] xl:right-[30rem] lg:right-[37rem] md:right-[29rem] z-10 active:bg-[#7B4C1F] hover:bg-[#7B4C1F] `}
      onClick={onClick}
      style={{ transform: "translateY(-50%)" }}
    >
      <FaChevronRight size={24} color="#FFFFFF" />
    </div>
  );
}
