import React from "react";
import "./Loader.scss";

const Loader = () => {
  return (
    <div className="loader-wrapper">

      <div className="netflix-loader">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <p className="loading-text">Loading Movies...</p>

    </div>
  );
};

export default Loader;