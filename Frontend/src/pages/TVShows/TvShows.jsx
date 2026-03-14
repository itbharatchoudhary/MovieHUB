import React, { useEffect, useState, useRef, useCallback } from "react";
import Genres from "../../components/Genres/Genres";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import MovieCard from "../../components/MovieCard/MovieCard";
import Loader from "../../components/Loader/Loader";
import api from "../../api/TMDB";
import "./TvShows.scss";

const TvShows = () => {

  const [selectedGenre, setSelectedGenre] = useState(null);
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  const fetchShows = async (genre = null, pageNo = 1) => {

    if (pageNo === 1) setInitialLoading(true);
    else setLoading(true);

    try {

      const { data } = await api.get("/discover/tv", {
        params: {
          page: pageNo,
          with_genres: genre?.id,
          sort_by: "popularity.desc"
        }
      });

      if (pageNo === 1) {
        setShows(data.results);
      } else {
        setShows(prev => [...prev, ...data.results]);
      }

      setHasMore(data.page < data.total_pages);

    } catch (error) {
      console.error("Error fetching TV Shows:", error);
    }

    setInitialLoading(false);
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    fetchShows(selectedGenre, 1);
  }, [selectedGenre]);

  useEffect(() => {
    if (page === 1) return;
    fetchShows(selectedGenre, page);
  }, [page]);

  const lastShowRef = useCallback((node) => {

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

    <div className="tvshows-page">

      {/* Hero Banner */}
      {shows.length > 0 && (
        <HeroBanner movies={shows.slice(0, 5)} />
      )}

      {/* Genres */}
      <Genres onSelectGenre={setSelectedGenre} type="tv" />

      {/* Initial Loader */}
      {initialLoading && <Loader text="Loading TV Shows..." />}

      {/* TV Shows Grid */}
      <div className="tvshows-grid">

        {shows.map((show, index) => {

          if (index === shows.length - 1) {
            return (
              <div ref={lastShowRef} key={show.id}>
                <MovieCard movie={show} />
              </div>
            );
          }

          return <MovieCard key={show.id} movie={show} />;

        })}

      </div>
    </div>

  );

};

export default TvShows;