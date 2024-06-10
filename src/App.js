import React, { useState, useEffect } from "react";
import Info from "./components/Info";
import Weather from "./components/Weather";
import { MdSunny } from "react-icons/md";
import { MdNightlight } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

function App() {
  const [theme, setTheme] = useState('dark');
  const [city, setCity] = useState('Jaipur');
  const [weatherData, setWeatherData] = useState(null);
  const [searchCity, setSearchCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const apiURL = `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${city}&aqi=no`;

  useEffect(() => {
    fetch(apiURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not get data");
        }
        return res.json();
      })
      .then((data) => {
        setWeatherData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [city, apiURL]);

  useEffect(() => {
    if (searchCity.length > 0) {
      fetch(`https://api.weatherapi.com/v1/search.json?key=${process.env.REACT_APP_API_KEY}&q=${searchCity}`)
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(data.map((item) => item.name));
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setSuggestions([]);
    }
  }, [searchCity]);

  const handleSearch = () => {
    setCity(searchCity);
    setSearchCity('');
    setSuggestions([]);
  };

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSuggestionClick = (selectedCity) => {
    setCity(selectedCity);
    setSearchCity('');
    setSuggestions([]);
  };

  return (
    <div className={`bg-${theme === 'dark' ? 'gray-800' : 'white'} min-h-screen flex flex-col justify-center items-center p-5 transition-colors duration-300`}>
      <div className="max-w-4xl w-full bg-opacity-0 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-3xl font-bold`}>
            Weather App
          </h1>
          <div className="flex gap-4 m-4">
            {theme === "light" ? (
              <MdNightlight
                onClick={handleThemeChange}
                className="text-black text-2xl cursor-pointer transform hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <MdSunny
                onClick={handleThemeChange}
                className="text-white text-2xl cursor-pointer transform hover:scale-110 transition-transform duration-300"
              />
            )}
          </div>
        </div>

        <div className="relative mb-8">
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-300 placeholder-gray-500"
            placeholder="Enter city name..."
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-md">
              {suggestions.map((item) => (
                <li
                  key={item}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSuggestionClick(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
          <button
  onClick={handleSearch}
  className={`absolute right-0 top-1/2 transform -translate-y-1/2 px-4 py-2 text-blue-500 rounded-full hover:bg-blue-500 hover:text-black transition duration-300 ${theme === 'dark' ? 'bg-opacity-50' : ''}`}
  style={{ background: 'transparent', border: 'none' }}
>
  <FaSearch />
</button>
        </div>

        {weatherData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="flex flex-col gap-4 md:w 2">
              <h2 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-xl font-semibold mb-4`}></h2>
              <Info
                theme={theme}
                setTheme={setTheme}
                setCity={setCity}
                stats={{
                  temp: weatherData?.current.temp_c,
                  condition: weatherData?.current.condition.text,
                  isDay: weatherData?.current.is_day,
                  location: weatherData?.location.name,
                  time: weatherData?.location.localtime,
                }}
              />
            </div>
            <div className="flex flex-col gap-4 md:w 2">
              <h2 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-xl font-semibold`}></h2>
              <Weather
                theme={theme}
                stats={{
                  windSpeed: Math.round(weatherData?.current.wind_kph),
                  windSpeedUnit: 'km/h',
                  windDir: weatherData?.current.wind_dir,
                  humidity: weatherData?.current.humidity,
                  humidityUnit: '%',
                  visibility: weatherData?.current.vis_km,
                  visibilityUnit: 'km',
                  airPressure: weatherData?.current.pressure_mb,
                  airPressureUnit: 'mb',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
