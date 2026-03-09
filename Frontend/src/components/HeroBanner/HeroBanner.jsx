import "./HeroBanner.scss";
import { FaPlay, FaHeart } from "react-icons/fa";

const HeroBanner = ({ movie, onWatchTrailer, onFavorite }) => {
  if (!movie) return null;

  const background = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "/placeholder-banner.jpg";

  return (
    <div
      className="hero-banner"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1>{movie.title}</h1>

        <p className="overview">
          {movie.overview
            ? movie.overview.slice(0, 200) + "..."
            : "Description not available"}
        </p>

        <div className="hero-buttons">
          <button
            className="play-btn"
            onClick={() => onWatchTrailer(movie.id)}
          >
            <FaPlay /> Watch Trailer
          </button>

          <button
            className="fav-btn"
            onClick={() => onFavorite(movie)}
          >
            <FaHeart /> Add to Favorites
          </button>
        </div>
      </div>

      <div className="hero-fade-bottom"></div>
    </div>
  );
};

export default HeroBanner;