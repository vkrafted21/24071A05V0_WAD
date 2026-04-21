import React from "react";
import Navbar from "./components/Navbar";
import WeatherPage from "./components/WeatherPage";

function App() {
  return (
    <>
      <Navbar />

      <div className="container">
        <WeatherPage />
      </div>
    </>
  );
}

export default App;