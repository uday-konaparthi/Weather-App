// App.jsx
import React from "react";
import { WeatherProvider } from "./context/WeatherContext";
import InputComponent from "./components/InputComponent";
import WeatherData from "./components/weatherData";
import { Cloud } from "lucide-react";
import WeatherHeader from "./components/weatherHeader";

const App = () => {
  return (
    <WeatherProvider>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
        <WeatherHeader />
        <InputComponent />
        <WeatherData />
      </div>
    </WeatherProvider>
  );
};

export default App;
