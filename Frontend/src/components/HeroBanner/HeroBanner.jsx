import "./HeroBanner.scss";
import { FaPlay, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HeroBanner = ({ movie, onWatchTrailer, onFavorite }) => {

  const navigate = useNavigate();

  if (!movie) return null;

  const background = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "/placeholder-banner.jpg";

  const openDetails = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      className="hero-banner"
      style={{
        backgroundImage: `url(${background})`,
      }}
      onClick={openDetails}
    >
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1>{movie.title || movie.name}</h1>

        <p className="overview">
          {movie.overview
            ? movie.overview.slice(0, 200) + "..."
            : "Description not available"}
        </p>

        <div className="hero-buttons">

          <button
            className="play-btn"
            onClick={(e) => {
              e.stopPropagation();
              onWatchTrailer(movie.id);
            }}
          >
            <FaPlay /> Watch Trailer
          </button>

          <button
            className="fav-btn"
            onClick={(e) => {
              e.stopPropagation();
              onFavorite(movie);
            }}
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