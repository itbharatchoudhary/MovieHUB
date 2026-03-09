import { useEffect } from "react";
import "./TrailerModal.scss";

const TrailerModal = ({ show, trailerUrl, onClose }) => {

  // ESC key se close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (!show) return null;

  return (
    <div className="trailer-modal" onClick={onClose}>
      
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        {trailerUrl ? (
          <div className="video-wrapper">
            <iframe
              src={trailerUrl}
              title="Movie Trailer"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="no-trailer">
            <p>Trailer not available</p>
          </div>
        )}

      </div>

    </div>
  );
};

export default TrailerModal;