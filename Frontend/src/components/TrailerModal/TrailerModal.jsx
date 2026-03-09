import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "./TrailerModal.scss";

const TrailerModal = ({ show, trailerUrl, onClose }) => {

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!show) return null;

  return (
    <div className="trailer-modal" onClick={onClose}>

      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >

        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        {trailerUrl ? (
          <div className="video-wrapper">
            <iframe
              src={trailerUrl}
              title="Movie Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="no-trailer">
            <h3>Trailer Unavailable</h3>
            <p>This movie currently has no trailer available.</p>
          </div>
        )}

      </div>

    </div>
  );
};

export default TrailerModal;