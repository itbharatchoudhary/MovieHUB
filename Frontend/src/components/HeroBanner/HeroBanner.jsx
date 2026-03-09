import "./HeroBanner.scss";

const HeroBanner = ({ movie, onWatchTrailer, onFavorite }) => {
  if (!movie) return null;

  return (
    <div
      className="hero-banner"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
      }}
    >
      <div className="content">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <div className="buttons">
          <button onClick={() => onWatchTrailer(movie.id)}>▶ Watch Trailer</button>
          <button onClick={() => onFavorite(movie)}>❤️ Add to Favorites</button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;