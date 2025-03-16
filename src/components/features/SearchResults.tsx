import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { Loading } from "../layout/Loading";

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
    return <Loading text="Loading..." className="mt-16" />;
  }

  if (results.length === 0 && q) {
    return (
      <div className="mb-24 mt-40 flex flex-col items-center justify-center space-y-3 text-center">
        <div className="text-2xl text-bink-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          </svg>
        </div>
        <p>No results found</p>
      </div>
    );
  }

  if (!q) {
    return null;
  }

  return (
    <p>Results</p>
  )
}

export default getResults;