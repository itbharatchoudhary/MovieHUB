import { useRef, useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./MovieRow.scss";

const MovieRow = ({ title, movies, onFavorite, onWatchTrailer }) => {
  const rowRef = useRef();
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const handleScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;

    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const scroll = (direction) => {
    const scrollAmount = rowRef.current.clientWidth - 100; // responsive scroll

    rowRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // update arrow visibility on resize
  useEffect(() => {
    const handleResize = () => handleScroll();
    window.addEventListener("resize", handleResize);
    handleScroll(); // initial check
    return () => window.removeEventListener("resize", handleResize);
  }, [movies]);

  return (
    <div className="movie-row">
      <h2 className="row-title">{title}</h2>

      <div className="row-wrapper">
        {showLeft && (
          <button className="scroll-btn left" onClick={() => scroll("left")}>
            <FaChevronLeft />
          </button>
        )}

        <div
          className="row-cards"
          ref={rowRef}
          onScroll={handleScroll}
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onFavorite={onFavorite}
              onWatchTrailer={onWatchTrailer}
            />
          ))}
        </div>

        {showRight && (
          <button className="scroll-btn right" onClick={() => scroll("right")}>
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieRow;