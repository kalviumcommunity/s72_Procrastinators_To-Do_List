import React from "react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-text">🛌 Procrastinator's Paradise</span>
        </div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <a href="#" className="navbar-link">
              Home
            </a>
          </li>
          <li className="navbar-item">
            <a href="#" className="navbar-link">
              Excuses
            </a>
          </li>
          <li className="navbar-item">
            <a href="#" className="navbar-link">
              Distractions
            </a>
          </li>
          <li className="navbar-item">
            <a href="#" className="navbar-link postpone-button">
              Login (Maybe Later)
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
