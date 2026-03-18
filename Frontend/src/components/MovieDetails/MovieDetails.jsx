import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.scss";

import MovieRow from "../MovieRow/MovieRow";
import TrailerModal from "../TrailerModal/TrailerModal";
import Loader from "../Loader/Loader";
import CastRow from "../CastRow/CastRow";
import CastDetail from "../CastDetails/CastDetail";

import api from "../../api/TMDB";

const IMAGE_BASE = "https://image.tmdb.org/t/p";

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [watchProviders, setWatchProviders] = useState(null);

  const [selectedActor, setSelectedActor] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  /* ================= FETCH ================= */
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
          providerRes,
        ] = await Promise.all([
          api.get(`/movie/${id}`),
          api.get(`/movie/${id}/credits`),
          api.get(`/movie/${id}/videos`),
          api.get(`/movie/${id}/reviews`),
          api.get(`/movie/${id}/similar`),
          api.get(`/movie/${id}/watch/providers`), // ✅ NEW
        ]);

        setMovie(movieRes.data || null);
        setCast(castRes.data?.cast?.slice(0, 12) || []);
        setReviews(reviewRes.data?.results?.slice(0, 4) || []);
        setSimilar(similarRes.data?.results?.slice(0, 12) || []);
        setWatchProviders(providerRes.data || null); // ✅ NEW

        const trailerVideo = videoRes.data?.results?.find(
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

  /* ================= MEMO ================= */
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
      new Intl.DisplayNames(["en"], { type: "language" }),
    []
  );

  /* ✅ Providers (India priority) */
  const providers = useMemo(() => {
    const region =
      watchProviders?.results?.IN ||
      watchProviders?.results?.US;

    return (
      region?.flatrate ||
      region?.rent ||
      region?.buy ||
      []
    );
  }, [watchProviders]);

  const providerLink = useMemo(() => {
    return (
      watchProviders?.results?.IN?.link ||
      watchProviders?.results?.US?.link ||
      "#"
    );
  }, [watchProviders]);

  /* ================= UI ================= */
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

  return (
    <div className="movie-details">

      {/* HERO */}
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

          <div>
            <strong>Budget</strong>
            <span>
              {movie.budget
                ? `$${movie.budget.toLocaleString()}`
                : "Not Available"}
            </span>
          </div>

          <div>
            <strong>Revenue</strong>
            <span>
              {movie.revenue
                ? `$${movie.revenue.toLocaleString()}`
                : "Not Available"}
            </span>
          </div>

          {/* ✅ FINAL FIXED PART */}
          <div>
            <strong>Available On</strong>
            <span>
              {providers.length > 0 ? (
                providers.map((p) => (
                  <a
                    key={p.provider_id}
                    href={providerLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{ marginRight: "10px" }}
                  >
                    {p.provider_name}
                  </a>
                ))
              ) : (
                "Not Available"
              )}
            </span>
          </div>
        </div>
      </section>

      {/* CAST */}
      {cast.length > 0 && (
        <section className="section">
          <CastRow
            title="Top Cast"
            cast={cast}
            onActorClick={setSelectedActor}
          />
        </section>
      )}

      {/* SIMILAR */}
      {similar.length > 0 && (
        <section className="section">
          <MovieRow title="You May Also Like" movies={similar} />
        </section>
      )}

      <TrailerModal
        trailerKey={trailer}
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
      />

      {selectedActor && (
        <div className="cast-modal" onClick={() => setSelectedActor(null)}>
          <div
            className="cast-modal__content"
            onClick={(e) => e.stopPropagation()}
          >
            <CastDetail
              actor={selectedActor}
              onClose={() => setSelectedActor(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;