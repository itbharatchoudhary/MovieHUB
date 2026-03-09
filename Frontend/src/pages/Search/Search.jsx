import React, { useState } from "react";
import "./Search.scss";

const Search = ({ movies }) => {

  const [query, setQuery] = useState("");

  const filteredMovies = movies?.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="searchPage">

      <div className="searchHeader">

        <h1>Search Movies</h1>

        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

      </div>

      <div className="searchResults">

        {filteredMovies?.length > 0 ? (
          filteredMovies.map((movie) => (
            <div className="movieCard" key={movie.id}>

              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />

              <div className="movieInfo">

                <h3>{movie.title}</h3>

                <span>
                  ⭐ {movie.vote_average}
                </span>

              </div>

            </div>
          ))
        ) : (
          <p className="noResults">
            No movies found
          </p>
        )}

      </div>

    </div>
  );
};

export default Search;