import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroBanner.scss";

const HeroBanner = ({ movies }) => {

  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const movie = movies[index];

  // auto change banner
  useEffect(() => {

    const interval = setInterval(() => {

      setIndex((prev) => (prev + 1) % movies.length);

    }, 60000); // 60 seconds

    return () => clearInterval(interval);

  }, [movies.length]);

  if (!movie) return null;

  const backdrop = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  const openDetails = () => {
    navigate(`/movie/${movie.id}`);
  };

  const openTrailer = (e) => {
    e.stopPropagation();
    navigate(`/movie/${movie.id}?tab=trailer`);
  };

  return (
    <section
      className="hero-banner"
      style={{ backgroundImage: `url(${backdrop})` }}
      onClick={openDetails}
    >

      <div className="hero-overlay">

        <div className="hero-content">

          <h1>{movie.title || movie.name}</h1>

          <div className="rating">
            ⭐ {movie.vote_average?.toFixed(1)}
          </div>

          <p>
            {movie.overview?.slice(0, 150)}...
          </p>

          <div className="hero-buttons">

            <button
              className="btn trailer"
              onClick={openTrailer}
            >
              ▶ Trailer
            </button>

            <button className="btn fav">
              ❤️ Favourite
            </button>

            <button className="btn details">
              ℹ Details
            </button>

          </div>

        </div>

      </div>

    </section>
  );
};

export default HeroBanner;