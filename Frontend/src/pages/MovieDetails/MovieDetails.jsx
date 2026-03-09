import React from "react";
import "./MovieDetails.scss";

const MovieDetails = ({ movie }) => {

  if (!movie) return <div className="loading">Loading...</div>;

  return (
    <div className="movieDetails">

      {/* HERO BANNER */}
      <div
        className="heroBanner"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        }}
      >
        <div className="overlay">

          <div className="content">

            <h1 className="title">{movie.title}</h1>

            <div className="meta">

              <span className="rating">⭐ {movie.vote_average}</span>

              <span className="year">
                {movie.release_date?.slice(0, 4)}
              </span>

              <span className="language">
                {movie.original_language.toUpperCase()}
              </span>

            </div>

            <p className="description">
              {movie.overview}
            </p>

            <div className="buttons">

              <button className="playBtn">
                ▶ Play
              </button>

              <button className="listBtn">
                + My List
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* EXTRA DETAILS */}
      <div className="extraInfo">

        <h3>About this movie</h3>

        <div className="infoGrid">

          <div>
            <strong>Original Title:</strong> {movie.original_title}
          </div>

          <div>
            <strong>Popularity:</strong> {movie.popularity}
          </div>

          <div>
            <strong>Vote Count:</strong> {movie.vote_count}
          </div>

        </div>

      </div>

    </div>
  );
};

export default MovieDetails;