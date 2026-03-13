import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home/Home";

// Components
import MovieDetails from "../components/MovieDetails/MovieDetails";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Movie Details Page */}
        <Route path="/movie/:id" element={<MovieDetails />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;