import { memo } from 'react';
import type { TaskView } from './types';

export type TaskRowProps = {
  task: TaskView;
  onToggle: (id: string) => void;
};

function TaskRowInner({ task, onToggle }: TaskRowProps) {
  return (
    <li className="memo-task-row">
      <input
        className="memo-task-row__checkbox"
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
        aria-label={`Toggle ${task.title}`}
      />
      <span
        className={
          task.done
            ? 'memo-task-row__title memo-task-row__title--done'
            : 'memo-task-row__title'
        }
      >
        {task.title}
      </span>
    </li>
  );
}

export const TaskRow = memo(TaskRowInner);

export function TaskRowPlain({ task, onToggle }: TaskRowProps) {
  return <TaskRowInner task={task} onToggle={onToggle} />;
}

type TaskRowPrimitiveProps = {
  id: string;
  title: string;
  done: boolean;
  onToggle: (id: string) => void;
};

function TaskRowPrimitive({
  id,
  title,
  done,
  onToggle,
}: TaskRowPrimitiveProps) {
  return <TaskRowInner task={{ id, title, done }} onToggle={onToggle} />;
}

export const TaskRowPrimitiveMemo = memo(TaskRowPrimitive);
