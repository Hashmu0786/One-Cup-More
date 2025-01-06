import React, { useState, useRef, useEffect } from "react";
import data from "../data/menu.json";
import image from "/assets/menuItems/ClassicPizza/SweatCornClassicPizza.png";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { uselocationContext } from "../context/StatesContext";

const Menu = () => {
  const { selectedCategory, ourMenuImageArray } = uselocationContext();

  const [selectedFilter, setSelectedFilter] = useState({
    category: null,
    filter: "All",
  });
  const [activeCategory, setActiveCategory] = useState(null);
  const categoryRefs = useRef({});
  const filtersRef = useRef({});

  const scrollToCategory = (category) => {
    setActiveCategory(category); // Set active category when clicked
    categoryRefs.current[category]?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFilter = (filter) => {
    setSelectedFilter((prev) => ({
      ...prev,
      filter: filter,
    }));
    filtersRef.current[filter]?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (selectedCategory !== null) {
      scrollToCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const getFilteredItems = (category, items) => {
    if (selectedFilter.filter === "All") {
      return items;
    }

    // return items.filter((item) =>
    //   item?.filters?.includes(selectedFilter.filter)
    // );
    return items;
  };
  return (
    <div className="w-full min-h-screen !pt-20 lg:!pt-24 px-5 flex flex-col lg:flex-row lg:!h-[50vh] lg:overflow-hidden gap-4 lg:gap-10">
      {/* Sidebar for categories */}
      <div className="w-full lg:border-l border-gray-400 overflow-x-auto grid grid-flow-col auto-cols-max gap-10 space-y-5 pr-3 lg:flex lg:flex-col lg:overflow-x-hidden lg:gap-2 lg:w-[20%] lg:h-full lg:py-0">
        {data?.menu?.map((item, i) => (
          <div
            className={`!w-full   p-2 border-primary flex-shrink-0 flex flex-col items-center cursor-pointer ${
              activeCategory === item.category ? "border-b-4 lg:border-l-4 lg:border-b-0   text-black" : ""
            }`}
            key={i}
            onClick={() => scrollToCategory(item.category)}
          >
            <div className="min-w-[100%]">
              <h4 className="text-xl font-semibold text-center">
                {item?.category}
              </h4>
            </div>
            <div className="w-[80%] grid grid-cols-1 gap-4 ">
              <div className="w-20 h-20 lg:!w-[80%] lg:h-full p-1 rounded-md overflow-hidden">
                <img
                  // src={item?.combos?.[0]?.items[0]?.image}
                  src={ourMenuImageArray?.[i]}
                  alt="image"
                  className="w-full h-full rounded-md object-cover object-center"
                />
              </div>
              {/* <div className="w-20  h-20 lg:!w-[80%] lg:h-full p-1 rounded-md overflow-hidden bg-primary">
                <img
                  src={item?.combos?.[0]?.items[1]?.image}
                  alt="image"
                  className="w-full h-full rounded-md object-cover object-center"
                />
              </div> */}
            </div>
          </div>
        ))}
      </div>

      {/* Main content displaying all categories */}
      <div className="w-full flex-col flex items-start gap-8 md:gap-16 lg:overflow-y-auto lg:h-full pb-10 lg:w-[80%]">
        {data?.menu?.map((item, k) => (
          <div
            className="w-full flex flex-col gap-4"
            key={k}
            ref={(el) => (categoryRefs.current[item.category] = el)}
          >
            <h6 className="text-2xl font-bold">{item?.category}</h6>

            {/* Filter buttons */}
            <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-4">
              <button
                className={`rounded-md border border-primary px-2 h-fit py-2 text-nowrap text-sm ${
                  selectedFilter.filter === "All" ? "bg-primary text-white" : ""
                }`}
                onClick={() =>
                  setSelectedFilter((prevData) => ({
                    ...prevData,
                    filter: "All",
                    category: item.category,
                  }))
                }
              >
                All
              </button>
              {item?.filters?.map((filter, i) => (
                <button
                  key={i}
                  className={`rounded-md border border-primary px-2 h-fit py-2 text-nowrap text-sm ${
                    selectedFilter.filter === filter
                      ? "bg-primary text-white"
                      : ""
                  }`}
                  onClick={() => {
                    scrollToFilter(filter);
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Displaying the filtered combos */}
            <div className="w-full flex flex-col">
              {getFilteredItems(item.category, item?.combos || []).map(
                (combo) => (
                  <div
                    className="w-full h-full flex flex-col gap-1"
                    key={combo?.name}
                    ref={(el) => (filtersRef.current[combo?.name] = el)}
                  >
                    <p className="text-lg font-medium mt-4">{combo?.name}</p>
                    <div className="w-full grid grid-cols-1 md:grid-cols-3  md:gap-8 gap-4 gap-y-8">
                      {combo?.items?.map((item, i) => (
                        <div
                          key={i}
                          className="w-full h-full overflow-hidden relative "
                        >
                          <img
                            src={item?.image}
                            alt={item?.name}
                            className="w-full h-full rounded-md object-cover object-center   "
                          />
                          <div className="w-full h-full bg-gradient-to-t from-black/40 to-transparent  hover:bg-black/50 transition-all duration-300 ease-in-out   absolute top-0 left-0 flex items-end justify-start px-4  group">
                            <div className="w-full text-white flex flex-col items-center gap-2 ">
                              <p className="text-2xl lg:text-lg text-center">
                                {item?.name}
                              </p>
                              <div className="w-40 h-[1px] group-hover:w-full transition-all ease-in-out duration-500 bg-white"></div>
                              <div className="w-[80%] flex items-center flex-wrap justify-between translate-y-20 group-hover:pb-6 group-hover:-translate-y-0 transition-all ease-in-out duration-500">
                                {item?.prices && (
                                  <>
                                    {!item?.prices?.Regular && (
                                      <div className="flex items-center">
                                        Price:{" "}
                                        <span className="flex items-center ">
                                          <MdOutlineCurrencyRupee />
                                          {item?.prices || "N/A"}
                                        </span>
                                      </div>
                                    )}
                                    {Object.entries(item?.prices).map(
                                      (price, j) => (
                                        <p
                                          className="flex items-center"
                                          key={j}
                                        >
                                          {price[0]}: <MdOutlineCurrencyRupee />
                                          {price[1]}
                                        </p>
                                      )
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
