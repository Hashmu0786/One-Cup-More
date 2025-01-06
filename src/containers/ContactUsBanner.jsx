import React, { useState } from "react";
import bgImage from "/assets/home/contactUsBgImage.png";
import ContactUsButton from "../components/ContactUsButton";
import image from "/assets/home/freethreekm.svg";

const ContactUsBanner = () => {
  return (
    <section
      className="w-full py-10 lg:py-16 text-white flex flex-col items-center justify-center gap-5 md:gap-8 text-center px-5"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="flex flex-col gap-1 md:gap-2">
      <img src={image} alt="free3km" className=" h-24 object-contain " />
        <p className="md:text-lg">
          Great ideas start with great coffee, Lets help you achieve that
        </p>
        <h6 className="text-xl md:text-2xl xl:text-3xl font-bold">
          Get started today.
        </h6>
      </div>
      <ContactUsButton />
    </section>
  );
};

export default ContactUsBanner;
