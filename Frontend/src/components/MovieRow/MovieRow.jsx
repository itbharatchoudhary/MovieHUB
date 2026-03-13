import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieRow.scss";

const MovieRow = ({ title, movies = [] }) => {
  return (
    <section className="movie-row">

      <div className="row-header">
        <h2 className="row-title">{title}</h2>
      </div>

      <div className="row-scroll">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

    </section>
  );
};

export default MovieRow;