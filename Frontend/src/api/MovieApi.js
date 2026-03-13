// src/api/MovieApi.js

import api from "./TMDB";

// Trending Movies
export const fetchTrending = async () => {
  const res = await api.get("/trending/movie/day");
  return res.data.results;
};

// Popular Movies
export const fetchPopular = async () => {
  const res = await api.get("/movie/popular");
  return res.data.results;
};

// Top Rated Movies
export const fetchTopRated = async () => {
  const res = await api.get("/movie/top_rated");
  return res.data.results;
};

// Upcoming Movies
export const fetchUpcoming = async () => {
  const res = await api.get("/movie/upcoming");
  return res.data.results;
};

// Search Movies / TV / People
export const searchMovies = async (query) => {
  const res = await api.get("/search/multi", {
    params: { query },
  });
  return res.data.results;
};

// Movie Details
export const getMovieDetails = async (id) => {
  const res = await api.get(`/movie/${id}`);
  return res.data;
};