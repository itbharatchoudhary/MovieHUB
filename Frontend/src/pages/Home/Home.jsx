import { useEffect, useState } from "react";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import MovieRow from "../../components/MovieRow/MovieRow";
import SearchBar from "../../components/SearchBar/SearchBar";
import TrailerModal from "../../components/TrailerModal/TrailerModal";

import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies
} from "../../api/movieApi";

import api from "../../api/TMDB";

import "./Home.scss";

const Home = () => {

  const [heroMovie, setHeroMovie] = useState(null);

  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  const [searchResults, setSearchResults] = useState([]);

  const [trailerUrl, setTrailerUrl] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {

      try {

        const [
          trendingData,
          popularData,
          topRatedData,
          upcomingData
        ] = await Promise.all([
          getTrendingMovies(),
          getPopularMovies(),
          getTopRatedMovies(),
          getUpcomingMovies()
        ]);

        setTrending(trendingData);
        setPopular(popularData);
        setTopRated(topRatedData);
        setUpcoming(upcomingData);

        setHeroMovie(trendingData[Math.floor(Math.random() * trendingData.length)]);

      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleFavorite = async (movie) => {

    try {

      await api.post(
        "/favorites",
        {
          movieId: movie.id,
          title: movie.title,
          poster: movie.poster_path
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert(`${movie.title} added to favorites ❤️`);

    } catch (err) {
      console.log(err);
    }
  };

  const handleWatchTrailer = async (movieId) => {

    try {

      const res = await api.get(`/movie/${movieId}/videos`, {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY
        }
      });

      const trailer = res.data.results.find(
        v => v.type === "Trailer" && v.site === "YouTube"
      );

      setTrailerUrl(
        trailer
          ? `https://www.youtube.com/embed/${trailer.key}`
          : null
      );

      setShowTrailer(true);

    } catch (err) {

      console.log(err);
      setTrailerUrl(null);
      setShowTrailer(true);

    }
  };

  const loadMore = async (setter, endpoint) => {

    try {

      const res = await api.get(endpoint);

      setter(prev => [...prev, ...res.data.results]);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="home">

      <SearchBar onResults={setSearchResults} />

      {searchResults.length > 0 ? (

        <div className="search-section">
          <MovieRow
            title="Search Results"
            movies={searchResults}
            onFavorite={handleFavorite}
            onWatchTrailer={handleWatchTrailer}
          />
        </div>

      ) : (

        <>
          {!loading && heroMovie && (
            <HeroBanner
              movie={heroMovie}
              onWatchTrailer={() => handleWatchTrailer(heroMovie.id)}
              onFavorite={handleFavorite}
            />
          )}

          <div className="rows">

            <MovieRow
              title="Trending Now"
              movies={trending}
              onFavorite={handleFavorite}
              onWatchTrailer={handleWatchTrailer}
              loadMore={() =>
                loadMore(setTrending, "/trending/movie/day")
              }
            />

            <MovieRow
              title="Popular"
              movies={popular}
              onFavorite={handleFavorite}
              onWatchTrailer={handleWatchTrailer}
              loadMore={() =>
                loadMore(setPopular, "/movie/popular")
              }
            />

            <MovieRow
              title="Top Rated"
              movies={topRated}
              onFavorite={handleFavorite}
              onWatchTrailer={handleWatchTrailer}
              loadMore={() =>
                loadMore(setTopRated, "/movie/top_rated")
              }
            />

            <MovieRow
              title="Upcoming"
              movies={upcoming}
              onFavorite={handleFavorite}
              onWatchTrailer={handleWatchTrailer}
              loadMore={() =>
                loadMore(setUpcoming, "/movie/upcoming")
              }
            />

          </div>
        </>
      )}

      <TrailerModal
        show={showTrailer}
        trailerUrl={trailerUrl}
        onClose={() => setShowTrailer(false)}
      />

    </div>
  );
};

export default Home;