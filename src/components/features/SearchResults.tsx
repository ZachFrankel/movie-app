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
        const res = await fetch();
      }
    };
  });
}
