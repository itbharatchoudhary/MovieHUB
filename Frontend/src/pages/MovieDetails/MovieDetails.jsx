import "./MovieDetails.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/TMDB";

const MovieDetails = () => {

  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchMovie = async () => {

      try {

        setLoading(true);

        const response = await api.get(`/movie/${id}`, {
          params: {
            append_to_response: "videos,credits"
          }
        });

        setMovie(response.data);

      } catch (err) {

        console.error("Error fetching movie:", err);
        setError("Failed to load movie details");

      } finally {

        setLoading(false);

      }

    };

    fetchMovie();

  }, [id]);

  if (loading) {
    return <div className="loading">Loading Movie...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "";

  const trailer = movie.videos?.results?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );

  return (
    <div className="movieDetails">

      {/* HERO SECTION */}
      <div
        className="heroBanner"
        style={{ backgroundImage: `url(${backdrop})` }}
      >
        <div className="overlay">

          <div className="content">

            <img
              className="poster"
              src={poster}
              alt={movie.title}
            />

            <div className="info">

              <h1 className="title">{movie.title}</h1>

              <div className="meta">

                <span className="rating">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </span>

                <span className="year">
                  {movie.release_date?.slice(0, 4)}
                </span>

                <span className="runtime">
                  {movie.runtime} min
                </span>

                <span className="language">
                  {movie.original_language?.toUpperCase()}
                </span>

              </div>

              {/* GENRES */}
              <div className="genres">
                {movie.genres?.map((genre) => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </div>

              <p className="description">
                {movie.overview}
              </p>

              {/* TRAILER BUTTON */}
              {trailer && (
                <a
                  className="trailerBtn"
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  ▶ Watch Trailer
                </a>
              )}

            </div>

          </div>

        </div>
      </div>

      {/* CAST SECTION */}
      <div className="castSection">

        <h2>Top Cast</h2>

        <div className="castGrid">

          {movie.credits?.cast?.slice(0, 10).map((actor) => (

            <div key={actor.id} className="castCard">

              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : "/no-avatar.png"
                }
                alt={actor.name}
              />

              <p className="actorName">{actor.name}</p>
              <p className="character">{actor.character}</p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );

};

export default MovieDetails;