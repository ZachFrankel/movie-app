import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";

const BASE_URL = "https://api.themoviedb.org/3";

interface MovieResult {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  media_type: "movie";
}

interface TVResult {
  id: number;
  name: string;
  poster_path: string | null;
  first_air_date: string;
  media_type: "tv";
}

type SearchResult = MovieResult | TVResult;

interface Result {
  query: string;
}

function getResults({ query }: Result) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const q = useDebounce(query, 500);

  useEffect(() => {
    const search = async () => {
      if (!q.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);

      try {
        const res = await fetch(`${BASE_URL}/search/multi?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${encodeURIComponent(q)}&include_adult=false`);

        if (!res.ok) {
          throw new Error("Failed to fetch results");
        }

        const data = await res.json();

        setResults(data.results);
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [q]);

  const getYear = (date: string) => {
    return date ? new Date(date).getFullYear() : "";
  };

  const getRelease = (item: SearchResult) => {
    return item.media_type === "movie"
      ? getYear(item.release_date)
      : getYear(item.first_air_date);
  };

  const getTitle = (result: any) => {
    return result.title || result.name;
  };

  if (loading) {
    return (
      <p>Loading...</p>
    )
  }

  if (results.length === 0 && q) {
    return (
      <p>No results found</p>
    )
  }

  return (
    <p>Results</p>
  )
}

export default getResults;