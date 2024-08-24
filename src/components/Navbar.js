import React from "react";
import { Link } from "react-router-dom";
// import logo from '../logo.svg'
// import logo from '../Virtium-white-logo.png'
import logo from "../Virtium-Logo.jpg";
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-center">
        <Link to="/">
          <img src={logo} alt="virtium db logo" className="logo" />
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
