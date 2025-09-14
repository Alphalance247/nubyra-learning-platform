// const ModalOverlay = ({
//   children,
//   onClose,
//   centeredClassName = true,
//   className,
// }: {
//   children: React.ReactNode;
//   onClose: () => void;
//   centeredClassName?: boolean;
//   className?: string;
// }) => {
//   return (
//     <div
//       className={`fixed top-0 left-0 w-[100vw] h-[100vh]  z-50 m-auto ${
//         centeredClassName ? "flex items-center justify-center" : className
//       }`}
//     >
//       {/* Overlay */}
//       <div
//         className="absolute inset-0 bg-black opacity-50 z-40"
//         onClick={onClose}
//       ></div>
//       {children}
//     </div>
//   );
// };

// export default ModalOverlay;

const ModalOverlay = ({
  children,
  onClose,
  centeredClassName = true,
  className,
}: {
  children: React.ReactNode;
  onClose: () => void;
  centeredClassName?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex px-2 sm:px-4 ${
        centeredClassName ? "items-center justify-center" : className
      }`}
    >
      {/* Overlay background */}
      <div
        className="absolute inset-0 bg-black/50 z-40"
        onClick={onClose}
      ></div>

      {/* Modal content wrapper */}
      <div
        className="
          relative z-50
          w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl
          max-h-[90vh] overflow-y-auto
          bg-white rounded-xl shadow-lg
          p-4 sm:p-6
        "
      >
        {children}
      </div>
    </div>
  );
};

export default ModalOverlay;
