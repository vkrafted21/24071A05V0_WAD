import React, { useState } from "react";
import {
  Wind,
  Gauge,
  Eye,
  Sunrise,
  Sunset,
  Droplets,
  ChevronDown,
  ChevronUp,
   CloudSun,
} from "lucide-react";

function CurrentWeatherCard({ data }) {
  const [showDetails, setShowDetails] = useState(false);

  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString(
    "en-IN",
    { hour: "numeric", minute: "2-digit" }
  );

  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString(
    "en-IN",
    { hour: "numeric", minute: "2-digit" }
  );

  return (
    <div className="p-4 bg-light rounded shadow-sm">

      {/* top content */}
      <div className="text-center">
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt="weather icon"
        />

        <p class="text-muted">
          Current Weather in 
        </p>
        <h2 className="fw-bold">
            {data.name}
        </h2>

        <h1 className="display-5 fw-bold mb-1">
          {data.main.temp}°C
        </h1>

        <p className="text-muted mb-3">
          {data.weather[0].main}
        </p>

        {/* dropdown button */}
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => setShowDetails(!showDetails)}
        >
          More Details{" "}
          {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* expandable details */}
      {showDetails && (
        <div className="row g-3 mt-4 text-start">

          <div className="col-md-6">
            <p><Droplets size={18} className="me-2" />Humidity: {data.main.humidity}%</p>
            <p><Wind size={18} className="me-2" />Wind: {data.wind.speed} m/s</p>
            <p><Gauge size={18} className="me-2" />Pressure: {data.main.pressure} hPa</p>
          </div>

          <div className="col-md-6">
            <p><Eye size={18} className="me-2" />Visibility: {data.visibility / 1000} km</p>
            <p><Sunrise size={18} className="me-2" />Sunrise: {sunrise}</p>
            <p><Sunset size={18} className="me-2" />Sunset: {sunset}</p>
          </div>

        </div>
      )}
    </div>
  );
}

export default CurrentWeatherCard;