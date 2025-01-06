import React, { useEffect, useState } from "react";

const BackToTopButton = () => {
  // Scroll to top functionality
  const [scrollValue, setscrollValue] = useState(0);
  const handleIsScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 100 && scrollValue !== scrollY) {
      setscrollValue(scrollY);
    } else if (scrollY <= 100 && scrollValue !== 0) {
      setscrollValue(0);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleIsScroll);
    return () => {
      window.removeEventListener("scroll", handleIsScroll);
    };
  }, [scrollValue]);

  return (
    <>
      {scrollValue !== 0 && scrollValue > 50 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 w-12 h-12 rounded-full bg-gray-900 font-semibold flex items-center justify-center shadow-[0_0_0_4px_rgba(180,160,255,0.253)] cursor-pointer transition-all duration-300 overflow-hidden md:hover:w-36 md:hover:rounded-full md:hover:bg-primary z-50 group"
        >
          <svg
            className="w-3 transition-all duration-300 group-hover:hidden"
            viewBox="0 0 384 512"
          >
            <path
              d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
              fill="white"
            />
          </svg>
          <span className="absolute bottom-[-20px] text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bottom-3">
            Back to Top
          </span>
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
