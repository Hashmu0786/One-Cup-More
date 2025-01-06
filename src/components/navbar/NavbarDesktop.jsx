import React, { useEffect, useState } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "/assets/home/logo.png";
import { uselocationContext } from "../../context/StatesContext";
import { IoLocationOutline } from "react-icons/io5";
import BookTabel from "../../containers/BookTabel";
import { Link } from "react-router-dom";

export default function NavbarDesktop({
  locationRef,
  dropdownRef,
  isDropdownOpen,
  setIsDropdownOpen,
}) {
  const {
    locations,
    selectedPlace,
    setselectedPlace,
    menuRef,
    galleryRef,
    isScroll,
    handleIsScroll,
    bestseller,
    currentPage,
  } = uselocationContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navLinks = [
    { name: "Cafe Menu", value: menuRef },
    { name: "Our Gallery", value: galleryRef },
    { name: "Best Seller", value: bestseller },
  ];

  const socialIcons = [
    { icon: <FaInstagram />, link: "https://instagram.com" },
    { icon: <FaFacebookF />, link: "https://facebook.com" },
    { icon: <FaTwitter />, link: "https://twitter.com" },
    { icon: <FaLinkedinIn />, link: "https://linkedin.com" },
  ];

  const scrollToSection = (ref) => {
    console.log(ref);

    ref?.current.scrollIntoView({
      behavior: "smooth", // Smooth scrolling
      block: "start", // Align to the top of the viewport
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleIsScroll);
    return () => {
      window.removeEventListener("scroll", handleIsScroll);
    };
  }, [isScroll]);
  return (
    <div
      className={`hidden font-anuphan fixed z-[50] lg:flex items-center justify-around w-full ${
        isScroll !== 0 ? "bg-black" : "bg-transparent"
      } ${currentPage === "menu" && "!bg-black"} py-4 px-5`}
    >
      <Link to={"/"} className="w-fit">
        <img
          src={logo}
          alt="logo"
          className="h-20 z-40 absolute left-16 bottom-0 transform translate-y-1/3"
        />
      </Link>

      <div className="flex items-center justify-center gap-10 pl-28">
        <ul className="flex items-center gap-10 text-white">
          {navLinks.map((link, index) => (
            <li
              key={index}
              onClick={() => scrollToSection(link?.value)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <span className="text-sm">{link.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative">
          <div
            ref={locationRef}
            className="flex items-center gap-1 cursor-pointer text-sm font-bold text-[#F9C06A] transition-all ease-in-out duration-200"
            onClick={toggleIsOpen}
          >
            <span className="capitalize">{selectedPlace}</span>
            <IoLocationOutline size={20} />
          </div>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute bg-[#F9C06A] rounded-md rounded-tr-none top-[160%] right-0 min-w-40 text-center space-y-2 py-2 px-2 z-50"
            >
              <div className="absolute top-[-10px] border-b-[10px] right-0 border-l-[15px] border-r-[15px] border-transparent border-b-[#F9C06A]"></div>

              {locations?.map((item, i) => (
                <p
                  key={i}
                  className={`p-2 w-full font-bold hover:bg-yellow-600 rounded-md capitalize cursor-pointer ${
                    selectedPlace === item && "bg-yellow-600"
                  }`}
                  onClick={() => {
                    setselectedPlace(item);
                    setIsDropdownOpen(false);
                  }}
                >
                  {item}
                </p>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          disabled={selectedPlace === "dwarka"}
          className="text-black text-sm py-2 px-4 bg-[#F9C06A] rounded-md transition-all duration-200"
        >
          {selectedPlace === "lucknow" ? "Book A Table" : "Takeaway"}
        </button>
        <div className="flex gap-3">
          {socialIcons.map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black text-lg bg-white rounded-full p-1"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      <BookTabel isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
