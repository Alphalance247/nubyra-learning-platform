import Link from "next/link";
import Button from "./buttons";
import Image from "next/image";

const Footer = () => {
  const quickLinks = [
    {
      link: "/home",
      name: "Home",
    },
    {
      link: "/about",
      name: "About",
    },

    {
      link: "/blog",
      name: "Blog",
    },
  ];
  return (
    <footer className="bg-[#FDFDFE]">
      <div className="max-w-[1400px] mx-auto py-7 px-[26px]">
        <div className="bg-[linear-gradient(270deg,#1D1003_0%,#573616_100%)] py-24 px-24  rounded-[2.5rem] ">
          <div className="flex gap-x-[10rem] justify-between">
            <div>
              <Image
                src="/assets/home/logo-dark.svg"
                alt="logo"
                width={200}
                height={171}
              />
              <Link href={"/project/submit"}>
                <Button variant="secondary" className="w-fit mt-10">
                  Submit Project Request
                </Button>
              </Link>
            </div>

            <div className="flex-1 grid md:grid-cols-2 xl:grid-cols-3 gap-x-10">
              <div>
                <h4 className="text-[#FDFDFE] font-bold text-2xl xl:text-3xl mb-5">
                  Support
                </h4>

                <ul className="text-[#ECE8F1] text-lg py-1.5 flex flex-col gap-y-6">
                  <li>
                    <a href="">+234 9024514039</a>
                  </li>
                  <li>
                    <a href="">Frequently Asked Questions</a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-[#FDFDFE] font-bold text-2xl xl:text-3xl mb-5">
                  Quick Menu
                </h4>
                <ul className="flex flex-col gap-y-4">
                  {quickLinks.map((link) => (
                    <li key={link.link}>
                      <a
                        href={link.link}
                        className="text-[#ECE8F1] text-lg py-1.5"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[#FDFDFE] font-bold text-2xl xl:text-3xl mb-5">
                  Social Links
                </h4>

                <div className="grid grid-cols-3 gap-4">
                  <a href="">
                    <Image
                      src="/assets/home/telegram.svg"
                      alt="facebook"
                      width={46}
                      height={46}
                    />
                  </a>
                  <a href="">
                    <Image
                      src="/assets/home/telegram.svg"
                      alt="facebook"
                      width={46}
                      height={46}
                    />
                  </a>
                  <a href="">
                    <Image
                      src="/assets/home/telegram.svg"
                      alt="facebook"
                      width={46}
                      height={46}
                    />
                  </a>
                  <a href="">
                    <Image
                      src="/assets/home/telegram.svg"
                      alt="facebook"
                      width={46}
                      height={46}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 items-center flex justify-between border-t border-[#DDDAD7] pt-4">
            <p className="text-[#ECE8F1] font-medium text-lg">
              @ Nubyira LTD 2025. All Rights Reserved
            </p>

            <div className="flex gap-x-10">
              <ul className="flex gap-x-3 text-[#ECE8F1] font-medium text-lg">
                <li className="border-r border-[#FFFFFF] pr-3">
                  <a href="">Privacy Policy</a>
                </li>
                <li className="border-r border-[#FFFFFF] pr-3">
                  <a href="">Terms of Service</a>
                </li>
                <li className="">
                  <a href="">Cookie Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
