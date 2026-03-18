import React from "react";
import PropTypes from "prop-types";

import CastCard from "../CastCard/CastCard";
import "./CastRow.scss";

const CastRow = ({ title, cast = [], onActorClick }) => {
  return (
    <section className="cast-row">

      {/* HEADER */}
      <div className="row-header">
        <h2 className="row-title">{title}</h2>
      </div>

      {/* SCROLL ROW */}
      <div className="row-scroll">
        {cast.length > 0 ? (
          cast.map((actor) => (
            <CastCard
              key={actor.id}
              actor={actor}
              onClick={() => onActorClick?.(actor)}
            />
          ))
        ) : (
          <p className="cast-empty">No cast available</p>
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