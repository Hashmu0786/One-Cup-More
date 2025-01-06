import React from "react";

import NavbarMobile from "../components/navbar/NavbarMobile.jsx";
import NavbarDesktop from "../components/navbar/NavbarDesktop.jsx";

export default function Navbar({
  locationRef,
  dropdownRef,
  isDropdownOpen,
  setIsDropdownOpen,
}) {
  return (
    <div className="w-full relative font-poppins">
      <NavbarMobile locationRef={locationRef} />
      <NavbarDesktop
        locationRef={locationRef}
        dropdownRef={dropdownRef}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />
    </div>
  );
}
