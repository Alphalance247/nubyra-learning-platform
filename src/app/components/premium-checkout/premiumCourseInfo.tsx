import { getSubsriptionPriceListStore } from "@/stores/courses/getSubcriptionPrice";

const PremiumCourseInfo = () => {
  const { data: info } = getSubsriptionPriceListStore();
  const infos = info?.sub_price || 0;

  const data = [
    {
      type: "Subscription Type:",
      value: "Perpetual",
    },
    {
      type: "Token:",
      value: "$ " + infos + ".00" || "0",
    },
    {
      type: "Total Payment:",
      value: "$ " + infos + ".00" || "0",
    },
  ];
  return (
    <section className="w-full md:w-[694px] mx-auto bg-white border-[#F2EDE9] border rounded-xl p-6">
      <div className="bg-[#FBFAF9] border border-[#F2EDE9] px-6 pb-6 rounded-lg">
        {data?.map((el, i) => (
          <div
            className="flex flex-col md:flex-row md:items-center py-6 border-[#B6979133] border-b-[1.5px]"
            key={i}
          >
            <p className="text-base md:text-lg text-[#413B35] md:w-[30%] mb-2 md:mb-0">
              {el?.type}
            </p>
            <p className="text-base md:text-lg font-semibold font-inter">
              {el?.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PremiumCourseInfo;
