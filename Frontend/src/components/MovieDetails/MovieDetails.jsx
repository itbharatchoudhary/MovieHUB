import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.scss";

import MovieRow from "../MovieRow/MovieRow";
import TrailerModal from "../TrailerModal/TrailerModal";
import Loader from "../Loader/Loader";

import CastRow from "../CastRow/CastRow";
import CastDetail from "../CastDetails/CastDetail";

import api from "../../api/TMDB";

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [selectedActor, setSelectedActor] = useState(null);

  const [trailer, setTrailer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [similar, setSimilar] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [error, setError] = useState(null); // ✅ NEW

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        movieRes,
        castRes,
        videoRes,
        reviewRes,
        similarRes,
      ] = await Promise.all([
        api.get(`/movie/${id}`),
        api.get(`/movie/${id}/credits`),
        api.get(`/movie/${id}/videos`),
        api.get(`/movie/${id}/reviews`),
        api.get(`/movie/${id}/similar`),
      ]);

      setMovie(movieRes.data || null);
      setCast(castRes.data?.cast?.slice(0, 12) || []);
      setReviews(reviewRes.data?.results?.slice(0, 4) || []);
      setSimilar(similarRes.data?.results?.slice(0, 12) || []);

      const trailerVideo = videoRes.data?.results?.find(
        (v) => v.type === "Trailer"
      );

      setTrailer(trailerVideo?.key || null);

    } catch (err) {
      console.error(err);
      setError("Failed to load movie data 😢");
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOADING ================= */
  if (loading) return <Loader text="Loading Movie Details..." />;

  /* ================= ERROR ================= */
  if (error) {
    return (
      <div className="movie-details">
        <h2 style={{ textAlign: "center", padding: "100px" }}>
          {error}
        </h2>
      </div>
    );
  }

  /* ================= SAFETY ================= */
  if (!movie) {
    return (
      <div className="movie-details">
        <h2 style={{ textAlign: "center", padding: "100px" }}>
          No Movie Found
        </h2>
      </div>
    );
  }

  /* ================= DATA ================= */
  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "";

  const languageName = new Intl.DisplayNames(["en"], {
    type: "language",
  });

  return (
    <div className="movie-details">

      {/* HERO */}
      <div
        className="hero"
        style={{ backgroundImage: backdrop ? `url(${backdrop})` : "none" }}
      >
        <div className="hero-overlay">
          <div className="hero-container">

            {poster && (
              <img src={poster} alt={movie.title} className="poster" />
            )}

            <div className="hero-info">
              <h1 className="title">{movie.title}</h1>

              <div className="meta">
                <span className="rating">
                  ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
                </span>

                <span className="dot">•</span>
                <span>{movie.release_date?.split("-")[0] || "N/A"}</span>

                <span className="dot">•</span>
                <span>{movie.runtime || "N/A"} min</span>
              </div>

              <div className="genres">
                {movie.genres?.slice(0, 3).map((g) => (
                  <span key={g.id}>{g.name}</span>
                ))}
              </div>

              <p className="overview">
                {movie.overview
                  ? movie.overview.split(" ").slice(0, 25).join(" ") + "..."
                  : "No description available"}
              </p>

              <div className="actions">
                {trailer && (
                  <button
                    className="btn primary"
                    onClick={() => setIsTrailerOpen(true)}
                  >
                    ▶ Trailer
                  </button>
                )}

                <button className="btn glass">+ Watchlist</button>
                <button className="btn glass">❤ Favourite</button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* INFO */}
      <section className="info-section">
        <h2>Movie Info</h2>

        <div className="info-grid">
          <div>
            <strong>Language</strong>
            <span>
              {movie.original_language
                ? languageName.of(movie.original_language)
                : "Unknown"}
            </span>
          </div>

          <div>
            <strong>Status</strong>
            <span>{movie.status || "Unknown"}</span>
          </div>
        </div>
      </section>

      {/* CAST */}
      {cast.length > 0 && (
        <section className="cast-section">
          <CastRow
            title="Top Cast"
            cast={cast}
            onActorClick={setSelectedActor}
          />
        </section>
      )}

      {/* REVIEWS */}
      {reviews.length > 0 && (
        <section className="reviews-section">
          <h2>User Reviews</h2>

          <div className="reviews-grid">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <h4>{review.author}</h4>
                <p>{review.content.slice(0, 200)}...</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SIMILAR */}
      {similar.length > 0 && (
        <MovieRow title="You May Also Like" movies={similar} />
      )}

      {/* TRAILER */}
      <TrailerModal
        trailerKey={trailer}
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
      />

      {/* CAST MODAL */}
      {selectedActor && (
        <div
          className="cast-modal"
          onClick={() => setSelectedActor(null)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <CastDetail actor={selectedActor} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;