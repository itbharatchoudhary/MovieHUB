import { useState } from "react";
import "./Navbar.scss";
import SearchBar from "../SearchBar/SearchBar";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ onSearchResults }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userProfilePic = "https://example.com/profile.jpg";

  const navigate = useNavigate(); // For programmatic navigation

  return (
    <nav className="navbar">
      <div className="nav-left">
        {/* Logo clickable */}
        <div className="logo" onClick={() => navigate("/")}>
          MovieHUB
        </div>

        <div className="links">
          <Link to="/">Explore</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/tv">TV Shows</Link>
          <Link to="/favorites">Favorites</Link>
        </div>
      </div>

      <div className="nav-right">
        <SearchBar onResults={onSearchResults} />

        {isLoggedIn ? (
          <Link to="/profile">
            <img
              src={userProfilePic}
              alt="Profile"
              className="profile-icon"
            />
          </Link>
        ) : (
          <Link to="/login" className="login-button">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;