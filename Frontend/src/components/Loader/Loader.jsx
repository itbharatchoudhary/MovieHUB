import React from "react";
import "./Loader.scss";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p>Loading...</p>
    </div>
  );
};

export default Loader;