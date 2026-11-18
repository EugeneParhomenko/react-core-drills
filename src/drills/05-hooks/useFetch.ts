import { useEffect, useState } from 'react';

type UseFetchStatus = 'idle' | 'loading' | 'success' | 'error';

type UseFetchResult<T> = {
  data: T | null;
  error: Error | null;
  status: UseFetchStatus;
};

export function useFetch<T>(url: string | null): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<UseFetchStatus>(
    url ? 'loading' : 'idle',
  );

  useEffect(() => {
    if (!url) return;
    const controller = new AbortController();
    fetch(url, { signal: controller.signal })
      .then((response) => response.json())
      .then(setData)
      .catch(setError)
      .finally(() => setStatus('success'));

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, error, status };
}
