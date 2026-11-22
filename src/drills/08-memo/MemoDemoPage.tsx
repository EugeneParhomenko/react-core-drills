import { useState } from 'react';
import { generateTasks } from './generateTasks';
import './MemoDemoPage.css';
import { TaskList } from './TaskList';
import type { MemoVariant } from './types';

const VARIANTS: { id: MemoVariant; label: string; description: string }[] = [
  {
    id: 'plain',
    label: '(а) Без мемоїзації',
    description:
      'Без memo / useMemo / useCallback. query і doneIds як у прикладі з хуків.',
  },
  {
    id: 'broken',
    label: '(б) Memo + пастка',
    description:
      'memo(TaskRow) + useMemo(visible) + useCallback, але task={{ ...t, done: doneIds.has(t.id) }}.',
  },
  {
    id: 'fixed',
    label: '(в) Примітивні props',
    description:
      'Той самий useMemo / useCallback, але в рядок передаються id, title, done (boolean).',
  },
];

const TASK_COUNT = 5000;

export default function MemoDemoPage() {
  const [variant, setVariant] = useState<MemoVariant>('plain');
  const [tasks] = useState(() => generateTasks(TASK_COUNT));

  const activeVariant = VARIANTS.find((item) => item.id === variant);

  return (
    <div className="memo-demo">
      <h2 className="memo-demo__title">Memo &amp; Profiler</h2>
      <p className="memo-demo__hint">
        {TASK_COUNT} задач, <code>doneIds: Set</code>, фільтр по query — як у
        прикладі. Profiler: набери ті самі 5 символів у пошук у кожному
        варіанті.
      </p>

      <div className="memo-demo__variants" role="tablist" aria-label="Варіант">
        {VARIANTS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={variant === item.id}
            className={
              variant === item.id
                ? 'memo-demo__variant memo-demo__variant--active'
                : 'memo-demo__variant'
            }
            onClick={() => setVariant(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {activeVariant && (
        <p className="memo-demo__variant-desc">{activeVariant.description}</p>
      )}

      <TaskList key={variant} tasks={tasks} variant={variant} />

      <p className="memo-demo__profiler-tip">
        React DevTools → Profiler: під час набору 5 символів дивись ререндери{' '}
        <code>TaskRow</code> / <code>TaskRowPlain</code> /{' '}
        <code>TaskRowPrimitiveMemo</code> — результати в <code>README.md</code>.
      </p>
    </div>
  );
}
