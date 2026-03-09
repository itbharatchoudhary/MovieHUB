import api from "./TMDB";

export const getTrendingMovies = async () => {
  const res = await api.get("/trending/movie/day");
  return res.data.results;
};

export const getPopularMovies = async () => {
  const res = await api.get("/movie/popular");
  return res.data.results;
};

export const getTopRatedMovies = async () => {
  const res = await api.get("/movie/top_rated");
  return res.data.results;
};

export const getUpcomingMovies = async () => {
  const res = await api.get("/movie/upcoming");
  return res.data.results;
};