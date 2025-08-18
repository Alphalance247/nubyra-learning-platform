"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "./buttons";
import { GoChevronRight } from "react-icons/go";
import { FaAngleDown, FaEdit, FaSignOutAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { useAuth } from "@/app/context/authContext";
import { usePathname } from "next/navigation";


const Header = () => {
  const [activeMenu, setActiveMenu] = useState("Home");
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isAuthenticated, user, isLoggingOut, logout } = useAuth(); // isLoggingOut logout,
  const pathname = usePathname();

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

  // const handleLogout = () => {
  //   logout();
  // };

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

        <div className=" hidden lg:flex items-center gap-x-3">
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

          {/* <div className="flex items-center gap-x-3">
            <Link href={"/sign-in"}>
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
          <div className="flex items-center gap-x-3">
            {isAuthenticated ? (
              <>
                <Link href={"/dashboard"}>
                  <Button variant="secondary" className="w-fit">
                    Dashboard
                  </Button>
                </Link>

                <Button
                  variant="secondary"
                  className="w-fit"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </Button>
              </>
            ) : (
              <>
                <Link href={"/sign-in"}>
                  <Button variant="secondary" className="w-fit">
                    Login
                  </Button>
                </Link>
                <Link href={"/sign-up"}>
                  <Button className="w-fit flex items-center gap-x-2 justify-center">
                    Enrol for free
                    <span>
                      <GoChevronRight />
                    </span>
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div> */}
          {isAuthenticated ? (
            // ✅ LOGGED-IN USER UI
            <div className="flex items-center gap-x-3 relative">
              <div
                className="w-full h-[50px] rounded-[16px] cursor-pointer px-3 py-4 flex items-center gap-3 bg-[#F2EDE9] relative"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                <div
                  className="w-10 h-10 rounded-full border bg-[#FFE7CC] border-white overflow-hidden"
                  style={{ borderWidth: "1.5px" }}
                >
                  <Image
                    src={
                        user?.image?.startsWith("https")
                          ? user.image
                          : "/assets/dashboard/userprofile.png"
                      }
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="text-[14px] font-semibold capitalize text-[#5F5F5F] font-poppins">
                  {user?.first_name}
                </p>
                <div className="cursor-pointer">
                  <FaAngleDown size={16} color="#7C7C7C" />
                </div>

                {showDropdown && (
                  <div className="absolute right-0 top-14 mt-2 w-64 bg-white rounded-lg shadow-[0px_4px_14px_rgba(0,0,0,0.1)] p-4 z-10">
                    <div
                      className="py-3 px-4 flex items-center gap-[10px] cursor-pointer hover:opacity-80"
                      onClick={() => router.push("/dashboard/edit-profile/")}
                    >
                      <FaEdit size={16} />
                      <span className="text-[#413B35] text-sm">
                        Edit Profile
                      </span>
                    </div>
                    <div
                      className="py-3 px-4 flex items-center gap-[10px] cursor-pointer hover:opacity-80"
                      onClick={() => {
                        logout();
                        router?.push("/sign-in");
                      }}
                    >
                      <FaSignOutAlt size={16} color="red" />
                      <span className="text-red-600 text-sm">
                        {isLoggingOut ? "Logging out..." : "Logout"}
                      </span>
                    </div>
                    {pathname.startsWith("/dashboard") ? (
                      <Link href={"/"}>
                        <Button className="mt-2 w-full flex items-center gap-x-3 justify-center py-3">
                          Go To Homepage <GoChevronRight />
                        </Button>
                      </Link>
                    ) : (
                      <Link href={"/dashboard"}>
                        <Button className="mt-2 w-full flex items-center gap-x-3 justify-center py-3">
                          Go To Dashboard <GoChevronRight />
                        </Button>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            // ✅ GUEST USER UI
            <div className="flex items-center gap-x-3">
              <Link href="/sign-in">
                <Button variant="secondary" className="w-fit">
                  Login
                </Button>
              </Link>
              <Link href="/user-select">
                <Button className="w-fit flex items-center gap-x-2 justify-center">
                  Enrol for free
                  <GoChevronRight />
                </Button>
              </Link>
            </div>
          )}

          <div className="block transition-all duration-500 lg:hidden">
            <button
              className="transition-all duration-500 text-black p-1 text-4xl hover:p-2"
              onClick={() => setShowMobileMenu((prev) => !prev)}
            >
              {showMobileMenu ? <IoClose /> : <FiMenu />}
            </button>
          </div>
        </div>
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
