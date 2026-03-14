import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.scss";
import MovieRow from "../MovieRow/MovieRow";
import TrailerModal from "../TrailerModal/TrailerModal";
import Loader from "../Loader/Loader";
import api from "../../api/TMDB";

const MovieDetails = () => {

  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {

    try {

      setLoading(true);

      const movieRes = await api.get(`/movie/${id}`);
      const castRes = await api.get(`/movie/${id}/credits`);
      const videoRes = await api.get(`/movie/${id}/videos`);
      const reviewRes = await api.get(`/movie/${id}/reviews`);
      const similarRes = await api.get(`/movie/${id}/similar`);

      setMovie(movieRes.data);
      setCast(castRes.data.cast.slice(0, 10));
      setReviews(reviewRes.data.results.slice(0, 4));
      setSimilar(similarRes.data.results.slice(0, 12));

      const trailerVideo = videoRes.data.results.find(
        (v) => v.type === "Trailer"
      );

      if (trailerVideo) setTrailer(trailerVideo.key);

      setLoading(false);

    } catch (err) {

      console.error(err);
      setLoading(false);

    }
  };

  if (loading) return <Loader text="Loading Movie Details..." />;

  const backdrop = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const formatCurrency = (amount) => {

    if (!amount) return "Not Available";

    const usdToInr = 83; // approx rate
    const inr = amount * usdToInr;

    const crore = inr / 10000000;

    return `₹${crore.toFixed(2)} Cr`;

  };
  
  const languageName = new Intl.DisplayNames(["en"], { type: "language" });

  return (
    <div className="movie-details">

      {/* HERO */}

      <div
        className="hero"
        style={{ backgroundImage: `url(${backdrop})` }}
      >

        <div className="hero-overlay">

          <div className="hero-container">

            <img
              src={poster}
              alt={movie.title}
              className="poster"
            />

            <div className="hero-info">

              <h1 className="title">{movie.title}</h1>

              <div className="meta">

                <span className="rating">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>

                <span className="dot">•</span>

                <span>{movie.release_date?.split("-")[0]}</span>

                <span className="dot">•</span>

                <span>{movie.runtime} min</span>

              </div>

              <div className="genres">
                {movie.genres?.slice(0, 3).map((g) => (
                  <span key={g.id}>{g.name}</span>
                ))}
              </div>

              <p className="overview">
                {movie.overview}
              </p>

              <div className="actions">

                <button
                  className="btn primary"
                  onClick={() => setIsTrailerOpen(true)}
                >
                  ▶ Trailer
                </button>

                <button className="btn glass">
                  + Watchlist
                </button>

                <button className="btn glass">
                  ❤ Favourite
                </button>

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
              {movie?.original_language
                ? languageName.of(movie.original_language)
                : "Unknown"}
            </span>
          </div>

          <div>
            <strong>Budget</strong>
            <span>{formatCurrency(movie.budget)}</span>
          </div>

          <div>
            <strong>Revenue</strong>
            <span>{formatCurrency(movie.revenue)}</span>
          </div>

          <div>
            <strong>Status</strong>
            <span>{movie.status}</span>
          </div>

        </div>

      </section>

      {/* CAST */}

      <section className="cast-section">

        <h2>Top Cast</h2>

        <div className="cast-row">

          {cast.map((actor) => (

            <div key={actor.id} className="actor-card">

              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                    : "/no-image.png"
                }
                alt={actor.name}
              />

              <h4>{actor.name}</h4>
              <p>{actor.character}</p>

            </div>

          ))}

        </div>

      </section>

      {/* REVIEWS */}

      <section className="reviews-section">

        <h2>User Reviews</h2>

        {reviews.length === 0 && (
          <p className="no-review">
            No reviews available yet.
          </p>
        )}

        <div className="reviews-grid">

          {reviews.map((review) => (

            <div key={review.id} className="review-card">

              <div className="review-header">

                <div className="avatar">
                  {review.author.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h4>{review.author}</h4>
                </div>

              </div>

              <p>
                {review.content.slice(0, 250)}...
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* SIMILAR MOVIES */}

      <MovieRow
        title="You May Also Like"
        movies={similar}
      />

      <TrailerModal
        trailerKey={trailer}
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
      />

    </div>
  );
};

export default MovieDetails;