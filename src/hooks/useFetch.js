import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController to cancel the fetch request if the component unmounts
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state before making a new request

      try {
        const req = await fetch(url, { signal });

        if (!req.ok) {
          throw new Error(`Request failed with status: ${req.status}`);
        }

        const response = await req.json();
        setData(response);
      } catch (err) {
        // Only set the error if the fetch was not aborted
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        // Ensure loading is set to false regardless of success or failure
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function to abort the fetch request if the component unmounts
    return () => {
      abortController.abort();
    };
  }, [url]);

  return {
    data,
    error,
    loading,
  };
}
