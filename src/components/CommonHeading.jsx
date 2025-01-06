import React from "react";

const CommonHeading = ({ title, des }) => {
  return (
    <div className="w-full md:max-w-4xl flex flex-col items-center text-center gap-4">
      <h2 className="text-2xl md:text-3xl font-bold text-[#603809]">{title}</h2>
      <p className="text-sm md:text-base text-[#454545]">{des}</p>
    </div>
  );
};

export default CommonHeading;
