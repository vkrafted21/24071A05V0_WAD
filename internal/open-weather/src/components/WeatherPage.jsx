// WeatherPage.jsx
import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import "./WeatherPage.css";

import CurrentWeatherCard from "./CurrentWeatherCard";
import ForecastDay from "./ForecastDay";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function WeatherPage() {
  const [city, setCity] = useState("Hyderabad");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const apikey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
      );

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`
      );

      const currentData = await currentRes.json();
      const forecastList = await forecastRes.json();

      setCurrentWeather(currentData);
      setForecastData(forecastList);
    } catch (err) {
      setError("Failed to fetch weather data");
      setCurrentWeather(null);
      setForecastData([]);
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

  // chart data
const temps =
  forecastData?.list?.slice(0, 8).map((item) => item.main.temp) || [];

const getLineColor = (temp) => {
  if (temp < 20) return "blue";
  if (temp < 28) return "green";
  if (temp < 34) return "orange";
  return "red";
};

const avgTemp =
  temps.reduce((sum, val) => sum + val, 0) / temps.length;

const chartData = {
  labels:
    forecastData?.list?.slice(0, 8).map((item) =>
      item.dt_txt.split(" ")[1].slice(0, 5)
    ) || [],

  datasets: [
    {
      label: "Temperature °C",
      data: temps,
      borderColor: getLineColor(avgTemp),
      backgroundColor: getLineColor(avgTemp),
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 5,
      fill: false,
    },
  ],
};

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: `Temperature Forecast - ${city}`,
      },
    },
  };

  return (
    <div className="container py-4">
      <SearchBar onSearch={handleSearch} />

      {isLoading && (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary"></div>
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {currentWeather && (
        <div className="row justify-content-center mt-4">
          <div className="col-md-6">
            <CurrentWeatherCard data={currentWeather} />
          </div>
        </div>
      )}

      {/* chart */}
      {forecastData?.list?.length > 0 && (
        <div className="row justify-content-center mt-5">
            <div className="col-md-10">
                <div className="bg-white p-4 rounded shadow">
                <Line data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
      )}

      {/* forecast cards */}
      {forecastData?.list?.length > 0 && (
        <div className="row justify-content-center mt-4">
          {forecastData.list.slice(0, 10).map((forecastObj, index) => (
            <div key={index} className="col-6 col-md-2 mb-3">
              <ForecastDay data={forecastObj} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WeatherPage;