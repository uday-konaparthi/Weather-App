import React, { useState } from "react";
import { useWeather } from "../context/weatherContext";

const InputComponent = () => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const { setWeatherData } = useWeather();
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const geoBaseUrl = import.meta.env.VITE_OPENWEATHER_GEO_URL;
  const weatherBaseUrl = import.meta.env.VITE_OPENWEATHER_WEATHER_URL;

  const fetchWeather = async () => {
    if (!city.trim()) {
      alert("Enter City !!");
      return;
    }
    setLoading(true);
    setError("");

    try {
      // Step 1: Get lat & lon
      const geoUrl = `${geoBaseUrl}?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`;
      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();

      if (!geoData || geoData.length === 0) {
        throw new Error("City not found");
      }

      const { lat, lon } = geoData[0];

      // Step 2: Use `weather` API
      const weatherUrl = `${weatherBaseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();

      //console.log("Weather Data:", weatherData); // use this data in a separate component
      setWeatherData(weatherData);
    } catch (error) {
      console.error("Error fetching weather:", error.message);
      setError(error.message);
      setWeatherData(null);
    } finally {
      setCity("");
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div className="w-full max-w-md flex flex-col gap-2">
      <div className="flex gap-3">
        <input
          type="text"
          value={city}
          onKeyDown={handleKeyDown}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
          className="flex-1 px-4 py-2 rounded-lg bg-[#1F2937] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchWeather}
          disabled={loading}
          className={`px-4 py-2 rounded-lg font-medium text-white transition cursor-pointer ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Fetching..." : "Search"}
        </button>
      </div>

      {/* 🔴 Error message */}
      {error && (
        <p className="text-gray-400 text-sm mt-1 pl-1 font-medium place-self-center flex">
          {error} !
        </p>
      )}
    </div>
  );
};

export default InputComponent;
