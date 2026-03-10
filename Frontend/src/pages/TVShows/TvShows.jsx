import { useState, useEffect, useRef } from "react";
import MovieCard from "../../components/MovieCard/MovieCard"; // same card component use kar sakte ho
import TrailerModal from "../../components/TrailerModal/TrailerModal";
import "./TvShows.scss";
import api from "../../api/TMDB";

const TvShows = ({ onFavorite }) => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  const lastShowElementRef = useRef();

  // Fetch TV shows
  const fetchShows = async (pageNum = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`/tv/popular?page=${pageNum}`);
      const showsWithFav = res.data.results.map((s) => ({
        ...s,
        isFavorite: false,
      }));

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
      alert("Unable to fetch TV shows. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShows(page);
  }, [page]);

  // Infinite scroll
  useEffect(() => {
    if (loading || !hasMore) return;

    const observerCallback = (entries) => {
      if (entries[0].isIntersecting) setPage((prev) => prev + 1);
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (lastShowElementRef.current) observer.observe(lastShowElementRef.current);

    return () => {
      if (lastShowElementRef.current) observer.unobserve(lastShowElementRef.current);
    };
  }, [loading, hasMore]);

  // Favorite toggle
  const handleFavorite = (show) => {
    setShows((prev) =>
      prev.map((s) =>
        s.id === show.id ? { ...s, isFavorite: !s.isFavorite } : s
      )
    );
    if (onFavorite) onFavorite(show);
  };

  // Watch trailer inline
  const handleWatchTrailer = async (showId) => {
    try {
      const res = await api.get(`/tv/${showId}/videos`, { timeout: 5000 });
      const trailer = res.data.results.find((vid) => vid.type === "Trailer");
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}?autoplay=1`);
        setShowTrailer(true);
      } else {
        alert("Trailer not available for this show.");
      }
    } catch (err) {
      console.error("Error fetching trailer:", err);
      alert("Cannot fetch trailer. Please try again later.");
    }
  };

  const closeTrailer = () => {
    setShowTrailer(false);
    setTrailerUrl("");
  };

  return (
    <div className="tvShowsPage">
      <h2>All Popular TV Shows</h2>

      <div className="tvShowsGrid">
        {shows.map((show, index) => {
          const isLast = shows.length === index + 1;
          const key = `${show.id}-${index}`;
          return (
            <div ref={isLast ? lastShowElementRef : null} key={key}>
              <MovieCard
                movie={show} // same card can handle TV shows too
                onFavorite={handleFavorite}
                onWatchTrailer={handleWatchTrailer}
              />
            </div>
          );
        })}
      </div>

      {loading && <div className="loading">Loading more TV shows...</div>}
      {!hasMore && <div className="end-message">No more TV shows to show.</div>}

      {/* Trailer modal */}
      <TrailerModal
        show={showTrailer}
        trailerUrl={trailerUrl}
        onClose={closeTrailer}
      />
    </div>
  );
};

export default TvShows;