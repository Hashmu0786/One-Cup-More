import React, { useRef, useState } from "react";
import data from "../data/menu.json";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { uselocationContext } from "../context/StatesContext";
import { useNavigate } from "react-router-dom";

export default function OurMenu() {
  const navigate = useNavigate();
  const { setselectedCategory, menuRef, ourMenuImageArray } =
    uselocationContext();
  const [activeIndex, setActiveIndex] = useState(data?.menu?.[0]?.category);

  return (
    <section className="w-full " ref={menuRef}>
      <div className="w-full h-full px-5 md:px-10 lg:px-20 py-10">
        <h1 className="uppercase text-4xl font-semibold text-primary text-center py-8">
          Our Menu
        </h1>
        <div
          className="w-full flex items-center gap-4 lg:gap-0  lg:grid lg:grid-cols-7 overflow-x-auto border-b"
          style={{
            scrollbarWidth: "none", // For Firefox to hide the scrollbar
            msOverflowStyle: "none", // For IE/Edge to hide the scrollbar
          }}
        >
          {data?.menu?.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveIndex(item?.category)}
              className={`flex-shrink-0 flex flex-col items-center justify-center cursor-pointer min-w-[35%] lg:min-w-[15%] lg:p-2 ${
                item?.category === activeIndex
                  ? "border-b-4 border-primary"
                  : ""
              }`}
            >
              <div className="w-full  flex items-center justify-center">
                <img
                  src={ourMenuImageArray?.[index]}
                  // src={combo1}
                  alt={item?.combos[0]?.items[0]?.name}
                  className="w-24 h-24 md:h-28 md:w-28 lg:h-24 lg:w-24 rounded-md"
                />
              </div>
              <h2 className="font-semibold text-center lg:tracking-wider text-base lg:text-sm ">
                {item?.category}
              </h2>
            </div>
          ))}
        </div>

        {data?.menu?.map((combo, j) => (
          <div className="w-full" key={j}>
            {combo.category === activeIndex && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-16 pt-10 gap-5 lg:pt-20 ">
                {combo.combos[0]?.items?.slice(0, 4).map((item, i) => (
                  <div
                    key={i}
                    className="w-full h-full overflow-hidden  relative rounded-md group-hover:bg-black/50"
                  >
                    <img
                      src={item?.image}
                      alt={item?.name}
                      className="w-full h-full rounded-md object-cover object-center "
                    />
                    <div className="w-full h-full bg-gradient-to-t from-black/50 to-transparent group-hover:bg-gradient-to-t group-hover:from-black group-hover:to-transparent absolute top-0 left-0 flex items-end justify-start px-4  group transition-all ease-in-out duration-500">
                      <div className="w-full text-white flex flex-col items-center gap-2 group-hover:pb-8 transition-all ease-in-out duration-500 ">
                        <p className="text-2xl lg:text-lg text-center ">
                          {item?.name}
                        </p>
                        <div className="w-40 h-[1px] group-hover:w-full transition-all ease-in-out duration-500 bg-white"></div>
                        <div className="w-[80%] flex items-center flex-wrap justify-between translate-y-5 group-hover:-translate-y-0 transition-all ease-in-out duration-500">
                          {item?.prices && (
                            <>
                              {!item?.prices?.Regular && (
                                <div className="flex items-center">
                                  Price:{" "}
                                  <span className="flex items-center ">
                                    <MdOutlineCurrencyRupee />
                                    {item?.prices || "N/A"}/-
                                  </span>
                                </div>
                              )}
                              {Object.entries(item?.prices).map((price, j) => (
                                <p className="flex items-center" key={j}>
                                  {price[0]}: <MdOutlineCurrencyRupee />
                                  {price[1]}/-
                                </p>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="w-full flex items-center justify-center pt-10">
          <button
            className="mt-4 overflow-hidden relative px-4 w-fit py-2 group text-black tracking-widest  border border-primary bg-transparent"
            onClick={() => {
              setselectedCategory(activeIndex);
              navigate("/menu");
            }}
          >
            <span className="absolute -top-10 left-0 h-full w-0 rounded-sm bg-primary transition-all ease-in-out duration-200 z-0 shadow-lg group-hover:w-full group-hover:top-0"></span>
            <span className="relative group-hover:text-white font-medium z-10 capitalize">
              Check out All {activeIndex}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
