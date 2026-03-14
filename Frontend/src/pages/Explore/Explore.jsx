// src/pages/Explore/Explore.jsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import Genres from "../../components/Genres/Genres";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import MovieCard from "../../components/MovieCard/MovieCard";
import Loader from "../../components/Loader/Loader";
import api from "../../api/TMDB";
import "./Explore.scss";

const Explore = () => {

  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  const observer = useRef();

  const fetchMovies = async (genre = null, pageNo = 1) => {

    if (pageNo === 1) setInitialLoading(true);
    else setLoading(true);

    try {

      const { data } = await api.get("/discover/movie", {
        params: {
          page: pageNo,
          with_genres: genre?.id
        }
      });

      if (pageNo === 1) {
        setMovies(data.results);
      } else {
        setMovies(prev => [...prev, ...data.results]);
      }

      setHasMore(data.page < data.total_pages);

    } catch (err) {
      console.error(err);
    }

    setInitialLoading(false);
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    fetchMovies(selectedGenre, 1);
  }, [selectedGenre]);

  useEffect(() => {
    if (page === 1) return;
    fetchMovies(selectedGenre, page);
  }, [page]);

  const lastMovieRef = useCallback((node) => {

    if (loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {

      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }

    });

    if (node) observer.current.observe(node);

  }, [loading, hasMore]);

  return (

    <div className="explore-page">

      {movies.length > 0 && (
        <HeroBanner movies={movies.slice(0, 5)} />
      )}

      <Genres onSelectGenre={setSelectedGenre} />

      {/* Initial Page Loader */}
      {initialLoading && <Loader text="Loading movies..." />}

      {/* Movies */}
      <div className="movie-grid">

        {movies.map((movie, index) => {

          if (index === movies.length - 1) {
            return (
              <div ref={lastMovieRef} key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            );
          }

          return <MovieCard key={movie.id} movie={movie} />;

        })}

      </div>
    </div>

  );
};

export default Explore;