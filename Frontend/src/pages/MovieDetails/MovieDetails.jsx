import "./MovieDetails.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/TMDB";

const MovieDetails = () => {

  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {

    const fetchMovie = async () => {

      try {
        const response = await api.get(`/movie/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }

    };

    fetchMovie();

  }, [id]);

  if (!movie) return <div className="loading">Loading...</div>;

  return (
    <div className="movieDetails">

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
                {movie.original_language?.toUpperCase()}
              </span>

            </div>

            <p className="description">{movie.overview}</p>

          </div>
        </div>
      </div>

    </div>
  );
};

export default MovieDetails;