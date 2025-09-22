"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./buttons";
import Image from "next/image";

const Footer = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const quickLinks = [
    { link: "/", name: "Home" },
    { link: "/about-us", name: "About Us" },
    { link: "/learning", name: "Learning" },
    { link: "/project", name: "Projects" },
    { link: "/blogs", name: "Blogs" },
  ];

  const handleNavClick = (name: string) => {
    const faqSection = document.getElementById(name);
    faqSection?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <footer className="bg-[#FDFDFE]">
      <div className="max-w-[1400px] mx-auto py-7 px-4  lg:px-[26px]">
        <div className="bg-[linear-gradient(270deg,#1D1003_0%,#573616_100%)] py-12 sm:py-16 lg:py-24 px-6 sm:px-12 xl:px-24 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 xl:gap-16">
            <div>
              <Image
                src="/assets/home/logo-dark.svg"
                alt="logo"
                width={180}
                height={160}
                className=""
              />
              <a
                href="https://wa.me/message/WABZJFRNPMNYL1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="secondary"
                  className="mt-6 sm:mt-10 w-full sm:w-[275px] lg:w-fit"
                >
                  Contact Us
                </Button>
              </a>
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

                <>
                  {isHomePage ? (
                    <li
                      onClick={() => handleNavClick("review")}
                      className="cursor-pointer"
                    >
                      Reviews
                    </li>
                  ) : (
                    <Link href={"/"}>
                      <li
                        onClick={() => handleNavClick("review")}
                        className="cursor-pointer"
                      >
                        Reviews
                      </li>
                    </Link>
                  )}
                  {isHomePage ? (
                    <li
                      onClick={() => handleNavClick("faq")}
                      className="cursor-pointer"
                    >
                      Frequently Asked Questions
                    </li>
                  ) : (
                    <Link href={"/"}>
                      <li className="cursor-pointer">
                        Frequently Asked Questions
                      </li>
                    </Link>
                  )}
                </>
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
                    <Link
                      href={link.link}
                      className="text-[#ECE8F1] text-base sm:text-lg"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-[#FDFDFE] font-bold text-xl sm:text-2xl lg:text-3xl mb-4">
                Social Links
              </h4>
              <div className="grid grid-cols-6 sm:grid-cols-6 lg:grid-cols-3 gap-2 max-w-full md:max-w-[200px]">
                {[
                  {
                    src: "/assets/footer/telegram.svg",
                    link: "https://t.me/nubyira",
                    label: "Telegram",
                  },
                  {
                    src: "/assets/footer/facebook.svg",
                    link: "https://facebook.com/nubyira",
                    label: "Facebook",
                  },
                  {
                    src: "/assets/footer/linkedIn.svg",
                    link: "https://linkedin.com/company/nubyira",
                    label: "LinkedIn",
                  },
                  {
                    src: "/assets/footer/youtube.svg",
                    link: "https://youtube.com/channel/UCl-2WpvWW1D0pG4fx5SYewg",
                    label: "YouTube",
                  },
                  {
                    src: "/assets/footer/mail.svg",
                    link: "mailto://nubyira@gmail.com",
                    label: "Email",
                  },
                  {
                    src: "/assets/footer/whatsapp.svg",
                    link: "https://wa.me/message/WABZJFRNPMNYL1",
                    label: "WhatsApp",
                  },
                ].map((el, i) => (
                  <a
                    href={el?.link}
                    target="_blank"
                    key={i}
                    aria-label={el?.label}
                    title={el?.label}
                  >
                    <Image
                      src={el?.src}
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
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li className="lg:border-r border-[#FFFFFF] lg:pr-3">
                <Link href="/terms-of-service">Terms of Service</Link>
              </li>
              <li>
                <Link href="/cookie-policy">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
