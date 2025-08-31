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
  ];

  const { fetchFaq, data } = getFaq();

  useEffect(() => {
    fetchFaq();
  }, [fetchFaq]);

  return (
    <section className="bg-[#FBFAF9]">
      <Container>
        <HeadingSubhead
          heading="Your Questions Answered"
          subheading="Curious on how Nubyira works, here are some of the questions frequently asked by our clients."
          headingClassName="text-[#120A02]"
          subheadingClassName="text-[#413B35]"
        />

        <div className="mt-14">
          <div className="flex gap-x-3 items-center justify-center border-b border-[#E4E7EC] w-fit mx-auto">
            {tabs.map((el, i) => (
              <button
                className={`${
                  activeBtn === el.name
                    ? "text-[#7B4C1F] border-b-[2px] border-[#7B4C1F]"
                    : "text-[#413B35] border-transparent "
                }   font-normal text-base p-4 border-b-[1px] cursor-pointer`}
                onClick={() => setActiveBtn(el.name)}
                key={i}
              >
                {el.name}
              </button>
            ))}
          </div>

          <div className="mt-14 mb-14">
            {activeBtn === "Blogs" && (
              <FaqComponent
                results={
                  data?.results?.filter((find) => find?.option === "blogs") ||
                  []
                }
              />
            )}
            {activeBtn === "Learning" && (
              <FaqComponent
                results={
                  data?.results?.filter(
                    (find) => find?.option === "learning"
                  ) || []
                }
              />
            )}
          </div>

          <div className="flex justify-center items-center">
            <a href="https://wa.me/message/WABZJFRNPMNYL1" target="_blank">
              <Button variant="primary" className="w-[298px]">
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
