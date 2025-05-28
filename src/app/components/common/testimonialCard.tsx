import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { ImQuotesLeft } from "react-icons/im";

const TestimonialCard = () => {
  return (
    <div className="p-6 rounded-2xl border border-[#D6C8BA] bg-[#F3F0EC] flex gap-x-4 items-center mr-4">
      <Image
        src="/assets/home/testimonial1.png"
        width={200}
        height={245}
        alt="testimonial"
      />
      <div>
        <p className="text-lg font-semibold text-[#120A02] mb-1">
          Adegbite John
        </p>
        <p className=" italic font-normal text-[#413B35] text-xs mb-3">
          Process Engineering Student
        </p>
        <p className="flex items-center gap-x-1">
          <span className="text-[#12141D] text-xs"> 4.5</span>

          <span>
            <FaStar color="#F1AB00" fill="#F1AB00" size={16} />
          </span>
          <span>
            <FaStar color="#F1AB00" fill="#F1AB00" size={16} />
          </span>
          <span>
            <FaStar color="#F1AB00" fill="#F1AB00" size={16} />
          </span>
          <span>
            <FaStar color="#F1AB00" fill="#F1AB00" size={16} />
          </span>
          <span>
            <FaStar size={16} fill="#D9D9D9" />
          </span>
        </p>
        <div className="mt-6">
          <div className="flex items-center">
            <ImQuotesLeft
              size={40}
              className="text-[#DFA13E] h-[17px] w-[24px]"
            />
            <ImQuotesLeft
              size={40}
              className="text-[#DFA13E] h-[17px] w-[24px]"
            />
          </div>
          <p className="text-sm font-normal text-[#413B35] mt-3">
            Nubriya helped me turn my classroom learning into real-world
            experience. The hands-on projects and supportive mentors made all
            the difference in building my confidence as an engineer!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
