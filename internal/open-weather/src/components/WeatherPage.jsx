import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import "./WeatherPage.css";

import CurrentWeatherCard from "./CurrentWeatherCard";
import ForecastDay from "./ForecastDay";

import {
  AlertTriangle,
  Sparkles,
  CalendarDays
} from "lucide-react";

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
    <>
      <div className="container py-4" id="home">

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

        {/* forecast heading */}
        <div
          className="d-flex justify-content-center align-items-center gap-2 mt-5 mb-4"
          id="forecast"
        >
          <CalendarDays size={22} />
          <h4 className="fw-bold mb-0">Upcoming Forecast</h4>
        </div>

        {/* forecast cards */}
        {forecastData?.list?.length > 0 && (
          <div className="row justify-content-center mt-2">
            {forecastData.list.slice(0, 10).map((forecastObj, index) => (
              <div key={index} className="col-6 col-md-2 mb-3">
                <ForecastDay data={forecastObj} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* footer suggestions */}
      <footer
  id="suggestions"
  className="py-5 text-center"
  style={{
    background: "linear-gradient(135deg, #4facfe, #00c6ff)",
    width: "100vw",
    marginLeft: "calc(50% - 50vw)"
  }}
>
  <div className="container">

    <h5 className="fw-bold text-white mb-3 d-flex justify-content-center align-items-center gap-2">
      <Sparkles size={22} />
      Suggestions
    </h5>

    <p className="text-secondary mb-4">
      Explore weather in popular cities
    </p>

    <div className="row justify-content-center g-3 mt-2">
      {history.map((item, index) => (
        <div key={index} className="col-6 col-md-2">
          <button
            className="btn btn-outline-light w-100 py-2 fw-semibold rounded-pill"
            onClick={() => setCity(item)}
          >
            {item}
          </button>
        </div>
      ))}
    </div>

  </div>
</footer>
    </>
  );
}

export default WeatherPage;