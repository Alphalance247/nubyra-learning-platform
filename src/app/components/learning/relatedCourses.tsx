import CourseCard from "../common/coursesCard";

const RelatedCourses = () => {
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
    <div className="pt-15 border-t-[1.5px] border-[#B6979133]">
      <h5 className="text-3xl font-bold text-[#120A02] mb-8">
        Other Courses to learn
      </h5>

      <div className="grid md:grid-cols-3 gap-8">
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
    </div>
  );
};

export default RelatedCourses;
