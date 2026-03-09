import "./MovieCard.scss";
import { useState } from "react";
import { FaHeart, FaRegHeart, FaStar, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, onFavorite, onWatchTrailer }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const openDetails = () => {
    navigate(`/movie/${movie.id}`);
  };

  const image = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.png";

  return (
    <div
      className={`movie-card ${hovered ? "active" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={image}
        alt={movie.title}
        onClick={openDetails}
        onError={(e) => {
          e.target.src = "/placeholder.png";
        }}
      />

      {/* Rating */}
      <div className="rating">
        <FaStar />
        <span>{movie.vote_average?.toFixed(1) || "N/A"}</span>
      </div>

      {/* Hover Overlay */}
      <div className="overlay">
        <h3>{movie.title}</h3>

        <div className="buttons">
          <button
            className="play"
            onClick={(e) => {
              e.stopPropagation();
              onWatchTrailer(movie.id, movie);
            }}
          >
            <FaPlay />
          </button>

          <button
            className="fav"
            onClick={(e) => {
              e.stopPropagation();
              onFavorite(movie);
            }}
          >
            {movie.isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;