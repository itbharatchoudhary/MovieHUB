import api from "../api/TMDB";

// Fetch Movies
export const fetchMovies = async (page) => {
  const res = await api.get(`/movie/popular?page=${page}`);
  return res.data;
};

// Fetch TV Shows
export const fetchTvShows = async (page) => {
  const res = await api.get(`/tv/popular?page=${page}`);
  return res.data;
};

// Get Trailer
export const getTrailer = async (type, id) => {
  const res = await api.get(`/${type}/${id}/videos`);

  const trailer = res.data.results.find(
    (vid) => vid.type === "Trailer"
  );

  if (!trailer) return null;

  return `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;
};