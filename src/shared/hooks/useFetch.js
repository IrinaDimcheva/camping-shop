import { useEffect, useState } from "react";

function useFetch(url, credentials = null, method = 'GET', body = null, headers = null) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(url, credentials)
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  }, [url, credentials]);

  const refetch = () => {
    setIsLoading(true);
    fetch(url, credentials, method = 'GET', body = null, headers = null)
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

  return { data, isLoading, error, refetch };
}

export default useFetch;
