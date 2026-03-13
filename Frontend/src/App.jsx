import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./pages/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./pages/Footer/Footer";
import MovieDetails from "../src/components/MovieDetails/MovieDetails";

const App = () => {
  return (
    <div>

      <Navbar />

      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Movie Details */}
        <Route path="/movie/:id" element={<MovieDetails />} />

      </Routes>

      <Footer />

    </div>
  );
};

export default App;