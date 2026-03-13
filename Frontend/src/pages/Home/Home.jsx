import React, { useEffect, useState } from "react";
import MovieRow from "../../components/MovieRow/MovieRow";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import Loader from "../../components/Loader/Loader";

import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../../Services/MovieService";

import "../Home/Home.scss";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [
          trendingData,
          popularData,
          topRatedData,
          upcomingData,
        ] = await Promise.all([
          getTrendingMovies(),
          getPopularMovies(),
          getTopRatedMovies(),
          getUpcomingMovies(),
        ]);

        setTrending(trendingData);
        setPopular(popularData);
        setTopRated(topRatedData);
        setUpcoming(upcomingData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <Loader text="Loading Movies..." />;
  }

  return (
    <div className="home">

      {trending.length > 0 && <HeroBanner movies={trending.slice(0, 5)} />}

      <MovieRow title="🔥 Trending Movies" movies={trending} />
      <MovieRow title="🎬 Popular Movies" movies={popular} />
      <MovieRow title="⭐ Top Rated Movies" movies={topRated} />
      <MovieRow title="🚀 Upcoming Movies" movies={upcoming} />
    </div>
  );
};

export default Home;