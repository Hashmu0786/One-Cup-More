import React, { useEffect, useRef, useState } from "react";
import Home from "./pages/Home";
import toast, { Toaster } from "react-hot-toast";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Menu from "./pages/Menu";
import Navbar from "./containers/Navbar";
import FooterSection from "./containers/FooterSection";
import Cursor from "./components/Cursor";
import BackToTopButton from "./components/BackToTopButton";
import DownloadButton from "./components/DownloadButton";
import { uselocationContext } from "./context/StatesContext";
import WhatsAppIcon from "./components/WhatsAppIcon";
import PhoneIcon from "./components/PhoneIcon";

const App = () => {
  return (
    <div className="w-full">
      <Toaster position="top-right" />
      <div className="w-full mx-auto h-screen max-w-[2500px] font-anuphan">
        <Router>
          <AppContent />
        </Router>
      </div>
    </div>
  );
};

const AppContent = () => {
  const location = useLocation();
  const locationRef = useRef();
  const dropdownRef = useRef();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {
    userLocation,
    setUserLocation,
    getLocation,
    findClosestLocation,
    setCurrentPage,
  } = uselocationContext();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        locationRef.current &&
        !locationRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("status", JSON.stringify("true"));
    getLocation();
  }, []);

  useEffect(() => {
    if (userLocation?.latitude && userLocation?.longitude) {
      findClosestLocation();
    }
  }, [userLocation]);

  useEffect(() => {
    if (location.pathname === "/menu") {
      setCurrentPage("menu");
    } else {
      setCurrentPage(null);
    }
  }, [location]);

  return (
    <>
      <Navbar
        locationRef={locationRef}
        dropdownRef={dropdownRef}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />
      <BackToTopButton />
      <DownloadButton />
      <WhatsAppIcon />
      <PhoneIcon />
      <Routes>
        <Route
          path="/"
          element={<Home setIsDropdownOpen={setIsDropdownOpen} />}
        />
        <Route path="/menu" element={<Menu />} />
      </Routes>

      {/* Conditionally render the FooterSection based on the route */}
      {location.pathname !== "/menu" && <FooterSection />}

      {/* <Cursor /> */}
    </>
  );
};

export default App;
