import React from "react";
import { CloudSun } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm sticky-top">
      <div className="container">

        {/* logo */}
        <a className="navbar-brand fw-bold d-flex align-items-center gap-2" href="#home">
          <CloudSun size={22} />
          WeatherNow
        </a>

        {/* toggle for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav gap-2">

            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#home">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#forecast">
                Upcoming Forecast
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#suggestions">
                Suggestions
              </a>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;