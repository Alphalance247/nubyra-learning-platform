import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({
  image,
  title,
  type,
  clientLocation,
  projectScope,
  projectDuration,
  url,
}: {
  image: string;
  title: string;
  type: string;
  clientLocation: string;
  projectScope: string;
  projectDuration: string;
  buttonText?: string;
  url: string;
}) => {
  return (
    <Link href={url || "/"}>
      <div className="bg-[#F3F0EC] border border-[#D6C8BA] p-4 sm:p-5 md:p-6 lg:p-8 rounded-2xl flex flex-col h-full transition-transform hover:scale-[1.02] duration-200">
        {/* Image */}
        <div className="relative w-full h-40 sm:h-48 md:h-52 lg:h-56 rounded-lg overflow-hidden">
          <Image
            src={`https://stage-backend.nubyira.com/${image}`}
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="mt-3 sm:mt-4 flex flex-col flex-1">
          <p className="text-base sm:text-lg md:text-xl font-semibold text-[#70451C] mb-2 sm:mb-3 md:mb-4">
            {title}
          </p>

          <p className="text-sm sm:text-base text-[#413B35] mb-1 sm:mb-2 md:mb-3">
            <span className="font-medium text-[#120A02]">Type:</span> {type}
          </p>

          <p className="text-sm sm:text-base text-[#413B35] mb-1 sm:mb-2 md:mb-3">
            <span className="font-medium text-[#120A02]">Client Location:</span>{" "}
            {clientLocation}
          </p>

          <p className="text-sm sm:text-base text-[#413B35] mb-1 sm:mb-2 md:mb-3">
            <span className="font-medium text-[#120A02]">Scope:</span>{" "}
            <span
              dangerouslySetInnerHTML={{
                __html: `${projectScope?.slice(0, 80)}${
                  projectScope?.length > 80 ? "..." : ""
                }`,
              }}
            />
          </p>

          <p className="text-sm sm:text-base text-[#413B35] mb-2 sm:mb-3 md:mb-4">
            <span className="font-medium text-[#120A02]">Duration:</span>{" "}
            {projectDuration}
          </p>

          {/* Button */}
          <button className="mt-auto w-full sm:w-auto text-sm sm:text-base font-semibold text-[#70451C] underline underline-offset-4 text-left sm:text-left cursor-pointer">
            View Full Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
