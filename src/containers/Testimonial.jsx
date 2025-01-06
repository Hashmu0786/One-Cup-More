import React, { useEffect, useRef, useState } from "react";
import google from "/assets/home/google.svg";
import swiggy from "/assets/home/swiggy.svg";
import zomato from "/assets/home/zomato.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import axios from "axios";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import TestimonialSkeleton from "../components/TestimonialSkeleton";
import { FaStar } from "react-icons/fa";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";

const Testimonial = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [reviews, setreviews] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTestimonialsFromGoogle = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/place/reviews`,
        {
          params: {
            placeId: import.meta.env.VITE_PLACE_ID,
          },
        }
      );
      const data = response.data;
      console.log(data);
      if (data) setreviews(data);
      else console.log("No reviews available");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonialsFromGoogle();
  }, []);
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-5 md:px-10 lg:px-20 pt-10  lg:pt-20  ">
      <div className="w-full h-full flex flex-col gap-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-[#603809] text-center md:text-start">
          Hear From Our Happy customers
        </h2>
        <div className="w-full flex items-center justify-between border-t border-b border-black/10 py-4 md:py-2">
          <div className="w-[40%] flex items-center justify-center">
            <img
              src={google}
              alt="googleIcon"
              className="h-10 object-contain"
            />
          </div>
          <div className="w-[1px] py-10 bg-black/10"></div>
          <div className="w-1/2 flex items-center gap-1">
            <h3 className="text-4xl font-bold">4.8</h3>
            <div className="flex flex-col">
              <span className="text-sm flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} color="#FFD700" />
                ))}
              </span>
              <span className="text-black/50 text-nowrap text-xs">
                Avg. Clients Ratings
              </span>
            </div>
          </div>
        </div>
        <div className="w-full gap-2 flex justify-between text-nowrap">
          <p>Available On :</p>
          <div className="flex items-center gap-4 w-full justify-between">
            <img src={swiggy} alt="swiggyIcon" className="h-5 object-contain" />
            <div className="w-[1px] py-2 bg-black/10"></div>
            <img src={zomato} alt="zomatoIcon" className="h-5 object-contain" />
          </div>
        </div>
      </div>
      {loading ? (
        <TestimonialSkeleton />
      ) : (
        <div className="w-[100%] lg:pl-20 h-full md:col-span-2 md:w-[80%] lg:w-full md:ml-auto lg:col-span-3 pt-10 md:pt-0 relative flex items-center justify-center">
          <Swiper
            spaceBetween={50}
            loop={true}
            slidesPerView={2}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            modules={[Navigation]} // Ensure Navigation module is included here
            breakpoints={{
              1024: {
                slidesPerView: 2,
              },
              320: {
                slidesPerView: 1,
              },
            }}
            className="w-[100%] h-full flex items-center justify-center "
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
          >
            {reviews?.slice(1)?.map((card, index) => (
              <SwiperSlide key={index}>
                <div className="w-[100%] h-full rounded-md flex flex-col justify-between gap-4 p-4 md:py-4 lg:px-8  bg-secondary">
                  <p className="text-sm py-3 tracking-wider leading-6 text-black">
                    <ImQuotesLeft
                      size={25}
                      color="#d1d5db"
                      className="-mb-4 -ml-4"
                    />
                    {card?.text}
                    <ImQuotesRight
                      size={25}
                      color="#d1d5db"
                      className="float-end"
                    />
                  </p>
                  <div className="w-full flex items-center gap-2">
                    <div className="w-14 h-14 bg-[#E1EDFB] rounded-full overflow-hidden flex items-center gap-5">
                      <img
                        src={card?.profile_photo_url}
                        alt={card?.author_name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div>
                      <h6 className="text-sm  font-semibold">
                        {card?.author_name}
                      </h6>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(card?.rating)].map((_, i) => (
                            <FaStar key={i} color="#FFD700" />
                          ))}
                        </div>
                        <p>
                          {Number.isInteger(card?.rating)
                            ? `${card.rating}.0`
                            : card.rating}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex justify-between items-center mt-6">
            <button
              ref={prevRef}
              className="text-xl absolute top-1/2 -translate-y-1/2 -left-4 lg:left-16 z-10 bg-primary/60 rounded-full w-8 shadow-sm shadow-primary flex items-center justify-center h-8 font-bold text-gray-700 hover:text-gray-900"
            >
              <MdOutlineKeyboardArrowLeft />
            </button>
            <button
              ref={nextRef}
              className="text-xl absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-4 z-10 bg-primary/60 rounded-full w-8 shadow-sm shadow-primary flex items-center justify-center h-8 font-bold text-gray-700 hover:text-gray-900"
            >
              <MdOutlineKeyboardArrowRight />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
export default Testimonial;
