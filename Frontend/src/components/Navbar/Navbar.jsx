import { useState } from "react";
import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import 'remixicon/fonts/remixicon.css'

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
          <Link to="/"><i className="ri-compass-line"></i> Explore</Link>
          <Link to="/movies"><i className="ri-film-line"></i> Movies</Link>
          <Link to="/tv"><i className="ri-tv-line"></i> TV Shows</Link>
          <Link to="/categories"><i className="ri-heart-line"></i> Categories</Link>
          <Link to="/myspace"><i className="ri-user-line"></i> My Space</Link>
          <Link to="/Search"><i className="ri-search-line"></i> Search</Link>
        </div>
      </div>

      <div className="nav-right">
        

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