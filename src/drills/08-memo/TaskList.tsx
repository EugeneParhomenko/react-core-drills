import { useCallback, useMemo, useState } from 'react';
import { TaskRow, TaskRowPlain, TaskRowPrimitiveMemo } from './TaskRow';
import type { MemoVariant, Task } from './types';

type TaskListProps = {
  tasks: Task[];
  variant: MemoVariant;
};

export function TaskList({ tasks, variant }: TaskListProps) {
  const [query, setQuery] = useState('');
  const [doneIds, setDoneIds] = useState<Set<string>>(() => new Set());

  const toggleDone = useCallback((id: string) => {
    setDoneIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleDonePlain = (id: string) => {
    setDoneIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const visibleMemo = useMemo(
    () =>
      tasks.filter((task) =>
        task.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [tasks, query],
  );

  const visiblePlain = tasks.filter((task) =>
    task.title.toLowerCase().includes(query.toLowerCase()),
  );

  const visible = variant === 'plain' ? visiblePlain : visibleMemo;
  const handleToggle = variant === 'plain' ? toggleDonePlain : toggleDone;

  return (
    <>
      <div className="memo-demo__search">
        <label className="memo-demo__search-label" htmlFor="memo-search">
          Пошук
        </label>
        <input
          id="memo-search"
          className="memo-demo__search-input"
          type="search"
          placeholder="Фільтр за назвою…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          autoComplete="off"
        />
      </div>

      <div className="memo-demo__stats">
        <span>
          Після фільтра: <strong>{visible.length}</strong>
        </span>
        <span>
          Зроблено: <strong>{doneIds.size}</strong>
        </span>
      </div>

      <ul className="memo-task-list">
        {variant === 'fixed' &&
          visible.map((t) => (
            <TaskRowPrimitiveMemo
              key={t.id}
              id={t.id}
              title={t.title}
              done={doneIds.has(t.id)}
              onToggle={handleToggle}
            />
          ))}

        {variant === 'broken' &&
          visible.map((t) => (
            <TaskRow
              key={t.id}
              task={{ ...t, done: doneIds.has(t.id) }}
              onToggle={handleToggle}
            />
          ))}

        {variant === 'plain' &&
          visible.map((t) => (
            <TaskRowPlain
              key={t.id}
              task={{ ...t, done: doneIds.has(t.id) }}
              onToggle={handleToggle}
            />
          ))}
      </ul>
    </>
  );
}
