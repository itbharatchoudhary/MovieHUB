import axios from "axios";

export const getTrending = async (req, res) => {

  const response = await axios.get(
    `${process.env.TMDB_BASE_URL}/trending/movie/day`,
    {
      params: {
        api_key: process.env.TMDB_API_KEY
      }
    }
  );

  res.json(response.data);
};