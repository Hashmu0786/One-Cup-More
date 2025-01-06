import React from "react";
import { FaPhone } from "react-icons/fa"; // Importing the Phone icon
import { uselocationContext } from "../context/StatesContext";

const PhoneIcon = () => {
  const { selectedPlace } = uselocationContext();

  const handlePhoneRedirect = () => {
    let phoneNumber;
    if (selectedPlace === "lucknow") {
      phoneNumber = 9559167977;
    } else {
      phoneNumber = 8800534446;
    }
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div
      className="fixed bottom-20 z-[99] left-5 bg-blue-500 text-white rounded-full p-3 shadow-lg cursor-pointer hover:bg-blue-600 transition"
      onClick={handlePhoneRedirect}
      title="Call Now"
    >
      <FaPhone size={24} className="rotate-90" />
    </div>
  );
};

export default PhoneIcon;
