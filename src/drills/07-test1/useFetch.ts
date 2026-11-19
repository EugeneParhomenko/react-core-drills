import { useEffect, useState } from 'react';

type FetchStatus = 'idle' | 'loading' | 'success' | 'error';

type FetchResponse<T> = {
  data: T | null;
  error: Error | null;
  status: FetchStatus;
};

type FetchState<T> = {
  url: string | null;
  data: T | null;
  error: Error | null;
};

export function useFetch<T>(url: string | null): FetchResponse<T> {
  const [fetchState, setFetchState] = useState<FetchState<T>>({
    url: null,
    data: null,
    error: null,
  });

  useEffect(() => {
    if (!url) return;
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<T>;
      })
      .then((data) => setFetchState({ url, data, error: null }))
      .catch((error: Error) => {
        if (controller.signal.aborted) return;
        setFetchState({ url, data: null, error });
      });

    return () => controller.abort();
  }, [url]);

  const isFetchCurrent = fetchState.url === url;
  const status: FetchStatus = !url
    ? 'idle'
    : !isFetchCurrent
      ? 'loading'
      : fetchState.error
        ? 'error'
        : 'success';

  return {
    data: isFetchCurrent ? fetchState.data : null,
    error: isFetchCurrent ? fetchState.error : null,
    status,
  };
}
