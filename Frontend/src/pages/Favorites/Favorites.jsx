import "./Favorites.scss";
import MovieCard from "../components/MovieCard/MovieCard";

const Favorites = ({ favorites, onFavorite }) => {

  return (
    <div className="favorites-page">

      <div className="favorites-header">
        <h1>My Favorites</h1>
        <p>Your saved movies and shows</p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <h2>No Favorites Yet</h2>
          <p>Start adding movies you love ❤️</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onFavorite={onFavorite}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default Favorites;