import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import bgImage1 from "/assets/home/bgImage1.svg";
import bgImage2 from "/assets/home/bgImage2.svg";
import image from "/assets/home/freethreekm.svg";
import BookTabel from "./BookTabel";
import ContactUsButton from "../components/ContactUsButton";
import { uselocationContext } from "../context/StatesContext";
import { useMediaQuery } from "react-responsive";

const TopBanner = ({ setIsDropdownOpen }) => {
  const bgImages = [
    {
      title: "Taste the Difference in Every Slice!",
      subtitle: "From Classic to Creative Toppings.",
      des: "Satisfy your cravings with pizza that’s simply unforgettable. Made fresh, baked perfectly, and delivered right to you.",
      mobileImage: "/assets/home/pizzaPhoneimage.png",
      image: bgImage1,
    },
    {
      title: "A Better Day Starts with a Better Cup!",
      subtitle: "Enjoy Rich Flavor in Every Sip.",
      des: "Every cup is a blend of freshness, quality, and flavor, designed to keep you energized and satisfied all day long.",
      mobileImage: "/assets/home/coffeePhoneImage.png",
      image: bgImage2,
    },
  ];
  const isMobile = useMediaQuery({
    query: `(max-width: 768px)`,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedPlace } = uselocationContext();

  return (
    <section
      onClick={() => setIsDropdownOpen(false)}
      className="w-[100vw] xl:-ml-1 h-[100vh] md:min-h-[80vh] lg:h-screen flex items-center justify-center md:justify-start font-anuphan"
    >
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        {bgImages.map((bgImage, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full "
              style={{
                backgroundImage: isMobile
                  ? `linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.6)),url(${bgImage.mobileImage})`
                  : `url(${bgImage.image})`,
                backgroundSize: isMobile ? "cover" : "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <div className="text-white h-full flex flex-col items-center justify-start pt-28 md:pt-0 md:justify-center gap-4 md:w-[80%] lg:w-[50%] xl:w-[48%] md:items-start md:pl-10 lg:pl-20 md:gap-6">
                <img
                  src={image}
                  alt="free3km"
                  className="h-24 object-contain"
                />
                <div className="w-full">
                  <h1 className="text-xl font-semibold text-center md:text-start md:text-4xl md:font-bold leading-9">
                    {bgImage.title}
                  </h1>
                  <h1 className="text-lg font-semibold text-center md:text-start md:text-4xl md:font-bold leading-9">
                    {bgImage.subtitle}
                  </h1>
                </div>
                <p className="hidden md:block lg:w-[90%] text-sm text-white text-start leading-8">
                  {bgImage?.des}
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  disabled={selectedPlace === "dwarka"}
                  className="text-black text-sm py-2 px-4 bg-[#F9C06A] rounded-md transition-all duration-200"
                >
                  {selectedPlace === "lucknow" ? "Book A Table" : "Takeaway"}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <ContactUsButton type={"banner"} />
      <BookTabel isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default TopBanner;
