import { useState } from 'react';
import './TestPage.css';
import { useFetch } from './useFetch';
import type { User } from './user.type';

const TEST_PAGE_URL = 'https://dummyjson.com/users/';

const STATUS_LABELS: Record<string, string> = {
  idle: 'Очікування',
  loading: 'Завантаження',
  success: 'Успіх',
  error: 'Помилка',
};

export function TestPage() {
  const [userId, setUserId] = useState(0);
  const userUrl = userId > 0 ? `${TEST_PAGE_URL}${userId}` : null;
  const { data, error, status } = useFetch<User>(userUrl);

  return (
    <div className="test-page">
      <h2 className="test-page__title">Test 1 — useFetch</h2>
      <p className="test-page__hint">
        Листай користувачів DummyJSON. Запит лише коли{' '}
        <code>userId &gt; 0</code>.
      </p>

      <div className="test-page__toolbar">
        <span className="test-page__id">ID: {userId > 0 ? userId : '—'}</span>
        <button
          type="button"
          className="test-page__btn"
          disabled={userId <= 1}
          onClick={() => setUserId((id) => Math.max(1, id - 1))}
        >
          Previous
        </button>
        <button
          type="button"
          className="test-page__btn"
          onClick={() => setUserId((id) => id + 1)}
        >
          Next
        </button>
      </div>

      <div
        className={`test-page__status test-page__status--${status}`}
        role="status"
      >
        {STATUS_LABELS[status] ?? status}
      </div>

      {status === 'idle' && (
        <p className="test-page__placeholder">
          Натисни <strong>Next User</strong>, щоб завантажити першого
          користувача.
        </p>
      )}

      {status === 'loading' && (
        <p className="test-page__placeholder">Завантажуємо дані…</p>
      )}

      {status === 'error' && error && (
        <p className="test-page__error" role="alert">
          {error.message}
        </p>
      )}

      {status === 'success' && data && (
        <article className="test-page__user">
          <img
            className="test-page__avatar"
            src={data.image}
            alt=""
            width={72}
            height={72}
            loading="lazy"
          />
          <div className="test-page__user-body">
            <h3 className="test-page__user-name">
              {data.firstName} {data.lastName}
            </h3>
            <p className="test-page__user-meta">{data.email}</p>
            <p className="test-page__user-meta test-page__user-meta--mono">
              {data.phone}
            </p>
          </div>
        </article>
      )}

      {(data || error) && (
        <details className="test-page__debug">
          <summary className="test-page__debug-summary">Debug JSON</summary>
          <pre>
            {JSON.stringify(
              { data, error: error?.message ?? null, status },
              null,
              2,
            )}
          </pre>
        </details>
      )}
    </div>
  );
}
