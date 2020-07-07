import { useState, useCallback, useEffect } from 'react';

const { REACT_APP_BASE_URL } = process.env;

interface Response {
  success?: boolean;
  message?: string;
  Authorization?: string;
}

export const defaultHeaders = {
  'Content-Type': 'application/json',
};

const useFetchApi = (url: string, method = 'GET'): any => {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<Response>({});
  const [error, setError] = useState(null);
  const { signal, abort } = new AbortController();
  const uri = `${REACT_APP_BASE_URL}${url}`;

  const startFetch = useCallback(
    async (body, token?, overrideHeaders = {}) => {
      // const authorizationHeaders =
      // (token && { 'Autthorization:': `Bearer ${token}` }) || {};

      const headers = {
        ...defaultHeaders,
        // ...authorizationHeaders,
        ...overrideHeaders,
      };

      setIsFetching(true);
      setError(null);
      try {
        const response = await fetch(uri, {
          method,
          body,
          headers,
          signal,
        });
        const res: Response = await response.json();
        setData(res);
      } catch (err) {
        setError(error);
      } finally {
        setIsFetching(false);
      }
    },
    [uri, method, signal, error],
  );

  const cancelFetch = useCallback(() => abort(), [abort]);

  useEffect(() => {
    return () => abort();
  }, [abort]);

  return {
    isFetching,
    data,
    error,
    startFetch,
    cancelFetch,
  };
};

export default useFetchApi;
