import Button from "@/app/components/common/buttons";
import Container from "@/app/components/common/container";
import Layout from "@/app/components/common/layout";
import RelatedCourses from "@/app/components/learning/relatedCourses";
import { IoMdTime } from "react-icons/io";

const CourseDetails = () => {
  const outline = [
    {
      icon: "",
      head: "Course Duration: ",
      subhead: "5 days",
    },
    {
      icon: "",
      head: "Time: 3 hours a day. ",
      subhead: "From 9am-12pm",
    },
    {
      icon: "",
      head: "Course Venue:",
      subhead: " Online Class",
    },
    {
      icon: "",
      head: "Course Certificate: ",
      subhead: "Available after Completion",
    },
    {
      icon: "",
      head: "Training Software:  ",
      subhead: "AutoCAD Plant 3D",
    },
    {
      icon: "",
      head: "Software Installation: ",
      subhead: "Contact Us",
    },
  ];
  return (
    <Layout>
      <Container>
        <h3 className="text-[44px] font-bold text-[#120A02] mb-8 ">
          Apen Plus Basic Course Webinar
        </h3>

        <div className="grid md:grid-cols-2 gap-20 mb-14">
          <div>
            <iframe
              className="w-[633px] h-[567px] rounded-2xl"
              src="https://www.youtube-nocookie.com/embed/wAom6mlgL04?si=rf-sk4KzoIN5rRia&amp;loop=1"
              title="course video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>

          <div className=" shadow-2xl rounded-xl p-6 bg-[#FFFFFF]">
            <div className="flex items-center gap-x-5 mb-5">
              <p className="text-xl font-semibold text-[#0F0918]">
                Course Overview
              </p>
              <p className="px-4 py-1.5 bg-[#98EEAF] border-[0.5px] border-[#55FF83] rounded-2xl text-xs text-[#00260A] font-normal">
                Available
              </p>
            </div>

            <div className="bg-[#FBFAF9] p-6 rounded-b-md flex flex-col gap-y-6">
              {outline.map((el, i) => (
                <div className="flex items-center gap-1" key={i}>
                  <span>
                    <IoMdTime size={24} color="#413B35" />
                  </span>{" "}
                  <p className="text-[#413B35] text-base font-normal">
                    {el?.head}{" "}
                    <span className="font-semibold">{el?.subhead}</span>
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-y-5">
              <Button variant="primary" className="w-full">
                Enrol Now
              </Button>
              <Button variant="secondary" className="w-full">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
        <RelatedCourses />
      </Container>
    </Layout>
  );
};

export default CourseDetails;
