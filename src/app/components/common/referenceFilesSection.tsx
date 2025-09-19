import { IoMdCloudDownload } from "react-icons/io";
import Button from "./buttons";

interface DownloadableFile {
  id: string;
  fileName: string;
  downloadUrl: string;
}

interface ReferenceFilesSectionProps {
  title: string;
  description: string;
  files: DownloadableFile[];
  className?: string;
}

const ReferenceFilesSection: React.FC<ReferenceFilesSectionProps> = ({
  title,
  description,
  files,
  className = "",
}) => {
  const handleDownload = (file: DownloadableFile) => {
    const link = document.createElement('a');
    link.href = file.downloadUrl;
    link.download = file.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={`bg-[#F3F0EC] border border-[#D6C8BA] rounded-2xl p-6 ${className}`}
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-[#0F0918] mb-2">{title}</h3>
        <p className="text-base text-[#413B35] font-normal mb-4">
          {description}
        </p>
        <div className="w-full h-px bg-[#E7E7E6]"></div>
      </div>

      <div className="bg-[#FBFAF9] border border-[#F2EDE9] rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {files.map((file) => (
            <div key={file.id} className="">
              <p className="text-sm text-[#413B35] font-normal mb-3">
                File Name
              </p>
              <Button
                variant="secondary"
                onClick={() => handleDownload(file)}
                className="w-full border border-[#FFB2B1] text-[#FE0503] bg-white hover:bg-[#FF6B6B] hover:text-white transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="font-semibold">Click To Download</span>
                  <IoMdCloudDownload className="text-lg" />
                </div>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReferenceFilesSection;
