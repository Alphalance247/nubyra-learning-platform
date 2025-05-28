const HeadingSubhead = ({
  heading,
  subheading,
  headingClassName,
  subheadingClassName,
  withSubhead = true,
}: {
  heading: string;
  subheading?: string;
  headingClassName?: string;
  subheadingClassName?: string;
  withSubhead?: boolean;
}) => {
  return (
    <div className="text-center">
      <h3
        className={`text-[44px] font-bold leading-14 text-[#120A02] mb-6 ${headingClassName}`}
      >
        {heading}
      </h3>
      {withSubhead && (
        <p className={`text-lg w-[50%] mx-auto ${subheadingClassName}`}>
          {subheading}
        </p>
      )}
    </div>
  );
};

export default HeadingSubhead;
