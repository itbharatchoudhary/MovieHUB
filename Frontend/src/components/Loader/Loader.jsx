import React from "react";
import "./Loader.scss";

const Loader = ({ text = "Loading..." }) => {
    return (
        <div className="loader-wrapper">
            <div className="loader-container">
                <div className="mac-spinner"></div>
                <p className="loader-text">{text}</p>
            </div>
        </div>
    );
};

export default Loader;