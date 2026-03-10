import React, { useState } from "react";
import Fuse from "fuse.js";
import "./Search.scss";

const Search = ({ movies }) => {
  const [query, setQuery] = useState("");

  // Fuse.js setup
  const fuse = new Fuse(movies || [], {
    keys: ["title", "overview"],
    threshold: 0.3, // 0.0 = strict, 1.0 = very fuzzy
  });

  // Filtered + Recommended movies
  const results = query ? fuse.search(query).map(res => res.item) : movies;

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
        {results?.length > 0 ? (
          <div className="resultsGrid">
            {results.map((movie) => (
              <div className="movieCard" key={movie.id}>
                <div className="posterWrapper">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/placeholder.png"
                    }
                    alt={movie.title}
                  />
                </div>
                <div className="movieInfo">
                  <h3>{movie.title}</h3>
                  <span>⭐ {movie.vote_average}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="noResults">No movies found for "{query}"</p>
        )}
      </div>

      {/* Optional: Recommended section */}
      {query && results.length > 0 && results.length < movies.length && (
        <div className="recommendations">
          <h2>Related Movies</h2>
          <div className="resultsGrid">
            {movies
              .filter((m) => !results.includes(m))
              .slice(0, 5) // top 5 recommendations
              .map((movie) => (
                <div className="movieCard" key={movie.id}>
                  <div className="posterWrapper">
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : "/placeholder.png"
                      }
                      alt={movie.title}
                    />
                  </div>
                  <div className="movieInfo">
                    <h3>{movie.title}</h3>
                    <span>⭐ {movie.vote_average}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;