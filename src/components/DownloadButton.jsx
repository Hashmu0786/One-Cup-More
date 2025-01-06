import React from "react";
import menuPDF from "/assets/menuPDF.pdf";

const DownloadButton = () => {
  return (
    <a href={menuPDF} download={menuPDF}>
      <button className=" fixed bottom-4 left-4 z-50 flex items-center font-medium text-white bg-gradient-to-t from-[#3e7155] to-[#03794a] px-5 py-2 rounded-full border-2 border-secondary hover:border-white hover:shadow-lg active:shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          className="mr-2"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path
            fill="currentColor"
            d="M1 14.5a6.496 6.496 0 0 1 3.064-5.519 8.001 8.001 0 0 1 15.872 0 6.5 6.5 0 0 1-2.936 12L7 21c-3.356-.274-6-3.078-6-6.5zm15.848 4.487a4.5 4.5 0 0 0 2.03-8.309l-.807-.503-.12-.942a6.001 6.001 0 0 0-11.903 0l-.12.942-.805.503a4.5 4.5 0 0 0 2.029 8.309l.173.013h9.35l.173-.013zM13 12h3l-4 5-4-5h3V8h2v4z"
          ></path>
        </svg>
        <span>Menu</span>
      </button>
    </a>
  );
};

export default DownloadButton;
