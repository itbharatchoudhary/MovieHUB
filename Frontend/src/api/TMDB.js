import axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3"
});

export const fetchTrending = () =>
  tmdb.get(`/trending/movie/day?api_key=${API_KEY}`);

export const fetchPopular = () =>
  tmdb.get(`/movie/popular?api_key=${API_KEY}`);

export const searchMovies = (query) =>
  tmdb.get(`/search/movie?api_key=${API_KEY}&query=${query}`);