import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home/Home";
import Explore from "../pages/Explore/Explore";

// Components
import MovieDetails from "../components/MovieDetails/MovieDetails";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<Home />} />
      
      {/* Explore Page */}
      <Route path="/explore" element={<Explore />} />

      {/* Movie Details Page */}
      <Route path="/movie/:id" element={<MovieDetails />} />

      {/* Fallback */}
      <Route path="*" element={<h2>Page Not Found</h2>} />
    </Routes>
  );
};

export default AppRoutes;