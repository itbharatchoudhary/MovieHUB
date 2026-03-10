import { useState, useEffect, useRef } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import TrailerModal from "../../components/TrailerModal/TrailerModal";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import "./TvShows.scss";
import api from "../../api/TMDB";

const TvShows = ({ onFavorite }) => {

  const [shows, setShows] = useState([]);
  const [heroShow, setHeroShow] = useState(null);

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  const lastShowElementRef = useRef();

  // ⭐ GENRE STATES
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  // ⭐ FETCH GENRES
  const fetchGenres = async () => {
    try {
      const res = await api.get("/genre/tv/list");
      setGenres(res.data.genres);
    } catch (err) {
      console.error("Error fetching genres", err);
    }
  };

  // ⭐ FETCH TV SHOWS
  const fetchShows = async (pageNum = 1) => {
    try {

      setLoading(true);

      const res = await api.get(`/tv/popular?page=${pageNum}`);

      const showsWithFav = res.data.results.map((s) => ({
        ...s,
        isFavorite: false,
      }));

      // Random Hero Banner
      if (pageNum === 1 && res.data.results.length > 0) {
        const randomShow =
          res.data.results[
            Math.floor(Math.random() * res.data.results.length)
          ];
        setHeroShow(randomShow);
      }

      // Avoid duplicates
      setShows((prev) => {
        const newShows = showsWithFav.filter(
          (s) => !prev.some((prevShow) => prevShow.id === s.id)
        );
        return [...prev, ...newShows];
      });

      setHasMore(res.data.page < res.data.total_pages);

    } catch (err) {
      console.error("Error fetching TV shows:", err);
      alert("Unable to fetch TV shows.");
    } finally {
      setLoading(false);
    }
  };

  // ⭐ FILTER BY GENRE
  const filterByGenre = async (genreId) => {
    try {

      setSelectedGenre(genreId);
      setShows([]);
      setPage(1);

      const res = await api.get(`/discover/tv?with_genres=${genreId}`);

      const showsWithFav = res.data.results.map((s) => ({
        ...s,
        isFavorite: false,
      }));

      setShows(showsWithFav);
      setHasMore(false);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchShows(page);
  }, [page]);

  // ⭐ LOAD GENRES
  useEffect(() => {
    fetchGenres();
  }, []);

  // ⭐ INFINITE SCROLL
  useEffect(() => {

    if (loading || !hasMore || selectedGenre) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    if (lastShowElementRef.current) {
      observer.observe(lastShowElementRef.current);
    }

    return () => {
      if (lastShowElementRef.current) {
        observer.unobserve(lastShowElementRef.current);
      }
    };

  }, [loading, hasMore, selectedGenre]);

  // ⭐ FAVORITE
  const handleFavorite = (show) => {

    setShows((prev) =>
      prev.map((s) =>
        s.id === show.id ? { ...s, isFavorite: !s.isFavorite } : s
      )
    );

    if (onFavorite) onFavorite(show);
  };

  // ⭐ WATCH TRAILER
  const handleWatchTrailer = async (showId) => {

    try {

      const res = await api.get(`/tv/${showId}/videos`);

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

    <div className="tvShowsPage">

      {/* Hero Banner */}
      {heroShow && (
        <HeroBanner
          movie={heroShow}
          onWatchTrailer={() => handleWatchTrailer(heroShow.id)}
          onFavorite={() => handleFavorite(heroShow)}
        />
      )}

      {/* ⭐ GENRE SLIDER */}
      <div className="genreSlider">

        <button
          className={!selectedGenre ? "active" : ""}
          onClick={() => {
            setSelectedGenre(null);
            setShows([]);
            setPage(1);
            fetchShows(1);
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

      <h2>All Popular TV Shows</h2>

      <div className="tvShowsGrid">

        {shows.map((show, index) => {

          const isLast = shows.length === index + 1;

          return (
            <div
              ref={isLast ? lastShowElementRef : null}
              key={`${show.id}-${index}`}
            >
              <MovieCard
                movie={show}
                onFavorite={handleFavorite}
                onWatchTrailer={handleWatchTrailer}
              />
            </div>
          );
        })}

      </div>

      {loading && <div className="loading">Loading TV shows...</div>}
      {!hasMore && <div className="end-message">No more TV shows.</div>}

      <TrailerModal
        show={showTrailer}
        trailerUrl={trailerUrl}
        onClose={closeTrailer}
      />

    </div>
  );
};

export default TvShows;