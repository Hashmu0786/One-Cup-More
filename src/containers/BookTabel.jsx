import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import dateFormat from "dateformat";
import contact from "/assets/about/contact.svg";
import axios from "axios";
import Loading from "../components/Loading";
import toast from "react-hot-toast";

export default function BookTable({ isOpen, onClose }) {
  if (!isOpen) return null;
  const [loading, setLoading] = useState(false);
  const dateInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isCustomPerson, setIsCustomPerson] = useState(false);
  const [customPersonCount, setCustomPersonCount] = useState("");
  const [locations, setLocations] = useState([
    { id: 1, name: "Lucknow" }, // Added Lucknow
    { id: 2, name: "Dwarka" }, // Added Dwarka
  ]);

  const timeOptions = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
    "10:00 PM",
    "11:00 PM",
  ];

  const onSubmit = async (data) => {
    // Format the date
    const formattedData = {
      ...data,
      date: dateFormat(data.date, "ddmmmyyyy"), // Format as 12Dec2024
    };

    // try {
    //   // Dummy POST request
    //   await fetch("https://t8vg23sv-8001.inc1.devtunnels.ms/api/reservations", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formattedData),
    //   });
    //   // Reset form and close modal on successful submission
    //   reset();
    //   onClose();
    // } catch (error) {
    //   console.error("Failed to submit:", error);
    // }

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/reservations`,
        formattedData
      );
      console.log("Response:", response.data);
      toast.success("Table is Booked successfully");
      reset();
      onClose();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Faild to Book Table");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dateInputRef.current) {
      console.log("dateInputRef", dateInputRef);
    }
  }, []);

  console.log(dateInputRef);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 font-anuphan">
      <div className="bg-white rounded-lg shadow-lg w-[90%] lg:w-full lg:max-w-2xl px-5 py-5 md:p-10  lg:px-16 lg:py-5 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 text-gray-500 bg-[#FCE5C1] p-1 rounded-full hover:text-gray-900"
        >
          <AiOutlineClose size={24} />
        </button>
        <div className="absolute right-0 top-2 hidden lg:block">
          <img src={contact} alt="Contact" />
        </div>

        {/* Title */}
        <h2 className="text-2xl text-left font-bold mb-1 text-[#333]">
          Book your table now
        </h2>
        <p className="text-gray-600 text-left mb-5 text-sm">
          Don't wait to indulge in the visual and culinary magic of Warehouse -
          book your table now and let the feast begin!
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
                className="text-start p-1 w-full border border-gray-300 rounded-lg bg-[#F6F9FF] placeholder-gray-400 focus:outline-none focus:border-blue-500"
                {...register("name", { required: "Full Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
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
                className="w-full p-1 border border-gray-300 rounded-lg placeholder-gray-400 bg-[#F6F9FF] focus:outline-none focus:border-blue-500"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
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
                  className="w-full p-1 border border-l-0 border-gray-300 rounded-r-lg bg-[#F6F9FF] placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\d{10}$/,
                      message: "Enter a valid phone number",
                    },
                  })}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone.message}</p>
              )}
            </div>

            {/* Date */}
            <div className="text-sm flex flex-col items-start">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                ref={dateInputRef}
                className="w-full p-1 border border-gray-300 rounded-lg placeholder-gray-400 bg-[#F6F9FF] focus:outline-none focus:border-blue-500"
                {...register("date", { required: "Date is required" })}
              />
              {errors.date && (
                <p className="text-red-500 text-xs">{errors.date.message}</p>
              )}
            </div>

            {/* Time */}
            <div className="text-sm flex flex-col items-start">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <select
                className="w-full p-1 border border-gray-300 rounded-lg bg-[#F6F9FF] focus:outline-none focus:border-blue-500"
                {...register("time", { required: "Time is required" })}
              >
                <option value="">Select a time</option>
                {timeOptions.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {errors.time && (
                <p className="text-red-500 text-xs">{errors.time.message}</p>
              )}
            </div>

            {/* No of persons */}
            <div className="text-sm flex flex-col items-start">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Persons
              </label>
              <select
                className="w-full p-1 border border-gray-300 rounded-lg bg-[#F6F9FF] focus:outline-none focus:border-blue-500"
                {...register("guests", {
                  required: "Please select number of persons",
                })}
                onChange={(e) => {
                  const value = e.target.value;
                  setIsCustomPerson(value === "custom");
                  setCustomPersonCount("");
                }}
              >
                <option value="">Select Number of Persons</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} Person
                  </option>
                ))}
                <option value="custom">Other</option>
              </select>
              {isCustomPerson && (
                <input
                  type="number"
                  min="1"
                  placeholder="Enter number of persons"
                  value={customPersonCount}
                  onChange={(e) => setCustomPersonCount(e.target.value)}
                  className="mt-2 w-full p-1 border border-gray-300 rounded-lg placeholder-gray-400 bg-[#F6F9FF] focus:outline-none focus:border-blue-500"
                />
              )}
              {errors.persons && (
                <p className="text-red-500 text-xs">{errors.persons.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full lg:w-auto mt-4 hover:bg-[#F9C06A] text-black py-2 px-5 rounded-md float-end text-sm bg-[#F9C06A] transition duration-200"
          >
            {loading ? <Loading /> : "Book a Table"}
          </button>
        </form>
        <div className="absolute rotate-180 left-0 bottom-0 hidden lg:block">
          <img src={contact} alt="Contact" />
        </div>
      </div>
    </div>
  );
}
