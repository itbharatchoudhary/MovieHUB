import "./History.scss";
import MovieCard from "../../components/MovieCard/MovieCard";

const History = ({ history, onFavorite, clearHistory }) => {
  return (
    <div className="history-page">

      <div className="history-header">
        <div className="title-section">
          <h1>Watch History</h1>
          <p>Movies and shows you recently watched</p>
        </div>

        {history.length > 0 && (
          <button className="clear-btn" onClick={clearHistory}>
            Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="empty-history">
          <div className="empty-box">
            <h2>No Watch History</h2>
            <p>Start watching movies and they will appear here 🎬</p>
          </div>
        </div>
      ) : (
        <div className="history-grid">
          {history.map((movie) => (
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

export default History;