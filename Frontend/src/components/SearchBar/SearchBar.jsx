import { useState, useEffect } from "react";
import useDebounce from "../../hooks/UseDebounce";
import api from "../../api/TMDB";
import "./SearchBar.scss";

const SearchBar = ({ onResults }) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery) {
        const res = await api.get("/search/multi", {
          params: { query: debouncedQuery }
        });

        onResults(res.data.results);
      } else {
        onResults([]);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;