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
    <div className="">
      <h3
        className={`text-2xl text-start lg:text-center sm:text-3xl md:text-4xl lg:text-[44px] font-bold leading-snug  mx-0 lg:mx-auto lg:leading-[3.5rem] text-[#120A02] mb-4 sm:mb-6 font-montserrat ${headingClassName}`}
      >
        {heading}
      </h3>

      {withSubhead && (
        <p
          className={`text-sm text-start lg:text-center sm:text-base md:text-lg w-full lg:max-w-[50%] font-inter  mx-0 lg:mx-auto ${subheadingClassName}`}
        >
          {subheading}
        </p>
      )}
    </div>
  );
};

export default HeadingSubhead;
