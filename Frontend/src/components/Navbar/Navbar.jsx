import "./Navbar.scss";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = ({ onSearchResults }) => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo">MovieHUB</div>

        <div className="links">
          <a href="/">Explore</a>
          <a href="/movies">Movies</a>
          <a href="/tv">TV Shows</a>
          <a href="/favorites">Favorites</a>
        </div>
      </div>

      <div className="nav-right">
        <SearchBar onResults={onSearchResults} />
      </div>
    </nav>
  );
};

export default Navbar;