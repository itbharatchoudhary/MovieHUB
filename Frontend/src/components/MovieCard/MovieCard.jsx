import "./MovieCard.scss";
import { useState } from "react";
import { FaHeart, FaRegHeart, FaStar, FaPlay } from "react-icons/fa";

const MovieCard = ({ movie, onFavorite }) => {
  const [hovered, setHovered] = useState(false);

  const image = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.png";

  return (
    <div
      className={`movie-card ${hovered ? "active" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={image} alt={movie.title} />

      {/* Rating Badge */}
      <div className="rating">
        <FaStar /> {movie.vote_average?.toFixed(1)}
      </div>

      {/* Hover Overlay */}
      <div className="overlay">
        <h3>{movie.title}</h3>

        <div className="buttons">
          <button className="play">
            <FaPlay />
          </button>

          <button
            className="fav"
            onClick={() => onFavorite(movie)}
          >
            {movie.isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;