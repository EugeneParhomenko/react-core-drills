import './HooksDemoPage.css';
import type { UsersApiResponse } from './types';
import { useDebounce } from './useDebounce';
import { useFetch } from './useFetch';
import { useLocalStorage } from './useLocalStorage';
import { UsersList } from './UsersList';

const BASE_URL = 'https://dummyjson.com/users/search?q=';
const STORAGE_KEY = 'HOOKS_DEMO_SEARCH_TERM';

export function HooksDemoPage() {
  const [value, setValue] = useLocalStorage<string>(STORAGE_KEY, '');
  const searchTerm = useDebounce<string>(value.trim(), 300);
  const url = searchTerm
    ? `${BASE_URL}${encodeURIComponent(searchTerm)}`
    : null;
  const { data, error, status } = useFetch<UsersApiResponse>(url);

  return (
    <div className="hooks-demo">
      <h2 className="hooks-demo__title">Hooks demo</h2>
      <p className="hooks-demo__hint">
        Search is saved in localStorage; requests use debounced fetch.
      </p>
      <div className="hooks-demo__search">
        <label className="hooks-demo__search-label" htmlFor="hooks-demo-search">
          Search users
        </label>
        <input
          id="hooks-demo-search"
          className="hooks-demo__search-input"
          type="search"
          placeholder="Type a name or email…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
        />
      </div>
      {status === 'loading' ? (
        <div
          className="hooks-demo__status hooks-demo__status--loading"
          role="status"
        >
          Loading…
        </div>
      ) : status === 'error' ? (
        <div
          className="hooks-demo__status hooks-demo__status--error"
          role="alert"
        >
          Error: {error?.message}
        </div>
      ) : status === 'success' && data ? (
        <section className="hooks-demo__results" aria-label="Search results">
          <h3 className="hooks-demo__results-heading">
            {data.users.length} result{data.users.length === 1 ? '' : 's'}
          </h3>
          <UsersList users={data.users} />
        </section>
      ) : null}
    </div>
  );
}
