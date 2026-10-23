import { useState, useEffect } from "react";
import { SearchBox } from "./SearchBox";
import { MoviesList } from "./MoviesList";
export function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("movie");

  function handleChange(e) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    if (query === "") return;
    async function fetchMovies() {
      setLoading(true);
      setError(null);
      const key = import.meta.env.VITE_OMDB_KEY;
      const url = `https://www.omdbapi.com/?apikey=${key}&s=${encodeURIComponent(query)}`;
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setMovies(data.Search || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [query]);

  let content;

  if (query === "") {
    content = <p>Search for a movie</p>;
  } else if (loading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p>Something went wrong</p>;
  } else {
    content = <MoviesList movies={movies} />;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-center text-3xl font-bold">Movie Search</h1>
      <SearchBox
        value={search}
        onChange={handleChange}
        onClear={() => {
          setSearch("");
        }}
        onSearch={() => setQuery(search.trim())}
      />
      {content}
    </div>
  );
}
