import { FaStar } from "react-icons/fa";
import { ImQuotesLeft } from "react-icons/im";

const TestimonialCard = ({
  name,
  profession,
  stars,
  description,
  country,
  withEmptyStar,
  withOneMore = false,
  arr,
}: {
  name: string;
  profession: string;
  stars: string;
  description: string;
  country: string;
  arr: string[];
  withEmptyStar: boolean;
  withOneMore?: boolean;
}) => {
  return (
    <div className="p-4 sm:p-6 rounded-2xl border border-[#D6C8BA] bg-[#F3F0EC] flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center h-full lg:mr-4">
      {/* <div className="w-full sm:w-40 md:w-48 flex-shrink-0">
        <Image
          src="/assets/home/testimonial1.png"
          width={200}
          height={245}
          alt="testimonial"
          className="w-full h-auto rounded-lg object-cover"
        />
      </div> */}
      <div className="flex-1">
        <p className="text-base sm:text-lg font-semibold text-[#120A02] mb-1">
          {name}
        </p>
        <p className="italic font-normal text-[#413B35] text-xs sm:text-sm mb-3">
          {profession}
        </p>
        <p className="italic font-normal text-[#413B35] text-xs sm:text-sm mb-3">
          Country: <span className="font-bold not-italic"> {country}</span>
        </p>
        <div className="flex items-center gap-x-1 mb-3">
          <span className="text-[#12141D] text-xs sm:text-sm">{stars}</span>
          {arr.map((_, i) => (
            <FaStar key={i} color="#F1AB00" size={14} />
          ))}
          {withEmptyStar && <FaStar size={14} fill="#D9D9D9" />}
          {withOneMore && <FaStar size={14} fill="#D9D9D9" />}
        </div>
        <div className="mt-2">
          <div className="flex items-center gap-1">
            <ImQuotesLeft className="text-[#DFA13E] h-4 w-5" />
            <ImQuotesLeft className="text-[#DFA13E] h-4 w-5" />
          </div>
          <p className="text-sm sm:text-base font-normal text-[#413B35] mt-2 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
