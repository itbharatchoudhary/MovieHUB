import "./MovieDetails.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/TMDB";
import MovieCard from "../../components/MovieCard/MovieCard";
import { FaStar, FaPlay } from "react-icons/fa";

const MovieDetails = () => {

  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {

    const fetchMovie = async () => {

      const movieRes = await api.get(`/movie/${id}`);
      const castRes = await api.get(`/movie/${id}/credits`);
      const similarRes = await api.get(`/movie/${id}/similar`);

      setMovie(movieRes.data);
      setCast(castRes.data.cast.slice(0, 10));
      setSimilarMovies(similarRes.data.results.slice(0, 50));

    };

    fetchMovie();

  }, [id]);

  if (!movie) return <div className="loading">Loading...</div>;

  const rating = movie.vote_average.toFixed(1);

  return (
    <div className="movieDetails">

      {/* BACKDROP */}
      <div
        className="backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        }}
      >
        <div className="overlay">

          <div className="movieContent">

            <img
              className="poster"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />

            <div className="info">

              <h1>{movie.title}</h1>

              {/* STAR RATING */}
              <div className="rating">
                <FaStar className="star"/>
                <span>{rating} / 10</span>
              </div>

              <p className="overview">{movie.overview}</p>

              <button className="playBtn">
                <FaPlay /> Watch Trailer
              </button>

            </div>

          </div>

        </div>
      </div>

      {/* CAST SECTION */}
      <div className="section">

        <h2>Cast</h2>

        <div className="castList">

          {cast.map(actor => (

            <div key={actor.id} className="castCard">

              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
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

      {/* SIMILAR MOVIES */}
      <div className="section">

        <h2>Similar Movies</h2>

        <div className="similarMovies">

          {similarMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}

        </div>

      </div>

    </div>
  );
};

export default MovieDetails;