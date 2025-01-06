import React, { useEffect, useState } from "react";
import CommonHeading from "../components/CommonHeading";
import { uselocationContext } from "../context/StatesContext";

const MenuSection = () => {
  const { bestseller } = uselocationContext();
  const data = [
    {
      menuName: "Chicken Manchurian Dry",
      menuImage:
        "/assets/menuItems/NonVegChineseStaters/ChickenManchurianDry.png",
    },
    {
      menuName: "Chicken 65",
      menuImage: "/assets/menuItems/NonVegChineseStaters/Chicken65.png",
    },
    {
      menuName: "French Fries",
      menuImage: "/assets/menuItems/Snacks/FrenchFries.png",
    },
    {
      menuName: "Sweet Corn Classic Pizza",
      menuImage: "/assets/menuItems/ClassicPizza/SweatCornClassicPizza.png",
    },
    {
      menuName: "Virgin Mojito",
      menuImage: "/assets/menuItems/Beverages/VirginMojito.png",
    },
    {
      menuName: "Classic Cold Coffee",
      menuImage: "/assets/menuItems/Beverages/ClassicColdCoffee.png",
    },
    {
      menuName: "Green Apple Mojito",
      menuImage: "/assets/menuItems/Beverages/GreenAppleMojito.png",
    },
    {
      menuName: "Special Hot Coffee",
      menuImage: "/assets/menuItems/Beverages/SpecialHotCoffee.png",
    },
  ];

  return (
    <section
      ref={bestseller}
      className="w-full bg-white flex flex-col items-center gap-6 md:gap-8 px-5 md:px-10 py-10 md:py-16 lg:py-20 lg:px-20"
    >
      <CommonHeading
        title={"Bestseller"}
        des={
          "Everyone's favorite One Cup More put together in a specially curated collection."
        }
      />
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-5 gap-y-8 lg:gap-x-16">
        {data?.map((item, i) => (
          <div
            className="w-full flex items-center flex-col justify-between gap-3"
            key={i}
          >
            <img
              src={item?.menuImage}
              alt={`image${i + 1}`}
              className="w-full h-[20vh] md:h-[15vh] lg:h-full object-cover object-center rounded-md"
            />
            <h6 className="font-bold text-base lg:text-xl rounded-md">
              {item?.menuName}
            </h6>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
