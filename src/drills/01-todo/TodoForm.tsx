import { useState } from 'react';

export type TodoFormProps = {
  onAdd: (title: string) => void;
};

export function TodoForm({ onAdd }: TodoFormProps) {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = newTodoTitle.trim();
    if (!title) return;
    onAdd(title);
    setNewTodoTitle('');
  };
  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
