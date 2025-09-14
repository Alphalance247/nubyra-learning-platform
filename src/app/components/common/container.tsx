import { ReactNode } from "react";

const Container = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`max-w-[1270px] mx-auto  py-6 lg:py-12 xl:py-17 ${className} px-4 md:py-12`}
    >
      {children}
    </div>
  );
};

export default Container;
