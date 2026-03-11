import api from "./TMDB";

export const getTrendingMovies = async () => {
  const res = await api.get("/movies/trending");
  return res.data.results;
};

export const getPopularMovies = async () => {
  const res = await api.get("/movies/popular");
  return res.data.results;
};

export const getTopRatedMovies = async () => {
  const res = await api.get("/movies/top-rated");
  return res.data.results;
};

export const getUpcomingMovies = async () => {
  const res = await api.get("/movies/upcoming");
  return res.data.results;
};