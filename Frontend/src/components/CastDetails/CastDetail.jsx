import { useEffect, useState } from "react";
import "./CastDetail.scss";
import api from "../../api/TMDB";
import Loader from "../Loader/Loader";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

const CastDetail = ({ actor, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!actor?.id) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/person/${actor.id}`);
        setDetails(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [actor]);

  if (loading) return <Loader />;
  if (!details) return null;

  const bgImage = details.profile_path
    ? `${IMAGE_BASE}${details.profile_path}`
    : "";

  // ✅ 25 WORD LIMIT
  const shortBio = details.biography
    ? details.biography.split(" ").slice(0, 100).join(" ") + "..."
    : "No biography available.";

  return (
    <div className="cast-detail">
      
      {/* BACKGROUND */}
      <div
        className="cast-detail__bg"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* CLOSE */}
      <button className="cast-detail__close" onClick={onClose}>
        ✕
      </button>

      {/* CONTENT */}
      <div className="cast-detail__content">

        {/* IMAGE */}
        <div className="cast-detail__left">
          <img
            src={bgImage}
            alt={details.name}
            className="cast-detail__image"
          />
        </div>

        {/* INFO */}
        <div className="cast-detail__right">
          <h1>{details.name}</h1>

          <p className="known">
            {details.known_for_department}
          </p>

          <div className="meta">
            <span>🎂 {details.birthday || "N/A"}</span>
            <span>📍 {details.place_of_birth || "Unknown"}</span>
          </div>

          <p className="bio">{shortBio}</p>
        </div>

      </div>
    </div>
  );
};

export default CastDetail;