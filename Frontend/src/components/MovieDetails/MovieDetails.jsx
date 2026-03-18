import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.scss";

import MovieRow from "../MovieRow/MovieRow";
import TrailerModal from "../TrailerModal/TrailerModal";
import Loader from "../Loader/Loader";
import CastRow from "../CastRow/CastRow";
import CastDetail from "../CastDetails/CastDetail";

import api from "../../api/TMDB";

/* =============================
   CONSTANTS
============================= */
const IMAGE_BASE = "https://image.tmdb.org/t/p";

/* =============================
   COMPONENT
============================= */
const MovieDetails = () => {
  const { id } = useParams();

  /* =============================
     STATE
  ============================= */
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [trailer, setTrailer] = useState(null);

  const [selectedActor, setSelectedActor] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  /* =============================
     FETCH DATA
  ============================= */
  useEffect(() => {
    if (!id) return;

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

        const movieData = movieRes.data;
        const castData = castRes.data?.cast || [];
        const videos = videoRes.data?.results || [];
        const reviewsData = reviewRes.data?.results || [];
        const similarData = similarRes.data?.results || [];

        setMovie(movieData || null);
        setCast(castData.slice(0, 12));
        setReviews(reviewsData.slice(0, 4));
        setSimilar(similarData.slice(0, 12));

        const trailerVideo = videos.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );

        setTrailer(trailerVideo?.key || null);

      } catch (err) {
        console.error(err);
        setError("Something went wrong while loading movie 😢");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  /* =============================
     MEMOIZED DATA
  ============================= */
  const backdrop = useMemo(
    () =>
      movie?.backdrop_path
        ? `${IMAGE_BASE}/original${movie.backdrop_path}`
        : "",
    [movie]
  );

  const poster = useMemo(
    () =>
      movie?.poster_path
        ? `${IMAGE_BASE}/w500${movie.poster_path}`
        : "",
    [movie]
  );

  const languageName = useMemo(
    () =>
      new Intl.DisplayNames(["en"], {
        type: "language",
      }),
    []
  );

  /* =============================
     STATES UI
  ============================= */
  if (loading) return <Loader text="Loading Movie..." />;

  if (error) {
    return (
      <div className="movie-details center">
        <h2>{error}</h2>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-details center">
        <h2>No Movie Found</h2>
      </div>
    );
  }

  /* =============================
     RENDER
  ============================= */
  return (
    <div className="movie-details">

      {/* ================= HERO ================= */}
      <div
        className="hero"
        style={{
          backgroundImage: backdrop ? `url(${backdrop})` : "none",
        }}
      >
        <div className="hero-overlay">
          <div className="hero-container">

            {poster && (
              <img
                src={poster}
                alt={movie.title}
                className="poster"
              />
            )}

            <div className="hero-info">
              <h1 className="title">{movie.title}</h1>

              <div className="meta">
                <span>⭐ {movie.vote_average?.toFixed(1) || "N/A"}</span>
                <span className="dot">•</span>
                <span>{movie.release_date?.slice(0, 4)}</span>
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
                    ▶ Watch Trailer
                  </button>
                )}

                <button className="btn glass">+ Watchlist</button>
                <button className="btn glass">❤ Favourite</button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ================= INFO ================= */}
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

      {/* ================= CAST ================= */}
      {cast.length > 0 && (
        <section className="section">
          <CastRow
            title="Top Cast"
            cast={cast}
            onActorClick={setSelectedActor}
          />
        </section>
      )}

      {/* ================= REVIEWS ================= */}
      {reviews.length > 0 && (
        <section className="section">
          <h2>User Reviews</h2>

          <div className="reviews-grid">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <h4>{review.author}</h4>
                <p>{review.content.slice(0, 180)}...</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= SIMILAR ================= */}
      {similar.length > 0 && (
        <section className="section">
          <MovieRow title="You May Also Like" movies={similar} />
        </section>
      )}

      {/* ================= TRAILER ================= */}
      <TrailerModal
        trailerKey={trailer}
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
      />

      {/* ================= CAST MODAL ================= */}
      {selectedActor && (
        <div
          className="cast-modal"
          onClick={() => setSelectedActor(null)}
        >
          <div
            className="cast-modal__content"
            onClick={(e) => e.stopPropagation()}
          >
            <CastDetail actor={selectedActor} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;