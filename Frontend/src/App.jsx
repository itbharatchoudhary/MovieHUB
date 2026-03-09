import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies"; // added Movies page
import Favorites from "./pages/Favorites/Favorites";
import History from "./pages/History/History";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import Search from "./pages/Search/Search";

function App() {
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleFavorite = (movie) => {
    setFavorites((prev) => {
      const exists = prev.find((m) => m.id === movie.id);
      if (exists) return prev.filter((m) => m.id !== movie.id);
      return [...prev, movie];
    });
  };

  const handleWatch = (movie) => {
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
          path="/favorites"
          element={<Favorites favorites={favorites} onFavorite={handleFavorite} />}
        />
        <Route
          path="/history"
          element={
            <History
              history={history}
              onFavorite={handleFavorite}
              clearHistory={clearHistory}
            />
          }
        />
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