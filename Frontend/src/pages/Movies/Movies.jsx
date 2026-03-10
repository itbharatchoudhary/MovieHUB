import { useState, useEffect, useRef } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import TrailerModal from "../../components/TrailerModal/TrailerModal";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import "./Movies.scss";
import api from "../../api/TMDB";

const Movies = ({ onFavorite }) => {

  const [movies, setMovies] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  const lastMovieElementRef = useRef();

  // ⭐ GENRE STATES
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  // ⭐ FETCH GENRES
  const fetchGenres = async () => {
    try {
      const res = await api.get("/genre/movie/list");
      setGenres(res.data.genres);
    } catch (err) {
      console.error("Error fetching genres", err);
    }
  };

  // Fetch movies
  const fetchMovies = async (pageNum = 1) => {
    try {
      setLoading(true);

      const res = await api.get(`/movie/popular?page=${pageNum}`);

      const moviesWithFav = res.data.results.map((m) => ({
        ...m,
        isFavorite: false,
      }));

      // Set random hero banner movie
      if (pageNum === 1 && res.data.results.length > 0) {
        const randomMovie =
          res.data.results[
            Math.floor(Math.random() * res.data.results.length)
          ];
        setHeroMovie(randomMovie);
      }

      // Avoid duplicates
      setMovies((prev) => {
        const newMovies = moviesWithFav.filter(
          (m) => !prev.some((prevMovie) => prevMovie.id === m.id)
        );
        return [...prev, ...newMovies];
      });

      setHasMore(res.data.page < res.data.total_pages);

    } catch (err) {
      console.error("Error fetching movies:", err);
      alert("Unable to fetch movies. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  // ⭐ FILTER BY GENRE
  const filterByGenre = async (genreId) => {
    try {

      setSelectedGenre(genreId);
      setMovies([]);
      setPage(1);

      const res = await api.get(`/discover/movie?with_genres=${genreId}`);

      const moviesWithFav = res.data.results.map((m) => ({
        ...m,
        isFavorite: false,
      }));

      setMovies(moviesWithFav);
      setHasMore(false);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  // ⭐ LOAD GENRES
  useEffect(() => {
    fetchGenres();
  }, []);

  // Infinite scroll
  useEffect(() => {
    if (loading || !hasMore || selectedGenre) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    if (lastMovieElementRef.current) {
      observer.observe(lastMovieElementRef.current);
    }

    return () => {
      if (lastMovieElementRef.current) {
        observer.unobserve(lastMovieElementRef.current);
      }
    };

  }, [loading, hasMore, selectedGenre]);

  // Favorite toggle
  const handleFavorite = (movie) => {
    setMovies((prev) =>
      prev.map((m) =>
        m.id === movie.id ? { ...m, isFavorite: !m.isFavorite } : m
      )
    );

    if (onFavorite) onFavorite(movie);
  };

  // Watch trailer
  const handleWatchTrailer = async (movieId) => {
    try {
      const res = await api.get(`/movie/${movieId}/videos`);

      const trailer = res.data.results.find(
        (vid) => vid.type === "Trailer"
      );

      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}?autoplay=1`);
        setShowTrailer(true);
      } else {
        alert("Trailer not available.");
      }

    } catch (err) {
      console.error(err);
      alert("Cannot fetch trailer.");
    }
  };

  const closeTrailer = () => {
    setShowTrailer(false);
    setTrailerUrl("");
  };

  return (
    <div className="moviesPage">

      {/* Hero Banner */}
      {heroMovie && (
        <HeroBanner
          movie={heroMovie}
          onWatchTrailer={() => handleWatchTrailer(heroMovie.id)}
          onFavorite={() => handleFavorite(heroMovie)}
        />
      )}

      {/* ⭐ GENRE SLIDER */}
      <div className="genreSlider">

        <button
          className={!selectedGenre ? "active" : ""}
          onClick={() => {
            setSelectedGenre(null);
            setMovies([]);
            setPage(1);
            fetchMovies(1);
          }}
        >
          All
        </button>

        {genres.map((genre) => (
          <button
            key={genre.id}
            className={selectedGenre === genre.id ? "active" : ""}
            onClick={() => filterByGenre(genre.id)}
          >
            {genre.name}
          </button>
        ))}

      </div>

      <h2>All Popular Movies</h2>

      <div className="moviesGrid">
        {movies.map((movie, index) => {

          const isLast = movies.length === index + 1;

          return (
            <div
              ref={isLast ? lastMovieElementRef : null}
              key={`${movie.id}-${index}`}
            >
              <MovieCard
                movie={movie}
                onFavorite={handleFavorite}
                onWatchTrailer={handleWatchTrailer}
              />
            </div>
          );
        })}
      </div>

      {loading && <div className="loading">Loading more movies...</div>}
      {!hasMore && <div className="end-message">No more movies to show.</div>}

      <TrailerModal
        show={showTrailer}
        trailerUrl={trailerUrl}
        onClose={closeTrailer}
      />

    </div>
  );
};

export default Movies;