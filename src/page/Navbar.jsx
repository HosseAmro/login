import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
export default function Navbar() {
  return (
    <nav className="navbar ">
      <ul className="menu ">
        <li className="item-menu">
          <Link className="item" to="/">
            Home
          </Link>
        </li>
        <li className="item-menu">
          <Link className="item" to="/profile">
            Profile
          </Link>
        </li>
        <li className="item-menu">
          <Link className="item" to="/signup">
            Sign Up
          </Link>
        </li>
        <li className="item-menu">
          <Link className="item" to="/login">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}
