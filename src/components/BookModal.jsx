import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import BookTabel from "../containers/BookTabel";
import { uselocationContext } from "../context/StatesContext";

const BookModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { locations, selectedPlace, setselectedPlace } = uselocationContext();
  // State to manage if the modal should be shown
  const [showModal, setShowModal] = useState(false);

  // Function to handle closing the modal and setting local storage
  const handleCancel = () => {
    localStorage.setItem("status", JSON.stringify("false"));
    setShowModal(false); // Close the modal
  };

  // Effect to show modal after 10 seconds, only if the status isn't set in local storage
  useEffect(() => {
    const status = JSON.parse(localStorage.getItem("status"));

    // If status is not set to "false", show the modal after 10 seconds
    if (status !== "false") {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 10000); // 10 seconds

      // Cleanup timer on component unmount or if status changes
      return () => clearTimeout(timer);
    }
  }, []);

  // Conditional rendering of modal based on showModal state
  if (!showModal) return null;

  return (
    <div className="w-full h-full bg-black/70 fixed top-0 left-0 z-[101] flex items-start pt-20 sm:pt-16 justify-center px-5">
      <div className="w-full sm:w-fit bg-white text-center pb-8 px-5 flex flex-col items-center gap-1 sm:p-2 rounded-md pt-12 relative sm:px-16 sm:py-8 sm:pt-12">
        <RxCross1
          className="text-2xl absolute top-2 right-2 cursor-pointer"
          onClick={handleCancel} // Close the modal and update localStorage
        />
        <h2 className="text-2xl sm:text-xl font-medium">
          Holiday Party at One Cup More
        </h2>
        <p className="text-lg sm:text-base">Host your Party with us!</p>
        <p className="my-5 sm:text-sm">
          The perfect venue for your festive celebration.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={locations === "dwarka"}
          className="w-fit px-4 py-2 bg-black hover:opacity-90 text-white rounded-sm"
        >
          {locations === "dwarka" ? "Take a Way" : " Book a Table"}
        </button>
      </div>
      <BookTabel isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default BookModal;
