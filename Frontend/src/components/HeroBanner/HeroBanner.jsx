import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TrailerModal from "../TrailerModal/TrailerModal";
import "./HeroBanner.scss";

const HeroBanner = ({ movies = [] }) => {
  const [index, setIndex] = useState(0);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const movie = movies[index];

  // Auto banner change
  useEffect(() => {
    if (!movies.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [movies]);

  if (!movie) return null;

  const backdrop = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  // Navigate to movie details
  const openDetails = (e) => {
    e.stopPropagation();
    navigate(`/movie/${movie.id}`);
  };

  // Open trailer modal
  const openTrailer = async (e) => {
    e.stopPropagation();

    try {
      const res = await fetch(
        `${BASE_URL}/movie/${movie.id}/videos?api_key=${API_KEY}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch trailer");
      }

      const data = await res.json();

      if (!data.results) return;

      const trailer = data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );

      if (trailer) {
        setTrailerKey(trailer.key);
        setIsTrailerOpen(true);
      } else {
        console.log("No trailer found for this movie");
      }

    } catch (error) {
      console.error("Trailer fetch error:", error);
    }
  };

  const closeTrailer = () => {
    setIsTrailerOpen(false);
    setTrailerKey(null);
  };

  return (
    <>
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
              {movie.overview
                ? movie.overview.slice(0, 150) + "..."
                : "No description available"}
            </p>

            <div className="hero-buttons">
              <button className="btn trailer" onClick={openTrailer}>
                ▶ Trailer
              </button>

              <button className="btn fav">
                ❤️ Favourite
              </button>

              <button className="btn details" onClick={openDetails}>
                ℹ Details
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Trailer Modal */}
      <TrailerModal
        trailerKey={trailerKey}
        isOpen={isTrailerOpen}
        onClose={closeTrailer}
      />
    </>
  );
};

export default HeroBanner;