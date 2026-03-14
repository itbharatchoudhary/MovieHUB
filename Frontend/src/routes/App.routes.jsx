import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home/Home";
import Explore from "../pages/Explore/Explore";
import Movies from "../pages/Movies/Movies";
import TVShows from "../pages/TVShows/TvShows";

// Components
import MovieDetails from "../components/MovieDetails/MovieDetails";


const AppRoutes = () => {
  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<Home />} />
      
      {/* Explore Page */}
      <Route path="/explore" element={<Explore />} />

      {/* Movies Page */}
      <Route path="/movies" element={<Movies />} />

        {/* TV Shows Page */}
      <Route path="/tv-shows" element={<TVShows />} />

      {/* Movie Details Page */}
      <Route path="/movie/:id" element={<MovieDetails />} />

      {/* Fallback */}
      <Route path="*" element={<h2>Page Not Found</h2>} />
    </Routes>
  );
};

export default AppRoutes;