import React, { useEffect } from "react";
import "./TrailerModal.scss";

const TrailerModal = ({ trailerKey, isOpen, onClose }) => {

  // ESC key se modal close
  useEffect(() => {

    const handleKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden"; // background scroll lock
    }

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "auto";
    };

  }, [isOpen, onClose]);

  if (!isOpen || !trailerKey) return null;

  return (
    <div className="trailer-overlay" onClick={onClose}>

      <div
        className="trailer-modal"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Mac Style Header */}
        <div className="modal-header">

          <div className="mac-buttons">
            <span className="red" onClick={onClose}></span>
            <span className="yellow"></span>
            <span className="green"></span>
          </div>

          <h3>Movie Trailer</h3>

        </div>

        {/* Video Container */}
        <div className="trailer-video">

          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title="Movie Trailer"
            frameBorder="0"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          ></iframe>

        </div>

      </div>

    </div>
  );
};

export default TrailerModal;