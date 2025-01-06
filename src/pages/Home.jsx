import React, { useEffect, useState } from "react";
import MenuSection from "../containers/MenuSection";
import ContactUsBanner from "../containers/ContactUsBanner";
import OurMenu from "../containers/OurMenu";
import TopBanner from "../containers/TopBanner";
import About from "../containers/About";
import OurGallery from "../containers/OurGallery";
import Testimonial from "../containers/Testimonial";
import BookModal from "../components/BookModal";

const Home = ({ setIsDropdownOpen }) => {
  return (
    <div className="w-full overflow-x-hidden relative">
      <TopBanner setIsDropdownOpen={setIsDropdownOpen} />
      <About />
      <OurMenu />
      <MenuSection />
      <ContactUsBanner />
      <Testimonial />
      <OurGallery />
      <BookModal />
    </div>
  );
};

export default Home;
