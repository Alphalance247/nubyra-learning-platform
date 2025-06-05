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
