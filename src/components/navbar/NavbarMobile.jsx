import React, { useEffect, useState } from "react";
import { HiMiniBars3 } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "/assets/home/logo.png";
import { GrMapLocation } from "react-icons/gr";
import { uselocationContext } from "../../context/StatesContext";
import BookTabel from "../../containers/BookTabel";
import { Link } from "react-router-dom";

export default function NavbarMobile({ locationRef }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const {
    locations,
    selectedPlace,
    setselectedPlace,
    isScroll,
    handleIsScroll,
    menuRef,
    galleryRef,
    bestseller,
    currentPage,
  } = uselocationContext();

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

  const [isOpen, setisOpen] = useState(false);
  const toggleIsOpen = () => {
    setisOpen(!isOpen);
  };

  // console.log(selectedPlace, "selectedPlace");
  const handleLocationChange = (location) => {
    console.log(location, "location");
    setselectedPlace(location); // Update the selected location
    setisOpen(false); // Close the dropdown
  };
  useEffect(() => {
    window.addEventListener("scroll", handleIsScroll);
    return () => {
      window.removeEventListener("scroll", handleIsScroll);
    };
  }, [isScroll]);

  const scrollToSection = (ref) => {
    console.log(ref);

    ref?.current.scrollIntoView({
      behavior: "smooth", // Smooth scrolling
      block: "start", // Align to the top of the viewport
    });
    setShowSidebar(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setisOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [locationRef]);

  return (
    <div
      className={`w-full fixed z-[50] flex flex-col items-center lg:hidden font-anuphan`}
    >
      <div
        className={`w-full flex items-center justify-between bg-black px-2
        ${isScroll !== 0 ? "bg-black" : "bg-transparent"} ${
          currentPage === "menu" && "!bg-black"
        }
        `}
      >
        <Link to={"/"} className="w-fit z-20">
          <img
            src={logo}
            alt="logo"
            className="transform translate-y-1/3 h-16 z-20"
          />
        </Link>
        <div className="flex items-center gap-5">
          {/* <div className="relative">
            <div
              className="flex items-end capitalize gap-2 cursor-pointer text-sm font-bold text-[#F9C06A] hover:underline transition-all ease-in-out duration-200"
              onClick={toggleIsOpen}
            >
              <span>{selectedPlace}</span>
              <GrMapLocation className="animate-bounce" />
            </div>
            {isOpen && (
              <div
                ref={locationRef}
                className="absolute bg-[#F9C06A] z-[90] rounded-md top-[150%] right-0 w-40 text-center space-y-2 py-2 px-2"
              >
                {locations?.map((item, i) => (
                  <div
                    key={i}
                    className={`p-2 w-full font-bold hover:bg-yellow-600 rounded-md capitalize cursor-pointer ${
                      selectedPlace === item && "bg-yellow-600"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLocationChange(item);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div> */}

          <select
            className="flex items-end capitalize gap-2 cursor-pointer text-sm font-bold text-[#F9C06A] hover:underline transition-all ease-in-out duration-200 bg-transparent border-none focus:outline-none "
            value={selectedPlace}
            onChange={(e) => setselectedPlace(e.target.value)}
          >
            {locations?.map((item, i) => (
              <option
                className="capitalize "
                selected={selectedPlace === item}
                value={item}
                key={i}
              >
                {item}
              </option>
            ))}
          </select>

          <div className="border p-1 rounded-sm">
            {!showSidebar ? (
              <HiMiniBars3
                onClick={handleSidebar}
                size={30}
                className="text-white"
              />
            ) : (
              <RxCross1
                onClick={handleSidebar}
                size={25}
                className="text-white font-bold"
              />
            )}
          </div>
        </div>
      </div>
      <div
        className={`  w-full bg-white py-10 z-[102]  flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ease-in-out`}
        style={{
          maxHeight: showSidebar ? "1000px" : "0px",
          opacity: showSidebar ? "1" : "0",
        }}
      >
        {showSidebar && (
          <div className="flex flex-col cursor-pointer items-start p-6 space-y-6 text-gray-800 w-[90%] shadow-lg rounded-lg border">
            {navLinks.map((link, index) => (
              <span
                key={index}
                onClick={() => scrollToSection(link?.value)}
                className="text-lg font-semibold w-full border-b pb-2 last:border-b-0"
              >
                {link.name}
              </span>
            ))}
            <div className="w-full flex flex-col items-center justify-center gap-5 pt-5">
              <div className="flex gap-3">
                {socialIcons.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black text-lg bg-[#F9C06A] rounded-full p-1"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              <button className="text-black font-semibold text-lg py-2 w-full bg-[#F9C06A] rounded-md transition-all duration-200">
                Contact Us
              </button>
            </div>
          </div>
        )}
      </div>

      <BookTabel isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
