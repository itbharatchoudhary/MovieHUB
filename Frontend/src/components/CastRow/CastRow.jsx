import { useRef } from "react";
import CastCard from "../CastCard/CastCard";
import "./CastRow.scss";

const CastRow = ({ title, cast, onActorClick }) => {
  const rowRef = useRef();

  const scroll = (direction) => {
    const { current } = rowRef;
    const scrollAmount = 300;

    if (direction === "left") {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="cast-row">

      {/* HEADER */}
      <div className="cast-row__header">
        <h2>{title}</h2>
      </div>

      {/* LEFT BUTTON */}
      <button
        className="cast-row__btn cast-row__btn--left"
        onClick={() => scroll("left")}
      >
        ‹
      </button>

      {/* RIGHT BUTTON */}
      <button
        className="cast-row__btn cast-row__btn--right"
        onClick={() => scroll("right")}
      >
        ›
      </button>

      {/* SCROLL CONTAINER */}
      <div className="cast-row__container" ref={rowRef}>
        {cast.map((actor) => (
          <CastCard
            key={actor.id}
            actor={actor}
            onClick={() => onActorClick(actor)}   // 🔥 FIX
          />
        ))}
      </div>

    </div>
  );
};

export default CastRow;