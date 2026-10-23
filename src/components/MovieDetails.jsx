import { useState, useEffect } from "react";

// One label + value row. Renders nothing if the value is missing or "N/A".
function Field({ label, value }) {
  if (!value || value === "N/A") return null;
  return (
    <div>
      <dt className="text-sm font-semibold text-gray-500">{label}</dt>
      <dd className="text-gray-900">{value}</dd>
    </div>
  );
}

export function MovieDetails({ id, onBack }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      const key = import.meta.env.VITE_OMDB_KEY;
      const url = `https://www.omdbapi.com/?apikey=${key}&i=${id}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        if (data.Response === "False") throw new Error(data.Error);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [id]);

  let content;

  if (loading) {
    content = <p className="py-10 text-center text-gray-500">Loading...</p>;
  } else if (error) {
    content = (
      <p className="py-10 text-center text-red-500">Something went wrong</p>
    );
  } else {
    const hasPoster = movie.Poster && movie.Poster !== "N/A";

    content = (
      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        {hasPoster ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full rounded-xl object-cover shadow-md"
          />
        ) : (
          <div className="flex aspect-[2/3] w-full items-center justify-center rounded-xl bg-gray-200 text-gray-500">
            No poster
          </div>
        )}

        <div>
          <h2 className="text-3xl font-bold">{movie.Title}</h2>
          <p className="mt-1 text-gray-500">
            {[movie.Year, movie.Rated, movie.Runtime]
              .filter((item) => item && item !== "N/A")
              .join(" · ")}
          </p>

          {movie.Genre && movie.Genre !== "N/A" && (
            <div className="mt-3 flex flex-wrap gap-2">
              {movie.Genre.split(", ").map((genre) => (
                <span
                  key={genre}
                  className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          {movie.Plot && movie.Plot !== "N/A" && (
            <p className="mt-4 leading-relaxed">{movie.Plot}</p>
          )}

          {movie.Ratings?.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-3">
              {movie.Ratings.map(({ Source, Value }) => (
                <li
                  key={Source}
                  className="rounded-lg border px-4 py-2 text-center"
                >
                  <p className="text-lg font-semibold">{Value}</p>
                  <p className="text-xs text-gray-500">{Source}</p>
                </li>
              ))}
            </ul>
          )}

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Director" value={movie.Director} />
            <Field label="Writer" value={movie.Writer} />
            <Field label="Actors" value={movie.Actors} />
            <Field label="Released" value={movie.Released} />
            <Field label="Language" value={movie.Language} />
            <Field label="Country" value={movie.Country} />
            <Field label="Awards" value={movie.Awards} />
            <Field label="Box office" value={movie.BoxOffice} />
            <Field label="Production" value={movie.Production} />
            <Field label="Metascore" value={movie.Metascore} />
            <Field label="IMDb rating" value={movie.imdbRating} />
            <Field label="IMDb votes" value={movie.imdbVotes} />
            <Field label="Type" value={movie.Type} />
          </dl>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-6 cursor-pointer rounded-3xl border px-5 py-2 hover:bg-blue-50"
      >
        ← Back
      </button>
      {content}
    </div>
  );
}
