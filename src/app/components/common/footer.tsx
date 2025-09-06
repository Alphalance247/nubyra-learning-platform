import Link from "next/link";
import Button from "./buttons";
import Image from "next/image";

const Footer = () => {
  const quickLinks = [
    { link: "/home", name: "Home" },
    { link: "/about", name: "About" },
    { link: "/blog", name: "Blog" },
  ];

  return (
    <footer className="bg-[#FDFDFE]">
      <div className="max-w-[1400px] mx-auto py-7 px-6 sm:px-10 lg:px-[26px]">
        <div className="bg-[linear-gradient(270deg,#1D1003_0%,#573616_100%)] py-12 sm:py-16 lg:py-24 px-6 sm:px-12 xl:px-24 rounded-3xl">
          {/* Grid layout for logo and link sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 xl:gap-16">
            {/* Logo + Contact */}
            <div>
              <Image
                src="/assets/home/logo-dark.svg"
                alt="logo"
                width={180}
                height={160}
                className=""
              />
              <Link href={"/project/submit"}>
                <Button
                  variant="secondary"
                  className="mt-6 sm:mt-10 w-full sm:w-[275px] lg:w-fit"
                >
                  Contact Us
                </Button>
              </Link>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-[#FDFDFE] font-bold text-xl sm:text-2xl lg:text-3xl mb-4">
                Support
              </h4>
              <ul className="text-[#ECE8F1] text-base sm:text-lg flex flex-col gap-y-4">
                <li>
                  <a href="tel:+2349024514039">+234 9024514039</a>
                </li>
                <li>
                  <a href="">Frequently Asked Questions</a>
                </li>
              </ul>
            </div>

            {/* Quick Menu */}
            <div>
              <h4 className="text-[#FDFDFE] font-bold text-xl sm:text-2xl lg:text-3xl mb-4">
                Quick Menu
              </h4>
              <ul className="flex flex-col gap-y-3 sm:gap-y-4">
                {quickLinks.map((link) => (
                  <li key={link.link}>
                    <a
                      href={link.link}
                      className="text-[#ECE8F1] text-base sm:text-lg"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-[#FDFDFE] font-bold text-xl sm:text-2xl lg:text-3xl mb-4">
                Social Links
              </h4>
              <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-4 max-w-[250px]">
                {[...Array(4)].map((_, i) => (
                  <a href="" key={i}>
                    <Image
                      src="/assets/home/telegram.svg"
                      alt="social"
                      width={40}
                      height={40}
                      className="w-10 h-10 sm:w-12 sm:h-12"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4 items-center border-t border-[#DDDAD7] pt-4">
            {/* Left text */}
            <p className="text-[#ECE8F1] font-medium text-sm sm:text-base lg:text-lg text-center lg:text-left">
              @ Nubyira LTD 2025. All Rights Reserved
            </p>

            {/* Right links */}
            <ul className="flex flex-wrap justify-center lg:justify-end gap-3 text-[#ECE8F1] font-medium text-sm sm:text-base lg:text-lg">
              <li className="lg:border-r border-[#FFFFFF] lg:pr-3">
                <a href="">Privacy Policy</a>
              </li>
              <li className="lg:border-r border-[#FFFFFF] lg:pr-3">
                <a href="">Terms of Service</a>
              </li>
              <li>
                <a href="">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
