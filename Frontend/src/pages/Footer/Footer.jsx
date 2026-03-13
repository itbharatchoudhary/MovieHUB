import "./Footer.scss";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Logo Section */}
        <div className="footer-section logo-section">
          <h2 className="logo">MovieHUB</h2>
          <p>
            Discover, review and track your favourite movies and TV shows.
            Your personal movie companion.
          </p>
        </div>

        {/* Explore */}
        <div className="footer-section">
          <h3>Explore</h3>
          <ul>
            <li>Movies</li>
            <li>TV Shows</li>
            <li>Trending</li>
            <li>Top Rated</li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h3>Genres</h3>
          <ul>
            <li>Action</li>
            <li>Drama</li>
            <li>Comedy</li>
            <li>Thriller</li>
          </ul>
        </div>

        {/* Social */}
        <div className="footer-section">
          <h3>Follow Us</h3>

          <div className="social-icons">
            <FaGithub />
            <FaInstagram />
            <FaTwitter />
          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} MovieHUB. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;