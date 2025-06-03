// import Button from "../common/buttons";
// import { useRouter } from 'next/navigation';



// type SuccessOverlayProps = {
//   onClose: () => void;
// };

// const courseData = {
//   title: 'Apen Plus Basic Course Webinar',
//   price: 50,
//   duration: '5 Days',
//   venue: 'Online Class',
// };

// export default function SuccessOverlay({ onClose }: SuccessOverlayProps) {
//   const router = useRouter();

//     return (
//       <div
//         className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 animate-fadeIn"
//         onClick={onClose}
//       >
       
//         <div className="text-center bg-white rounded-[20px] mt-[86px] ml-[59px] p-[40px] w-[610px] h-[440.33px]"
//           onClick={(e) => e.stopPropagation()} >
          
//           <div className="flex justify-center items-center mb-6">
//             <div className="w-[149.03px] h-[144.33px] rounded-[40px] p-[7.52px] bg-[#F3F0EC] flex items-center justify-center">
//               <img
//                 src="/assets/general/check.png" 
//                 alt="Check"
//                 className="w-[134px] h-[129px] object-contain"
//               />
//             </div>
//           </div>

//           <div className="w-[530px] h-[176px] gap-[24px] flex flex-col">
          
//           <div className="w-[530px] h-[80px] gap-[16px] flex flex-col">
//             <h2 className="w-[530px] h-[38px] font-montserrat font-bold text-[30px] leading-[38px] text-[#120A02] text-center capitalize">Enrollment Successful!</h2>
//             <p className="w-[530px] h-[26px] text-[18px] leading-[26px] text-[#413B35] font-inter">
//               <span className="font-normal">You are now enrolled in{" "} </span>
//               <span className="font-bold">{courseData.title}</span>
//             </p>
//           </div>
  
//           <div className="w-[530px] h-[56px] gap-[12px] flex">

//           <Button onClick={() => router.push('/learning')} variant="secondary" className="w-[289px] px-6 py-3">
//             Go To Course
//           </Button>
//           <Button onClick={() => router.push('/dashboard')} variant="primary" className="w-[289px] px-6 py-3">
//             Go To Dashboard
//           </Button>
//           </div>
//           </div>
//         </div>
  
//         {/* Animation */}
//         <style jsx>{`
//           @keyframes fadeIn {
//             from {
//               opacity: 0;
//             }
//             to {
//               opacity: 1;
//             }
//           }
//           .animate-fadeIn {
//             animation: fadeIn 300ms ease-out forwards;
//           }
//         `}</style>
//       </div>
//     );
//   }
  

import Button from "../common/buttons";
import { useRouter } from 'next/navigation';

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
  onSecondaryClick
}: SuccessOverlayProps) {

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="text-center bg-white rounded-[20px] mt-[86px] ml-[59px] p-[40px] w-[610px] h-[440.33px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center items-center mb-6">
          <div className="w-[149.03px] h-[144.33px] rounded-[40px] p-[7.52px] bg-[#F3F0EC] flex items-center justify-center">
            <img
              src="/assets/general/check.png"
              alt="Check"
              className="w-[134px] h-[129px] object-contain"
            />
          </div>
        </div>

        <div className="w-[530px] h-[176px] gap-[38px] flex flex-col">
          <div className="w-[530px] h-[80px] gap-[16px] flex flex-col">
            <h2 className="w-[530px] h-[38px] font-montserrat font-bold text-[30px] leading-[38px] text-[#120A02] text-center capitalize">
              {heading}
            </h2>
            <p className="w-[530px] text-[18px] leading-[26px] text-[#413B35] font-inter">
              <span className="font-normal">{description}</span>
              <span className="font-bold"> {courseTitle}</span>
            </p>
          </div>

          <div className="w-[530px] h-[56px] gap-[12px] flex">
            <Button
              onClick={onSecondaryClick}
              variant="secondary"
              className="w-[289px] px-6 py-3"
            >
              {secondaryButtonText}
            </Button>
            <Button
              onClick={onPrimaryClick}
              variant="primary"
              className="w-[289px] px-6 py-3"
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
