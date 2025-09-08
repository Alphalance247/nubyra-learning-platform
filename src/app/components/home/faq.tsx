"use client";
import Button from "../common/buttons";
import Container from "../common/container";
import FaqComponent from "../common/faqComponent";
import HeadingSubhead from "../common/headingSubhead";
import { useEffect, useState } from "react";
import { getFaq } from "@/stores/faq/faq";

const FAQ = () => {
  const [activeBtn, setActiveBtn] = useState<string>("Blogs");
  const tabs: { id: number; name: string }[] = [
    { id: 1, name: "Blogs" },
    { id: 2, name: "Learning" },
    { id: 3, name: "Projects" },
  ];

  const { fetchFaq, data } = getFaq();

  useEffect(() => {
    fetchFaq();
  }, [fetchFaq]);

  return (
    <section className="bg-[#FBFAF9] py-10 md:py-16">
      <Container>
        <HeadingSubhead
          heading="Your Questions Answered"
          subheading="Curious on how Nubyira works? Here are some of the questions frequently asked by our clients."
          headingClassName="text-[#120A02] text-center md:text-start"
          subheadingClassName="text-[#413B35] text-center md:text-start"
        />

        <div className="mt-8 md:mt-14">
          <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-3 items-center justify-center border-b border-[#E4E7EC]">
            {tabs.map((el) => (
              <button
                key={el.id}
                className={`${
                  activeBtn === el.name
                    ? "text-[#7B4C1F] border-b-2 border-[#7B4C1F]"
                    : "text-[#413B35] border-transparent"
                } font-normal text-sm sm:text-base px-3 sm:px-4 py-2 border-b cursor-pointer transition`}
                onClick={() => setActiveBtn(el.name)}
              >
                {el.name}
              </button>
            ))}
          </div>
          <div className="mt-8 md:mt-14 mb-10 md:mb-14">
            {activeBtn === "Blogs" && (
              <FaqComponent
                results={data?.filter((find) => find?.option === "blogs") || []}
              />
            )}
            {activeBtn === "Learning" && (
              <FaqComponent
                results={
                  data?.filter((find) => find?.option === "learning") || []
                }
              />
            )}
            {activeBtn === "Projects" && (
              <FaqComponent
                results={
                  data?.filter((find) => find?.option === "project") || []
                }
              />
            )}
          </div>
          <div className="w-full text-center">
            <a
              href="https://wa.me/message/WABZJFRNPMNYL1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" className="w-full md:w-fit">
                Get in touch
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
