import "./CastDetail.scss";

const CastDetail = ({ actor }) => {
  const imageUrl = actor.profile_path
    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="cast-detail">
      
      {/* Background Blur */}
      <div 
        className="cast-detail__bg"
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      ></div>

      <div className="cast-detail__container">
        
        {/* LEFT IMAGE */}
        <div className="cast-detail__image">
          <img src={imageUrl} alt={actor.name} />
        </div>

        {/* RIGHT INFO */}
        <div className="cast-detail__info">
          <h1 className="cast-detail__name">{actor.name}</h1>

          <p className="cast-detail__character">
            {actor.character}
          </p>

          <div className="cast-detail__meta">
            <span>Popularity: {actor.popularity}</span>
            <span>Known For: {actor.known_for_department}</span>
          </div>

          <p className="cast-detail__bio">
            {actor.biography || "No biography available."}
          </p>
        </div>

      </div>
    </div>
  );
};

export default CastDetail;