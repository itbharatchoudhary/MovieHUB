import React, { useEffect, useState, useRef, useCallback } from "react";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import MovieCard from "../../components/MovieCard/MovieCard";
import Loader from "../../components/Loader/Loader";
import api from "../../api/TMDB";
import "./kids.scss";

const Kids = () => {

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  const fetchKidsMovies = async (pageNo = 1) => {

    if (pageNo === 1) setInitialLoading(true);
    else setLoading(true);

    try {

      const { data } = await api.get("/discover/movie", {
        params: {
          page: pageNo,
          with_genres: "16,10751",
          sort_by: "popularity.desc"
        }
      });

      if (pageNo === 1) {
        setMovies(data.results);
      } else {
        setMovies(prev => [...prev, ...data.results]);
      }

      setHasMore(data.page < data.total_pages);

    } catch (error) {
      console.error("Error fetching kids movies:", error);
    }

    setInitialLoading(false);
    setLoading(false);

  };

  useEffect(() => {
    fetchKidsMovies(1);
  }, []);

  useEffect(() => {
    if (page === 1) return;
    fetchKidsMovies(page);
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

    <div className="kids-page">

      {/* Hero Banner */}
      {movies.length > 0 && (
        <HeroBanner movies={movies.slice(0, 5)} />
      )}

      {/* Initial Loader */}
      {initialLoading && <Loader text="Loading Kids Movies..." />}

      {/* Kids Movies Grid */}
      <div className="kids-grid">

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

export default Kids;