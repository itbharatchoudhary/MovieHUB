import React from "react";
import "../MovieCard/MovieCard.scss";

const MovieCard = ({ movie }) => {
  const image = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-image.png";

  const title = movie?.title || movie?.name;
  const rating = movie?.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const year = movie?.release_date
    ? movie.release_date.split("-")[0]
    : movie?.first_air_date?.split("-")[0];

  return (
    <div className="movie-card">
      
      <div className="poster">
        <img src={image} alt={title} />

        <div className="overlay">
          <div className="movie-meta">
            <h3>{title}</h3>

            <div className="meta-bottom">
              <span className="rating">⭐ {rating}</span>
              {year && <span className="year">{year}</span>}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default MovieCard;