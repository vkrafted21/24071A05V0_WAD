import React from "react";

function ForecastDay({ data }) {
  return (
    <div className="border p-3 m-2 bg-light text-center rounded shadow-sm">

      {/* weather icon */}
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="weather icon"
      />

      {/* weather condition below icon */}
      <span className="d-block text-muted small mb-2">
        {data.weather[0].main}
      </span>

      {/* time */}
      <h6 className="fw-bold text-primary">
        {data.dt_txt.split(" ")[1].slice(0, 5)}
      </h6>

      {/* min temp */}
      <p className="mb-1">
        <strong>Min:</strong> {data.main.temp_min}°C
      </p>

      {/* max temp */}
      <p className="mb-1">
        <strong>Max:</strong> {data.main.temp_max}°C
      </p>

    </div>
  );
}

export default ForecastDay;