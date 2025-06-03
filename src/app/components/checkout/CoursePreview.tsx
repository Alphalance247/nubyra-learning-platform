import Image from 'next/image';

const CoursePreview = () => {
  return (
    <div className="relative w-full h-64 rounded-xl overflow-hidden">
      <Image
        src="/assets/general/checkout.png"
        alt="Course preview"
        width={580}
        height={213}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <button className="bg-white p-3 rounded-full shadow-md">▶️</button>
      </div>
    </div>
  );
};

export default CoursePreview;
