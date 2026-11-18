import { useState } from 'react';
import type { Todo } from './type';

export type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
};

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [draft, setDraft] = useState('');
  const [editing, setEditing] = useState(false);

  const startEdit = () => {
    setDraft(todo.title);
    setEditing(true);
  };
  const finishEdit = () => {
    setEditing(false);
    const title = draft.trim();
    if (title && title !== todo.title) onEdit(todo.id, title);
  };

  const cancelEdit = () => {
    setEditing(false);
    setDraft('');
  };

  return (
    <li
      className={`todo-item${todo.done ? ' todo-item--done' : ''}${editing ? ' todo-item--editing' : ''}`}
    >
      <input
        className="todo-item__checkbox"
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark "${todo.title}" as ${todo.done ? 'incomplete' : 'complete'}`}
      />
      {editing ? (
        <input
          className="todo-item__edit"
          type="text"
          autoFocus
          value={draft}
          onBlur={finishEdit}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              finishEdit();
            } else if (e.key === 'Escape') {
              cancelEdit();
            }
          }}
        />
      ) : (
        <span className="todo-item__title" onDoubleClick={startEdit}>
          {todo.title}
        </span>
      )}
      <button
        type="button"
        className="todo-item__delete"
        onClick={() => onDelete(todo.id)}
      >
        Delete
      </button>
    </li>
  );
}
