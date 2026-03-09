import { useRef } from "react";
import MovieCard from "../MovieCard/MovieCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./MovieRow.scss";

const MovieRow = ({ title, movies, onFavorite }) => {
  const rowRef = useRef();

  const scroll = (direction) => {
    const { current } = rowRef;
    const scrollAmount = 600;

    if (direction === "left") {
      current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="movie-row">
      <h2>{title}</h2>

      <div className="row-container">
        <button className="scroll-btn left" onClick={() => scroll("left")}>
          <FaChevronLeft />
        </button>

        <div className="row-cards" ref={rowRef}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onFavorite={onFavorite} />
          ))}
        </div>

        <button className="scroll-btn right" onClick={() => scroll("right")}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;