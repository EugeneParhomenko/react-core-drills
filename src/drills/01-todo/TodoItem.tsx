import { useState } from "react";
import type { Todo } from "./type"

export type TodoItemProps = {
  todo: Todo,
  onToggle: (id: string) => void,
  onDelete: (id: string) => void,
  onEdit: (id: string, title: string) => void,
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [title, setTitle] = useState(todo.title);
  const [editing, setEditing] = useState(false);


  const finishEdit = () => {
    setEditing(false);
    if (title.trim() === '') return;
    onEdit(todo.id, title);
  }
  
  const cancelEdit = () => {
    setEditing(false);
    setTitle(todo.title);
  }
  
  return (
    <div className="todo-item" onDoubleClick={() => setEditing(true)}>
      <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} onClick={(e) => { e.stopPropagation() }} />
      {editing ? (
        <input
          type="text"
          autoFocus
          value={title}
          onBlur={finishEdit}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              finishEdit();
            }
            else if (e.key === 'Escape') {
              cancelEdit();
            }
          }}
        />
      ) : (
        <span>{todo.title}</span>
      )}
      <button onClick={(e) => { e.stopPropagation(); onDelete(todo.id) }}>Delete</button>
    </div>
  )
}
