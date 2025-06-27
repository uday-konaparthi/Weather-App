import React from "react";
import {
  ThermometerSun,
  Sun,
  Wind,
  Droplets,
  MapPin,
  ThermometerSnowflake,
  Thermometer,
  Cloud,
  CloudRain,
  CloudSnow,
  Zap,
  CloudDrizzle,
} from "lucide-react";
import { useWeather } from "../context/weatherContext";

const WeatherData = () => {
  const { weatherData } = useWeather();

  if (!weatherData) return null;

  console.log(weatherData);

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return <Sun className="text-yellow-400" size={22} />;
      case "Clouds":
        return <Cloud className="text-gray-300" size={22} />;
      case "Rain":
        return <CloudRain className="text-blue-400" size={22} />;
      case "Drizzle":
        return <CloudDrizzle className="text-blue-300" size={22} />;
      case "Snow":
        return <CloudSnow className="text-white" size={22} />;
      case "Thunderstorm":
        return <Zap className="text-yellow-300" size={22} />;
      case "Mist":
      case "Haze":
      case "Fog":
        return <Wind className="text-slate-300" size={22} />;
      default:
        return <Thermometer className="text-white" size={22} />;
    }
  };

  return (
    <div
      className="
        mt-10
        w-full max-w-md
        p-6
        rounded-2xl
         bg-opacity-5
        backdrop-blur-xl
        border border-white/10
        shadow-2xl
        text-white
        transition-transform duration-300
        hover:-translate-y-1 hover:shadow-3xl
        px-4 sm:px-6
      "
    >
      {/* Header Section */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="text-blue-400" size={22} />
            <h2 className="text-xl font-semibold">
              <span className="text-blue-400">{weatherData.name}</span>
            </h2>
          </div>

          {/* Min and Max Temp */}
          <div className="text-sm text-gray-300 flex gap-4">
            <div className="flex items-center gap-1">
              <Thermometer size={16} className="text-red-300" />
              <span>
                Max:{" "}
                <span className="text-white">
                  {Math.round(weatherData.main.temp_max)}°C
                </span>
              </span>
            </div>
            <div className="flex items-center gap-1">
              <ThermometerSnowflake size={16} className="text-cyan-300" />
              <span>
                Min:{" "}
                <span className="text-white">
                  {Math.round(weatherData.main.temp_min)}°C
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Big Temperature */}
        <div className="flex flex-col justify-center items-center">
          <div className="text-6xl font-bold text-yellow-300 tracking-tight flex items-center gap-2 hover:scale-105 transition-transform duration-300">
            {Math.round(weatherData.main.temp)}°C{" "}
            <ThermometerSun size={40} className="text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-base sm:text-lg">
        <div className="flex items-center gap-3 hover:text-orange-400 transition">
          {getWeatherIcon(weatherData.weather[0].main)}
          <p>
            <span className="font-medium text-white">
              {weatherData.weather[0].main}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3 transition">
          <Wind className="text-cyan-300" size={22} />
          <p>
            <span className="font-medium text-white ">
              {Math.round(weatherData.wind.speed)} km/h
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3 hover:text-blue-300 transition">
          <Droplets className="text-blue-300" size={22} />
          <p>
            Humidity: <span className="font-medium text-white">40%</span>
          </p>
        </div>
        <div className="flex items-center gap-3 hover:text-blue-300 transition">
          <Thermometer className="text-red-300" size={22} />
          <p>
            Feels like :{" "}
            <span className="text-white font-medium">
              {Math.round(weatherData.main.feels_like)}°C
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherData;
