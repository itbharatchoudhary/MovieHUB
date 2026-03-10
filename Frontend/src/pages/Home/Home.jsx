import { useEffect, useState } from "react";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import MovieRow from "../../components/MovieRow/MovieRow";
import TrailerModal from "../../components/TrailerModal/TrailerModal";

import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies
} from "../../api/MovieApi";

import api from "../../api/TMDB";

import "./Home.scss";

const Home = ({ onFavorite, onWatch }) => {
  const [heroMovie, setHeroMovie] = useState(null);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  const [trailerUrl, setTrailerUrl] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendingData, popularData, topRatedData, upcomingData] =
          await Promise.all([
            getTrendingMovies(),
            getPopularMovies(),
            getTopRatedMovies(),
            getUpcomingMovies()
          ]);

        setTrending(trendingData);
        setPopular(popularData);
        setTopRated(topRatedData);
        setUpcoming(upcomingData);

        setHeroMovie(
          trendingData[Math.floor(Math.random() * trendingData.length)]
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleWatchTrailer = async (movieId, movieObj) => {
    onWatch && onWatch(movieObj);

    try {
      const res = await api.get(`/movie/${movieId}/videos`, {
        params: { api_key: import.meta.env.VITE_TMDB_API_KEY }
      });

      const trailer = res.data.results.find(
        v => v.type === "Trailer" && v.site === "YouTube"
      );

      setTrailerUrl(trailer ? `https://www.youtube.com/embed/${trailer.key}` : null);
      setShowTrailer(true);
    } catch (err) {
      console.error(err);
      setTrailerUrl(null);
      setShowTrailer(true);
    }
  };

  const loadMore = async (setter, endpoint) => {
    try {
      const res = await api.get(endpoint);
      setter(prev => [...prev, ...res.data.results]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="home">
      {loading ? (
        <div className="loading-screen">
          <h2>Loading ...</h2>
        </div>
      ) : (
        <>
          {heroMovie && (
            <HeroBanner
              movie={heroMovie}
              onWatchTrailer={() => handleWatchTrailer(heroMovie.id, heroMovie)}
              onFavorite={() => onFavorite(heroMovie)}
            />
          )}

          <div className="rows">
            <MovieRow
              title="Trending Now"
              movies={trending}
              onFavorite={onFavorite}
              onWatchTrailer={handleWatchTrailer}
              loadMore={() => loadMore(setTrending, "/trending/movie/day")}
            />
            <MovieRow
              title="Popular"
              movies={popular}
              onFavorite={onFavorite}
              onWatchTrailer={handleWatchTrailer}
              loadMore={() => loadMore(setPopular, "/movie/popular")}
            />
            <MovieRow
              title="Top Rated"
              movies={topRated}
              onFavorite={onFavorite}
              onWatchTrailer={handleWatchTrailer}
              loadMore={() => loadMore(setTopRated, "/movie/top_rated")}
            />
            <MovieRow
              title="Upcoming"
              movies={upcoming}
              onFavorite={onFavorite}
              onWatchTrailer={handleWatchTrailer}
              loadMore={() => loadMore(setUpcoming, "/movie/upcoming")}
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