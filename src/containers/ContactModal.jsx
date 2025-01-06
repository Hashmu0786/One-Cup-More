import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import contact from "/assets/about/contact.svg";
import axios from "axios";
import Loading from "../components/Loading";
import toast from "react-hot-toast";

export default function ContactModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/contacts`,
        data
      );
      console.log("Response:", response.data);
      toast.success("Message sent successfully!");

      reset();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 font-anuphan ">
      <div className="bg-white rounded-lg shadow-lg w-[90%] lg:w-full lg:max-w-2xl p-10 lg:px-16 lg:py-8 px-5 py-5  relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 text-gray-500 bg-[#FCE5C1] p-1 rounded-full hover:text-gray-900"
        >
          <AiOutlineClose size={24} />
        </button>
        <div className="absolute right-0 top-2 hidden lg:block">
          <img src={contact} alt="contact" />
        </div>

        {/* Title */}
        <h2 className="text-2xl text-left font-bold mb-1 text-[#333]">
          Contact Us
        </h2>
        <p className="text-gray-600 text-left mb-5 text-sm">
          So our team can reach out to you on time
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 lg:space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 lg:items-center gap-4">
            {/* Full Name */}
            <div className="text-sm flex flex-col items-start">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="eg: John Doe"
                {...register("FullName", { required: "Full Name is required" })}
                className="text-start p-1 w-full border border-gray-300 rounded-lg bg-[#F6F9FF] placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              {errors.FullName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.FullName.message}
                </p>
              )}
            </div>

            {/* Location */}
            <div className="text-sm flex flex-col items-start">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select
                {...register("OutletLocation", {
                  required: "Location is required",
                })}
                className="w-full p-1 border border-gray-300 rounded-lg bg-[#F6F9FF] focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="Lucknow">Lucknow</option>
                <option value="Delhi">Delhi</option>
              </select>
              {errors.OutletLocation && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.OutletLocation.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="text-sm flex flex-col items-start">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="eg: john@email.com"
                {...register("Email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className="w-full p-1 border border-gray-300 rounded-lg placeholder-gray-400 bg-[#F6F9FF] focus:outline-none focus:border-blue-500"
              />
              {errors.Email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.Email.message}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div className="text-sm w-full flex flex-col items-start">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="flex w-full items-center text-sm">
                <select className="p-1 border text-black border-gray-300 rounded-l-lg focus:outline-none bg-[#F6F9FF] focus:border-blue-500">
                  <option value="+91">+91</option>
                </select>
                <input
                  type="text"
                  placeholder="543210987"
                  {...register("PhoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid phone number",
                    },
                  })}
                  className="w-full p-1 border border-l-0 border-gray-300 rounded-r-lg bg-[#F6F9FF] placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>
              {errors.PhoneNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.PhoneNumber.message}
                </p>
              )}
            </div>

            {/* Share Your Message */}
            <div className="lg:col-span-2 flex flex-col items-start">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Share Your Message
              </label>
              <textarea
                placeholder="Message"
                {...register("ShareYourMessage", {
                  required: "Message is required",
                })}
                className="w-full p-2 text-sm border border-gray-300 rounded-lg placeholder-gray-400 bg-[#F6F9FF] resize-none focus:outline-none focus:border-blue-500"
                rows="4"
              />
              {errors.ShareYourMessage && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.ShareYourMessage.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`w-full lg:w-auto mt-4 hover:bg-[#F9C06A] text-black py-2 px-5 rounded-md float-end text-sm bg-[#F9C06A] transition duration-200 flex items-center justify-center`}
          >
            {loading ? <Loading /> : "Submit"}
          </button>
        </form>
        <div className="absolute rotate-180 left-0 bottom-0 hidden lg:block">
          <img src={contact} alt="contact" />
        </div>
      </div>
    </div>
  );
}
