import React from "react";

import frame from "/assets/about/Frame.png";
import coffee from "/assets/about/coffee-cup.svg";
import bestprice from "/assets/about/best-price.svg";
import badge from "/assets/about/badge.svg";
import coffeebeans from "/assets/about/coffee-beans.svg";

// import frame from "../assets/about/Frame.png";
// import coffee from "../assets/about/coffee-cup.png";
// import bestprice from "../assets/about/best-price.png";
// import badge from "../assets/about/badge.png";
import service from "/assets/about/service.svg";
import service2 from "/assets/about/service-2.png";

export default function About() {
  const features = [
    { img: coffee, text: "Extraordinary" },
    { img: badge, text: "High Quality" },
    { img: coffeebeans, text: "Supreme Beans" },
    { img: bestprice, text: "Affordable Price" },
  ];

  return (
    <>
      <section className="w-full h-fit lg:hidden font-anuphan  py-10">
        <div className="lg:flex lg:items-end lg:justify-between w-full lg:h-[60vh]">
          <div className=" hidden lg:block w-[30%] bg-white h-full ">
            <img src={service} alt="Frame" className="h-full w-full" />
          </div>
          <div className="flex flex-col justify-between h-full lg:w-[70%]">
            <div className="w-full h-fit flex flex-col items-center py-10   gap-5 px-5 lg:items-start">
              <h1 className="font-bold text-2xl leading-8 text-center text-[#603809] lg:text-4xl lg:text-start lg:px-10">
                Empowering Innovation in Commercial Kitchens
              </h1>
              <p className="text-sm text-center lg:text-start lg:px-10">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English.
              </p>
            </div>
            <div className=" hidden lg:flex lg:justify-around xl:-ml-5 -z-10 py-4  bg-[#FFF9F1] w-full rounded-lg items-center gap-5 px-10  ">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <img
                    src={feature.img}
                    alt={feature.text}
                    className="w-10 h-10 xl:w-16 xl:h-16 object-cover"
                  />
                  <p className="text-center text-xs text-nowrap text-[#603809] font-bold">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <img
            src={service2}
            alt=""
            className="h-60 z-40 -ml-10 hidden lg:block"
          />
        </div>

        <div className="flex lg:flex-row gap-5 px-5 lg:px-20  bg-[#FFF9F1]">
          {/* Frame Image */}
          <div className="lg:w-1/2 flex justify-center bg-white lg:hidden">
            <img src={frame} alt="Frame" className="w-full max-w-lg" />
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:w-full md:h-full md:items-center md:justify-center lg:hidden">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 md:h-full md:w-full  md:pt-10"
              >
                <img
                  src={feature.img}
                  alt={feature.text}
                  className="w-10 h-10 object-cover md:w-[50%] md:h-[70%]"
                />
                <p className="text-center text-xs text-nowrap text-[#603809] font-bold">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full hidden lg:block">
        <div className="w-full min-h-[60vh] mt-10 ">
          <div className="w-full h-full flex items-start justify-start xl:-mb-[20vh]">
            <div className="image w-[30%] h-full flex items-start justify-start ">
              <img
                src={service}
                alt="serviceImage"
                className="w-[80%] h-full "
              />
            </div>
            <div className="w-[50%] xl:w-[50%] h-fit flex flex-col items-center   gap-5 pt-10 lg:items-start">
              <h1 className="font-bold text-2xl leading-8 text-center text-[#603809] lg:text-4xl lg:text-start xl:px-5">
                Empowering Innovation in Commercial Kitchens
              </h1>
              <p className="text-sm text-center lg:text-start xl:px-5 leading-6">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English.
              </p>
            </div>
          </div>
          <div className="w-full min-h-[20vh] flex items-center lg:gap-2 justify-center bg-[#FFF9F1] relative -z-50">
            <img
              src={service2}
              alt="service2"
              className="w-auto h-60 absolute bottom-10 right-0 "
            />
            <div className="w-[60%] px-[10%] h-full flex items-center justify-around">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 lg:gap-4"
                >
                  <img
                    src={feature.img}
                    alt={feature.text}
                    className="w-10 h-10 xl:w-[10vh] xl:h-[10vh] object-cover"
                  />
                  <p className="text-center text-xs lg:text-lg text-nowrap text-[#603809] font-bold">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
