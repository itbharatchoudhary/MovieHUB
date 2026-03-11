// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL,
//   params: { api_key: import.meta.env.VITE_TMDB_API_KEY }
// });

// export const fetchTrending = () => api.get("/trending/movie/day");
// export const fetchPopular = () => api.get("/movie/popular");
// export const fetchTopRated = () => api.get("/movie/top_rated");
// export const fetchUpcoming = () => api.get("/movie/upcoming");
// export const searchMovies = (query) =>
//   api.get("/search/multi", { params: { query } });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api"
});

api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});

export default api;