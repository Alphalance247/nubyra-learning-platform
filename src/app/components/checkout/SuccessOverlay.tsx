import Image from "next/image";
import Button from "../common/buttons";

interface SuccessOverlayProps {
  onClose: () => void;
  heading: string;
  description: string;
  courseTitle?: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
}

export default function SuccessOverlay({
  onClose,
  heading,
  description,
  courseTitle,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
}: SuccessOverlayProps) {
  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 animate-fadeIn px-4"
      onClick={onClose}
    >
      <div
        className="mt-20 text-center bg-white rounded-2xl p-6 sm:p-10 w-full max-w-lg sm:max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Check icon */}
        <div className="flex justify-center items-center mb-6">
          <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-3xl p-2 bg-[#F3F0EC] flex items-center justify-center">
            <Image
              src="/assets/general/check.png"
              alt="Check"
              className="object-contain"
              width={120}
              height={120}
            />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap- justify-center items-center">
            <h2 className="font-montserrat max-w-[530px] font-bold text-2xl sm:text-3xl text-[#120A02] text-center capitalize">
              {heading}
            </h2>
            <p className="max-w-[530px] text-base sm:text-lg text-[#413B35] font-inter">
              <span className="font-normal">{description}</span>
              <span className="font-bold"> {courseTitle}</span>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              onClick={onSecondaryClick}
              variant="secondary"
              className="w-full sm:w-1/2 px-6 py-3"
            >
              {secondaryButtonText}
            </Button>
            <Button
              onClick={onPrimaryClick}
              variant="primary"
              className="w-full sm:w-1/2 px-6 py-3"
            >
              {primaryButtonText}
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 300ms ease-out forwards;
        }
      `}</style>
    </div>
  );
}
