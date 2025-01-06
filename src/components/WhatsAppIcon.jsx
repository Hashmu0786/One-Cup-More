import React from "react";
import { FaWhatsapp } from "react-icons/fa"; // Importing the WhatsApp icon
import { uselocationContext } from "../context/StatesContext";

const WhatsAppIcon = () => {
  const { selectedPlace } = uselocationContext();

  const handleWhatsAppRedirect = () => {
    let phoneNumber;
    if (selectedPlace === "lucknow") {
      phoneNumber = 9559167977;
    } else {
      phoneNumber = 8800534446;
    }
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  return (
    <div
      className="fixed bottom-20 z-[99] right-5 bg-green-500 text-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-green-600 transition"
      onClick={handleWhatsAppRedirect}
      title="Chat on WhatsApp"
    >
      <FaWhatsapp size={30} />
    </div>
  );
};

export default WhatsAppIcon;
