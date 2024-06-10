import React from "react";
import { FaWind } from "react-icons/fa";
import { BsDroplet } from "react-icons/bs";
import { MdOutlineVisibility } from "react-icons/md";
import { GiWindSlap } from "react-icons/gi";

const HighlightCard = ({ theme, title, value, unit, icon: Icon }) => (
  <div
    className={`${
      theme === "dark" ? "bg-gray-800 text-white" : "bg-red-200 text-gray-900"
    } p-6 rounded-lg shadow-md flex flex-col items-center transition-transform transform hover:scale-105 duration-300`}
  >
    <h1 className="text-md mt-2">{title}</h1>
    <div className="mt-2 flex items-center">
      {Icon && <Icon className="text-3xl mr-2" />}
      <div className="flex items-baseline">
        <span className="text-4xl font-bold">{value}</span>
        <span className="text-2xl ml-1">{unit}</span>
      </div>
    </div>
  </div>
);

const Weather = ({ theme, stats }) => {
  return (
    <>
      <HighlightCard
        theme={theme}
        title="Wind Speed"
        value={stats.windSpeed}
        unit={stats.windSpeedUnit}
        icon={FaWind}
      />
      <HighlightCard
        theme={theme}
        title="Humidity"
        value={stats.humidity}
        unit={stats.humidityUnit}
        icon={BsDroplet}
      />
      <HighlightCard
        theme={theme}
        title="Visibility"
        value={stats.visibility}
        unit={stats.visibilityUnit}
        icon={MdOutlineVisibility}
      />
      <HighlightCard
        theme={theme}
        title="Air Pressure"
        value={stats.airPressure}
        unit={stats.airPressureUnit}
        icon={GiWindSlap}
      />
    </>
  );
};

export default Weather;