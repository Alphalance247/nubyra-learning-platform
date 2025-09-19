import Button from "./buttons";

interface ReferenceFilesCardProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick?: () => void;
  className?: string;
}

const ReferenceFilesCard: React.FC<ReferenceFilesCardProps> = ({
  title,
  description,
  buttonText,
  onButtonClick,
  className = "",
}) => {
  return (
    <div
      className={`bg-[#F3F0EC] border border-[#D6C8BA] rounded-2xl p-6 flex items-center justify-between gap-4 ${className}`}
    >
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-[#0F0918] mb-2">{title}</h3>
        <p className="text-base text-[#413B35] font-normal">{description}</p>
      </div>

      <div className="flex-shrink-0">
        <div className="w-full bg-[#FBFAF9] border border-[#F2EDE9] p-2 rounded-2xl">
          <Button
            variant="secondary"
            onClick={onButtonClick}
            className="whitespace-nowrap !w-[400px]"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReferenceFilesCard;
