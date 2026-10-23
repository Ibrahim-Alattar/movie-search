import { useState, useEffect } from "react";
import { SearchBox } from "./SearchBox";
import { MoviesList } from "./MoviesList";

const pageButton =
  "cursor-pointer rounded-3xl border px-5 py-2 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent";

export function Movies() {
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("movie");
  const [page, setPage] = useState(1);

  function handleChange(e) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    if (query === "") return;
    async function fetchMovies() {
      setLoading(true);
      setError(null);
      const key = import.meta.env.VITE_OMDB_KEY;
      const url = `https://www.omdbapi.com/?apikey=${key}&s=${encodeURIComponent(query)}&page=${page}`;
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setMovies(data.Search || []);
        setTotalResults(Number(data.totalResults) || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [query, page]);

  // derived, not stored (OMDb caps page at 100)
  const totalPages = Math.min(Math.ceil(totalResults / 10), 100);

  let content;

  if (query === "") {
    content = (
      <p className="py-10 text-center text-gray-500">Search for a movie</p>
    );
  } else if (loading) {
    content = <p className="py-10 text-center text-gray-500">Loading...</p>;
  } else if (error) {
    content = (
      <p className="py-10 text-center text-red-500">Something went wrong</p>
    );
  } else {
    content = <MoviesList movies={movies} />;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-center text-3xl font-bold">Movie Search</h1>
      <SearchBox
        value={search}
        onChange={handleChange}
        onClear={() => setSearch("")}
        onSearch={() => {
          setQuery(search.trim());
          setPage(1);
        }}
      />
      {content}

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            className={pageButton}
            disabled={page === 1 || loading}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </button>

          <p className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </p>

          <button
            type="button"
            className={pageButton}
            disabled={page >= totalPages || loading}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
