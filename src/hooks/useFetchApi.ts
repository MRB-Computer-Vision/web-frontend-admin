import { useState, useCallback, useEffect } from 'react';

const { REACT_APP_BASE_URL } = process.env;

interface Response {
  success?: boolean;
  message?: string;
  Authorization?: string;
  data?: any[];
}

export const defaultHeaders = {
  'Content-Type': 'application/json',
};

const { AbortController } = window;

const useFetchApi = (url: string, method = 'GET'): any => {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<Response>({});
  const [error, setError] = useState(null);
  // const { signal, abort } = new AbortController();
  const uri = `${REACT_APP_BASE_URL}${url}`;

  const controller = new AbortController();
  const { signal } = controller;

  const startFetch = useCallback(
    async (body, token?, overrideHeaders = {}) => {
      const authorizationHeaders =
        (token && { 'Authorization:': `Bearer ${token}` }) || undefined;

      const headers = {
        ...defaultHeaders,
        ...authorizationHeaders,
        ...overrideHeaders,
      };

      setIsFetching(true);
      setError(null);
      try {
        console.log('headers: ', headers);
        const response = await fetch(uri, {
          method,
          body,
          headers,
          signal,
        });
        const res: Response = await response.json();
        setData(res);
      } catch (err) {
        console.log('erro', err);
        setError(err);
      } finally {
        setIsFetching(false);
      }
    },
    [uri, method, signal, setError],
  );

  const cancelFetch = useCallback(() => controller.abort(), [controller.abort]);

  useEffect(() => {
    return () => controller.abort();
  }, [controller.abort]);

  return {
    isFetching,
    data,
    error,
    startFetch,
    cancelFetch,
  };
};

export default useFetchApi;
