import { useState, useEffect, useRef } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./Movies.scss";
import api from "../../api/TMDB";

const Movies = ({ movie, onWatchTrailer, onFavorite }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // for pagination
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  // Fetch movies for given page
  const fetchMovies = async (pageNum = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`/movie/popular?page=${pageNum}`);
      const moviesWithFav = res.data.results.map((m) => ({
        ...m,
        isFavorite: false,
      }));

      // Append new movies
      setMovies((prev) => [...prev, ...moviesWithFav]);

      // Check if more pages exist
      setHasMore(res.data.page < res.data.total_pages);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  // Infinite scrolling handler
  const lastMovieElementRef = useRef();
  useEffect(() => {
    if (loading) return;
    if (!hasMore) return;

    const observerCallback = (entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    };

    const options = { root: null, rootMargin: "0px", threshold: 1.0 };
    const currentObserver = new IntersectionObserver(observerCallback, options);

    if (lastMovieElementRef.current) {
      currentObserver.observe(lastMovieElementRef.current);
    }

    return () => {
      if (lastMovieElementRef.current) {
        currentObserver.unobserve(lastMovieElementRef.current);
      }
    };
  }, [loading, hasMore]);

  // Toggle favorite
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
    if (onWatchTrailer) {
      onWatchTrailer(movieId);
      return;
    }

    try {
      const res = await api.get(`/movie/${movieId}/videos`);
      const trailer = res.data.results.find((vid) => vid.type === "Trailer");
      if (trailer) {
        window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
      } else {
        alert("Trailer not available");
      }
    } catch (err) {
      console.error("Error fetching trailer:", err);
    }
  };

  return (
    <div className="moviesPage">
      <h2>All Popular Movies</h2>
      <div className="moviesGrid">
        {movies.map((movie, index) => {
          if (movies.length === index + 1) {
            // last movie element for infinite scroll
            return (
              <div ref={lastMovieElementRef} key={movie.id}>
                <MovieCard
                  movie={movie}
                  onFavorite={handleFavorite}
                  onWatchTrailer={handleWatchTrailer}
                />
              </div>
            );
          } else {
            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                onFavorite={handleFavorite}
                onWatchTrailer={handleWatchTrailer}
              />
            );
          }
        })}
      </div>

      {loading && <div className="loading">Loading more movies...</div>}
      {!hasMore && <div className="end-message">No more movies to show.</div>}
    </div>
  );
};

export default Movies;