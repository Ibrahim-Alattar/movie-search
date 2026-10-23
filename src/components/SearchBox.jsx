import { useRef, useEffect } from "react";

export function SearchBox({ value, onChange, onClear, onSearch }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleClear() {
    onClear();
    inputRef.current.focus();
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto my-8 flex w-full max-w-xl gap-2"
    >
      <input
        placeholder="Search movies..."
        className="min-w-0 flex-1 rounded-3xl border px-4 py-2"
        value={value}
        onChange={onChange}
        type="text"
        ref={inputRef}
        aria-label="Search movies"
      />
      <button
        type="submit"
        className="cursor-pointer rounded-3xl bg-blue-500 px-5 py-2 text-white hover:bg-blue-600"
      >
        Search
      </button>
      <button
        type="button"
        onClick={handleClear}
        className="cursor-pointer rounded-3xl border px-5 py-2 hover:bg-blue-50"
      >
        Clear
      </button>
    </form>
  );
}
