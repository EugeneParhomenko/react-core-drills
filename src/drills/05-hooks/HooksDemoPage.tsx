import { useState } from 'react';
import './HooksDemoPage.css';
import type { UsersApiResponse } from './types';
import { useDebounce } from './useDebounce';
import { useFetch } from './useFetch';
import { useLocalStorage } from './useLocalStorage';
import { UsersList } from './UsersList';

const baseUrl = 'https://dummyjson.com/users/search?q=';
const storageKey = 'HOOKS_DEMO_SEARCH_TERM';

export function HooksDemoPage() {
  const [value, setValue] = useLocalStorage<string>(storageKey, '');
  const [searchTerm, setSearchTerm] = useState<string>(value);
  const debouncedSearchTerm = useDebounce<string>(baseUrl + value, 300);
  const { data, error, status } = useFetch<UsersApiResponse | null>(
    debouncedSearchTerm,
  );

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
    setValue(searchValue);
  }

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
          value={searchTerm}
          onChange={handleSearch}
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
