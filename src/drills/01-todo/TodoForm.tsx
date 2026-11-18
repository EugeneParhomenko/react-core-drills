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
        className="todo-form__input"
        type="text"
        placeholder="What needs to be done?"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
      />
      <button type="submit" className="todo-form__submit">
        Add
      </button>
    </form>
  );
}
