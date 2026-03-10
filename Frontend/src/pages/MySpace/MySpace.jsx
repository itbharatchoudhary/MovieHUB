import React from "react";
import "./MySpace.scss";
import Favorites from "../../components/Favorites/Favorites";
import History from "../../components/History/History";

const MySpace = ({ user, favorites, history, onFavorite, clearHistory }) => {
  return (
    <div className="myspace-page">

      {/* User Profile Section */}
      <div className="profile-section">
        <img
          src={user?.avatar || "/default-avatar.png"}
          alt={user?.name}
          className="profile-avatar"
        />
        <div className="profile-info">
          <h1>{user?.name || "Guest User"}</h1>
        </div>
      </div>

      {/* Components Section */}
      <div className="components-section">

        {/* Favorites Section */}
        <Favorites favorites={favorites} onFavorite={onFavorite} />

        {/* History Section */}
        <History history={history} onFavorite={onFavorite} clearHistory={clearHistory} />

      </div>

    </div>
  );
};

export default MySpace;