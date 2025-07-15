"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowBigDown, Edit, Pen, PenIcon, Search } from "lucide-react";
import Link from "next/link";
import Button from "../common/buttons";
import { GoChevronRight } from "react-icons/go";
import { FaAngleDown } from "react-icons/fa6";
import { FaEdit, FaSignOutAlt } from "react-icons/fa";

const DashHeader = () => {
  const [activeMenu, setActiveMenu] = useState("Home");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const navs = [
    { id: 1, name: "Home", link: "/" },

    {
      id: 2,
      name: "About Us",
      link: "/about",
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

  const navsMobile = [
    { id: 1, name: "Home", link: "/" },
    {
      id: 2,
      name: "About Us",
      link: "/about-us",
    },
    {
      id: 3,
      name: "Meet our team",
      link: "/meet-team",
    },
    {
      id: 4,
      name: "How It Works",
      link: "/how-it-works",
    },
    {
      id: 5,
      name: "MarketPlace",
      link: "/farm-marketplace",
    },
    {
      id: 6,
      name: "Contact Us",
      link: "/contact-us",
    },
  ];

  return (
    <header className="bg-[#FBFAF9] sticky z-[1000] top-0 py-6">
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
            <div className="w-full h-[40px] rounded-full bg-[#F2EDE9] flex items-center px-3">
              <Search size={20} color="#0000008A" />
            </div>
            <div className="w-full h-[50px] rounded-[16px] px-3 py-4 flex items-center gap-3 bg-[#F2EDE9]">
              <div
                className="w-10 h-10 rounded-full border bg-[#FFE7CC] border-white overflow-hidden"
                style={{ borderWidth: "1.5px" }}
              >
                <Image
                  src="/assets/dashboard/userprofile.png"
                  alt="Avatar"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="w-[67px] h-[22px] text-[14px] leading-[22px] font-semibold text-center capitalize text-[#5F5F5F] font-poppins">
                {" "}
                John Doe
              </p>
              <div
                onClick={() => setShowDropdown((prev) => !prev)}
                className="cursor-pointer"
              >
                <FaAngleDown size={16} color="#7C7C7C" />
              </div>
              {showDropdown && (
                <div className="absolute  right-0 top-12 mt-10 w-64 bg-white rounded-lg shadow-[0px_4px_14px_rgba(0,0,0,0.1)] p-4 z-10">
                  {/* <div className="w-64 absolute top-13 mt-10 border-l p-4 pb-4 gap-8 rounded-lg bg-white shadow-[0px_4px_14px_rgba(0,0,0,0.1)]"> */}
                  {/* Edit Profile */}
                  <div
                    className="w-full h-[56px] py-3 px-4 flex items-center gap-[10px] space-x-2 cursor-pointer hover:opacity-80"
                    onClick={() => router.push("/dashboard/edit-profile/")}
                  >
                    <FaEdit size={16} color="##0000008A" />
                    <span className="text-[#413B35] text-[14px] font-inter text-sm">
                      Edit Profile
                    </span>
                  </div>

                  {/* Logout */}
                  <div className="w-full h-[56px] py-3 px-4 flex items-center gap-[10px] space-x-2 cursor-pointer hover:opacity-80">
                    <FaSignOutAlt size={16} color="red" />
                    <span className="text-red-600 text-[14px] font-inter text-sm">
                      Logout
                    </span>
                  </div>

                  {/* Go To Homepage Button */}
                  <Button className="w-fit flex items-center gap-x-3 justify-center py-4 px-6">
                    Go To Homepage
                    <span>
                      <GoChevronRight />
                    </span>
                  </Button>
                </div>
              )}
            </div>
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

export default DashHeader;
