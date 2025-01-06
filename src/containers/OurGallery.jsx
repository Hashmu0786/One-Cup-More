import React, { useEffect, useState } from "react";
import CommonHeading from "../components/CommonHeading";

import image1 from "/assets/home/gallery/image1.svg";
import image2 from "/assets/home/gallery/image2.svg";
import image3 from "/assets/home/gallery/image3.svg";
import image4 from "/assets/home/gallery/image4.svg";
import image5 from "/assets/home/gallery/image5.jpg";
import { uselocationContext } from "../context/StatesContext";

const OurGallery = () => {
  const { galleryRef } = uselocationContext();
  const data = [image1, image2, image3, image4, image5];
  const [rotatedArray, setRotatedArray] = useState(data);
  const [clickedIndex, setClickedIndex] = useState(0);
  const [clickIndexImage, setclickIndexImage] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatedArray((prevArray) => {
        // Only rotate if no image is manually set at the front
        if (clickedIndex === null || clickedIndex === 0) {
          const newArray = [...prevArray];
          const firstElement = newArray.shift(); // Remove the first element
          newArray.push(firstElement); // Add it to the end
          return newArray;
        }
        return prevArray;
      });
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [clickedIndex]);

  // Handle image click to bring clicked image to the first position
  const handleClick = (index) => {
    setClickedIndex(index);
    setRotatedArray((prevArray) => {
      const newArray = [...prevArray];
      const clickedItem = newArray.splice(index, 1)[0]; // Remove the clicked item
      newArray.unshift(clickedItem); // Place it at the front
      return newArray;
    });
  };

  return (
    <section
      ref={galleryRef}
      className="w-full bg-white flex flex-col items-center gap-8 px-5 py-10 md:px-10 md:py-16 lg:px-20 relative"
    >
      <CommonHeading
        title={`Our Gallery`}
        des={"Tasting our food is like heaven in your mouth…"}
      />
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-1">
        {rotatedArray?.map((item, i) => (
          <div
            key={i}
            className={`w-full h-full relative ${
              i === 0 && "col-span-2 row-span-2"
            }`}
            onClick={() => handleClick(i)}
          >
            <img
              src={item}
              alt={`image${i + 1}`}
              className={`w-full h-full object-cover object-center transition-transform duration-[4s] ease-in-out ${
                i === 0 && "!h-full"
              }`}
              // style={{
              //   transform: `scale(${i === 0 ? 1.1 : 1})`,
              //   opacity: i === 0 ? 1 : 0.8,
              // }}
            />
          </div>
        ))}
      </div>

      {/* <div className="w-full h-screen flex items-center justify-center"></div> */}

      {/* <GalleySwiper data={data} /> */}
    </section>
  );
};

export default OurGallery;
