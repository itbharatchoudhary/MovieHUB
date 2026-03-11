import api from "./TMDB";

export const addFavorite = async (movie) => {

  const res = await api.post("/user/favorite", {
    movieId: movie.id,
    title: movie.title,
    poster: movie.poster_path
  });

  return res.data;
};

export const addHistory = async (movie) => {

  const res = await api.post("/user/history", {
    movieId: movie.id,
    title: movie.title
  });

  return res.data;
};