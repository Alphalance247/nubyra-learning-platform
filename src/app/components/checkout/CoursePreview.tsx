import Image from "next/image";

const CoursePreview = () => {
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
      {/* Background image fills parent */}
      <Image
        src="/assets/general/checkout.png"
        alt="Course preview"
        fill
        className="object-cover"
        priority
      />

      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button className="bg-white p-3 sm:p-4 md:p-5 rounded-full shadow-md hover:scale-105 transition">
          ▶️
        </button>
      </div>
    </div>
  );
};

export default CoursePreview;
