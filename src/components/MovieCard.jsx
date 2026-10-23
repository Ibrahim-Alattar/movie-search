import { Card } from "./Card";

export function MovieCard({ title, year, poster }) {
  return (
    <Card>
      {poster && poster !== "N/A" ? (
        <img
          src={poster}
          alt={title}
          className="aspect-[2/3] w-full rounded-lg object-cover"
        />
      ) : (
        <div className="flex aspect-[2/3] w-full items-center justify-center rounded-lg bg-gray-200 text-gray-500">
          No poster
        </div>
      )}
      {title && <h2 className="mt-2 line-clamp-2 font-semibold">{title}</h2>}
      {year && <p className="text-sm text-gray-500">{year}</p>}
    </Card>
  );
}
