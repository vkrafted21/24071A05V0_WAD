import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import "./WeatherPage.css";

import CurrentWeatherCard from "./CurrentWeatherCard";
import ForecastDay from "./ForecastDay";

import { AlertTriangle, Sparkles } from "lucide-react";

function WeatherPage() {
  const [city, setCity] = useState("Hyderabad");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [history, setHistory] = useState([
    "Hyderabad",
    "Mumbai",
    "Delhi",
    "Chennai",
    "Bangalore",
  ]);

  const apikey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
      );

      const currentData = await currentRes.json();

      if (currentData.cod !== 200) {
        setError("City not found. Please enter a valid city.");
        setCurrentWeather(null);
        setForecastData([]);
        setIsLoading(false);
        return;
      }

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`
      );

      const forecastList = await forecastRes.json();

      setCurrentWeather(currentData);
      setForecastData(forecastList);

      if (!history.includes(city)) {
        setHistory((prev) => [city, ...prev.slice(0, 4)]);
      }

    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [city]);

  const handleSearch = (newCity) => {
    setCity(newCity);
  };

  return (
    <div className="container py-4">

      {/* search */}
      <SearchBar onSearch={handleSearch} />

      {/* loading */}
      {isLoading && (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary"></div>
        </div>
      )}

      {/* error */}
      {error && (
        <div className="alert alert-danger d-flex align-items-center justify-content-center gap-2 mt-3">
          <AlertTriangle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* current weather */}
      {currentWeather && (
        <div className="row justify-content-center mt-4">
          <div className="col-md-8">
            <CurrentWeatherCard data={currentWeather} />
          </div>
        </div>
      )}

        <h4 className="text-center fw-bold mt-5 mb-4">
        Upcoming Forecast
        </h4>
      {/* forecast */}
      {forecastData?.list?.length > 0 && (
        <div className="row justify-content-center mt-4">
          {forecastData.list.slice(0, 10).map((forecastObj, index) => (
            <div key={index} className="col-6 col-md-2 mb-3">
              <ForecastDay data={forecastObj} />
            </div>
          ))}
        </div>
      )}

      {/* suggestions at bottom */}
      <div className="text-center mt-5">
        <h5 className="fw-bold mb-3 d-flex justify-content-center align-items-center gap-2">
          <Sparkles size={18} />
          Suggestions
        </h5>

        {history.map((item, index) => (
          <button
            key={index}
            className="btn btn-outline-primary btn-sm m-1"
            onClick={() => setCity(item)}
          >
            {item}
          </button>
        ))}
      </div>

    </div>
  );
}

export default WeatherPage;