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
  buttonText: string;
  url: string;
}) => {
  return (
    <Link href={url || "/"}>
      <div className="bg-[#F3F0EC] border border-[#D6C8BA] p-4 sm:p-6 lg:p-8 rounded-2xl h-full flex flex-col">
        <div className="relative w-full h-40 sm:h-48 lg:h-56">
          <Image
            src={`https://stage-backend.nubyira.com/${image}`}
            alt="project"
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="mt-4 sm:mt-6 flex flex-col flex-1">
          <p className="text-lg sm:text-xl font-semibold text-[#70451C] mb-4 sm:mb-6">
            {title}
          </p>

          <p className="text-sm sm:text-base text-[#413B35] mb-2 sm:mb-4">
            Project type:{" "}
            <span className="font-medium text-[#120A02]">{type}</span>
          </p>

          <p className="text-sm sm:text-base text-[#413B35] mb-2 sm:mb-4">
            Client Location:{" "}
            <span className="font-medium text-[#120A02]">{clientLocation}</span>
          </p>

          <p className="text-sm sm:text-base text-[#413B35] mb-2 sm:mb-4">
            Project Scope:{" "}
            <span
              className="font-medium text-[#120A02]"
              dangerouslySetInnerHTML={{
                __html: `${projectScope?.slice(0, 80)}...`,
              }}
            />
          </p>

          <p className="text-sm sm:text-base text-[#413B35] mb-4 sm:mb-8">
            Project Duration:{" "}
            <span className="font-medium text-[#120A02]">
              {projectDuration}
            </span>
          </p>

          <button className="mt-auto text-sm sm:text-base font-semibold text-[#70451C] underline underline-offset-4 cursor-pointer">
            View Full Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
