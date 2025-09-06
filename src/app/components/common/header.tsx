"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Button from "./buttons";
import { GoChevronRight } from "react-icons/go";
import { FaAngleDown, FaEdit, FaSignOutAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { useAuth } from "@/app/context/authContext";

const Header = () => {
  const [activeMenu, setActiveMenu] = useState("Home");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const router = useRouter();
  const { isAuthenticated, user, isLoggingOut, logout } = useAuth();
  const pathname = usePathname();

  const navs = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "About Us", link: "/about-us" },
    { id: 3, name: "Learning", link: "/learning" },
    { id: 4, name: "Projects", link: "/project" },
    { id: 5, name: "Blogs", link: "/blogs" },
  ];

  return (
    <header className="bg-[#FBFAF9] sticky z-[1000] top-0 py-4 shadow-md">
      <div className="max-w-[1300px] mx-auto px-6 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/assets/home/new-logo.svg"
            width={180}
            height={60}
            alt="logo"
            className="w-auto h-10 sm:h-12"
          />
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          {navs.map((item) => (
            <Link key={item.id} href={item.link}>
              <span
                className={`${
                  activeMenu === item.name
                    ? "text-[#7B4C1F] bg-[#F2EDE9] rounded-[12px]"
                    : "text-[#5E5A64]"
                } px-3 py-2 text-base font-medium cursor-pointer hover:text-[#7B4C1F]`}
                onClick={() => setActiveMenu(item.name)}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-x-3">
          {isAuthenticated ? (
            <div className="relative">
              <div
                className="w-full h-[50px] rounded-[16px] cursor-pointer px-3 py-4 flex items-center gap-3 bg-[#F2EDE9]"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white bg-[#FFE7CC]">
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
                <p className="text-sm font-semibold capitalize text-[#5F5F5F]">
                  {user?.first_name}
                </p>
                <FaAngleDown size={16} className="text-[#7C7C7C]" />
              </div>

              {showDropdown && (
                <div className="absolute right-0 top-14 w-60 bg-white rounded-lg shadow-lg p-3">
                  <div
                    className="py-2 px-3 flex items-center gap-2 cursor-pointer hover:bg-gray-50"
                    onClick={() => router.push("/dashboard/edit-profile/")}
                  >
                    <FaEdit size={16} />
                    <span>Edit Profile</span>
                  </div>
                  <div
                    className="py-2 px-3 flex items-center gap-2 cursor-pointer hover:bg-gray-50 text-red-600"
                    onClick={() => {
                      logout();
                      router.push("/sign-in");
                    }}
                  >
                    <FaSignOutAlt size={16} />
                    <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                  </div>
                  {pathname.startsWith("/dashboard") ? (
                    <Link href="/">
                      <Button className="mt-2 w-full flex items-center justify-center gap-x-2">
                        Go To Homepage <GoChevronRight />
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/dashboard">
                      <Button className="mt-2 w-full flex items-center justify-center gap-x-2">
                        Go To Dashboard <GoChevronRight />
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/sign-in">
                <Button variant="secondary">Login</Button>
              </Link>
              <Link href="/sign-up">
                <Button className="flex items-center gap-x-2">
                  Enrol for free <GoChevronRight />
                </Button>
              </Link>
            </>
          )}
        </div>
        <div className="block lg:hidden">
          <button
            className="text-3xl p-1"
            onClick={() => setShowMobileMenu((prev) => !prev)}
          >
            {showMobileMenu ? <IoClose /> : <FiMenu />}
          </button>
        </div>
      </div>
      {showMobileMenu && (
        <div className="lg:hidden bg-white shadow-md px-6 py-4 space-y-4">
          {navs.map((item) => (
            <Link key={item.id} href={item.link}>
              <span
                className={`block ${
                  activeMenu === item.name
                    ? "text-[#7B4C1F] font-semibold"
                    : "text-[#5E5A64]"
                } py-2`}
                onClick={() => {
                  setActiveMenu(item.name);
                  setShowMobileMenu(false);
                }}
              >
                {item.name}
              </span>
            </Link>
          ))}
          <div className="pt-4 border-t">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button className="w-full mb-2">Dashboard</Button>
                </Link>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={logout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </Button>
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="secondary" className="w-full mb-2">
                    Login
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="w-full flex items-center justify-center gap-x-2">
                    Enrol for free <GoChevronRight />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
