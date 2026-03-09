import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import MovieDetails from "../pages/MovieDetails/MovieDetails";
import Search from "../pages/Search/Search";
import SignUp from "../pages/SignUp/SignUp";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/search" element={<Search />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default AppRoutes;