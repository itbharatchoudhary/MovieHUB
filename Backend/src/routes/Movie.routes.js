import express from "express";
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getMovieById
} from "../controllers/Movie.Controller.js";

const router = express.Router();

// Trending Movies
router.get("/trending", getTrendingMovies);

// Popular Movies
router.get("/popular", getPopularMovies);

// Top Rated Movies
router.get("/top-rated", getTopRatedMovies);

// Upcoming Movies
router.get("/upcoming", getUpcomingMovies);

// Single Movie Details
router.get("/:id", getMovieById);

export default router;