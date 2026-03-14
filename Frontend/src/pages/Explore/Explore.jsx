// src/pages/Explore/Explore.jsx
import React, { useEffect, useState, useRef } from "react";
import Genres from "../../components/Genres/Genres";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import MovieRow from "../../components/MovieRow/MovieRow";
import Loader from "../../components/Loader/Loader";
import { fetchTrending, fetchPopular, fetchTopRated, fetchUpcoming } from "../../api/MovieApi";
import api from "../../api/TMDB";
import "./Explore.scss";

const Explore = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  // Fetch movies by genre + pagination
  const fetchMovies = async (genre = null, pageNo = 1) => {
    setLoading(true);

    try {
      let url = "/discover/movie";
      const params = {
        page: pageNo,
        with_genres: genre?.id || undefined,
      };

      const { data } = await api.get(url, { params });

      if (pageNo === 1) {
        setMovies(data.results);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
      }

      setHasMore(data.page < data.total_pages);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch movies:", err);
      setLoading(false);
    }
  };

  // Load movies when genre changes
  useEffect(() => {
    setPage(1);
    fetchMovies(selectedGenre, 1);
  }, [selectedGenre]);

  // Infinite scrolling
  const lastMovieElementRef = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    if (node) observer.current.observe(node);
  };

  // Fetch next page
  useEffect(() => {
    if (page === 1) return;
    fetchMovies(selectedGenre, page);
  }, [page]);

  return (
    <div className="explore-page">



      {/* Banner */}
      {movies.length > 0 && <HeroBanner movies={movies.slice(0, 5)} />}

      {/* Genres */}
      <Genres onSelectGenre={setSelectedGenre} />

      {/* Movie Grid */}
      <section className="movie-grid">
        {movies.map((movie, index) => {
          if (index === movies.length - 1) {
            return <MovieRow key={movie.id} movies={[movie]} ref={lastMovieElementRef} />;
          }
          return <MovieRow key={movie.id} movies={[movie]} />;
        })}
      </section>

      {loading && <Loader text="Loading ..." />}

    </div>
  );
};

export default Explore;