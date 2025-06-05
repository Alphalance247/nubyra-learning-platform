"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Button from "./buttons";
import { GoChevronRight } from "react-icons/go";
const Header = () => {
  const [activeMenu, setActiveMenu] = useState("Home");
  // const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navs = [
    { id: 1, name: "Home", link: "/" },

    {
      id: 2,
      name: "About Us",
      link: "/about-us",
    },
    {
      id: 3,
      name: "Learning",
      link: "/learning",
    },
    {
      id: 4,
      name: "Projects",
      link: "/project",
    },
    {
      id: 5,
      name: "Blogs",
      link: "/blogs",
    },
  ];

  // const navsMobile = [
  //   { id: 1, name: "Home", link: "/" },
  //   {
  //     id: 2,
  //     name: "About Us",
  //     link: "/about-us",
  //   },
  //   {
  //     id: 3,
  //     name: "Meet our team",
  //     link: "/meet-team",
  //   },
  //   {
  //     id: 4,
  //     name: "How It Works",
  //     link: "/how-it-works",
  //   },
  //   {
  //     id: 5,
  //     name: "MarketPlace",
  //     link: "/farm-marketplace",
  //   },
  //   {
  //     id: 6,
  //     name: "Contact Us",
  //     link: "/contact-us",
  //   },
  // ];

  return (
    <header className="bg-[#FBFAF9] sticky z-[1000] top-0 py-6 shadow-xl">
      <div className="transition-all duration-500 max-w-[1300px] mx-auto px-8 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/assets/home/new-logo.svg"
            width={248}
            height={72}
            alt="logo"
          />
        </Link>

        <div className="flex items-center gap-x-3">
          <nav className="transition-all duration-500 ">
            <div>
              {navs.map((items) => {
                return (
                  <ul
                    key={items?.id}
                    className="inline-flex relative items-end cursor-pointer"
                  >
                    <Link href={items?.link}>
                      <li
                        className={`${
                          activeMenu === items?.name
                            ? "text-[#7B4C1F] rounded-[14px] bg-[#F2EDE9]"
                            : "text-[#5E5A64]"
                        }  cursor-pointer  hover:text-[#7B4C1F] p-2 text-base mx-2`}
                        onClick={() => setActiveMenu(items?.name)}
                      >
                        {items?.name}
                      </li>
                    </Link>
                  </ul>
                );
              })}
            </div>
          </nav>

          <div className="flex items-center gap-x-3">
            <Link href={"/login"}>
              <Button variant="secondary" className="w-fit">
                Login
              </Button>
            </Link>
            <Link href={"/user-select"}>
              <Button className="w-fit flex items-center gap-x-2 justify-center">
                Enrol for free
                <span>
                  <GoChevronRight />
                </span>
              </Button>
            </Link>
          </div>
        </div>

        {/* <div className="hidden transition-all duration-500">
          <button
            className="transition-all duration-500 text-black p-1 text-4xl hover:p-2"
            onClick={() => setShowMobileMenu((prev) => !prev)}
          >
            {showMobileMenu ? <IoClose /> : <FiMenu />}
          </button>
        </div> */}
      </div>

      {/* <nav className="hidden xl:justify-start xl:items-left gap-4 xl:flex xl:flex-col xl:py-8 xl:px-3">
        {navsMobile.map((items) => {
          return (
            <ul key={items?.id} className="">
              <Link href={items?.link}>
                <li
                  className="text-[#a19494] cursor-pointer px-4 text-sm font-semibold font-geist block"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {items?.name}
                </li>
              </Link>
            </ul>
          );
        })}

        <div className="flex flex-col gap-y-6 md:block items-center">
          <Link href={"/login"}>
            <Button
              variant="secondary"
              size="small"
              className="w-[180px] md:mb-4"
            >
              Login
            </Button>
          </Link>
          <Link href={"/user-select"}>
            <Button className="w-fit" size="small">
              Get Started
            </Button>
          </Link>
        </div>
      </nav> */}
      {/* </motion.div> */}
    </header>
  );
};

export default Header;
