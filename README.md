# Movie Search

A movie search app built with React and Tailwind CSS, using the OMDb API.

**Live demo:** https://movie-search-fbvq.vercel.app/

## Features

- Search movies and series by title (button or Enter)
- Results shown in a responsive poster grid
- Numbered pagination (Previous / Next, "Page X of Y")
- Loading, error, and no-results states
- Placeholder for movies with no poster
- Clear button that refocuses the search box

## Tech stack

- React (Vite)
- Tailwind CSS
- OMDb API

## Run it locally

```bash
git clone <your-repo-url>
cd <your-repo-folder>
npm install
```

Get a free API key at https://www.omdbapi.com/apikey.aspx, then create a `.env` file in the project root:

```
VITE_OMDB_KEY=your_key_here
```

Start the dev server:

```bash
npm run dev
```

## What I practiced

- `useState` and `useEffect`, including the dependency array
- Fetching data with `async/await`, with loading and error handling
- Separating typed input (`search`) from submitted input (`query`)
- Deriving values instead of storing them (`totalPages`)
- Lifting state up and splitting the UI into components (`SearchBox`, `MoviesList`, `MovieCard`, `Card`)
- `useRef` for focusing an input
- Environment variables with Vite (`import.meta.env`)
- Responsive layouts with Tailwind

## Possible next steps

- Movie details view (plot, rating, genre, runtime)
- Favorites saved in `localStorage`
- Cancelling stale requests