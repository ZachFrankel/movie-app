import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";

const BASE_URL = "https://api.themoviedb.org/3";

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

  const getYear = (item: Result) => {
    return item.release_date ? new Date(item.release_date).getFullYear() : "";
    
  };
  const getTitle = (result: any) => {
    return result.title || result.name;
  };
}
