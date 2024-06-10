import React from "react";
import { GoSun } from "react-icons/go";
import { FiMoon } from "react-icons/fi";

const Temp = ({ theme, setTheme, setCity, stats }) => {


  return (
    <>
      <div className="flex flex-col items-center lg:flex-row lg:justify-between">
       
      </div>
      <div className="flex justify-center mt-4 lg:mt-8">
        {stats.isDay !== 0 ? (
          <GoSun className="text-yellow-500 text-5xl transform hover:scale-110 transition-transform duration-300" />
        ) : (
          <FiMoon
            className={`${
              theme === "dark" ? "text-slate-200" : "text-slate-600"
            } text-5xl transform hover:scale-110 transition-transform duration-300`}
          />
        )}
      </div>
      <div className="flex justify-center mt-5">
        <h1
          className={`text-6xl font-semibold ${
            theme === "dark" ? "text-white" : "text-slate-800"
          }`}
        >
          {stats.temp}&deg;C
        </h1>
      </div>
      <div className="flex justify-center items-center text-slate-300 mt-8 text-[25px]">
        <h1
          className={`${
            theme === "dark" ? "text-slate-300" : "text-slate-500"
          }`}
        >
          {stats.condition}
        </h1>
      </div>
      <div className="flex justify-center items-center text-slate-400 mt-5 text-[15px]">
        <h1>Date: {stats.time} | {stats.location} </h1>
      </div>
    </>
  );
};

export default Temp;
