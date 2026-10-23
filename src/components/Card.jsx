export function Card({ title, children }) {
  return (
    <div className="overflow-hidden rounded-xl border-2 bg-white p-2 shadow-md hover:shadow-2xl">
      {title && <h2 className="text-center">{title}</h2>}
      {children}
    </div>
  );
}
