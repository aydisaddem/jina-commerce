import "../styles/navbar.css";
import React, { useState } from "react";
const Navbar = () => {
  const [isVisible, setIsVisble] = useState(false);
  const handlePanel = () => setIsVisble(!isVisible);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a class="logo" data-text="Awesome">
          <span class="actual-text">&nbsp;JINAshop&nbsp;</span>
          <span aria-hidden="true" class="hover-text">
            &nbsp;JINAshop&nbsp;
          </span>
        </a>{" "}
      </div>

      <div className="navbar-search">
        <input type="text" placeholder="Search..." />
        <button type="submit">
          <i className="fa-solid fa-search"></i>
        </button>
      </div>

      <div className="navbar-actions">
        <a href="/settings">
          <i className="fa-solid fa-gear"></i> Settings
        </a>
        <div className="dropdown">
          <a href="/account" className="dropdown-toggle">
            <i className="fa-regular fa-user"></i> Account
          </a>
          <ul className="dropdown-menu">
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <a href="/orders">Orders</a>
            </li>
            <li>
              <a href="/logout">Logout</a>
            </li>
          </ul>
        </div>
        <div className="panel" onClick={handlePanel}>
          <a href="#">
            <i className="fa-solid fa-box"></i> Panel
          </a>
        </div>
        <div
          className={`overlay ${isVisible ? "" : "hidden"}`}
          onClick={handlePanel}
        ></div>
        <div className={`panel-menu ${isVisible ? "" : "hidden"}`}>
          <div className="panel-header">
            <button class="close-btn" onClick={handlePanel}>
              <span class="X"></span>
              <span class="Y"></span>
              <div class="close">Close</div>
            </button>
            <h3>Mini panel</h3>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
