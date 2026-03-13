// src/api/TMDB.js

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

// Optional: Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("TMDB API Error:", error);
    return Promise.reject(error);
  }
);

export default api;