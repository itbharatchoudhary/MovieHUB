import {
  fetchTrending,
  fetchPopular,
  fetchTopRated,
  fetchUpcoming,
  searchMovies,
  getMovieDetails,
} from "../api/MovieApi";


// 🔹 Get Trending Movies
export const getTrendingMovies = async () => {
  try {
    const movies = await fetchTrending();
    return movies;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};


// 🔹 Get Popular Movies
export const getPopularMovies = async () => {
  try {
    const movies = await fetchPopular();
    return movies;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};


// 🔹 Get Top Rated Movies
export const getTopRatedMovies = async () => {
  try {
    const movies = await fetchTopRated();
    return movies;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return [];
  }
};


// 🔹 Get Upcoming Movies
export const getUpcomingMovies = async () => {
  try {
    const movies = await fetchUpcoming();
    return movies;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    return [];
  }
};


// 🔹 Search Movies
export const searchMovieService = async (query) => {
  try {
    const movies = await searchMovies(query);
    return movies;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};


// 🔹 Movie Details
export const getMovieDetailsService = async (id) => {
  try {
    const movie = await getMovieDetails(id);
    return movie;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};