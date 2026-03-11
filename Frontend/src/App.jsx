import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies"; // added Movies page
import TvShows from "./pages/TVShows/TvShows"; // added TV Shows page
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import Search from "./pages/Search/Search";
import MySpace from "./pages/MySpace/MySpace"; // added MySpace page
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import { addFavorite } from "./api/UserApi";
import { addHistory } from "./api/UserApi";

function App() {
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // add state

  const handleFavorite = async (movie) => {

    await addFavorite(movie);

    setFavorites((prev) => {
      const exists = prev.find((m) => m.id === movie.id);
      if (exists) return prev.filter((m) => m.id !== movie.id);
      return [...prev, movie];
    });

  };

  const handleWatch = async (movie) => {

    await addHistory(movie);

    setHistory((prev) => {
      const exists = prev.find((m) => m.id === movie.id);
      if (exists) return prev;
      return [...prev, movie];
    });

  };

  const clearHistory = () => setHistory([]);

  return (
    <>
      <Navbar onSearchResults={setSearchResults} />
      <Routes>
        <Route
          path="/"
          element={<Home onFavorite={handleFavorite} onWatch={handleWatch} />}
        />
        <Route
          path="/movies"
          element={<Movies onFavorite={handleFavorite} onWatch={handleWatch} />}
        />
        <Route
          path="/tv"
          element={<TvShows onFavorite={handleFavorite} onWatch={handleWatch} />}
        />
        <Route
          path="/myspace"
          element={
            <MySpace
              user={{ name: "John Doe", email: "john.doe@example.com", avatar: "https://i.pinimg.com/1200x/cf/75/83/cf7583bda310d93c1c9e3c264ddd4af1.jpg" }}
              favorites={favorites}
              history={history}
              onFavorite={handleFavorite}
              clearHistory={clearHistory}
            />
          }
        />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/search"
          element={<Search onResults={(results) => setSearchResults(results)} />}
        />
      </Routes>
    </>
  );
}

export default App;