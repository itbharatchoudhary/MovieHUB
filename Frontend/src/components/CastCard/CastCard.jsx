import "./CastCard.scss";

const CastCard = ({ actor, onClick }) => {
  const imageUrl = actor?.profile_path
    ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div className="cast-card" onClick={onClick} role="button">
      
      {/* IMAGE */}
      <div className="cast-card__image">
        <img src={imageUrl} alt={actor?.name || "Actor"} />
      </div>

      {/* INFO */}
      <div className="cast-card__info">
        <h4 className="cast-card__name">
          {actor?.name || "Unknown"}
        </h4>

      </div>

    </div>
  );
};

export default CastCard;