// C:\Users\LENOVO\OneDrive\Desktop\my work\Project\MovieHUB\Frontend\src\routes\App.routes.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages / Components
import Home from "../pages/Home/Home";
import MovieDetails from "../components/MovieDetails/MovieDetails";
import TrailerModal from "../components/TrailerModal/TrailerModal";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* Movie Details page */}
        <Route path="/movie/:id" element={<MovieDetails />} />

        {/* Optional: Trailer as modal */}
        <Route path="/movie/:id/trailer" element={<TrailerModal />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;