import React from "react";
import "./ForecastDay.css";

function ForecastDay({ data }) {
  return (
    <div className="forecast-card text-center">

      {/* icon */}
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="weather icon"
      />

      {/* condition */}
      <p className="text-muted mb-1">
        {data.weather[0].main}
      </p>

      {/* time */}
      <h5 className="fw-bold text-primary">
        {data.dt_txt.split(" ")[1].slice(0, 5)}
      </h5>

      {/* hidden details */}
      <div className="forecast-details">
        <p className="mb-1">
          <strong>Min:</strong> {data.main.temp_min}°C
        </p>

        <p className="mb-0">
          <strong>Max:</strong> {data.main.temp_max}°C
        </p>
      </div>

    </div>
  );
}

export default ForecastDay;