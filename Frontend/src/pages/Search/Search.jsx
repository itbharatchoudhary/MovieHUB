import React, { useState, useEffect } from "react";
import { searchMovieService } from "../../Services/MovieService";
import MovieCard from "../../components/MovieCard/MovieCard";
import Loader from "../../components/Loader/Loader";
import useDebounce from "../../hooks/UseDebounce";
import "./Search.scss";

const Search = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);


    const debouncedQuery = useDebounce(query, 300); // faster debounce for live search
    const [listening, setListening] = useState(false);

    // Optional: live search with debounce
    useEffect(() => {
        if (!debouncedQuery) {
            setResults([]);
        }
    }, [debouncedQuery]);

    // Move handleSearch outside useEffect
    const handleSearch = async () => {
        if (!query.trim()) return; // blank input ignore
        setHasSearched(true); // mark that user clicked search
        setLoading(true);
        const movies = await searchMovieService(query);
        setResults(movies.slice(0, 10)); // top 10 results
        setLoading(false);
    };

    return (
        <div className="search-page">

            <h1 className="page-title">Search Movies / TV Shows</h1>

            <div className="search-bar mac-style">
                <input
                    type="text"
                    placeholder="Type or speak to search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="search-btn" onClick={handleSearch}>
                    <i className="ri-search-line"></i>
                </button>
            </div>


            <div className="suggestions-grid">
                {results.map((movie) => (
                    <div key={movie.id} className="suggestion-card">
                        <MovieCard movie={movie} />
                    </div>
                ))}

                {/* Only show "No results" if user clicked search */}
                {!loading && hasSearched && query && results.length === 0 && (
                    <p className="no-results">No results found for "{query}"</p>
                )}
            </div>

        </div>
    );
};

export default Search;