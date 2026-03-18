import "./CastCard.scss";

const CastCard = ({ actor, onClick }) => {
  const imageUrl = actor.profile_path
    ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div className="cast-card" onClick={onClick}>      <div className="cast-card__image">
      <img src={imageUrl} alt={actor.name} />
    </div>

      <div className="cast-card__info">
        <h4 className="cast-card__name">{actor.name}</h4>
        <p className="cast-card__character">{actor.character}</p>
      </div>
    </div>
  );
};

export default CastCard;