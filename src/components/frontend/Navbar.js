import React, { useState } from "react";
import homeImg from "../../Assets/homeImg.png"; // adjust path
import "../../css/navbar.css";

function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <nav className="custom-navbar">
      <div className="nav-container">
        <img src={homeImg} alt="logo" className="nav-logo" />

        <button className="nav-toggle" onClick={toggleNavbar}>
          ☰
        </button>

        <ul className={`nav-links ${navbarOpen ? "active" : ""}`}>
          <li className="nav-item">
            <a href="/">Home</a>
          </li>
          <li className="nav-item">
            <a href="/myOrder">My Orders</a>
          </li>
          <li className="nav-item">
            <a href="/cart">Cart</a>
          </li>
          <li className="nav-item">
            <a href="/signup">Log In</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
