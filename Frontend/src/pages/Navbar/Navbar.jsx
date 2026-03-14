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

  const isLoggedIn = true; // change with auth later

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
        <Link to="/history">History</Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-right">

        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "light" ? <i class="ri-moon-fill"></i> : <i class="ri-sun-fill"></i>}
        </button>

        {isLoggedIn ? (
          <div className="profile">
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
            />
          </div>
        ) : (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}
      </div>

    </nav>
  );
};

export default Navbar;