import { useEffect, useState } from 'react';

type UseFetchStatus = 'idle' | 'loading' | 'success' | 'error';

type UseFetchResult<T> = {
  data: T | null;
  error: Error | null;
  status: UseFetchStatus;
};

type State<T> = { url: string | null; data: T | null; error: Error | null };

export function useFetch<T>(url: string | null): UseFetchResult<T> {
  const [state, setState] = useState<State<T>>({
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
      .then((data) => setState({ url, data, error: null }))
      .catch((error: Error) => {
        if (controller.signal.aborted) return;
        setState({ url, data: null, error });
      });

    return () => controller.abort();
  }, [url]);

  const isCurrent = state.url === url;
  const status: UseFetchStatus = !url
    ? 'idle'
    : !isCurrent
      ? 'loading'
      : state.error
        ? 'error'
        : 'success';

  return {
    data: isCurrent ? state.data : null,
    error: isCurrent ? state.error : null,
    status,
  };
}
