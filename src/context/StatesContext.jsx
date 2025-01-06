import { createContext, useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const locationContext = createContext();

export const uselocationContext = () => {
  return useContext(locationContext);
};

export const LocationContextProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(null);
  const [isScroll, setisScroll] = useState(0);
  const handleIsScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 100 && isScroll !== scrollY) {
      setisScroll(scrollY);
    } else if (scrollY <= 100 && isScroll !== 0) {
      setisScroll(0);
    }
  };

  const locations = ["lucknow", "dwarka"];
  const locationsCoordinates = [
    {
      name: "lucknow",
      coordinates: {
        latitude: 26.90926532320148,
        longitude: 80.95768921079079,
      },
    },
    {
      name: "dwarka",
      coordinates: {
        latitude: 28.585886941019893,
        longitude: 77.07128313951749,
      },
    },
  ];
  const [selectedPlace, setselectedPlace] = useState(locations[0]);
  const [selectedCategory, setselectedCategory] = useState(null);
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const menuRef = useRef();
  const galleryRef = useRef();
  const bestseller = useRef();

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
          toast.error(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371; // Earth's radius in kilometers

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in kilometers
  };

  // Function to find the closest location to the user's current location
  const findClosestLocation = () => {
    if (userLocation.latitude && userLocation.longitude) {
      let closestLocation = locationsCoordinates[0];
      let shortestDistance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        closestLocation.coordinates.latitude,
        closestLocation.coordinates.longitude
      );

      locationsCoordinates.forEach((location) => {
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          location.coordinates.latitude,
          location.coordinates.longitude
        );

        if (distance < shortestDistance) {
          shortestDistance = distance;
          closestLocation = location;
        }
      });

      setselectedPlace(closestLocation.name);
    }
  };

  const ourMenuImageArray = [
    "/assets/menuItems/p3.svg",
    "/assets/menuItems/c1.svg",
    "/assets/menuItems/snacks.svg",
    "/assets/menuItems/m5.svg",
    "/assets/menuItems/b1.svg",
    "/assets/menuItems/momo.svg",
    "/assets/menuItems/sendwich.svg",
  ];

  return (
    <locationContext.Provider
      value={{
        locations,
        selectedPlace,
        setselectedPlace,
        selectedCategory,
        setselectedCategory,
        menuRef,
        bestseller,
        galleryRef,
        userLocation,
        setUserLocation,
        getLocation,
        findClosestLocation,
        ourMenuImageArray,
        isScroll,
        handleIsScroll,
        currentPage,
        setCurrentPage
      }}
    >
      {children}
    </locationContext.Provider>
  );
};
