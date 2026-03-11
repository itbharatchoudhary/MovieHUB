import axios from "axios";

const BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";

// helper function
const fetchFromTMDB = async (url, res) => {
  try {

    const API_KEY = process.env.TMDB_API_KEY;

    if (!API_KEY) {
      return res.status(500).json({
        message: "TMDB API key missing"
      });
    }

    const response = await axios.get(`${BASE_URL}${url}`, {
      params: {
        api_key: API_KEY
      }
    });

    res.json(response.data);

  } catch (error) {

    console.error("TMDB Error:", error.response?.data || error.message);

    res.status(500).json({
      message: "Error fetching data from TMDB"
    });

  }
};


// Trending
export const getTrendingMovies = async (req, res) => {

  const page = req.query.page || 1;

  fetchFromTMDB(`/trending/movie/day?page=${page}`, res);

};


// Popular
export const getPopularMovies = async (req, res) => {

  const page = req.query.page || 1;

  fetchFromTMDB(`/movie/popular?page=${page}`, res);

};


// Top Rated
export const getTopRatedMovies = async (req, res) => {

  const page = req.query.page || 1;

  fetchFromTMDB(`/movie/top_rated?page=${page}`, res);

};


// Upcoming
export const getUpcomingMovies = async (req, res) => {

  const page = req.query.page || 1;

  fetchFromTMDB(`/movie/upcoming?page=${page}`, res);

};


// Movie Details
export const getMovieById = async (req, res) => {

  const { id } = req.params;

  fetchFromTMDB(`/movie/${id}`, res);

};


// Cast
export const getMovieCast = async (req, res) => {

  const { id } = req.params;

  fetchFromTMDB(`/movie/${id}/credits`, res);

};


// Similar Movies
export const getSimilarMovies = async (req, res) => {

  const { id } = req.params;

  fetchFromTMDB(`/movie/${id}/similar`, res);

};


// Search
export const searchMovies = async (req, res) => {

  const query = req.query.query;

  if (!query) {
    return res.status(400).json({
      message: "Search query required"
    });
  }

  fetchFromTMDB(`/search/movie?query=${query}`, res);

};