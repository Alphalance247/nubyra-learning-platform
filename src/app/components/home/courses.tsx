import Container from "../common/container";
import HeadingSubhead from "../common/headingSubhead";
import Image from "next/image";
import Button from "../common/buttons";
import CourseCard from "../common/coursesCard";
const OurCourses = () => {
  const courses = [
    {
      image: "/assets/home/vid1.png",
      title: "Aspen HYSYS Basic course webinar",
      price: "$50.00",
      time: "3 hours a day",
      duration: "5 days",
    },
    {
      image: "/assets/home/vid2.png",
      title: "Aspen HYSYS Basic course webinar",
      price: "$50.00",
      time: "3 hours a day",
      duration: "5 days",
    },
    {
      image: "/assets/home/vid1.png",
      title: "Aspen HYSYS Basic course webinar",
      price: "$50.00",
      time: "3 hours a day",
      duration: "5 days",
    },
  ];

  return (
    <section className="bg-[#FEFEFD] relative">
      <div className="absolute top-0 left-0 z-20">
        <Image
          src="/assets/home/img.png"
          alt="courses-bg"
          width={500}
          height={600}
        />
      </div>
      <Container>
        <HeadingSubhead
          heading="Explore Our Courses "
          subheading="Learn practical process engineering skills, master tools, and build real-world projects — at your own pace."
          headingClassName="text-[#120A02]"
          subheadingClassName="text-[#413B35]"
        />

        <div className="grid md:grid-cols-3 gap-8 mt-15">
          {courses.map((course, index) => (
            // <div key={index}>
            //   <Image
            //     width={378}
            //     height={170}
            //     src={course?.image}
            //     alt="course"
            //   />
            //   <p className="mt-[-3rem] text-lg font-semibold">
            //     Aspen HYSYS Basic course webinar
            //   </p>
            //   <p className="mt-2 text-2xl font-semibold text-[#120A02]">
            //     $50.00
            //   </p>
            //   <p className="mt-2 text-base text-[#413B35] flex items-center gap-2">
            //     <span>
            //       <FaRegCalendar size={24} color="#413B35" />
            //     </span>
            //     Time: <span className="font-medium">3 hours a day</span>
            //   </p>
            //   <p className="mt-2 text-base text-[#413B35] flex items-center gap-2">
            //     <span>
            //       <IoMdTime size={24} color="#413B35" />
            //     </span>
            //     Course Duration: <span className="font-medium">5 days</span>
            //   </p>

            //   <div className="mt-8 flex gap-3 items-center">
            //     <Button variant="primary" className="w-full">
            //       Enroll Now
            //     </Button>
            //     <Button variant="secondary" className="w-full">
            //       View Details
            //     </Button>
            //   </div>
            // </div>

            <CourseCard
              key={index}
              image={course?.image}
              title={course?.title}
              price={course?.price}
              time={course?.time}
              duration={course?.duration}
            />
          ))}
        </div>

        <div className="mt-15 flex flex-col items-center justify-center">
          <Button variant="secondary" className="w-[289px]">
            View All Courses
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default OurCourses;
