import React, { useEffect, useState } from "react";
import "./MovieDetails.scss";
import MovieCard from "../MovieCard/MovieCard";
import api from "../../Services/TMDB";

const MovieDetails = ({ movieId }) => {

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    fetchMovie();
  }, [movieId]);

  const fetchMovie = async () => {
    try {

      const movieRes = await api.get(`/movie/${movieId}`);
      const castRes = await api.get(`/movie/${movieId}/credits`);
      const videoRes = await api.get(`/movie/${movieId}/videos`);
      const reviewRes = await api.get(`/movie/${movieId}/reviews`);
      const similarRes = await api.get(`/movie/${movieId}/similar`);

      setMovie(movieRes.data);
      setCast(castRes.data.cast.slice(0, 12));
      setReviews(reviewRes.data.results.slice(0, 5));
      setSimilar(similarRes.data.results.slice(0, 10));

      const trailerVideo = videoRes.data.results.find(
        (vid) => vid.type === "Trailer"
      );

      if (trailerVideo) setTrailer(trailerVideo.key);

    } catch (err) {
      console.error(err);
    }
  };

  if (!movie) return <div className="loading">Loading...</div>;

  const backdrop = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="movie-details">

      {/* HERO SECTION */}

      <div
        className="hero"
        style={{ backgroundImage: `url(${backdrop})` }}
      >
        <div className="overlay">

          <img src={poster} alt={movie.title} className="poster"/>

          <div className="hero-info">

            <h1>{movie.title}</h1>

            <div className="rating">
              ⭐ {movie.vote_average.toFixed(1)}
            </div>

            <p className="overview">
              {movie.overview}
            </p>

            <div className="actions">

              <button className="btn">+ Watchlist</button>

              <button className="btn">❤ Favourite</button>

              <button className="btn">⭐ Rate</button>

            </div>

          </div>

        </div>
      </div>

      {/* MOVIE INFO */}

      <section className="info-section">

        <h2>About Movie</h2>

        <p>{movie.overview}</p>

        <div className="info-grid">

          <div>
            <strong>Release Date</strong>
            <span>{movie.release_date}</span>
          </div>

          <div>
            <strong>Runtime</strong>
            <span>{movie.runtime} min</span>
          </div>

          <div>
            <strong>Language</strong>
            <span>{movie.original_language}</span>
          </div>

          <div>
            <strong>Budget</strong>
            <span>${movie.budget}</span>
          </div>

          <div>
            <strong>Revenue</strong>
            <span>${movie.revenue}</span>
          </div>

        </div>

      </section>

      {/* CAST */}

      <section className="cast-section">

        <h2>Cast</h2>

        <div className="cast-row">

          {cast.map((actor) => (

            <div key={actor.id} className="actor-card">

              <img
                src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                alt={actor.name}
              />

              <h4>{actor.name}</h4>

              <p>{actor.character}</p>

            </div>

          ))}

        </div>

      </section>

      {/* TRAILER */}

      {trailer && (

        <section className="trailer-section">

          <h2>Official Trailer</h2>

          <div className="trailer">

            <iframe
              src={`https://www.youtube.com/embed/${trailer}`}
              title="Trailer"
              allowFullScreen
            />

          </div>

        </section>

      )}

      {/* REVIEWS */}

      <section className="reviews-section">

        <h2>User Reviews</h2>

        {reviews.length === 0 && <p>No reviews yet</p>}

        {reviews.map((review) => (

          <div key={review.id} className="review-card">

            <h4>{review.author}</h4>

            <p>{review.content.slice(0, 200)}...</p>

          </div>

        ))}

      </section>

      {/* SIMILAR MOVIES */}

      <section className="similar-section">

        <h2>You may also like</h2>

        <div className="similar-row">

          {similar.map((movie) => (
            <MovieCard key={movie.id} movie={movie}/>
          ))}

        </div>

      </section>

    </div>
  );
};

export default MovieDetails;