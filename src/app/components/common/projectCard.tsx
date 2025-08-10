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
      <div className="bg-[#F3F0EC] border border-[#D6C8BA] p-8 rounded-2xl">
        <Image
          width={336}
          height={162}
          src={`https://api.nubyira.com${image}`}
          alt="project"
          className="rounded-lg"
        />

        <div className="mt-6">
          <p className="text-xl font-semibold text-[#70451C] mb-6">{title}</p>
          <p className="text-[#413B35] text-lg mb-4">
            Project type:{" "}
            <span className="font-medium text-[#120A02]">
              {type.slice(0, 80)}.......
            </span>{" "}
          </p>

          <p className="text-[#413B35] text-lg mb-4">
            Client Location:
            <span className="font-medium text-[#120A02]">
              {clientLocation}
            </span>{" "}
          </p>

          <p className="text-[#413B35] text-lg mb-4">
            Project Scope:{" "}
            <span className="font-medium text-[#120A02]">{projectScope}</span>{" "}
          </p>

          <p className="text-[#413B35] text-lg mb-10">
            Project Duration:{" "}
            <span className="font-medium text-[#120A02]">
              {projectDuration}
            </span>
          </p>

          <button className="text-base font-semibold text-[#70451C] underline underline-offset-4 cursor-pointer">
            View Full Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
