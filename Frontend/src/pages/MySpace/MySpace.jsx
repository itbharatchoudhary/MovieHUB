import React, { useState, useEffect } from "react";
import "./MySpace.scss";
import MovieCard from "../../components/MovieCard/MovieCard";
import { getTrendingMovies } from "../../Services/MovieService";

const MySpace = () => {

  const [historyMovies, setHistoryMovies] = useState([]);
  const [favouriteMovies, setFavouriteMovies] = useState([]);

  const [editHistory, setEditHistory] = useState(false);
  const [editFavourite, setEditFavourite] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await getTrendingMovies();
      setHistoryMovies(movies.slice(0, 8));
      setFavouriteMovies(movies.slice(8, 16));
    };
    fetchMovies();
  }, []);

  const removeHistoryMovie = (id) => {
    setHistoryMovies(prev => prev.filter(movie => movie.id !== id));
  };

  const removeFavouriteMovie = (id) => {
    setFavouriteMovies(prev => prev.filter(movie => movie.id !== id));
  };

  return (
    <div className="myspace-page">

      {/* PROFILE */}
      <section className="profile-section">
        <div className="profile-left">
          <img
            src="https://i.pravatar.cc/100"
            alt="Profile"
            className="profile-pic"
          />
          <div className="user-info">
            <h2 className="user-name">John Doe</h2>
            <span className="user-email">johndoe@email.com</span>
          </div>
        </div>

        <button className="edit-btn">Edit Profile</button>
      </section>


      {/* WATCH HISTORY */}
      <section className="movie-section">

        <div className="section-header">
          <h2>Watch History</h2>

          <button
            className="section-edit-btn"
            onClick={() => setEditHistory(!editHistory)}
          >
            {editHistory ? "Done" : "Edit"}
          </button>
        </div>

        <div className="row-scroll">

          {historyMovies.map(movie => (
            <div className="movie-wrapper" key={movie.id}>

              {editHistory && (
                <button
                  className="remove-btn"
                  onClick={() => removeHistoryMovie(movie.id)}
                >
                  ✕
                </button>
              )}

              <MovieCard movie={movie} />

            </div>
          ))}

        </div>

      </section>


      {/* FAVOURITE MOVIES */}
      <section className="movie-section">

        <div className="section-header">
          <h2>Favourite Movies</h2>

          <button
            className="section-edit-btn"
            onClick={() => setEditFavourite(!editFavourite)}
          >
            {editFavourite ? "Done" : "Edit"}
          </button>
        </div>

        <div className="row-scroll">

          {favouriteMovies.map(movie => (
            <div className="movie-wrapper" key={movie.id}>

              {editFavourite && (
                <button
                  className="remove-btn"
                  onClick={() => removeFavouriteMovie(movie.id)}
                >
                  ✕
                </button>
              )}

              <MovieCard movie={movie} />

            </div>
          ))}

        </div>

      </section>

    </div>
  );
};

export default MySpace;