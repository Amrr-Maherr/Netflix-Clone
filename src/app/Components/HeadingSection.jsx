import React from "react";

function HeadingSection({ title, description, buttonText }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 text-center leading-tight">
        {title}
      </h1>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 text-center max-w-3xl">
        {description}
      </p>
      <button
        className="bg-red-600 hover:bg-red-700 text-base sm:text-lg cursor-pointer md:text-xl lg:text-2xl font-semibold py-3 sm:py-4 md:py-5 px-6 sm:px-8 md:px-10 rounded-lg transition-all ease-in-out duration-300"
      >
        {buttonText}
      </button>
    </div>
  );
}

export default HeadingSection;
