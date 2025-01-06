import React, { useEffect, useState } from "react";
import logo from "/assets/home/logo.svg";
import fridayoffer from "/assets/home/fridayoffer.png";
import coffee from "/assets/home/coffeeImage.png";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaRegCopyright,
} from "react-icons/fa";
import ContactUsButton from "../components/ContactUsButton";
import { uselocationContext } from "../context/StatesContext";
import {
  DwarkaLocationAndTimingData,
  LucknowLocationAndTimingData,
} from "../data/menu";

const FooterSection = () => {
  const { selectedPlace } = uselocationContext();
  const [data, setdata] = useState(null);

  const getMenuPDF = () => {
    if (selectedPlace === "dwarka") {
      setdata(DwarkaLocationAndTimingData);
    } else if (selectedPlace === "lucknow") {
      setdata(LucknowLocationAndTimingData);
    } else {
      return null; // You can set a default behavior or PDF
    }
  };

  useEffect(() => {
    getMenuPDF();
  }, [selectedPlace]);

  return (
    <footer>
      <div className="w-full h-fit lg:h-[50vh] xl:min-h-[65vh] flex flex-col lg:flex-row items-center lg:overflow-hidden">
        <div
          className="w-full relative h-[50vh] md:h-[30vh] lg:h-full lg:w-[30%]  md:!bg-cover flex lg:flex-col lg:justify-end items-center justify-center"
          style={{
            backgroundImage: `url(${coffee})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <img
            src={logo}
            alt="logo"
            className="w-full h-[20vh] md:h-[15vh] lg:absolute lg:top-20 lg:-translate-y-1/2 lg:left-1/2 lg:-translate-x-1/2 object-contain object-center"
          />
          <div className="hidden bg-gray-100/40 text-white py-2 w-full lg:flex items-center justify-center gap-1">
            <FaRegCopyright />
            <span>2024 One cup more All Rights Reserved.</span>
          </div>
        </div>
        <div className="w-full h-fit lg:h-full">
          <div className="w-full h-fit md:h-[30vh] lg:h-full lg:pt-5 flex flex-col items-center">
            <div className="w-full h-full flex flex-col  md:flex-row">
              <div className="w-full md:h-full bg-[#ECEAE3] px-5 py-6 flex flex-col items-start gap-8 lg:gap-6">
                <h6 className="text-xl font-bold">CONTACT US</h6>

                {data?.reservation?.map((item, j) => (
                  <div
                    key={j}
                    className=" w-full h-fit flex items-center gap-4"
                  >
                    <div
                      className={` text-lg ${
                        j === 0 ? "rotate-0 -mt-5 " : ""
                      } `}
                    >
                      {item?.icon}
                    </div>
                    <div className="flex flex-col">
                      <p className="text-lg font-semibold">{item?.info1}</p>
                      <p className="text-sm">{item?.info2}</p>
                    </div>
                  </div>
                ))}

                <ContactUsButton type={"footer"} />
              </div>
              <div className="w-full md:h-full bg-black text-white px-5 py-6 flex flex-col gap-8">
                <h6 className="text-xl font-semibold">OPENING HOURS...</h6>
                <div className="w-full flex flex-col gap-1 ">
                  {data?.hours?.map((item, i) => (
                    <div
                      key={i}
                      className="w-[100%] flex items-center justify-between gap-5 text-lg"
                    >
                      <p>{item?.day}</p>
                      <div className="w-fit">
                        <p className="text-[#F9C06A] text-left text-nowrap">
                          {item?.timing}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full h-full hidden lg:block">
                <img
                  src={fridayoffer}
                  alt="fridayoffer"
                  className="w-full h-full object-contain object-center lg:object-cover xl:object-fill"
                />
              </div>
            </div>
            <div className="w-full lg:hidden bg-black text-white">
              <div className="w-full h-full bg-gray-100/40 py-2 flex items-center justify-center gap-1">
                <FaRegCopyright />
                <span>2024 One cup more All Rights Reserved.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
