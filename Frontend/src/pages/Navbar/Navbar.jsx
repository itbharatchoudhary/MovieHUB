import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'remixicon/fonts/remixicon.css'
import "./Navbar.scss";

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  return (
    <nav className="navbar">

      {/* LEFT LOGO */}
      <div className="nav-left">
        <Link to="/" className="logo">
          MovieHUB
        </Link>
      </div>

      {/* CENTER ROUTES */}
      <div className="nav-center">
        <Link to="/explore">Explore</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/tv-shows">TV Shows</Link>
        <Link to="/kids">Kids</Link>
        <Link to="search">Search</Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-right">

        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "light"
            ? <i className="ri-moon-fill"></i>
            : <i className="ri-sun-fill"></i>}
        </button>

      </div>

    </nav>
  );
};

export default Navbar;