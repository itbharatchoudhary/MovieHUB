import React, { useEffect, useState } from "react";
import api from "../../api/TMDB";
import "./Genres.scss";

const Genres = ({ onSelectGenre }) => {
  const [genres, setGenres] = useState([]);
  const [activeGenre, setActiveGenre] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const { data } = await api.get("/genre/movie/list");
        setGenres(data.genres);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    };
    fetchGenres();
  }, []);

  const handleGenreClick = (genre) => {
    setActiveGenre(genre.id);
    onSelectGenre(genre);
  };

  return (
    <div className="genres-container">
      {genres.map((genre) => (
        <div
          key={genre.id}
          className={`genre-card ${activeGenre === genre.id ? "active" : ""}`}
          onClick={() => handleGenreClick(genre)}
        >
          {genre.name}
        </div>
      ))}
    </div>
  );
};

export default Genres;