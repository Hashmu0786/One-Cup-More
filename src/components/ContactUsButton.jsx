import React, { useState } from "react";
import ContactModal from "../containers/ContactModal";

const ContactUsButton = ({ type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`text-black w-fit text-sm py-1 px-4 bg-[#F9C06A] rounded-sm transition-all duration-200 hidden md:block ${
          type === "footer" && "!text-lg !font-bold !rounded-md "
        }
        ${
          type === "banner" &&
          "fixed top-1/2 -translate-y-1/2  -right-10  z-50 -rotate-90"
        }
        `}
      >
        Contact Us
      </button>
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ContactUsButton;
