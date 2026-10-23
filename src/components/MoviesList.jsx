import { MovieCard } from "./MovieCard";

export function MoviesList({ movies, onSelect }) {
  return movies.length === 0 ? (
    <p className="py-10 text-center text-gray-500">No movies found</p>
  ) : (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
      {movies.map(({ imdbID, Title, Poster, Year }) => (
        <li key={imdbID}>
          <MovieCard
            title={Title}
            poster={Poster}
            year={Year}
            onSelect={() => {
              onSelect(imdbID);
              console.log(imdbID);
            }}
          />
        </li>
      ))}
    </ul>
  );
}
