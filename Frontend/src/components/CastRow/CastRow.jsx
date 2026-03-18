import { useRef, useCallback } from "react";
import PropTypes from "prop-types";

import CastCard from "../CastCard/CastCard";
import "./CastRow.scss";

const SCROLL_AMOUNT = 320;

const CastRow = ({ title, cast = [], onActorClick }) => {
  const rowRef = useRef(null);

  // Smooth Scroll Handler
  const handleScroll = useCallback((direction) => {
    const container = rowRef.current;
    if (!container) return;

    const scrollValue =
      direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT;

    container.scrollBy({
      left: scrollValue,
      behavior: "smooth",
    });
  }, []);

  return (
    <section className="cast-row">
      
      {/* HEADER */}
      {title && (
        <div className="cast-row__header">
          <h2 className="cast-row__title">{title}</h2>
        </div>
      )}

      {/* LEFT BUTTON */}
      <button
        type="button"
        className="cast-row__btn cast-row__btn--left"
        aria-label="Scroll left"
        onClick={() => handleScroll("left")}
      >
        ‹
      </button>

      {/* RIGHT BUTTON */}
      <button
        type="button"
        className="cast-row__btn cast-row__btn--right"
        aria-label="Scroll right"
        onClick={() => handleScroll("right")}
      >
        ›
      </button>

      {/* SCROLL CONTAINER */}
      <div
        className="cast-row__container"
        ref={rowRef}
        role="list"
      >
        {cast.length > 0 ? (
          cast.map((actor) => (
            <CastCard
              key={actor.id}
              actor={actor}
              onClick={() => onActorClick?.(actor)}
            />
          ))
        ) : (
          <p className="cast-row__empty">No cast available</p>
        )}
      </div>
    </section>
  );
};

/* =============================
   PROP VALIDATION
============================= */
CastRow.propTypes = {
  title: PropTypes.string,
  cast: PropTypes.arrayOf(PropTypes.object),
  onActorClick: PropTypes.func,
};

export default CastRow;